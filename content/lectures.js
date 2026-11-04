/* Lecture cards data */
/* ======================================================= LECTURES: each lesson linked to its part of the CS50P lecture */
const LECTURES={
 0:{yt:'JP7ITIXGpHk',title:'Lecture 0 · Functions, Variables',notes:'https://cs50.harvard.edu/python/2022/notes/0/'},
 1:{yt:'_b6NgY_pMdw',title:'Lecture 1 · Conditionals',notes:'https://cs50.harvard.edu/python/2022/notes/1/'},
 2:{yt:'-7xg8pGcP6w',title:'Lecture 2 · Loops',notes:'https://cs50.harvard.edu/python/2022/notes/2/'},
};
// t = start time in seconds (to be filled in later); s = matching sections of the official notes, in lecture order
const LECT_MAP={
 'w0-intro':{w:0,all:true},
 'w0-print':{w:0,s:['Creating Code with Python','Functions','Bugs','Strings and Parameters','A Small Problem with Quotation Marks'],t:null},
 'w0-vars':{w:0,s:['Improving Your First Python Program','Variables','Comments','Pseudocode'],t:null},
 'w0-str':{w:0,s:['Formatting Strings','More on Strings'],t:null},
 'w0-num':{w:0,s:['Integers or int','Readability Wins','Float Basics','More on Floats'],t:null},
 'w0-func':{w:0,s:['Def','Returning Values'],t:null},
 'w1-intro':{w:1,all:true},
 'w1-if':{w:1,s:['Conditionals','if Statements','Control Flow, elif, and else'],t:null},
 'w1-logic':{w:1,s:['or','and'],t:null},
 'w1-func':{w:1,s:['Modulo','Creating Our Own Parity Function','Pythonic','match'],t:null},
 'w2-intro':{w:2,all:true},
 'w2-while':{w:2,s:['Loops','While Loops'],t:null},
 'w2-for':{w:2,s:['For Loops'],t:null},
 'w2-valid':{w:2,s:['Improving with User Input'],t:null},
 'w2-lists':{w:2,s:['More About Lists','Length'],t:null},
 'w2-dicts':{w:2,s:['Dictionaries'],t:null},
 'w2-nested':{w:2,s:['Mario'],t:null},
};
