/* Toolbox Parsons, blanks, bugs, anatomy, quizzes, predictions */
/* ---------------- interactive exercise data */
Object.assign(PARS,{
 pa_tally:{title:'Build the tally',task:'Arrange the lines into a program that prints <code>{\'a\': 2, \'b\': 1}</code>.',lines:['words = "a b a".split()','counts = {}','for word in words:','    if word in counts:','        counts[word] += 1','    else:','        counts[word] = 1','print(counts)'],why:'The dict must exist before the loop, and print must be outside it (indent 0), or it would print three times.'},
 pa_valid:{title:'The validation function',task:'Arrange a function that keeps asking until the score is between 0 and 100, then returns it.',lines:['def get_score():','    while True:','        score = int(input("Score: "))','        if 0 <= score <= 100:','            return score','        print("0 to 100 please")'],why:'The print is inside the while but not inside the if: it only runs when the if didn\'t return.'},
 pa_sorted:{title:'Leaderboard',task:'Arrange the lines to print the scores from highest to lowest.',lines:['scores = {"Sara": 88, "Omar": 95}','ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)','for name, s in ranked:','    print(name, s)']},
});
Object.assign(BLANKS,{
 bl_enum:{title:'enumerate fill-in',task:'Print a list numbered from 1.',code:'items = ["tea", "jam"]\nfor ⟦0⟧, item in ⟦1⟧(items, ⟦2⟧):\n    print(f"{n}. {item}")',ans:[['n'],['enumerate'],['1','start=1']]},
 bl_loop:{title:'Sum of even numbers',task:'Fill the blanks so it prints 30 (2 + 4 + 6 + 8 + 10).',code:'total = ⟦0⟧\nfor n in range(2, 11, ⟦1⟧):\n    total ⟦2⟧ n\nprint(total)',ans:[['0'],['2'],['+=']],why:'Start the accumulator at 0, step by 2, add with +=.'},
 bl_fmt:{title:'Format codes',task:'Fill in the format specs to get the commented output.',code:'name, price, rate, n = "Tea", 1.8, 0.125, 42\nprint(f"{name:⟦0⟧10}|")       # Tea       |\nprint(f"{price:⟦1⟧8.2f}|")     #     1.80|\nprint(f"{rate:.1⟦2⟧}")         # 12.5%\nprint(f"INV-{n:⟦3⟧}")          # INV-00042',ans:[['<'],['>'],['%'],['05']]},
});
Object.assign(BUGS,{
 bug_repr:{title:'"Continue?" never continues',task:'The user typed <code>yes</code> (and a space by accident). The program prints this:',out:"'yes '\nStopped",code:'answer = input("Continue? ")\nprint(repr(answer))\nif answer == "yes":\n    print("Continuing")\nelse:\n    print("Stopped")',line:1,why:'The repr shows a trailing space, so <code>"yes " == "yes"</code> is False. Clean the input where it\'s read.',fix:'answer = input("Continue? ").strip().lower()',hint:'Look at what repr printed. Where should that be cleaned?'},
 bug_getappend:{title:'Groups stay empty',task:'Expected <code>{\'Red\': [\'Sara\'], \'Blue\': [\'Omar\']}</code>, but it prints <code>{}</code>.',out:'{}',code:'groups = {}\nfor name, team in [("Sara", "Red"), ("Omar", "Blue")]:\n    groups.get(team, []).append(name)\nprint(groups)',line:3,why:'get returns a brand-new empty list that is never stored in the dict. setdefault stores it first.',fix:'    groups.setdefault(team, []).append(name)'},
 bug_reset:{title:'Counts only 1',task:'Should count words longer than 2 letters (expected 2), but prints 1.',out:'1',code:'words = ["hi", "hello", "hey"]\nfor w in words:\n    long_count = 0\n    if len(w) > 2:\n        long_count += 1\nprint(long_count)',line:3,why:'The counter is reset to 0 on every iteration. Accumulators must start before the loop.',fix:'long_count = 0\nfor w in words:\n    if len(w) > 2:\n        long_count += 1'},
 bug_max0:{title:'Warmest is 0?',task:'All temperatures are below zero, yet it says the warmest is 0.',out:'Warmest: 0',code:'temps = [-5, -2, -9]\nwarmest = 0\nfor t in temps:\n    if t > warmest:\n        warmest = t\nprint("Warmest:", warmest)',line:2,why:'0 isn\'t one of the data values, and no negative number is bigger than it. Start the max pattern with a real item.',fix:'warmest = temps[0]'},
});

/* ---------------- anatomy */
Object.assign(ANAT,{
 a_repr:{code:py`name = "Sara "
print(name)
print(repr(name))
print(f"Hello {name!r}")`,ex:{
  '1:name':['variable (you chose it)','Will hold the user\'s name. In a real program this value would come from input(), which is exactly how stray spaces sneak in.'],
  '1:"Sara "':['string with a trailing space','The space before the closing quote is a real character. len("Sara ") is 5, not 4.'],
  '2:print':['built-in function','Shows the value for a human: no quotes, so the trailing space is invisible on screen.'],
  '3:repr':['built-in function','Returns a new <b>string</b> that represents the value as code: here <code>"\'Sara \'"</code>, quotes included. print then shows that string.'],
  '3:name':['argument','The value to represent. repr doesn\'t change it.'],
  '4:f"Hello {name!r}"':['f-string with !r','<code>!r</code> is a <b>conversion flag</b>: "convert this value with repr before inserting it". Output: <code>Hello \'Sara \'</code>. (<code>!s</code> would use str, which is the default.)'],
 }},
 a_enum:{code:py`for n, item in enumerate(items, 1):
    print(f"{n}. {item}")`,ex:{
  '1:n':['first loop variable','Gets the counter: 1, 2, 3… The name is your choice; n, i, pos, line_no are common.'],
  '1:,':['unpacking','enumerate gives pairs like (1, \'tea\'). The comma splits each pair into two variables.'],
  '1:item':['second loop variable','Gets the item itself.'],
  '1:enumerate':['built-in function','Wraps any iterable and adds a counter.'],
  '1:items':['the iterable','Any list, string, file, range…'],
  '1:1':['start','Where counting starts. Leave it out to start at 0 (good for indexes); use 1 for anything humans read.'],
 }},
 a_zip:{code:py`for name, score in zip(names, scores):
    print(name, score)`,ex:{
  '1:name':['first loop variable','Comes from the first list.'],'1:score':['second loop variable','Comes from the second list, same position.'],
  '1:zip':['built-in function','Pairs up items by position: first with first, second with second… Stops at the shortest input.'],
  '1:names':['first iterable','You can pass 2, 3 or more iterables; each tuple then has that many items.'],'1:scores':['second iterable','Must line up with names position by position.'],
 }},
 a_sorted:{code:py`ranked = sorted(players, key=lambda p: p["score"], reverse=True)`,ex:{
  '1:ranked':['variable','Gets the new list. players itself is not changed.'],
  '1:sorted':['built-in function','Returns a new list in order.'],
  '1:players':['the iterable','What to sort: here a list of dicts.'],
  '1:key':['keyword argument','"Sort by what?" A function called once per item; its results decide the order.'],
  '1:lambda':['keyword','Makes a tiny unnamed function right here.'],
  '1:p#1':['lambda parameter','Each item in turn (one player dict).'],
  '1::':['lambda colon','Separates the parameter from the value returned.'],
  '1:p#2':['the item','The player dict.'],
  '1:"score"':['dict key','So each player is judged by p["score"].'],
  '1:reverse':['keyword argument','True: biggest first.'],
 }},
 a_join:{code:py`line = ", ".join(names)`,ex:{
  '1:", "':['the separator','join is a method <b>of this string</b>: it goes between the pieces, not at the ends.'],
  '1:.':['method access','"use the join ability of the separator string".'],
  '1:join':['string method','Glues all strings from the iterable into one string.'],
  '1:names':['iterable of strings','Every item must already be a str, or you get a TypeError. Convert numbers with str() first.'],
 }},
 a_setdef:{code:py`groups.setdefault(team, []).append(name)`,ex:{
  '1:groups':['the dict','Maps each team to a list of names.'],
  '1:setdefault':['dict method','If team is a key: return its list. If not: store [] under team first, then return that list.'],
  '1:team':['key','Which group.'],
  '1:[':['default value','A new empty list, stored only when the key is missing.'],
  '1:append':['list method','Called on the list that setdefault returned, which is the list stored in the dict, so the change sticks.'],
  '1:name':['value to add',''],
 }},
});

/* ---------------- quizzes */
Object.assign(Q,{
 tbrepr:[
  {q:'s = "42". What does print(repr(s)) show?',o:['42',"'42'",'"42"'],a:1,e:'repr wraps strings in single quotes, so you can see it\'s text.'},
  {q:'Which is best for messages shown to customers?',o:['str / plain print','repr'],a:0,e:'repr is for developers. Customers shouldn\'t see quotes and escapes.'},
  {q:'Why does print(["Sara "]) show the space?',o:['Lists use repr for their items','print always uses repr','It doesn\'t'],a:0,e:'Containers show their contents with repr.'},
  {q:'f"{x!r}" means…',o:['round x','insert x converted with repr','x is required'],a:1,e:'!r is the repr conversion flag.'},
  {q:'A lookup fails though the value "looks right". First step?',o:['Rewrite the code','Print the repr of both values','Restart Python'],a:1,e:'Hidden spaces, case and line breaks show up immediately.'}],
 tbenum:[
  {q:'list(enumerate("ab", 1)) is…',o:["[(1, 'a'), (2, 'b')]","[(0, 'a'), (1, 'b')]","['1a', '2b']"],a:0,e:'Pairs of (count, item), counting from 1.'},
  {q:'When should you prefer range(len(x))?',o:['Always','When you need other positions, like x[i + 1]','Never'],a:1,e:'Otherwise enumerate is clearer.'},
  {q:'A menu shows choices from 1. The user picks 3. The list index is…',o:['3','2','4'],a:1,e:'Subtract 1 to go back to 0-based.'}],
 tbzip:[
  {q:'zip([1, 2, 3], "ab") gives how many pairs?',o:['3','2','Error'],a:1,e:'It stops at the shortest.'},
  {q:'dict(zip(["a", "b"], [1, 2])) is…',o:["{'a': 1, 'b': 2}","[('a', 1), ('b', 2)]","{'a': 'b'}"],a:0,e:'Keys from the first, values from the second.'},
  {q:'zip(x, x[1:]) gives…',o:['each item twice','each pair of neighbours','an error'],a:1,e:'(x0, x1), (x1, x2)…'}],
 tbsorted:[
  {q:'sorted(["b", "A", "c"]) is…',o:["['A', 'b', 'c']","['b', 'A', 'c']","['c', 'b', 'A']"],a:0,e:'Capitals sort before lower case. Use key=str.lower to ignore case.'},
  {q:'To sort by score high-to-low, then name A–Z:',o:['key=lambda p: (p.score, p.name), reverse=True','key=lambda p: (-p[1], p[0])','key=lambda p: p[0]'],a:1,e:'Negate the number to reverse just that part.'},
  {q:'What does nums.sort() return?',o:['the sorted list','None'],a:1,e:'It sorts in place.'},
  {q:'"Stable sort" means…',o:['it never crashes','equal items keep their original order','it is fast'],a:1,e:'Useful for multi-step sorting.'}],
 tbminmax:[
  {q:'max({"a": 3, "b": 9}, key={"a": 3, "b": 9}.get) is…',o:["9","'b'","('b', 9)"],a:1,e:'It returns the key with the biggest value.'},
  {q:'max([]) …',o:['returns 0','raises ValueError','returns None'],a:1,e:'Use default= for empty data.'},
  {q:'max(["10", "9"]) is…',o:['"10"','"9"'],a:1,e:'Strings compare character by character: "9" > "1".'},
  {q:'sum(t > 25 for t in temps) gives…',o:['the total temperature','how many are over 25','an error'],a:1,e:'True counts as 1.'}],
 tbanyall:[
  {q:'all([]) is…',o:['True','False','Error'],a:0,e:'Nothing failed, so it is True. Check the length if empty should fail.'},
  {q:'any(c.isdigit() for c in "abc")',o:['True','False'],a:1,e:'No character is a digit.'},
  {q:'all() stops checking…',o:['at the first False','after every item'],a:0,e:'Short-circuiting.'}],
 tbjoin:[
  {q:'"-".join(["a", "b", "c"]) is…',o:['a-b-c','-a-b-c-','abc'],a:0,e:'The separator goes between items only.'},
  {q:'", ".join([1, 2]) …',o:['"1, 2"','TypeError'],a:1,e:'Items must be strings.'},
  {q:'"a  b".split() vs "a  b".split(" ")',o:["both ['a', 'b']","['a', 'b'] and ['a', '', 'b']"],a:1,e:'No argument merges runs of whitespace.'},
  {q:'"k=v=w".split("=", 1) is…',o:["['k', 'v=w']","['k', 'v', 'w']"],a:0,e:'maxsplit=1 splits only once.'}],
 tbdict:[
  {q:'d.get("x", []).append(1) on an empty d leaves d as…',o:["{'x': [1]}",'{}'],a:1,e:'The default list was never stored. Use setdefault.'},
  {q:'settings.update(user) when both have "theme"…',o:['user\'s value wins','settings keeps its value','error'],a:0,e:'update overwrites.'},
  {q:'A dict used to replace a long if/elif chain is called…',o:['a lookup table','a loop','a tally'],a:0,e:'Keys map directly to results.'}],
 tbformat:[
  {q:'f"{3.14159:.2f}"',o:['3.14','3.1','3.14159'],a:0,e:'2 decimal places.'},
  {q:'f"{7:03}"',o:['007','7.000','  7'],a:0,e:'Width 3 padded with zeros.'},
  {q:'f"{0.256:.1%}"',o:['0.3%','25.6%','26%'],a:1,e:'% multiplies by 100 and adds %.'},
  {q:'Numbers in a table are usually…',o:['left-aligned','right-aligned'],a:1,e:'So the digits and decimal points line up.'}],
});

Object.assign(PRED,{"p_repr": [{"c": "print(\"42\")\nprint(repr(\"42\"))\nprint(repr(42))", "out": "42\n'42'\n42", "e": "Only repr shows the quotes that make \"42\" a string."}, {"c": "name = \"Sara \"\nprint(len(name), repr(name))", "out": "5 'Sara '", "e": "The trailing space is a real character."}, {"c": "print([\"a\", \"b \"])", "out": "['a', 'b ']", "e": "Lists show their items with repr, quotes and spaces included."}, {"c": "x = \"\"\nprint(f\"[{x}]\", repr(x))", "out": "[] ''", "e": "An empty string: nothing between the brackets; repr shows two quotes."}, {"c": "s = \"a\\tb\"\nprint(repr(s))\nprint(len(s))", "out": "'a\\tb'\n3", "e": "\\t is ONE character (a tab), so the length is 3."}, {"c": "print(repr(None), repr(\"None\"))", "out": "None 'None'", "e": "The value None vs the text 'None'."}, {"c": "word = \"hi\"\nprint(f\"{word!r} has {len(word)} letters\")", "out": "'hi' has 2 letters", "e": "!r inside an f-string."}, {"c": "print(str(\"hi\") == repr(\"hi\"))", "out": "False", "e": "str gives hi, repr gives 'hi' with quotes: different strings."}], "p_enum": [{"c": "for i, c in enumerate(\"abc\"):\n    print(i, c)", "out": "0 a\n1 b\n2 c", "e": "Counting starts at 0 by default."}, {"c": "for i, c in enumerate(\"abc\", 1):\n    print(i, c)", "out": "1 a\n2 b\n3 c", "e": "start=1."}, {"c": "print(list(enumerate([\"x\", \"y\"], 10)))", "out": "[(10, 'x'), (11, 'y')]", "e": "Any start number works."}, {"c": "words = [\"a\", \"b\", \"c\"]\nfor i, w in enumerate(words):\n    if i == len(words) - 1:\n        print(\"last:\", w)", "out": "last: c", "e": "Using the index to detect the last item."}, {"c": "print([i for i, ch in enumerate(\"banana\") if ch == \"a\"])", "out": "[1, 3, 5]", "e": "Positions of every a."}, {"c": "for n, (a, b) in enumerate([(1, 2), (3, 4)], 1):\n    print(n, a + b)", "out": "1 3\n2 7", "e": "Unpacking a pair inside each enumerate pair."}], "p_zip": [{"c": "print(list(zip([1, 2, 3], \"ab\")))", "out": "[(1, 'a'), (2, 'b')]", "e": "zip stops at the shortest input."}, {"c": "print(dict(zip([\"a\", \"b\"], [1, 2])))", "out": "{'a': 1, 'b': 2}", "e": "Keys from the first, values from the second."}, {"c": "x = [10, 13, 9]\nprint([b - a for a, b in zip(x, x[1:])])", "out": "[3, -4]", "e": "Differences between neighbours."}, {"c": "for a, b, c in zip(\"ab\", \"cd\", \"ef\"):\n    print(a + b + c)", "out": "ace\nbdf", "e": "Three sequences at once."}, {"c": "names = [\"Sara\", \"Omar\"]\nages = [30, 25]\nfor n, a in zip(names, ages):\n    print(f\"{n} is {a}\")", "out": "Sara is 30\nOmar is 25", "e": "Matching positions."}, {"c": "print(len(list(zip([], [1, 2]))))", "out": "0", "e": "An empty input gives no pairs at all."}], "p_sorted": [{"c": "print(sorted([3, 1, 2], reverse=True))", "out": "[3, 2, 1]", "e": "Descending."}, {"c": "print(sorted([\"b\", \"A\", \"c\"]))", "out": "['A', 'b', 'c']", "e": "Capital letters sort before lower case."}, {"c": "print(sorted([\"b\", \"A\", \"c\"], key=str.lower))", "out": "['A', 'b', 'c']", "e": "Compare lower-case versions; original strings come back."}, {"c": "print(sorted([\"kiwi\", \"fig\", \"apple\"], key=len))", "out": "['fig', 'kiwi', 'apple']", "e": "By length."}, {"c": "nums = [3, 1, 2]\nnew = sorted(nums)\nprint(nums, new)", "out": "[3, 1, 2] [1, 2, 3]", "e": "sorted leaves the original alone."}, {"c": "nums = [3, 1, 2]\nprint(nums.sort())", "out": "None", "e": "sort() returns None."}, {"c": "pairs = [(\"b\", 1), (\"a\", 1), (\"c\", 0)]\nprint(sorted(pairs, key=lambda p: p[1]))", "out": "[('c', 0), ('b', 1), ('a', 1)]", "e": "Stable: b stays before a because they tie."}, {"c": "d = {\"x\": 3, \"y\": 1, \"z\": 2}\nprint(sorted(d, key=d.get))", "out": "['y', 'z', 'x']", "e": "Sorting a dict sorts its keys; key=d.get uses the values."}], "p_minmax": [{"c": "print(max([3, 9, 2]), min(\"hello\"))", "out": "9 e", "e": "min of a string is its smallest character."}, {"c": "print(max([\"fig\", \"banana\", \"kiwi\"], key=len))", "out": "banana", "e": "Longest word."}, {"c": "print(max([\"10\", \"9\", \"100\"]))", "out": "9", "e": "Strings compare character by character."}, {"c": "s = {\"tea\": 5, \"jam\": 9}\nprint(max(s, key=s.get))", "out": "jam", "e": "The key with the biggest value."}, {"c": "print(min([], default=\"none\"))", "out": "none", "e": "default instead of a ValueError."}, {"c": "print(sum([2, 3]), sum([True, True, False]))", "out": "5 2", "e": "True counts as 1."}], "p_anyall": [{"c": "print(any([0, \"\", None]), all([1, \"a\", [0]]))", "out": "False True", "e": "0, empty string and None are falsy; [0] is a non-empty list, so it is truthy."}, {"c": "print(all([]), any([]))", "out": "True False", "e": "The empty-list rules."}, {"c": "print(any(c.isdigit() for c in \"R2D2\"))", "out": "True", "e": "At least one digit."}, {"c": "print(all(len(w) > 2 for w in [\"tea\", \"jam\", \"go\"]))", "out": "False", "e": "\"go\" fails."}, {"c": "nums = [1, 3, 5]\nprint(all(n % 2 == 1 for n in nums))", "out": "True", "e": "Every number is odd."}], "p_join": [{"c": "print(\"-\".join(\"abc\"))", "out": "a-b-c", "e": "A string is an iterable of characters."}, {"c": "print(\", \".join([\"tea\"]))", "out": "tea", "e": "One item: no separator at all."}, {"c": "print(\"a,,b\".split(\",\"))", "out": "['a', '', 'b']", "e": "Empty fields are kept when you give a separator."}, {"c": "print(\"  a  b \".split())", "out": "['a', 'b']", "e": "No argument: whitespace runs merged, ends ignored."}, {"c": "print(\"x=1=2\".split(\"=\", 1))", "out": "['x', '1=2']", "e": "maxsplit."}, {"c": "parts = \"2026-11-02\".split(\"-\")\nprint(\"/\".join(reversed(parts)))", "out": "02/11/2026", "e": "Split, reverse, join: a date reformatted."}, {"c": "print(len(\"\".split(\",\")), len(\"\".split()))", "out": "1 0", "e": "A classic surprise: [''] vs []."}], "p_dict2": [{"c": "d = {\"a\": 1}\nprint(d.get(\"b\"), d.get(\"b\", 0), d)", "out": "None 0 {'a': 1}", "e": "get never adds the key."}, {"c": "d = {}\nd.setdefault(\"k\", []).append(1)\nd.setdefault(\"k\", []).append(2)\nprint(d)", "out": "{'k': [1, 2]}", "e": "The second setdefault finds the existing list."}, {"c": "d = {}\nd.get(\"k\", []).append(1)\nprint(d)", "out": "{}", "e": "The list from get was never stored."}, {"c": "a = {\"x\": 1, \"y\": 2}\na.update({\"y\": 20, \"z\": 3})\nprint(a)", "out": "{'x': 1, 'y': 20, 'z': 3}", "e": "update overwrites and adds."}, {"c": "d = {\"a\": 1, \"b\": 2}\nv = d.pop(\"a\")\nprint(v, d, d.pop(\"zz\", \"none\"))", "out": "1 {'b': 2} none", "e": "pop returns the value and removes the key."}, {"c": "d = {\"b\": 1, \"a\": 2}\nfor k, v in sorted(d.items()):\n    print(k, v)", "out": "a 2\nb 1", "e": "Sorting items sorts by key first."}]});
