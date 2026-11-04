/* Helpers used by exercise tests */
/* ======================================================= runner data */
// test helpers
// tests ignore the lines where the program asked for input (prompt + typed value), so only the program's own prints are compared
const lastLines=(out,n)=>{const ls=norm(out.replace(/[^\n\u2063]*\u2063[^\u2063]*\u2063\n?/g,'')).split('\n');return ls.slice(-n).join('\n')};
function cleanOut(out){ // remove echoed input values
  return out.split(INP).filter((_,i)=>i%2===0).join('')}
const T=(inp,exp,label)=>({inp,exp,label});
/* ======================================================= WEEK 2 DATA */
const py=String.raw;
