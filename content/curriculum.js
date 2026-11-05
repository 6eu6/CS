/* Weeks (titles + blurbs). Lesson ORDER lives in content/manifest.json */
/* ======================================================= weeks & navigation */
const WEEKS=[
 {n:0,t:'Functions, Variables',built:true,blurb:'print, input, strings, numbers, def, return, scope'},
 {n:1,t:'Conditionals',built:true,blurb:'comparisons, and/or/not, truthiness, if/elif/else, guard clauses, match'},
 {n:2,t:'Loops',built:true,blurb:'while, for, range, break, lists, dicts, nested loops, loop patterns'},
 {n:3,t:'Exceptions',built:true,blurb:'try, except, else, raise, defensive input'},
 {n:4,t:'Libraries',built:true,blurb:'import, random, statistics, sys.argv, pip, APIs'},
 {n:5,t:'Unit Tests',built:true,blurb:'assert, pytest, testing your own functions'},
 {n:6,t:'File I/O',built:true,blurb:'open, with, CSV reading/writing, images'},
 {n:7,t:'Regular Expressions',built:true,blurb:'re, patterns, validation, extracting data'},
 {n:8,t:'Object-Oriented Programming',built:true,blurb:'classes, objects, methods, properties, inheritance'},
 {n:9,t:'Et Cetera',built:true,blurb:'sets, global, constants, type hints, docstrings, argparse, comprehensions, generators'},
];

/* Sidebar structure. Lesson ORDER and each lesson's section live in content/manifest.json. */
const SECTION_LABELS={learn:'Lessons',tools:'Power tools',practice:'Practice',test:'Test',build:'Build it'};
const GROUPS=[
 {key:'intro',label:'Start here',built:true},
 ...WEEKS.filter(w=>w.built).map(w=>({key:String(w.n),label:`Week ${w.n} · ${w.t}`,built:true,week:w})),
 {key:'proj',label:'Main project · Pocket Ledger',built:true},
 {key:'tb',label:'Reference',built:true},
 ...WEEKS.filter(w=>!w.built).map(w=>({key:String(w.n),label:`Week ${w.n} · ${w.t}`,built:false,week:w}))];
