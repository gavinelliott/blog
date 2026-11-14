#!/usr/bin/env node
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const args=process.argv.slice(2);
const option=name=>{const i=args.indexOf(name);return i<0?undefined:args[i+1];};
const escape=text=>String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const data=async(file,type)=>`data:${type};base64,${(await fs.readFile(path.join(root,file))).toString('base64')}`;
const template=await fs.readFile(path.join(root,'scripts/social-image/template.html'),'utf8');
const assets={DISPLAY_FONT:await data('src/components/newspaper/assets/display.ttf','font/ttf'),UI_FONT:await data('src/components/newspaper/assets/inter-bold.woff2','font/woff2'),SERIF_FONT:await data('public/fonts/0QIvMX1D_JOuMwr7I_FMl_E.woff2','font/woff2'),PORTRAIT:await data('scripts/social-image/assets/gav-editorial.webp','image/webp')};
const cards=[];
if(args.includes('--all')){
 cards.push({slug:'default',title:'Gav Elliott',default:true});
 for(const filename of await fs.readdir(path.join(root,'src/content/blog'))){
  if(!filename.endsWith('.md'))continue;
  const source=await fs.readFile(path.join(root,'src/content/blog',filename),'utf8');
  const front=source.split('---')[1]||'';
  if(!/^socialImage:/m.test(front))continue;
  const raw=front.match(/^title:\s*(.+)$/m)?.[1];if(!raw)throw new Error(`Missing title: ${filename}`);
  const title=raw[0]==='"'?JSON.parse(raw):raw[0]==="'"?raw.slice(1,-1).replaceAll("''","'"):raw;
  cards.push({slug:filename.replace(/\.md$/,''),title});
 }
}else if(option('--title')&&option('--out'))cards.push({title:option('--title'),slug:'custom',out:option('--out')});
else {console.log('Usage: npm run social-image -- --all\nOr: npm run social-image -- --title "Post title" --out public/images/social/name-v1.jpg');process.exit(args.includes('--help')?0:1);}
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
const results=[];
try{
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 for(const card of cards){
  const vars={...assets,CLASS:card.default?'default':'article',MASTHEAD:card.default?'Words, work & whatever else.':'Gav Elliott',EDITION:card.default?'The personal edition':'From the writing',EYEBROW:card.default?'Alright, I’m Gav.':'By Gavin Elliott',TITLE:card.default?'Gav<br/>Elliott':escape(card.title),INTRO:card.default?'<p class="intro">Designer at Deel. Making apps of my own.<br/>Writing about all of it here.</p>':''};
  const html=template.replace(/\{\{(\w+)\}\}/g,(_,key)=>vars[key]??'');
  await page.setContent(html);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.portrait img').evaluate(img=>img.decode());
  const fit=await page.evaluate(()=>{const heading=document.querySelector('h1'),copy=document.querySelector('.copy');let size=parseFloat(getComputedStyle(heading).fontSize);while(size>40&&(copy.scrollHeight>copy.clientHeight||heading.scrollWidth>heading.clientWidth)){size-=1;heading.style.fontSize=size+'px';}return {size,overflow:copy.scrollHeight>copy.clientHeight||heading.scrollWidth>heading.clientWidth};});
  if(fit.overflow)throw new Error(`Headline overflow: ${card.slug}`);
  const out=card.out||`public/images/social/${card.slug}-newspaper-v1.jpg`;
  await fs.mkdir(path.dirname(path.resolve(root,out)),{recursive:true});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:path.resolve(root,out),type:'jpeg',quality:93});
  results.push({slug:card.slug,title:card.title,url:'/'+out.replace(/^public\//,''),width:1200,height:630,fontSize:fit.size});
 }
 await fs.writeFile(path.join(root,'scripts/social-image/manifest.json'),JSON.stringify(results,null,2)+'\n');
 console.log(`Rendered ${results.length} cards without headline overflow.`);
}finally{await browser.close();}
