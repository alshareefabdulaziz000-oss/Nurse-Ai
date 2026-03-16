#!/usr/bin/env node
const fs=require('fs'),path=require('path');
const SRC=path.join(__dirname,'src'),DIST=path.join(__dirname,'dist');
console.log('📦 NurseAI Pro — Building...');
const shell=fs.readFileSync(path.join(SRC,'shell.html'),'utf8');
const data=fs.readFileSync(path.join(SRC,'data.json'),'utf8');
const drugs=fs.readFileSync(path.join(SRC,'drugs.json'),'utf8');
try{
  const d=JSON.parse(data);
  const tp=d.procs.reduce((s,c)=>s+(c.items?c.items.length:0),0);
  console.log(`  ✓ data.json: ${d.procs.length} categories, ${tp} procedures`);
}catch(e){console.error('  ✗ data.json:',e.message);process.exit(1);}
try{
  const dr=JSON.parse(drugs);
  console.log(`  ✓ drugs.json: ${dr.length} medications`);
}catch(e){console.error('  ✗ drugs.json:',e.message);process.exit(1);}
const dm=JSON.stringify(JSON.parse(data));
const drm=JSON.stringify(JSON.parse(drugs));
let out=shell.replace('/*__DATA_PLACEHOLDER__*/',dm);
out=out.replace('var DRUGS=/*__DRUGS_PLACEHOLDER__*/[];','var DRUGS='+drm+';');
if(out.includes('__DATA_PLACEHOLDER__')||out.includes('__DRUGS_PLACEHOLDER__')){
  console.error('  ✗ Placeholders not replaced!');process.exit(1);
}
if(!fs.existsSync(DIST))fs.mkdirSync(DIST,{recursive:true});
fs.writeFileSync(path.join(DIST,'index.html'),out,'utf8');
console.log(`\n✅ Built: dist/index.html (${(Buffer.byteLength(out,'utf8')/1024).toFixed(1)} KB)`);
