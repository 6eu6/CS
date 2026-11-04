/* print playground, string lab, operator lab, lab filter */
/* ======================================================= custom widgets */
// print playground
function vis(s){return s.replace(/ /g,'·').replace(/\n/g,'⏎\n')}
function unesc(s){return s.replace(/\\n/g,'\n').replace(/\\t/g,'\t')}
function drawPP(){const args=$('#ppArgs').value.split('\n').filter(x=>x!=='');const sep=$('#ppSep').value,end=$('#ppEnd').value;
  const pyStr=s=>'"'+s.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
  const parts=args.map(pyStr);if(sep!==' ')parts.push('sep='+pyStr(sep).replace(/\\\\n/g,'\\n'));if(end!=='\\n')parts.push('end='+pyStr(end).replace(/\\\\n/g,'\\n'));
  $('#ppCode').innerHTML=hlPy(`print(${parts.join(', ')})\nprint("next print starts here")`);
  $('#ppOut').textContent=vis(args.join(unesc(sep))+unesc(end)+'next print starts here\n')}
['ppArgs','ppSep','ppEnd'].forEach(i=>$('#'+i).addEventListener('input',drawPP));drawPP();

// string method lab
function pyR(s){return "'"+s.replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'"}
function titleCase(s){return s.toLowerCase().replace(/(^|[^a-zA-Z])([a-z])/g,(m,a,b)=>a+b.toUpperCase())}
function drawSL(){const s=$('#slIn').value;const st=s.trim();
  const rows=[['text',pyR(s),'the original (never changes)'],['text.strip()',pyR(st),'spaces removed from both ends'],['text.lower()',pyR(s.toLowerCase()),''],['text.upper()',pyR(s.toUpperCase()),''],['text.title()',pyR(titleCase(s)),'first letter of every word'],['text.capitalize()',pyR(s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()),s[0]===' '?'first character is a space, so nothing is capitalised':'only the first character'],['text.strip().title()',pyR(titleCase(st)),'chaining: strip, then title'],['text.replace(" ", "_")',pyR(s.split(' ').join('_')),'every space replaced'],['text.split()',`[${st.split(/\s+/).filter(Boolean).map(pyR).join(', ')}]`,'a list of words'],['len(text)',String(s.length),'number of characters, spaces included'],['text[0]',s?pyR(s[0]):'IndexError','first character'],['text[-1]',s?pyR(s[s.length-1]):'IndexError','last character']];
  $('#slTable').innerHTML='<tr><th>Code</th><th>Result</th><th>Note</th></tr>'+rows.map(r=>`<tr><td><code>${esc(r[0])}</code></td><td><code>${esc(r[1])}</code></td><td class="engine">${esc(r[2])}</td></tr>`).join('')}
$('#slIn').addEventListener('input',drawSL);drawSL();

// operator lab
function pyNum(x,isFloat){if(!isFinite(x))return 'ZeroDivisionError';if(isFloat){let s=String(x);if(!/[.e]/.test(s))s+='.0';return s}return String(x)}
function drawOp(){const a=parseFloat($('#opA').value),b=parseFloat($('#opB').value);if(isNaN(a)||isNaN(b)){$('#opTable').innerHTML='';return}
  const fl=!Number.isInteger(a)||!Number.isInteger(b)||String($('#opA').value).includes('.')||String($('#opB').value).includes('.');
  const fd=b===0?Infinity:Math.floor(a/b);const md=b===0?Infinity:a-b*Math.floor(a/b);
  const rows=[['+','add',pyNum(a+b,fl)],['-','subtract',pyNum(a-b,fl)],['*','multiply',pyNum(+(a*b).toPrecision(12),fl)],['/','divide: always gives a float',pyNum(b===0?Infinity:+(a/b).toPrecision(15),true)],['//','floor division: how many whole times b fits (rounds down)',pyNum(fd,fl)],['%','modulo: the remainder after //',pyNum(+md.toPrecision(12),fl)],['**','power: a to the power b',pyNum(+(a**b).toPrecision(15),fl)]];
  const A=$('#opA').value,B=$('#opB').value;
  $('#opTable').innerHTML='<tr><th>Code</th><th>Result</th><th>Meaning</th></tr>'+rows.map(r=>`<tr><td><code>${esc(A)} ${r[0]} ${esc(B)}</code></td><td><code>${esc(r[2])}</code></td><td class="engine">${r[1]}</td></tr>`).join('')+
   (b!==0&&Number.isInteger(a)&&Number.isInteger(b)?`<tr><td colspan="3" class="engine">Check: ${esc(B)} × ${pyNum(fd)} + ${pyNum(md)} = ${b*fd+md}. That's what // and % always satisfy.</td></tr>`:'')}
['opA','opB'].forEach(i=>$('#'+i).addEventListener('input',drawOp));drawOp();

// lab filter
$$('.lab-filter').forEach(bar=>{const grid=bar.closest('.lesson').querySelector('.ex-grid');bar.onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;bar.querySelectorAll('.btn').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;
  grid.querySelectorAll('[data-runner]').forEach(w=>{w.hidden=!(f==='all'||(f==='todo'?!prog.ex[w.dataset.runner]:w.dataset.lvl===f))})}});
