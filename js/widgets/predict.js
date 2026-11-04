/* Predict-the-output widget */
function mountPredict(el){const items=PRED[el.dataset.predict];if(!items)return;let done=0,right=0;const need=Math.ceil(items.length*0.8);const key='pred-'+el.dataset.predict;
  el.innerHTML=`<div class="widget-h"><b>Predict the output</b><span class="row" style="gap:6px"><span class="badge">${items.length} snippets · ${need} right to pass</span><span class="badge pass" data-pb ${prog.ex[key]?'':'hidden'}>Passed</span></span></div><p class="engine">Read the code, type exactly what you think it prints (one line per printed line), then press Reveal. Only your first reveal counts. Outputs were recorded from real Python.</p>`;
  items.forEach((it,i)=>{const d=document.createElement('div');d.className='pq';
    d.innerHTML=`<b>${i+1}.</b><pre><code>${hlPy(it.c)}</code></pre><label class="lbl" for="pr-${el.dataset.predict}-${i}">Your prediction</label><textarea id="pr-${el.dataset.predict}-${i}" rows="${Math.min(6,Math.max(1,it.out.split('\n').length))}" spellcheck="false" autocapitalize="off"></textarea><div class="row"><button class="btn sm pri">Reveal</button></div><div class="pres"></div>`;
    const btn=d.querySelector('button'),ta=d.querySelector('textarea'),res=d.querySelector('.pres');
    btn.onclick=()=>{const nm=s=>s.replace(/\r/g,'').split('\n').map(x=>x.replace(/\s+$/,'')).join('\n').replace(/\n+$/,'').trim();
      const ok=nm(ta.value)===nm(it.out);if(!btn.dataset.d){done++;if(ok)right++;btn.dataset.d=1}
      res.innerHTML=`<div class="result ${ok?'pass':'fail'}">${ok?'✓ Exactly right.':'Not quite. Real output:'}</div>${ok?'':`<pre class="out">${esc(it.out)||'(nothing)'}</pre>`}<p class="engine">${esc(it.e)}</p>`;
      if(done===items.length){let s=el.querySelector('.pscore');if(!s){s=document.createElement('div');s.className='result pscore';el.appendChild(s)}const pass=right>=need;
        s.className='result pscore '+(pass?'pass':'hint');s.innerHTML=`First-try score: ${right} of ${items.length}. ${pass?'Passed.':`You need ${need}. Study the ones you missed, then try again.`} <button class="btn sm" data-redo>Try again</button>`;
        s.querySelector('[data-redo]').onclick=()=>mountPredict(el);if(pass){passEx(key);el.querySelector('[data-pb]').hidden=false}}};
    el.appendChild(d)})}
