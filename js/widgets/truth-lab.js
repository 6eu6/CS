/* Truth lab */
/* ---------------- truth lab (runs in the real engine) */
(function(){const inp=$('#tlIn');if(!inp)return;let t=null;
  async function go(){const v=inp.value.trim();if(!v){$('#tlOut').textContent='';return}
    if(engine!=='ready'){$('#tlOut').textContent=engine==='loading'?'(waiting for the Python engine…)':'(the Python engine is not available)';if(engine==='loading')waiters.push(go);return}
    const code=`v = ${v}\nprint("value:", repr(v))\nprint("bool:", bool(v))\nprint("falsy" if not v else "truthy")`;
    const r=await runPython(code,{},'');$('#tlOut').textContent=r.ok?r.out.replace(/\n$/,''):r.err.replace(/ \(line \d+\)$/,'')}
  inp.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(go,250)});$$('[data-tv]').forEach(b=>b.onclick=()=>{inp.value=b.dataset.tv;go()});go()})();
