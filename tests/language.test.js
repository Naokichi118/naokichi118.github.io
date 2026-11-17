const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');
function run(saved = {}, mode = '') {
  const attrs = {}, store = {...saved};
  const options = ['en','ja'].map(language => ({dataset:{language}, attrs:{}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(_,fn){this.click=fn;}}));
  const cards = Array.from({length:3},()=>({setAttribute(k,v){this[k]=v;}}));
  const year = {};
  const document = {body:{setAttribute(k,v){attrs[k]=v;}},documentElement:{},getElementById(){return year;},querySelectorAll(s){return s==='.language-option'?options:s==='.preprint-card'?cards:[];}};
  const storage = {getItem(k){if(mode==='get')throw Error('blocked');return store[k]??null;},setItem(k,v){if(mode==='set'||mode==='first-write'&&k==='preferred-language')throw Error('quota');store[k]=v;}};
  const context = {document,Date};
  Object.defineProperty(context,'localStorage',{get(){if(mode==='property')throw Error('denied');return storage;}});
  vm.runInNewContext(source,context);
  assert.deepEqual(cards.map(x=>x['data-order']),['3','2','1']);
  assert.equal(year.textContent,new Date().getFullYear());
  return {attrs,store,options,document};
}
for(const [saved,expected] of [[{},'en'],[{language:'ja'},'ja'],[{'preferred-language':'ja'},'ja'],[{language:'en','preferred-language':'ja'},'en'],[{language:'ja','preferred-language':'en'},'ja'],[{language:'bad','preferred-language':'ja'},'ja'],[{language:'bad','preferred-language':'bad'},'en']]) {
  const x=run(saved);assert.equal(x.attrs['data-lang'],expected);
  x.options[1].click();assert.equal(x.attrs['data-lang'],'ja');assert.equal(x.document.documentElement.lang,'ja');assert.equal(x.options[1].attrs['aria-pressed'],'true');
  assert.equal(x.store.language,'ja');assert.equal(x.store['preferred-language'],'ja');assert.equal(run(x.store).attrs['data-lang'],'ja');
  x.options[0].click();assert.equal(x.attrs['data-lang'],'en');
}
for(const mode of ['get','set','property','first-write']) {const x=run({},mode);assert.equal(x.attrs['data-lang'],'en');x.options[1].click();assert.equal(x.attrs['data-lang'],'ja');x.options[0].click();assert.equal(x.attrs['data-lang'],'en');}
console.log('Language tests passed: valid/invalid values, legacy keys, persistence, blocked storage, numbering.');
