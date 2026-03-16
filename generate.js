const fs=require('fs'),path=require('path');
console.log('Building NurseAI Pro...');
const shell=fs.readFileSync('shell.html','utf8');
const data=fs.readFileSync('data.json','utf8');
const drugs=fs.readFileSync('drugs.json','utf8');
try{const d=JSON.parse(data);console.log('  Procedures:',d.procs.reduce((s,c)=>s+(c.items?c.items.length:0),0));}catch(e){console.error('data.json error');process.exit(1);}
try{const dr=JSON.parse(drugs);console.log('  Drugs:',dr.length);}catch(e){console.error('drugs.json error');process.exit(1);}
let out=shell.replace('/*__DATA_PLACEHOLDER__*/',JSON.stringify(JSON.parse(data)));
out=out.replace('var DRUGS=/*__DRUGS_PLACEHOLDER__*/[];','var DRUGS='+JSON.stringify(JSON.parse(drugs))+';');
fs.writeFileSync('index.html',out,'utf8');
console.log('Done: index.html ('+(Buffer.byteLength(out,'utf8')/1024).toFixed(0)+' KB)');
