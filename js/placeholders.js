/* Shared texts (@FULL etc.) and placeholder resolution */
/* ======================================================= shared texts & placeholder resolution */
const GETTYS=document.getElementById('f-gettysburg').textContent;
const FULL=document.getElementById('c-full').textContent;
const SOLFROM={
 top5:()=>FULL.replace('reverse=True):','reverse=True)[:5]:'),
 clean:()=>FULL.replace('lowercase_words = [word.lower() for word in words]','lowercase_words = [word.lower().strip(".,;:!?-") for word in words]\n    lowercase_words = [w for w in lowercase_words if w != ""]'),
};
Object.entries(R).forEach(([id,d])=>{
  if(d.files)Object.keys(d.files).forEach(k=>{if(d.files[k]==='@GETTYS')d.files[k]=GETTYS});
  if(d.code==='@FULL')d.code=FULL;
  if(d.solFrom)d.sol=SOLFROM[d.solFrom]();
  if(d.tests&&typeof SOLEXP!=='undefined'&&SOLEXP[id])d.tests.forEach((t,i)=>{if(t.exp==='@sol')t.exp=SOLEXP[id][i]});
});
Object.values(ANAT).forEach(a=>{if(a.code==='@FULL')a.code=FULL.replace(/\n+$/,'')});
