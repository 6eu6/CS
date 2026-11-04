/* CSV helpers and the file output view */
/* ======================================================= CSV helpers (file output view) */
function parseCSV(t){const rows=[];let row=[],f='',q=false;
  for(let i=0;i<t.length;i++){const c=t[i];
    if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
    else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'){row.push(f);rows.push(row);row=[];f=''}else if(c!=='\r')f+=c}
  if(f!==''||row.length){row.push(f);rows.push(row)}return rows}
function csvTable(text){const rows=parseCSV(text);if(!rows.length)return '<p class="engine" style="padding:8px">(empty file)</p>';
  const w=Math.max(...rows.map(r=>r.length));const cols='ABCDEFGHIJ'.slice(0,w).split('');
  let h='<table><tr><th class="rn"></th>'+cols.map(c=>`<th>${c}</th>`).join('')+'</tr>';
  rows.forEach((r,i)=>{h+=`<tr><td class="rn">${i+1}</td>`+cols.map((_,j)=>`<td${i===0?' style="font-weight:700"':''}>${esc(r[j]??'')}</td>`).join('')+'</tr>'});return h+'</table>'}
function renderFiles(box,before,after){box.innerHTML='';if(!after)return;
  Object.entries(after).forEach(([n,t])=>{const isNew=!(n in before),changed=!isNew&&before[n]!==t;if(!isNew&&!changed)return;
    const v=document.createElement('div');v.className='fileview';const isCsv=/\.csv$/i.test(n);
    v.innerHTML=`<div class="fh"><span>${isNew?'New file':'Changed'}: ${esc(n)}</span>${isCsv?'<button class="btn sm" data-v>Show raw text</button>':''}</div>${isCsv?`<div class="csvtable">${csvTable(t)}</div><pre hidden>${esc(t)||'(empty)'}</pre>`:`<pre>${esc(t)||'(empty)'}</pre>`}`;
    const b=v.querySelector('[data-v]');if(b)b.onclick=()=>{const tb=v.querySelector('.csvtable'),pr=v.querySelector('pre');const raw=pr.hidden;pr.hidden=!raw;tb.hidden=raw;b.textContent=raw?'Show as table':'Show raw text'};
    box.appendChild(v)})}
