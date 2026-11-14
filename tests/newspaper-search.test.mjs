import test from 'node:test';
import assert from 'node:assert/strict';
import { searchWriting } from '../src/components/newspaper/search.mjs';
const posts = [
 {title:'What I said yesterday',description:'A fair point'},
 {title:'Design decisions',description:'Working with AI agents'},
 {title:'Brief an AI coding agent',description:'A practical guide'},
 {title:'Café notes: a designer’s day',description:'People and work'}
];
test('AI matches whole words, with title matches ranked first',()=>assert.deepEqual(searchWriting(posts,'AI'),[posts[2],posts[1]]));
test('query words can appear in a different order',()=>assert.deepEqual(searchWriting(posts,'agent brief'),[posts[2]]));
test('normalises accents, case, apostrophes and punctuation',()=>assert.deepEqual(searchWriting(posts,"CAFE designer's"),[posts[3]]));
test('empty and punctuation-only queries have no matches',()=>{assert.deepEqual(searchWriting(posts,'  '),[]);assert.deepEqual(searchWriting(posts,'?!'),[]);});
test('does not drop matching results beyond a UI batch',()=>assert.equal(searchWriting(Array.from({length:25},()=>posts[2]),'AI').length,25));
