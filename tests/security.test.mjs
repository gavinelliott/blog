import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';

const root = path.resolve('dist');
const deployment = JSON.parse(await readFile('vercel.json', 'utf8'));
const globalHeaders = Object.fromEntries(deployment.headers[0].headers.map(({ key, value }) => [key, value]));
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2' };
let browser;
let server;
let base;

before(async () => {
  server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const headers = { ...globalHeaders, 'Cache-Control': 'public, max-age=0, must-revalidate' };
    for (const rule of deployment.headers.filter(rule => rule.source === url.pathname)) {
      for (const { key, value } of rule.headers) headers[key] = value;
    }
    if (url.pathname.startsWith('/security-fixture/')) {
      if (url.pathname.endsWith('/eval.js')) {
        response.writeHead(200, { ...headers, 'Content-Type': 'application/javascript' });
        response.end('try { eval("window.__evaluated = true"); } catch { window.__evalBlocked = true; }');
      } else {
        if (url.pathname.endsWith('/private')) headers['Cache-Control'] = 'private, no-store';
        response.writeHead(200, { ...headers, 'Content-Type': 'text/html' });
        response.end('Test response');
      }
      return;
    }
    try {
      const pathname = decodeURIComponent(url.pathname);
      const file = path.resolve(root, `.${pathname}`, pathname.endsWith('/') ? 'index.html' : '');
      if (!file.startsWith(`${root}${path.sep}`)) throw new Error('Outside build directory');
      const content = await readFile(file);
      response.writeHead(200, { ...headers, 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      response.end(content);
    } catch {
      response.writeHead(404, headers);
      response.end('Not found');
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
});

after(async () => {
  await browser?.close();
  server?.closeAllConnections();
  if (server?.listening) await new Promise(resolve => server.close(resolve));
});

async function newContext(options = {}) {
  const context = await browser.newContext(options);
  // Keep regression tests independent of third-party availability.
  await context.route('https://**/*', route => route.fulfill({ status: 200, contentType: 'text/plain', body: '' }));
  return context;
}

test('every built HTML page has a restrictive CSP and external executable scripts', async () => {
  const files = (await readdir(root, { recursive: true })).filter(file => file.endsWith('.html'));
  assert.ok(files.length > 0, 'Build the site before running these tests');
  const policy = globalHeaders['Content-Security-Policy'];
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  const scriptPolicy = policy.split(';').find(directive => directive.trim().startsWith('script-src '));
  assert.ok(scriptPolicy);
  assert.doesNotMatch(scriptPolicy, /unsafe-inline|unsafe-eval|\*/);
  for (const file of files) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.match(html, /http-equiv="content-security-policy"/i, `${file}: CSP missing`);
    const metaPolicy = html.match(/http-equiv="content-security-policy" content="([^"]+)"/i)[1];
    assert.equal(metaPolicy, policy.split(';').map(directive => directive.trim()).filter(directive => !directive.startsWith('frame-ancestors ')).join('; '), `${file}: preview policy differs from deployment`);
    assert.ok(html.toLowerCase().indexOf('http-equiv="content-security-policy"') < html.indexOf('<script'), `${file}: CSP must precede scripts`);
    for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      if (/type=["']application\/ld\+json["']/.test(attributes)) continue;
      assert.equal(body.trim(), '', `${file}: executable inline script`);
      assert.match(attributes, /\bsrc=/, `${file}: script without an external URL`);
    }
  }
});

test('navigation works and CSP blocks inline scripts, event handlers, foreign scripts, and eval', async () => {
  const context = await newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  try {
    await context.route('https://attacker.invalid/**', route => route.fulfill({ contentType: 'application/javascript', body: 'window.__foreignExecuted = true' }));
    const page = await context.newPage();
    const violations = [];
    page.on('console', message => {
      if (message.type() === 'error' && /content security policy/i.test(message.text())) violations.push(message.text());
    });
    await page.goto(`${base}/writing/`);
    await page.locator('.mobile-menu-toggle').click();
    assert.equal(await page.locator('.mobile-menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.mobile-menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.deepEqual(violations, [], 'The normal page must not violate CSP');
    await page.evaluate(() => {
      const inline = document.createElement('script');
      inline.textContent = 'window.__inlineExecuted = true';
      document.body.append(inline);
      const image = document.createElement('img');
      image.setAttribute('onerror', 'window.__handlerExecuted = true');
      image.src = '/security-missing-image';
      document.body.append(image);
      const foreign = document.createElement('script');
      foreign.src = 'https://attacker.invalid/payload.js';
      document.body.append(foreign);
    });
    await page.evaluate(src => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    }), `${base}/security-fixture/eval.js`);
    await page.waitForFunction(() => window.__evalBlocked === true);
    assert.deepEqual(await page.evaluate(() => ({ inline: !!window.__inlineExecuted, handler: !!window.__handlerExecuted, foreign: !!window.__foreignExecuted, evaluated: !!window.__evaluated })), { inline: false, handler: false, foreign: false, evaluated: false });
    assert.ok(violations.length >= 3, 'CSP should reject the injected payloads');
  } finally {
    await context.close();
  }
});

test('representative pages and supported embeds load without CSP violations', async () => {
  const context = await newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage();
    const violations = [];
    page.on('console', message => {
      if (message.type() === 'error' && /content security policy/i.test(message.text())) violations.push(message.text());
    });
    for (const route of ['/', '/blog/how-to-brief-an-ai-coding-agent/', '/work/tackling-design-debt/', '/shipped/cleanreader/', '/blog/my-2014/']) {
      const response = await page.goto(`${base}${route}`);
      assert.equal(response.status(), 200, route);
      assert.ok(await page.locator('h1').count(), `${route}: page title missing`);
    }
    assert.deepEqual(violations, []);
  } finally {
    await context.close();
  }
});

test('service worker installs, updates without HTTP cache, and excludes private or sensitive requests', async () => {
  const context = await newContext();
  try {
    const page = await context.newPage();
    await page.goto(`${base}/`);
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    const result = await page.evaluate(async () => {
      for (const [url, options] of [
        ['/security-fixture/public', {}],
        ['/security-fixture/private', {}],
        ['/security-fixture/query?token=example', {}],
        ['/security-fixture/authenticated', { headers: { Authorization: 'Bearer test-fixture' } }],
        ['/security-fixture/post', { method: 'POST', body: 'test' }],
      ]) await fetch(url, { ...options, headers: { Accept: 'text/html', ...options.headers } });
      const registration = await navigator.serviceWorker.getRegistration();
      const cache = await caches.open('gavin-elliott-blog-v2');
      return {
        updateViaCache: registration.updateViaCache,
        keys: (await cache.keys()).map(request => new URL(request.url).pathname + new URL(request.url).search),
      };
    });
    assert.equal(result.updateViaCache, 'none');
    assert.ok(result.keys.includes('/security-fixture/public'));
    for (const sensitive of ['/security-fixture/private', '/security-fixture/query?token=example', '/security-fixture/authenticated', '/security-fixture/post']) {
      assert.ok(!result.keys.includes(sensitive), `${sensitive} must not be cached`);
    }
    const response = await fetch(`${base}/sw.js`);
    assert.match(response.headers.get('Cache-Control'), /no-cache/);
  } finally {
    await context.close();
  }
});
