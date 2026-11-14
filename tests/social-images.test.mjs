import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const cards=JSON.parse(await readFile('scripts/social-image/manifest.json','utf8'));
test('social cards are valid JPEGs with matching production metadata',async()=>{
 assert.equal(cards.length,11);
 for(const card of cards){
  const image=await readFile('public'+card.url);
  assert.equal(image.readUInt16BE(0),0xffd8);
  let offset=2,dimensions;
  while(offset<image.length){
   const marker=image.readUInt16BE(offset);offset+=2;
   const length=image.readUInt16BE(offset);
   if([0xffc0,0xffc2].includes(marker)){dimensions=[image.readUInt16BE(offset+5),image.readUInt16BE(offset+3)];break;}
   offset+=length;
  }
  assert.deepEqual(dimensions,[1200,630],card.slug);
  const html=await readFile(card.slug==='default'?'dist/index.html':`dist/blog/${card.slug}/index.html`,'utf8');
  for(const tag of ['property="og:image"','name="twitter:image"'])assert.ok(html.includes(`${tag} content="https://gavinelliott.co.uk${card.url}"`),card.slug);
  assert.ok(html.includes('property="og:image:width" content="1200"'));
  assert.ok(html.includes('property="og:image:alt"'));
 }
});
