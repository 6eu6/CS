/* CodeMirror loader, CSV mode, file types */
/* ======================================================= EDITOR: VS Code-style (CodeMirror 5) */
const CMV='5.65.16';
const CM_FILES=['mode/python/python','addon/edit/matchbrackets','addon/edit/closebrackets','addon/comment/comment','addon/selection/active-line','addon/hint/show-hint'];
const CM_SOURCES=[
 {base:'vendor/codemirror/',core:'lib/codemirror.min.js',f:p=>p+'.min.js'},
 {base:`https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CMV}/`,core:'codemirror.min.js',f:p=>p+'.min.js'},
 {base:`https://cdn.jsdelivr.net/npm/codemirror@${CMV}/`,core:'lib/codemirror.min.js',f:p=>p+'.min.js'},
];
let CMready=false,CMfailed=false;const cmWaiters=[];
function setEdStatus(){const e=$('#editorStatus');if(e)e.textContent=CMready?'Code editor: ready ✓ (colours, autocomplete, hints)':CMfailed?'Code editor: basic mode (the full editor could not load)':'Code editor: loading…'}
(async()=>{for(const s of CM_SOURCES){try{if(!window.CodeMirror)await loadScript(s.base+s.core);for(const p of CM_FILES)await loadScript(s.base+s.f(p));if(window.CodeMirror&&CodeMirror.modes.python&&CodeMirror.showHint){defineCsvMode();CMready=true;break}}catch(e){}}
  if(!CMready)CMfailed=true;setEdStatus();cmWaiters.splice(0).forEach(f=>f());upgradeIn($('.lesson.on'))})();

function defineCsvMode(){CodeMirror.defineMode('csv',()=>({startState:()=>({col:0,q:false,row:0}),copyState:s=>({...s}),
  token(s,st){if(s.sol()){if(!st.q){st.col=0;st.row++}}const cls=()=>'csvc'+(st.col%6)+(st.row===1?' strong':'');
    if(st.q){while(!s.eol()){const c=s.next();if(c==='"'){if(s.peek()==='"')s.next();else{st.q=false;break}}}return cls()}
    const c=s.peek();if(c===','){s.next();st.col++;return 'csvsep'}if(c==='"'){s.next();st.q=true;return cls()}
    s.eatWhile(ch=>ch!==','&&ch!=='"');return cls()},blankLine(st){if(!st.q){st.row++;st.col=0}}}))}
function langOf(n){const e=(n.split('.').pop()||'').toLowerCase();
  if(e==='py')return{mode:'python',label:'Python',tag:'py'};if(e==='csv')return{mode:'csv',label:'CSV',tag:'csv'};
  if(e==='json')return{mode:null,label:'JSON',tag:'json'};if(e==='md')return{mode:null,label:'Markdown',tag:'md'};return{mode:null,label:'Plain Text',tag:'txt'}}
