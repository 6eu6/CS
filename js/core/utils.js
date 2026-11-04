/* Helpers: $, esc, localStorage wrapper, Python syntax highlighter */
/* ======================================================= utilities */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const norm=s=>(s||'').replace(/\r/g,'').replace(/[ \t]+$/gm,'').replace(/^\n+|\n+$/g,'');
const KW=new Set('def return with as for in if elif else while import from lambda True False None and or not class try except finally pass break continue is del raise global yield'.split(' '));
const BI=new Set('print open len sorted range str int float list dict max min sum input type isinstance enumerate zip round abs set tuple'.split(' '));
function hlPy(src){
  let o='',i=0,n=src.length,prev='';const isId=c=>/[A-Za-z0-9_]/.test(c||'');
  while(i<n){const c=src[i];
    if(c==='#'){let j=src.indexOf('\n',i);if(j<0)j=n;o+=`<span class="tc">${esc(src.slice(i,j))}</span>`;i=j;continue}
    let pre='',k=i;
    if(/[fFrRbB]/.test(c)&&!isId(src[i-1])){const m=/^[fFrRbB]{1,2}(?=["'])/.exec(src.slice(i,i+3));if(m){pre=m[0];k=i+pre.length}}
    if((src[k]==='"'||src[k]==="'")&&(pre||!isId(src[i-1]))){
      const q=src.startsWith(src[k].repeat(3),k)?src[k].repeat(3):src[k];let j=k+q.length;
      while(j<n&&!src.startsWith(q,j)){if(src[j]==='\\')j++;if(q.length===1&&src[j]==='\n')break;j++}
      j=Math.min(n,j+q.length);const s=src.slice(i,j);
      o+=/f/i.test(pre)?`<span class="ts">${esc(s).replace(/\{([^}]*)\}/g,'</span><span class="tx">{$1}</span><span class="ts">')}</span>`:`<span class="ts">${esc(s)}</span>`;
      i=j;prev='str';continue}
    if(/[0-9]/.test(c)&&!isId(src[i-1])){const m=/^\d+(\.\d+)?/.exec(src.slice(i));o+=`<span class="tn">${m[0]}</span>`;i+=m[0].length;continue}
    if(/[A-Za-z_]/.test(c)){const m=/^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i))[0];
      o+=KW.has(m)?`<span class="tk">${m}</span>`:prev==='def'?`<span class="tf">${m}</span>`:(BI.has(m)&&src[i-1]!=='.')?`<span class="tb">${m}</span>`:m;
      prev=m;i+=m.length;continue}
    o+=esc(c);if(!/\s/.test(c))prev=c;i++}
  return o}
