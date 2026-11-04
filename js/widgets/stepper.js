/* Step-through widget */
function mountStepper(el){const d=STEP[el.dataset.stepper];if(!d)return;let i=0;const lines=d.code.split('\n');
  el.innerHTML=`<div class="widget-h"><b>${esc(d.title)}</b><span class="badge">Step-through</span></div>
  <div class="row"><button class="btn" data-p>◀ Back</button><button class="btn pri" data-n>Next step ▶</button><span class="engine" data-c></span></div>
  <div class="tracecode"></div><div class="status"></div>
  <div class="split2"><div class="panel"><h4>Variables</h4><table class="vt"></table></div><div class="panel"><h4>Output</h4><pre style="font-size:.78rem;padding:8px;min-height:3em"></pre></div></div>`;
  const tc=el.querySelector('.tracecode'),st=el.querySelector('.status'),vt=el.querySelector('.vt'),op=el.querySelector('.panel pre');
  function draw(){const s=d.steps[i];tc.innerHTML=lines.map((l,k)=>`<div class="tl ${k+1===s.l?'on':''}"><span class="no">${k+1}</span><span>${hlPy(l)||' '}</span></div>`).join('');
    st.innerHTML=`<b>Line ${s.l}.</b> ${s.n}`;
    let h='';if(s.v){if(s.fr)h+=`<tr><td colspan="2" class="sc">${s.fr==='<module>'?'global (top level)':'inside '+esc(s.fr)+'()'}</td></tr>`;h+=Object.entries(s.v).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')||'<tr><td class="engine">(none yet)</td><td></td></tr>'}
    else{const g=s.g||d.steps.slice(0,i+1).reverse().find(x=>x.g)?.g||{};if(!s.s){h+=`<tr><td colspan="2" class="sc">global</td></tr>`+Object.entries(g).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}
      else s.s.forEach((f,fi)=>{h+=`<tr><td colspan="2" class="sc">inside ${esc(f)}()${fi===s.s.length-1?' ← running':' (paused)'}</td></tr>`+(Object.entries(s.sc[f]||{}).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')||'<tr><td class="engine">(empty)</td><td></td></tr>')})}
    vt.innerHTML=h;op.textContent=s.out||' ';
    el.querySelector('[data-c]').textContent=`Step ${i+1} of ${d.steps.length}`;el.querySelector('[data-p]').disabled=i===0;el.querySelector('[data-n]').disabled=i===d.steps.length-1}
  el.querySelector('[data-n]').onclick=()=>{if(i<d.steps.length-1){i++;draw()}};el.querySelector('[data-p]').onclick=()=>{if(i>0){i--;draw()}};draw()}
