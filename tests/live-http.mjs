import {readFile,writeFile} from 'node:fs/promises';
const baseline=JSON.parse(await readFile('src/design/newspaper/BASELINE.json','utf8'));
const paths=[...new Set([...baseline.routes.filter(p=>p!=='/404.html'),'/work/roundtails/','/rss.xml','/sitemap-index.xml','/sitemap-0.xml','/robots.txt','/sw.js','/71660489d03d41b7b1d5035833006221.txt','/release-test-missing-page/'])];
const results=[];
for(let i=0;i<paths.length;i+=6){await Promise.all(paths.slice(i,i+6).map(async path=>{
 const res=await fetch('https://gavinelliott.co.uk'+path,{headers:{'User-Agent':'Mozilla/5.0 (compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot)'}});
 const body=await res.text();results.push({path,status:res.status,final:res.url,csp:res.headers.has('content-security-policy'),newDesign:body.includes('GAV ELLIOTT'),noindex:/<meta name="robots" content="noindex/.test(body)});
}));}
await writeFile('/tmp/blog-live-http.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({checked:results.length,failures:results.filter(r=>r.status!==(r.path.includes('missing-page')?404:200))},null,2));
