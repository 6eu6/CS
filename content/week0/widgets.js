/* Week 0 quizzes and steppers */
/* ======================================================= quizzes */
Object.assign(Q,{
 w0print:[
  {q:'What does print("a", "b", sep="") show?',o:['a b','ab','a\nb'],a:1,e:'sep replaces the space between arguments. An empty sep means nothing in between.'},
  {q:'What is wrong here?',c:'print(Hello)',o:['Nothing','Hello needs quotes, otherwise it\'s treated as a variable name','print must be capitalised'],a:1,e:'Without quotes Python looks for a variable called Hello: NameError.'},
  {q:'Output?',c:'print("Hi", end="")\nprint("there")',o:['Hi there','Hithere','Hi\nthere'],a:1,e:'end="" means no line break and no space after "Hi".'},
  {q:'Which prints  She said "yes"  correctly?',o:['print("She said "yes"")','print(\'She said "yes"\')','print("She said \'yes\'")'],a:1,e:'Single quotes outside let double quotes appear inside. (\\" also works.)'}],
 w0vars:[
  {q:'In  name = input("Name: ")  what happens first?',o:['name is created empty','input runs and waits for the user','Python prints name'],a:1,e:'The right side runs first; its result is then stored on the left.'},
  {q:'The user types 7. What is the type of x?',c:'x = input("x: ")',o:['int','str','float'],a:1,e:'input always returns a string.'},
  {q:'Output?',c:'x = 5\nx = x + 2\nprint(x)',o:['5','7','Error'],a:1,e:'x gets the old x plus 2.'},
  {q:'Which variable name is valid and good style?',o:['2nd_name','second name','second_name'],a:2,e:'No leading digit, no spaces; snake_case.'}],
 w0str:[
  {q:'Output?',c:'s = "  hi  "\ns.strip()\nprint(len(s))',o:['2','6','Error'],a:1,e:'strip returned a new string that wasn\'t stored. s is unchanged: 6 characters.'},
  {q:'"ada lovelace".capitalize() gives…',o:['Ada Lovelace','Ada lovelace','ADA LOVELACE'],a:1,e:'capitalize only touches the first character. title() does every word.'},
  {q:'"python"[1:4] is…',o:['pyt','yth','ytho'],a:1,e:'From index 1 up to but not including 4.'},
  {q:'first, last = "Sam Lee Jones".split(" ")  gives…',o:['first="Sam", last="Lee Jones"','ValueError: too many values to unpack','first="Sam", last="Jones"'],a:1,e:'split makes three pieces but there are only two variables.'},
  {q:'"ab" * 3 + "!" is…',o:['ababab!','ab3!','Error'],a:0,e:'* repeats, + joins.'}],
 w0num:[
  {q:'17 // 5 and 17 % 5 are…',o:['3.4 and 2','3 and 2','3 and 3.4'],a:1,e:'Whole fives: 3. Remainder: 2.'},
  {q:'The user types 4 and 5. Output?',c:'a = input()\nb = input()\nprint(a + b)',o:['9','45','Error'],a:1,e:'Two strings joined: "45".'},
  {q:'int("3.7") gives…',o:['3','4','ValueError'],a:2,e:'int() only accepts text of a whole number. float("3.7") works; then int(3.7) is 3.'},
  {q:'f"{5:.2f}" gives…',o:['5','5.00','5.0'],a:1,e:'.2f always shows 2 decimals.'},
  {q:'2 + 3 * 2 ** 2 equals…',o:['100','14','20'],a:1,e:'** first (4), then * (12), then + (14).'}],
 w0func:[
  {q:'What does this program print?',c:'def f():\n    print("A")\nprint("B")',o:['A then B','B only','A only'],a:1,e:'f is defined but never called.'},
  {q:'What is x?',c:'def f(n):\n    print(n * 2)\nx = f(3)',o:['6','None','"6"'],a:1,e:'f prints but doesn\'t return, so it returns None.'},
  {q:'Output?',c:'def hi(to="world"):\n    return "hi " + to\nprint(hi())',o:['hi','hi world','Error: missing argument'],a:1,e:'The default value is used.'},
  {q:'Why does this fail?',c:'def main():\n    n = 5\n    show()\ndef show():\n    print(n)\nmain()',o:['show is defined after main','n only exists inside main','print needs quotes'],a:1,e:'Scope: pass n as an argument.'},
  {q:'What happens after return?',c:'def f():\n    return 1\n    print("done")',o:['"done" prints','The function ends; "done" never prints','Error'],a:1,e:'return ends the function immediately.'}],
 w0choose:[
  {q:'Scenario: a function computes a delivery fee that main adds to a total. It should…',o:['print the fee','return the fee'],a:1,e:'main needs the number to keep calculating.'},
  {q:'Scenario: show a shopping total as money.',o:['round(total, 2)','f"£{total:.2f}"'],a:1,e:'round(10, 2) shows 10, not 10.00.'},
  {q:'Scenario: how many full 12-egg boxes from 50 eggs?',o:['50 / 12','50 // 12','50 % 12'],a:1,e:'4 full boxes. % would tell you the 2 left over.'},
  {q:'Scenario: the user types their height in metres.',o:['int(input())','float(input())'],a:1,e:'1.75 isn\'t a whole number; int() would crash.'},
  {q:'Scenario: a user may answer "Yes", "YES", " yes". Before comparing, use…',o:['.title()','.strip().lower()','.capitalize()'],a:1,e:'One standard form: trimmed and lower case.'},
  {q:'Scenario: you need someone\'s full name to look right on a certificate.',o:['.capitalize()','.title()','.upper()'],a:1,e:'title capitalises each word.'},
  {q:'Scenario: a tax function uses 20% almost always, 5% sometimes.',o:['Two separate functions','A parameter with default rate=0.2','A global variable'],a:1,e:'Default parameter: callers pass a rate only when it differs.'}],
 w0test:[
  {q:'Output?',c:'name = " sam "\nprint(f"[{name.strip().title()}]")',o:['[Sam]','[ Sam ]','[sam]'],a:0,e:'Stripped then title-cased.'},
  {q:'Output?',c:'print(7 / 2, 7 // 2, 7 % 2)',o:['3.5 3 1','3 3 1','3.5 3.5 1'],a:0,e:'/ exact, // whole, % remainder.'},
  {q:'Output?',c:'x = "3"\nprint(x * 3)',o:['9','333','Error'],a:1,e:'A string times an int repeats the string.'},
  {q:'Which line is a syntax error?',o:['print("a", "b")','print("a" "b")','print("a", "b"'],a:2,e:'Missing closing bracket.'},
  {q:'Output?',c:'def add(a, b=10):\n    return a + b\nprint(add(1), add(1, 2))',o:['11 3','11 12','Error'],a:0,e:'add(1) uses the default 10; add(1, 2) overrides it.'},
  {q:'Output?',c:'word = "banana"\nprint(word.replace("a", "o"), word)',o:['bonono bonono','bonono banana','banana banana'],a:1,e:'replace returns a new string; word itself is unchanged.'},
  {q:'What does f"{1234.5:,.2f}" produce?',o:['1234.50','1,234.50','1,234.5'],a:1,e:', adds separators, .2f two decimals.'},
  {q:'Output?',c:'print("a", "b", sep="-", end="!")\nprint("c")',o:['a-b!c','a-b!\nc','a b!c'],a:0,e:'No line break after "!" because end replaced it.'},
  {q:'Which is the best fix for  print("Total: " + 5) ?',o:['print("Total: " + "5")','print(f"Total: {5}")','print("Total: " - 5)'],a:1,e:'An f-string converts the number for you. (str(5) also works.)'},
  {q:'Output?',c:'def double(n):\n    return n * 2\ndef main():\n    print(double(double(3)))\nmain()',o:['6','12','Error'],a:1,e:'The inner call gives 6; the outer doubles it to 12.'},
  {q:'round(2.5) and round(3.5) in Python 3 give…',o:['3 and 4','2 and 4','2 and 3'],a:1,e:'Python rounds exact halves to the nearest even number ("banker\'s rounding"). Surprising, but real, and worth knowing before it surprises you in a problem set.'},
  {q:'int(9.99) gives…',o:['10','9','Error'],a:1,e:'int() truncates toward zero; it doesn\'t round.'}],
});

/* ======================================================= steppers */
Object.assign(STEP,{
 w0vars:{title:'Step through: variables',code:'name = input("Name: ")\nname = "Ada"\nprint(f"hello, {name}")',steps:[
  {l:1,n:'Python evaluates the right side first. It calls <code>input("Name: ")</code>, shows the prompt and waits for the user.',v:{},out:'Name: '},
  {l:1,n:'The user types <code>Sara</code>. input returns the string <code>"Sara"</code>, and <code>=</code> stores it in the variable <code>name</code>.',v:{name:'"Sara"'},out:'Name: Sara'},
  {l:2,n:'The next assignment gives <code>name</code> a new value: <code>"Ada"</code>. The previous value is replaced. This is called reassignment.',v:{name:'"Ada"'},out:'Name: Sara'},
  {l:3,n:'The f-string inserts the current value of <code>name</code>, so print displays <code>hello, Ada</code>.',v:{name:'"Ada"'},out:'Name: Sara\nhello, Ada'}]},
 w0scope:{title:'Step through: calls and scope',code:'def main():\n    n = int(input("n: "))\n    result = square(n)\n    print(result)\n\ndef square(x):\n    y = x * x\n    return y\n\nmain()',steps:[
  {l:1,n:'<code>def main</code> is read and stored. The body is <b>not</b> run.',g:{main:'function'},out:''},
  {l:6,n:'<code>def square</code> is read and stored too.',g:{main:'function',square:'function'},out:''},
  {l:10,n:'<code>main()</code>: the first actual call. Python jumps into main. A fresh, private space for main\'s variables is created.',g:{main:'function',square:'function'},s:['main'],sc:{main:{}},out:''},
  {l:2,n:'input waits; the user types <code>4</code>; int converts "4" to 4. <code>n</code> now exists, <b>inside main only</b>.',s:['main'],sc:{main:{n:'4'}},out:'n: 4'},
  {l:3,n:'To compute the right side, Python must call <code>square(n)</code>. main pauses here.',s:['main'],sc:{main:{n:'4'}},out:'n: 4'},
  {l:6,n:'Jump into square. The argument fills the parameter: <code>x = 4</code>. square gets its own private space. It can\'t see <code>n</code>; it only has <code>x</code>.',s:['main','square'],sc:{main:{n:'4'},square:{x:'4'}},out:'n: 4'},
  {l:7,n:'<code>y = x * x</code> → 16. <code>y</code> lives only inside square.',s:['main','square'],sc:{main:{n:'4'},square:{x:'4',y:'16'}},out:'n: 4'},
  {l:8,n:'<code>return y</code> hands 16 back to the caller and square ends. Its variables <code>x</code> and <code>y</code> are thrown away.',s:['main','square'],sc:{main:{n:'4'},square:{x:'4',y:'16'}},out:'n: 4'},
  {l:3,n:'Back in main: <code>result = 16</code>.',s:['main'],sc:{main:{n:'4',result:'16'}},out:'n: 4'},
  {l:4,n:'print shows 16. main\'s last line, so main ends and its variables disappear too.',s:['main'],sc:{main:{n:'4',result:'16'}},out:'n: 4\n16'},
  {l:10,n:'Back at the top level. Nothing left to run: the program ends.',g:{main:'function',square:'function'},out:'n: 4\n16'}]},
});
