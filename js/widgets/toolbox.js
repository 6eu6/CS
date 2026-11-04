/* Toolbox interactive widgets */
/* ======================================================= toolbox widgets */
(function(){
 const P=[["Sara","Ali",31],["omar","Khan",25],["Lina","Ali",25],["zaid","Noor",40]];
 const K={none:null,age:p=>[p[2]],first:p=>[p[0]],firstl:p=>[p[0].toLowerCase()],sur:p=>[p[1],p[0]],agefirst:p=>[p[2],p[0].toLowerCase()],agedesc:p=>[-p[2],p[1]]};
 const N={none:'No key: tuples compare item by item, so it sorts by first name. Capitals (L, S) come before lower case (o, z)!',age:'By age. Omar and Lina tie on 25 and keep their original order: the sort is stable.',first:'Plain string comparison: capitals first.',firstl:'Lower-casing inside the key gives true A–Z order. The names themselves are unchanged.',sur:'By surname, then first name for people with the same surname.',agefirst:'By age, then name (case-insensitive) as a tie-break.',agedesc:'Negating the age sorts it high-to-low while surname stays A–Z.'};
 const cmp=(a,b)=>{for(let i=0;i<a.length;i++){if(a[i]<b[i])return -1;if(a[i]>b[i])return 1}return 0};
 function draw(){const k=$('#sk2').value,rev=$('#sr2').checked;let rows=P.map((p,i)=>[p,i]);const f=K[k]||(p=>[p[0],p[1],p[2]]);
   rows.sort((a,b)=>cmp(f(a[0]),f(b[0]))*(rev?-1:1)||a[1]-b[1]);
   $('#sortOut2').innerHTML='<tr><th>#</th><th>first</th><th>surname</th><th>age</th><th>key value</th></tr>'+rows.map(([p],i)=>`<tr><td>${i+1}</td><td>${esc(p[0])}</td><td>${esc(p[1])}</td><td>${p[2]}</td><td><code>${esc(K[k]?JSON.stringify(K[k](p).length===1?K[k](p)[0]:K[k](p)).replace(/\[/g,'(').replace(/\]/g,')').replace(/"/g,"'"):'(the whole tuple)')}</code></td></tr>`).join('');
   $('#sortNote2').textContent=N[k]+(rev?' reverse=True flips the whole order.':'')}
 $('#sk2').onchange=draw;$('#sr2').onchange=draw;draw();
 let ft=null;async function fmt(){const v=$('#fmV').value.trim(),s=$('#fmS').value;const isNum=/^-?\d+(\.\d+)?$/.test(v);const lit=isNum?v:JSON.stringify(v);
   const code=`value = ${lit}\nprint(f"[{value:${s}}]")`;$('#fmCode').innerHTML=hlPy(code);
   if(engine!=='ready'){$('#fmOut').textContent=engine==='loading'?'(waiting for the Python engine…)':'(the Python engine is not available)';if(engine==='loading')waiters.push(fmt);return}
   const r=await runPython(code,{},'');$('#fmOut').textContent=r.ok?r.out.replace(/\n$/,''):r.err.replace(/ \(line \d+\)$/,'')}
 const q=()=>{clearTimeout(ft);ft=setTimeout(fmt,250)};$('#fmV').addEventListener('input',q);$('#fmS').addEventListener('input',q);
 $$('[data-fs]').forEach(b=>b.onclick=()=>{$('#fmS').value=b.dataset.fs;fmt()});fmt();
})();
