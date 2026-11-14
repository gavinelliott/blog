import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.env.TEST_SITE || 'https://gavinelliott.co.uk';
const browser=await chromium.launch();
const results=[];
const routes=['/','/writing/','/writing/ai-and-product-design/','/blog/how-to-brief-an-ai-coding-agent/','/work/','/work/roundtails/','/recommended-reads/','/speaking/','/talks/imposter-syndrome/','/about/','/privacy-policy/','/sitemap/','/work/tackling-design-debt/','/shipped/','/shipped/cleanreader/','/release-test-missing-page/'];
try{
for(const width of [390,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const route of routes){
  const errors=[];const handler=err=>errors.push(err.message);page.on('pageerror',handler);
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  const result={route,width,status:response.status(),overflow:dimensions.scroll-dimensions.width,errors,h1:await page.locator('h1').count()};
  results.push(result);page.off('pageerror',handler);
 }
 await page.goto(base+'/');
 await page.getByRole('button',{name:'Open search',exact:true}).click();
 await page.locator('#site-search').fill('AI');
 await page.locator('#search-results a').first().waitFor();
 assert.ok((await page.locator('#search-results a').count())>0);
 assert.match(await page.locator('#search-results a').first().getAttribute('href'),/^\/blog\//);
 await page.keyboard.press('Escape');assert.equal(await page.locator('#search-dialog').isVisible(),false);
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Open search');
 if(width===390){await page.locator('.mobile-menu summary').click();assert.equal(await page.locator('.mobile-menu').evaluate(el=>el.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-menu').evaluate(el=>el.open),false);}
 await page.goto(base+'/blog/how-to-brief-an-ai-coding-agent/');
 const link=page.locator('.contents a').nth(2);await link.click();await page.waitForTimeout(250);
 assert.equal(await link.getAttribute('aria-current'),'location');
 await context.close();
}
await writeFile(process.env.TEST_REPORT || '/tmp/blog-live-browser.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({pages:results.length,failures:results.filter(r=>r.overflow>1||r.errors.length||r.h1!==1||r.status!==(r.route.includes('missing-page')?404:200))},null,2));
}finally{await browser.close();}
