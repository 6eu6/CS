/* Editor factory: tooltips, line operations, makeCM */
/* hover tooltip */
let tipEl=null,tipT=null;
function hoverSetup(cm){const w=cm.getWrapperElement();
  w.addEventListener('mousemove',e=>{clearTimeout(tipT);tipT=setTimeout(()=>{const pos=cm.coordsChar({left:e.clientX,top:e.clientY},'window');const tok=cm.getTokenAt(CodeMirror.Pos(pos.line,pos.ch+1));
    const s=tok.string;const line=cm.getLine(pos.line);const isMethod=line[tok.start-1]==='.';let html=null;
    if(/^\w+$/.test(s)){if(DOC[s]&&(isMethod||!Object.values(METHODS).some(a=>a.includes(s))||['open','sorted','len','count','index','pop','copy'].includes(s)))html=`<div class="ds">${esc(DOC[s][0])}</div>${esc(DOC[s][1])}`;else if(KWDOC[s]&&/keyword|atom|builtin/.test(tok.type||''))html=`<div class="ds">keyword ${esc(s)}</div>${esc(KWDOC[s])}`}
    if(!html){hideTip();return}if(!tipEl){tipEl=document.createElement('div');tipEl.className='cm-docbox';document.body.appendChild(tipEl)}
    tipEl.innerHTML=html;tipEl.style.display='block';const w2=Math.min(300,window.innerWidth-24);tipEl.style.width=w2+'px';tipEl.style.left=Math.min(e.clientX+10,window.innerWidth-w2-8)+'px';tipEl.style.top=(e.clientY+18+window.scrollY)+'px'},350)});
  w.addEventListener('mouseleave',()=>{clearTimeout(tipT);hideTip()})}
function hideTip(){if(tipEl)tipEl.style.display='none'}

/* line helpers */
function moveLine(cm,dir){const c=cm.getCursor(),l=c.line,t=l+dir;if(t<0||t>=cm.lineCount())return;const a=cm.getLine(l),b=cm.getLine(t);cm.operation(()=>{cm.replaceRange(b,CodeMirror.Pos(l,0),CodeMirror.Pos(l,a.length));cm.replaceRange(a,CodeMirror.Pos(t,0),CodeMirror.Pos(t,b.length));cm.setCursor(CodeMirror.Pos(t,c.ch))})}
function dupLine(cm){const c=cm.getCursor(),a=cm.getLine(c.line);cm.replaceRange('\n'+a,CodeMirror.Pos(c.line,a.length));cm.setCursor(CodeMirror.Pos(c.line+1,c.ch))}
function autoDedent(cm){const c=cm.getCursor(),L=cm.getLine(c.line);const m=/^(\s*)(else|elif\b.*|except\b.*|finally)\s*:$/.exec(L);if(!m)return;const ind=m[1].length;
  for(let i=c.line-1;i>=0;i--){const P=cm.getLine(i);if(!P.trim())continue;const pi=/^\s*/.exec(P)[0].length;if(pi<ind&&!/^\s*(if|elif|for|while|try|except|else)\b/.test(P))return;
    if(pi<=ind&&/^\s*(if|elif|try|except|for|while)\b/.test(P)){if(pi===ind)return;cm.replaceRange(' '.repeat(pi),CodeMirror.Pos(c.line,0),CodeMirror.Pos(c.line,ind));return}}}

function makeCM(host,run,onChange){
  const cm=CodeMirror(host,{value:'',mode:'python',lineNumbers:true,indentUnit:4,tabSize:4,indentWithTabs:false,smartIndent:true,matchBrackets:true,autoCloseBrackets:true,styleActiveLine:true,viewportMargin:Infinity,lineWrapping:false,
    extraKeys:{Tab:c=>{if(c.state.completionActive)return CodeMirror.Pass;if(c.somethingSelected())c.indentSelection('add');else c.replaceSelection('    ','end')},'Shift-Tab':c=>c.indentSelection('subtract'),
      'Ctrl-/':'toggleComment','Cmd-/':'toggleComment','Ctrl-Enter':()=>run(),'Cmd-Enter':()=>run(),'Ctrl-Space':c=>c.showHint({hint:pyHint,completeSingle:false}),
      'Alt-Up':c=>moveLine(c,-1),'Alt-Down':c=>moveLine(c,1),'Shift-Alt-Down':dupLine,'Shift-Alt-Up':dupLine,
      Backspace:c=>{if(c.somethingSelected())return CodeMirror.Pass;const p=c.getCursor(),b=c.getLine(p.line).slice(0,p.ch);if(b.length&&/^ +$/.test(b)){const n=((b.length-1)%4)+1;c.replaceRange('',CodeMirror.Pos(p.line,p.ch-n),p);return}return CodeMirror.Pass}}});
  cm.on('inputRead',(c,ch)=>{const t=ch.text.join('');if(c.getMode().name!=='python')return;if(t===':')autoDedent(c);
    if(/^[A-Za-z_.]$/.test(t)&&!c.state.completionActive)c.showHint({hint:pyHint,completeSingle:false,closeCharacters:/[\s()\[\]{};:>,=+\-*\/"']/})});
  hoverSetup(cm);if(onChange)cm.on('change',onChange);return cm}
