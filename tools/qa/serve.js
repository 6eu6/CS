// Shared helper: serve the repo as a static site (like Vercel) and open it in Chromium with
// offline-safe routing (Skulpt/CodeMirror come from tools/vendor, everything else external is blocked).
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const ROOT=path.resolve(__dirname,'../..'),V=ROOT+'/vendor/';
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.py':'text/plain; charset=utf-8'};
const cm={};(function w(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);fs.statSync(p).isDirectory()?w(p):cm[f.replace('.min','')]=p}})(V+'codemirror');
function server(){return new Promise(res=>{const s=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const p=path.join(ROOT,u);
  if(p.startsWith(ROOT)&&fs.existsSync(p)&&fs.statSync(p).isFile()){r.writeHead(200,{'content-type':MIME[path.extname(p)]||'application/octet-stream'});r.end(fs.readFileSync(p))}else{r.writeHead(404);r.end('404')}}).listen(0,()=>res(s))})}
async function open(vp={width:1280,height:800},{theme}={}){const srv=await server();const port=srv.address().port;const browser=await chromium.launch();const ctx=await browser.newContext({viewport:vp});const pg=await ctx.newPage();
  pg.errs=[];pg.on('pageerror',e=>pg.errs.push(String(e)));pg.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))pg.errs.push('console: '+m.text())});
  await pg.route('**/*',async r=>{const u=r.request().url();
    if(u.startsWith('http://127.0.0.1'))return r.continue();
    if(u.includes('skulpt'))return r.fulfill({body:fs.readFileSync(V+(u.includes('stdlib')?'skulpt/skulpt-stdlib.js':'skulpt/skulpt.min.js')),contentType:'application/javascript'});
    if(/codemirror/.test(u)){const n=u.split('/').pop().replace('.min','');if(cm[n])return r.fulfill({body:fs.readFileSync(cm[n]),contentType:u.endsWith('.css')?'text/css':'application/javascript'})}
    if(u.startsWith('http://127.0.0.1'))return r.continue();return r.abort()});
  await pg.goto(`http://127.0.0.1:${port}/`);
  await pg.waitForFunction("window.appReady===true&&CMready&&engine==='ready'",{timeout:60000});
  if(theme)await pg.evaluate(t=>document.documentElement.setAttribute('data-theme',t),theme);
  await pg.evaluate("window.lockOf=()=>null");
  return {pg,close:async()=>{await browser.close();srv.close()},port}}
module.exports={open,ROOT};
