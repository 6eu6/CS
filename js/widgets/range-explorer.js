/* range() explorer */
/* ======================================================= week 2 widgets */
(function(){
 const rg=()=>{const a=parseInt($('#rgA').value),b=parseInt($('#rgB').value),c=parseInt($('#rgC').value);
  $('#rgCode').innerHTML=hlPy(`for i in range(${isNaN(a)?'':a}, ${isNaN(b)?'':b}, ${isNaN(c)?'':c}):\n    print(i)`);
  if([a,b,c].some(isNaN)){$('#rgOut').innerHTML='';$('#rgNote').textContent='Fill in all three numbers.';return}
  if(c===0){$('#rgOut').innerHTML='';$('#rgNote').textContent='ValueError: range() arg 3 must not be zero.';return}
  const v=[];for(let i=a;c>0?i<b:i>b;i+=c){v.push(i);if(v.length>200)break}
  $('#rgOut').innerHTML=v.length?v.map(x=>`<span class="chip">${x}</span>`).join(''):'<span class="engine">(no numbers: zero iterations)</span>';
  $('#rgNote').textContent=v.length?`${v.length} iteration${v.length>1?'s':''}. ${b} itself is never included.`+(c<0?' Negative step: counts down, so start must be bigger than stop.':''):(c>0&&a>=b?'With a positive step, start must be smaller than stop.':c<0&&a<=b?'With a negative step, start must be bigger than stop.':'')};
 ['rgA','rgB','rgC'].forEach(i=>$('#'+i).addEventListener('input',rg));rg();

 const START=['milk','eggs','bread'];let L=[...START];const log=[];
 const drawL=()=>{$('#llView').innerHTML=L.map((x,i)=>`<span class="chip"><span class="engine">${i}</span> ${esc(x)}</span>`).join('')||'<span class="engine">[] empty</span>';$('#llLog').innerHTML=hlPy((log.length?log.join('\n'):'items = ["milk", "eggs", "bread"]')+`\nprint(items)   # ${'['+L.map(x=>`'${x}'`).join(', ')+']'}`)};
 $$('[data-ll]').forEach(b=>b.onclick=()=>{const v=$('#llVal').value||'tea',op=b.dataset.ll;
  if(op==='reset'){L=[...START];log.length=0}
  else if(op==='append'){L.push(v);log.push(`items.append("${v}")`)}
  else if(op==='insert'){L.unshift(v);log.push(`items.insert(0, "${v}")`)}
  else if(op==='remove'){const i=L.indexOf(v);if(i<0)log.push(`items.remove("${v}")   # ValueError: "${v}" is not in the list`);else{L.splice(i,1);log.push(`items.remove("${v}")`)}}
  else if(op==='pop'){if(!L.length)log.push('items.pop()   # IndexError: pop from empty list');else{const x=L.pop();log.push(`items.pop()   # gave back '${x}'`)}}
  else if(op==='set'){if(L.length<2)log.push(`items[1] = "${v}"   # IndexError`);else{L[1]=v;log.push(`items[1] = "${v}"`)}}
  else if(op==='sort'){L.sort();log.push('items.sort()')}
  if(log.length>8)log.shift();drawL()});drawL();

 const P={rect:{code:n=>`for row in range(${n}):\n    for col in range(${n}):\n        print("#", end="")\n    print()`,cell:(r,c,n)=>'#',len:(r,n)=>n,note:'Every row is the same length: the inner loop doesn\'t depend on row.'},
  tri:{code:n=>`for row in range(1, ${n} + 1):\n    for col in range(row):\n        print("#", end="")\n    print()`,cell:()=>'#',len:(r)=>r+1,note:'The inner loop runs row times: its length depends on the outer variable.'},
  rtri:{code:n=>`for row in range(1, ${n} + 1):\n    print(" " * (${n} - row), end="")\n    for col in range(row):\n        print("#", end="")\n    print()`,cell:()=>'#',len:(r)=>r+1,pad:(r,n)=>n-r-1,note:'Before the hashes, print n − row spaces. Spaces are characters too.'},
  check:{code:n=>`for row in range(${n}):\n    for col in range(${n}):\n        if (row + col) % 2 == 0:\n            print("#", end="")\n        else:\n            print(".", end="")\n    print()`,cell:(r,c)=>(r+c)%2===0?'#':'.',len:(r,n)=>n,note:'Use both row and col: (row + col) % 2 alternates in both directions.'},
  hollow:{code:n=>`for row in range(${n}):\n    for col in range(${n}):\n        if row in (0, ${n} - 1) or col in (0, ${n} - 1):\n            print("#", end="")\n        else:\n            print(" ", end="")\n    print()`,cell:(r,c,n)=>(r===0||r===n-1||c===0||c===n-1)?'#':' ',len:(r,n)=>n,note:'Only the edges: first/last row or first/last column.'}};
 const drawP=()=>{const s=P[$('#ptShape').value];let n=Math.max(1,Math.min(12,parseInt($('#ptN').value)||1));
  $('#ptCode').innerHTML=hlPy(s.code(n));let out='';for(let r=0;r<n;r++){if(s.pad)out+=' '.repeat(s.pad(r,n));for(let c=0;c<s.len(r,n);c++)out+=s.cell(r,c,n);out+='\n'}
  $('#ptOut').textContent=out;$('#ptNote').textContent=s.note};
 $('#ptShape').onchange=drawP;$('#ptN').addEventListener('input',drawP);drawP();
})();
