import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
const files=(await readdir('dist',{recursive:true})).filter(f=>f.endsWith('.html'));
const baseline=JSON.parse(await readFile('src/design/newspaper/BASELINE.json','utf8'));
test('all published routes survive and no prototype route is built',()=>{
 const routes=files.map(f=>'/'+f.replace('index.html',''));
 for(const route of baseline.routes)assert.ok(routes.includes(route),route);
 assert.equal(routes.filter(r=>r.startsWith('/design/')).length,0);
});
test('every page has production metadata, valid structured data and safe scripts',async()=>{
 for(const file of files){
 const html=await readFile('dist/'+file,'utf8');
 assert.doesNotMatch(html,/(?:href|src)="\/design\//,file);
 assert.doesNotMatch(html,/Local prototype|Local design edition/,file);
 assert.match(html,/<link rel="canonical" href="https:\/\/gavinelliott.co.uk\//,file);
 assert.match(html,/http-equiv="Content-Security-Policy"/i,file);
 assert.equal((html.match(/data-website-id=/g)||[]).length,1,file);
 if(!file.startsWith('work/') || file==='work/index.html' || file==='work/roundtails/index.html'){
  if(file!=='404.html')assert.doesNotMatch(html,/<meta name="robots" content="noindex/,file);
 }
 for(const [,attrs,body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/type="application\/(?:ld\+)?json"/.test(attrs)){
   const data=JSON.parse(body);if(/ld\+json/.test(attrs))assert.ok(data['@graph'].some(n=>n['@type']==='Person'&&n.alternateName==='Gav Elliott'));
  }else{assert.equal(body.trim(),'');assert.match(attrs,/src=/);}
 }
 }
});
test('sitemap includes public projects and excludes legacy cases and previews',async()=>{
 const xml=await readFile('dist/sitemap-0.xml','utf8');
 assert.match(xml,/https:\/\/gavinelliott.co.uk\/work\//);
 assert.match(xml,/https:\/\/gavinelliott.co.uk\/work\/roundtails\//);
 assert.doesNotMatch(xml,/\/design\/|\/work\/tackling-design-debt\//);
});
