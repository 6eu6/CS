/* Anatomy explorer widget */
/* ======================================================= anatomy explorer */
function tokenize(line){const out=[];const m=/^ */.exec(line)[0];if(m.length)out.push({t:m,k:'indent'});let rest=line.slice(m.length);
  const re=/(#.*$)|([fFrR]?"(?:[^"\\]|\\.)*"|[fFrR]?'(?:[^'\\]|\\.)*')|(\d+(?:\.\d+)?)|([A-Za-z_]\w*)|(==|!=|<=|>=|\+=|-=|\*=|\/\/|\*\*|[()\[\]{}:,.=+\-*\/%<>])|(\s+)/y;
  let mm;while(rest.length&&(mm=re.exec(rest))){const s=mm[0];let k=mm[1]?'com':mm[2]?'str':mm[3]?'num':mm[4]?'id':mm[5]?'op':'sp';out.push({t:s,k});rest=rest.slice(s.length);re.lastIndex=0}
  if(rest.length)out.push({t:rest,k:'op'});return out}
function mountAnat(el){const a=ANAT[el.dataset.anat];if(!a)return;const lines=a.code.split('\n');const toks=[];
  let h='<div class="anat-code">';lines.forEach((ln,li)=>{h+=`<div class="al"><span class="no">${li+1}</span>`;const occ={};
    tokenize(ln).forEach(tk=>{if(tk.k==='sp'){h+=`<span class="tsp">${tk.t}</span>`;return}occ[tk.t]=(occ[tk.t]||0)+1;const i=toks.length;toks.push({...tk,line:li+1,occ:occ[tk.t]});
      const cls=tk.k==='str'?'ts':tk.k==='num'?'tn':tk.k==='com'?'tc':(tk.k==='id'&&KW.has(tk.t))?'tk':(tk.k==='id'&&BI.has(tk.t))?'tb':'';
      h+=`<button class="tok ${cls} ${tk.k==='indent'?'ws':''}" data-i="${i}" aria-label="${esc(tk.k==='indent'?tk.t.length+' spaces':tk.t)}">${esc(tk.t)}</button>`});h+='</div>'});
  h+='</div><div class="row"><button class="btn" data-p>◀ Previous</button><button class="btn pri" data-n>Next ▶</button><span class="engine" data-c></span></div><div class="tokcard" aria-live="polite"></div>';
  el.innerHTML=`<div class="widget-h"><b>Every token explained</b><span class="badge">Tap any piece</span></div>`+h;
  const card=el.querySelector('.tokcard');let cur=0;
  function explain(tk){const L=tk.line,t=tk.t;
    if(tk.k==='indent'){const o=a.ex[`${L}:indent`];const lvl=t.length/4;return o||['indentation',`${t.length} spaces = indentation level ${lvl}. This line belongs to the block ${lvl===1?'opened by the line above with a colon':'nested '+lvl+' levels deep'}. Python uses indentation, not brackets, to decide which lines are inside a loop, if or function.`]}
    const o=a.ex[`${L}:${t}#${tk.occ}`]||a.ex[`${L}:${t}`];if(o)return o;
    if(GLOSS[t])return GLOSS[t];
    if(tk.k==='str')return['string',/^f/i.test(t)?'An f-string: text where anything inside { } is replaced by its value.':'Text. The quotes mark where it starts and ends; they aren\'t part of the text.'];
    if(tk.k==='num')return['number',t.includes('.')?'A float (decimal number).':'An int (whole number).'];
    if(tk.k==='com')return['comment','Ignored by Python. A note for humans.'];
    if(tk.k==='id')return['name','A name chosen by the programmer: a variable, parameter or function. Python doesn\'t care what it\'s called, as long as it\'s spelled the same everywhere.'];
    return['symbol','Punctuation that is part of Python\'s syntax.']}
  function show(i){cur=i;const tk=toks[i];const[tag,body]=explain(tk);
    el.querySelectorAll('.tok').forEach(b=>b.classList.toggle('on',+b.dataset.i===i));
    card.innerHTML=`<span class="tg">Line ${tk.line} · ${esc(tag)}</span><span class="tt">${esc(tk.k==='indent'?`(${tk.t.length} spaces)`:tk.t)}</span><div>${body}</div>`;
    el.querySelector('[data-c]').textContent=`${i+1} of ${toks.length}`}
  el.querySelector('.anat-code').onclick=e=>{const b=e.target.closest('.tok');if(b)show(+b.dataset.i)};
  el.querySelector('[data-n]').onclick=()=>show(Math.min(toks.length-1,cur+1));el.querySelector('[data-p]').onclick=()=>show(Math.max(0,cur-1));show(0)}
