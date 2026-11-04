/* Toolbox (power tools) coded exercises */
const SERVER_LOG=`2026-11-02 09:01:12 INFO Server started
2026-11-02 09:05:40 WARNING Disk 81% full
2026-11-02 09:17:03 ERROR Payment declined
2026-11-02 09:42:55 INFO User sara logged in
2026-11-02 10:03:21 ERROR Database timeout
2026-11-02 10:15:09 ERROR Payment declined
2026-11-02 10:30:44 INFO User omar logged in
2026-11-02 11:02:10 WARNING Slow response 2.4s
2026-11-02 11:20:37 ERROR Payment declined
2026-11-02 11:21:02 ERROR Database timeout
2026-11-02 12:00:00 INFO Backup complete
2026-11-02 12:44:18 ERROR Invalid coupon
`;
const SERVER_LOG2=`2026-11-03 08:00:01 INFO Server started
2026-11-03 08:10:00 ERROR Disk full
2026-11-03 08:20:00 ERROR Disk full
2026-11-03 14:00:00 WARNING Retry 1
2026-11-03 14:05:00 ERROR Timeout
`;
Object.assign(R,{
/* ---------------- repr */
tb_repr_try:{title:'str vs repr: try it',lvl:'',task:'Run it, then add your own values: a number stored as text, a string with a tab, an empty string.',code:py`values = ["Sara ", "42", 42, "", None, "a\tb", "line\n"]
for v in values:
    print(f"str: [{v}]   repr: {v!r}")
`},
tb_repr_fields:{title:'Show the hidden mess',lvl:'l2',task:'A line of data comes in. Split it on commas and print each field\'s <b>repr</b>, numbered from 1, like <code>1: \' Sara \'</code>. Don\'t clean anything: the point is to <i>see</i> it.',stdin:' Sara ,42,\tLondon',code:'line = input("Row: ")\n',
 tests:[T(' Sara ,42,\tLondon',"1: ' Sara '\n2: '42'\n3: '\\tLondon'"),T('a,,b',"1: 'a'\n2: ''\n3: 'b'")],
 sol:py`line = input("Row: ")
for i, field in enumerate(line.split(","), 1):
    print(f"{i}: {field!r}")
`},
tb_repr_types:{title:'Number or text?',lvl:'l2',task:'Read 3 lines. For each, strip it; if it is all digits convert it with <code>int()</code>. Then print <code>REPR is TYPE</code> using <code>!r</code> and <code>type(value).__name__</code>. Watch how repr shows quotes for strings but not for ints.',stdin:'42\n 7 \nabc',code:'',
 tests:[T('42\n 7 \nabc',"42 is int\n7 is int\n'abc' is str"),T('x1\n\n100',"'x1' is str\n'' is str\n100 is int")],
 sol:py`for _ in range(3):
    value = input("Value: ").strip()
    if value.isdigit():
        value = int(value)
    print(f"{value!r} is {type(value).__name__}")
`},
tb_repr_log:{title:'A trustworthy logger',lvl:'l2',task:'Write <code>log(event, value)</code> that <b>returns</b> <code>[LOG] event: VALUE</code> where VALUE is shown with repr. The calls are already written.',code:py`# write log(event, value) here


print(log("login", "sara"))
print(log("login", ""))
print(log("age", 42))
print(log("tags", ["a", "b"]))
`,tests:[T('',"[LOG] login: 'sara'\n[LOG] login: ''\n[LOG] age: 42\n[LOG] tags: ['a', 'b']")],
 sol:py`def log(event, value):
    return f"[LOG] {event}: {value!r}"


print(log("login", "sara"))
print(log("login", ""))
print(log("age", 42))
print(log("tags", ["a", "b"]))
`},
tb_repr_whitespace:{title:'Username audit',lvl:'l3',task:'Read 4 usernames. A clean username is stripped and lower case. For each one that is <b>not</b> already clean, print <code>Line N: RAW -> CLEAN</code> with both shown as repr. Finally print <code>Fixed: K</code>.',stdin:'sara\n Omar\nlina\t\nZAID',code:'',
 tests:[T('sara\n Omar\nlina\t\nZAID',"Line 2: ' Omar' -> 'omar'\nLine 3: 'lina\\t' -> 'lina'\nLine 4: 'ZAID' -> 'zaid'\nFixed: 3"),T('a\nb\nc\nd','Fixed: 0')],
 sol:py`fixed = 0
for n in range(1, 5):
    raw = input("Username: ")
    clean = raw.strip().lower()
    if raw != clean:
        print(f"Line {n}: {raw!r} -> {clean!r}")
        fixed += 1
print(f"Fixed: {fixed}")
`},
tb_repr_boss:{title:'Boss: two systems disagree',lvl:'l5',task:'Two systems export product codes. Some codes "differ" only by spaces, line breaks or case. Normalise with <code>.strip().upper()</code> and print exactly the report below. Formatting differences are listed in A\'s order; the "Only in" lines show lists of the <b>raw</b> codes.',spec:"Formatting differences:\n  'AB12' vs 'ab12'\n  'cd34 ' vs 'CD34'\n  'gh78' vs 'GH78\\n'\nOnly in A: ['EF56']\nOnly in B: ['XY99']",code:py`system_a = ["AB12", "cd34 ", "EF56", "gh78"]
system_b = ["ab12", "CD34", "XY99", "GH78\n"]
`,tests:[T('',"Formatting differences:\n  'AB12' vs 'ab12'\n  'cd34 ' vs 'CD34'\n  'gh78' vs 'GH78\\n'\nOnly in A: ['EF56']\nOnly in B: ['XY99']")],
 sol:py`system_a = ["AB12", "cd34 ", "EF56", "gh78"]
system_b = ["ab12", "CD34", "XY99", "GH78\n"]

norm_b = {}
for code in system_b:
    norm_b[code.strip().upper()] = code
norm_a = {}
for code in system_a:
    norm_a[code.strip().upper()] = code

print("Formatting differences:")
only_a = []
for code in system_a:
    key = code.strip().upper()
    if key in norm_b:
        if norm_b[key] != code:
            print(f"  {code!r} vs {norm_b[key]!r}")
    else:
        only_a.append(code)
only_b = [code for code in system_b if code.strip().upper() not in norm_a]
print(f"Only in A: {only_a}")
print(f"Only in B: {only_b}")
`},
/* ---------------- enumerate */
tb_enum_menu:{title:'Numbered menu',lvl:'l1',task:'Print the options numbered from 1, then ask <code>Choose: </code> and print <code>You chose: OPTION</code>.',stdin:'2',code:'options = ["View balance", "Transfer", "Log out"]\n',
 tests:[T('2','1. View balance\n2. Transfer\n3. Log out\nYou chose: Transfer'),T('3','You chose: Log out')],
 sol:py`options = ["View balance", "Transfer", "Log out"]
for n, option in enumerate(options, 1):
    print(f"{n}. {option}")
choice = int(input("Choose: "))
print(f"You chose: {options[choice - 1]}")
`},
tb_enum_positions:{title:'Where does it appear?',lvl:'l2',task:'Ask for a word, then a letter. Print every 0-based position of the letter, separated by <code>, </code>, or <code>Not found</code>.',stdin:'banana\na',code:'',
 tests:[T('banana\na','1, 3, 5'),T('banana\nz','Not found'),T('loop\nl','0')],
 sol:py`word = input("Word: ")
letter = input("Letter: ")
positions = [str(i) for i, ch in enumerate(word) if ch == letter]
if positions:
    print(", ".join(positions))
else:
    print("Not found")
`},
tb_enum_validate:{title:'Validate a data file',lvl:'l3',task:'Each row is <code>name,age</code>. Strip both fields. Report problems with 1-based line numbers: an empty name gives <code>Line N: missing name</code>; an age that isn\'t all digits gives <code>Line N: bad age AGE</code> with the age shown as repr. Then print <code>K of TOTAL lines OK</code>.',code:py`rows = ["Sara,42", "Omar,abc", ",30", "Lina, 35", "Zaid,"]
`,tests:[T('',"Line 2: bad age 'abc'\nLine 3: missing name\nLine 5: bad age ''\n2 of 5 lines OK")],
 sol:py`rows = ["Sara,42", "Omar,abc", ",30", "Lina, 35", "Zaid,"]
ok = 0
for n, row in enumerate(rows, 1):
    name, age = row.split(",")
    name = name.strip()
    age = age.strip()
    if name == "":
        print(f"Line {n}: missing name")
    elif not age.isdigit():
        print(f"Line {n}: bad age {age!r}")
    else:
        ok += 1
print(f"{ok} of {len(rows)} lines OK")
`},
/* ---------------- zip */
tb_zip_dict:{title:'Header + row → record',lvl:'l1',task:'Line 1 is a CSV header, line 2 a data row. Use <code>zip</code> to print each <code>column: value</code>.',stdin:'name,dept,salary\nSara,IT,42000',code:'',
 tests:[T('name,dept,salary\nSara,IT,42000','name: Sara\ndept: IT\nsalary: 42000'),T('a,b\n1,2','a: 1\nb: 2')],
 sol:py`header = input("Header: ").split(",")
row = input("Row: ").split(",")
for column, value in zip(header, row):
    print(f"{column}: {value}")
`},
tb_zip_changes:{title:'Week on week',lvl:'l2',task:'Line 1: last week\'s sales, line 2: this week\'s (space-separated). Print each change as <code>OLD -> NEW (+X)</code> using <code>:+</code>, then <code>Biggest rise: +X</code>.',stdin:'120 98 143\n135 90 150',code:'',
 tests:[T('120 98 143\n135 90 150','120 -> 135 (+15)\n98 -> 90 (-8)\n143 -> 150 (+7)\nBiggest rise: +15'),T('5 5\n5 9','5 -> 5 (+0)\n5 -> 9 (+4)\nBiggest rise: +4')],
 sol:py`old = [int(x) for x in input("Last week: ").split()]
new = [int(x) for x in input("This week: ").split()]
changes = []
for a, b in zip(old, new):
    print(f"{a} -> {b} ({b - a:+})")
    changes.append(b - a)
print(f"Biggest rise: {max(changes):+}")
`},
tb_zip_mark:{title:'Exam marker',lvl:'l2',task:'The answer key is in the code. Read a student\'s answers as one string like <code>ABCCA</code> (ignore case and spaces). Print <code>Score: K/5</code> and <code>Wrong: 2, 5</code> (1-based) or <code>Wrong: none</code>.',stdin:'abcca',code:'key = "ABDCA"\n',
 tests:[T('abcca','Score: 4/5\nWrong: 3'),T(' ABDCA ','Score: 5/5\nWrong: none'),T('CCCCC','Score: 1/5\nWrong: 1, 2, 3, 5')],
 sol:py`key = "ABDCA"
answers = input("Answers: ").strip().upper()
wrong = []
for n, (a, k) in enumerate(zip(answers, key), 1):
    if a != k:
        wrong.append(str(n))
print(f"Score: {len(key) - len(wrong)}/{len(key)}")
print(f"Wrong: {', '.join(wrong) if wrong else 'none'}")
`},
tb_zip_boss:{title:'Boss: sensor jumps',lvl:'l5',task:'Readings arrive space-separated. Compare each reading with the previous one by zipping the list with itself shifted (<code>zip(r, r[1:])</code>). For every change bigger than 10 either way print <code>Jump at reading N: A -> B</code> (N is the 1-based number of reading B). If none, print <code>Stable</code>. Finally print <code>Largest change: +X</code> or <code>-X</code>, the change with the biggest size (first one if tied).',stdin:'10 14 30 28 12 13',code:'',
 tests:[T('10 14 30 28 12 13','Jump at reading 3: 14 -> 30\nJump at reading 5: 28 -> 12\nLargest change: +16'),T('5 6 7','Stable\nLargest change: +1'),T('50 20','Jump at reading 2: 50 -> 20\nLargest change: -30')],
 sol:py`r = [int(x) for x in input("Readings: ").split()]
changes = []
jumps = 0
for n, (a, b) in enumerate(zip(r, r[1:]), 2):
    changes.append(b - a)
    if abs(b - a) > 10:
        print(f"Jump at reading {n}: {a} -> {b}")
        jumps += 1
if jumps == 0:
    print("Stable")
print(f"Largest change: {max(changes, key=abs):+}")
`},
/* ---------------- sorted */
tb_sort_len:{title:'By length, then A–Z',lvl:'l1',task:'Sort the input words by length, and words of the same length alphabetically (lower case). Print them space-separated.',stdin:'pear fig apple kiwi date',code:'',
 tests:[T('pear fig apple kiwi date','fig date kiwi pear apple'),T('Bb a C','a c bb')],
 sol:py`words = input("Words: ").lower().split()
print(" ".join(sorted(words, key=lambda w: (len(w), w))))
`},
tb_sort_league:{title:'League table',lvl:'l3',task:'Read lines <code>team,points,goal_difference</code> until <code>done</code>. Rank by points (high first), then goal difference (high first), then team name (A–Z). Print <code>RANK. TEAM POINTS (GD)</code> with GD signed.',stdin:'Leeds,40,5\nYork,43,-2\nBath,40,9\nHull,40,5\ndone',code:'',
 tests:[T('Leeds,40,5\nYork,43,-2\nBath,40,9\nHull,40,5\ndone','1. York 43 (-2)\n2. Bath 40 (+9)\n3. Hull 40 (+5)\n4. Leeds 40 (+5)')],
 sol:py`teams = []
while True:
    line = input("Team: ")
    if line == "done":
        break
    name, pts, gd = line.split(",")
    teams.append((name, int(pts), int(gd)))
ranked = sorted(teams, key=lambda t: (-t[1], -t[2], t[0]))
for rank, (name, pts, gd) in enumerate(ranked, 1):
    print(f"{rank}. {name} {pts} ({gd:+})")
`},
tb_sort_dates:{title:'UK dates in order',lvl:'l3',task:'The dates are <code>dd/mm/yyyy</code> text. Sort them in time order with a key, then print each one in ISO format <code>yyyy-mm-dd</code>.',code:'dates = ["02/11/2026", "15/03/2025", "30/11/2025", "01/01/2026"]\n',
 tests:[T('','2025-03-15\n2025-11-30\n2026-01-01\n2026-11-02')],
 sol:py`dates = ["02/11/2026", "15/03/2025", "30/11/2025", "01/01/2026"]
for d in sorted(dates, key=lambda d: (d[6:], d[3:5], d[:2])):
    day, month, year = d.split("/")
    print(f"{year}-{month}-{day}")
`},
tb_sort_boss:{title:'Boss: salary report by department',lvl:'l5',task:'Print each department (A–Z) with its total, then its staff by salary (highest first, ties A–Z by name). Use the exact format shown.',spec:'HR (total £61,000)\n  Omar: £33,000\n  Noor: £28,000\nIT (total £131,000)\n  ...',code:py`staff = [
    {"name": "Sara", "dept": "IT", "salary": 42000},
    {"name": "Omar", "dept": "HR", "salary": 33000},
    {"name": "Lina", "dept": "IT", "salary": 47000},
    {"name": "Zaid", "dept": "IT", "salary": 42000},
    {"name": "Noor", "dept": "HR", "salary": 28000},
]
`,tests:[T('','HR (total £61,000)\n  Omar: £33,000\n  Noor: £28,000\nIT (total £131,000)\n  Lina: £47,000\n  Sara: £42,000\n  Zaid: £42,000')],
 sol:py`staff = [
    {"name": "Sara", "dept": "IT", "salary": 42000},
    {"name": "Omar", "dept": "HR", "salary": 33000},
    {"name": "Lina", "dept": "IT", "salary": 47000},
    {"name": "Zaid", "dept": "IT", "salary": 42000},
    {"name": "Noor", "dept": "HR", "salary": 28000},
]
by_dept = {}
for person in staff:
    if person["dept"] not in by_dept:
        by_dept[person["dept"]] = []
    by_dept[person["dept"]].append(person)
for dept in sorted(by_dept):
    people = by_dept[dept]
    total = 0
    for p in people:
        total += p["salary"]
    print(f"{dept} (total £{total:,})")
    for p in sorted(people, key=lambda p: (-p["salary"], p["name"])):
        print(f"  {p['name']}: £{p['salary']:,}")
`},
tb_mm_best:{title:'Best and worst seller',lvl:'l1',task:'Use <code>max</code> and <code>min</code> with <code>key=sales.get</code>.',code:'sales = {"tea": 140, "cake": 95, "coffee": 210, "juice": 60}\n',
 tests:[T('','Best: coffee (210)\nWorst: juice (60)')],
 sol:py`sales = {"tea": 140, "cake": 95, "coffee": 210, "juice": 60}
best = max(sales, key=sales.get)
worst = min(sales, key=sales.get)
print(f"Best: {best} ({sales[best]})")
print(f"Worst: {worst} ({sales[worst]})")
`},
tb_mm_record:{title:'Top performer',lvl:'l2',task:'Using <code>max</code>/<code>min</code> with a <code>lambda</code> key, print the top and bottom performers and the team total and average (1 decimal).',code:py`staff = [{"name": "Sara", "sales": 31}, {"name": "Omar", "sales": 44},
         {"name": "Lina", "sales": 27}, {"name": "Zaid", "sales": 38}]
`,tests:[T('','Top: Omar (44)\nBottom: Lina (27)\nTotal: 140\nAverage: 35.0')],
 sol:py`staff = [{"name": "Sara", "sales": 31}, {"name": "Omar", "sales": 44},
         {"name": "Lina", "sales": 27}, {"name": "Zaid", "sales": 38}]
top = max(staff, key=lambda s: s["sales"])
bottom = min(staff, key=lambda s: s["sales"])
total = sum([s["sales"] for s in staff])
print(f"Top: {top['name']} ({top['sales']})")
print(f"Bottom: {bottom['name']} ({bottom['sales']})")
print(f"Total: {total}")
print(f"Average: {total / len(staff):.1f}")
`},
tb_mm_range:{title:'Sensor summary',lvl:'l2',task:'Readings come on one line, space-separated (may be empty). Print min, max, range and average (1 decimal), or <code>No data</code>.',stdin:'21 19 25 18 30',code:'',
 tests:[T('21 19 25 18 30','Min: 18\nMax: 30\nRange: 12\nAverage: 22.6'),T('','No data'),T('7','Min: 7\nMax: 7\nRange: 0\nAverage: 7.0')],
 sol:py`readings = [int(x) for x in input("Readings: ").split()]
if not readings:
    print("No data")
else:
    print(f"Min: {min(readings)}")
    print(f"Max: {max(readings)}")
    print(f"Range: {max(readings) - min(readings)}")
    print(f"Average: {sum(readings) / len(readings):.1f}")
`},
tb_mm_boss:{title:'Boss: spending insights',lvl:'l5',task:'From the transactions, print: the category with the highest total spend; the single biggest transaction; the date with the most transactions (first if tied); and the average transaction (2 decimals).',spec:'Top category: rent (£950.00)\nBiggest: 2026-10-03 rent £950.00\nBusiest day: 2026-10-02 (3 transactions)\nAverage: £173.12',code:py`transactions = [
    ("2026-10-01", "food", 12.50),
    ("2026-10-02", "travel", 8.40),
    ("2026-10-02", "food", 30.00),
    ("2026-10-02", "fun", 22.00),
    ("2026-10-03", "rent", 950.00),
    ("2026-10-04", "food", 15.80),
]
`,tests:[T('','Top category: rent (£950.00)\nBiggest: 2026-10-03 rent £950.00\nBusiest day: 2026-10-02 (3 transactions)\nAverage: £173.12')],
 sol:py`transactions = [
    ("2026-10-01", "food", 12.50),
    ("2026-10-02", "travel", 8.40),
    ("2026-10-02", "food", 30.00),
    ("2026-10-02", "fun", 22.00),
    ("2026-10-03", "rent", 950.00),
    ("2026-10-04", "food", 15.80),
]
by_cat = {}
by_day = {}
for date, cat, amount in transactions:
    by_cat[cat] = by_cat.get(cat, 0) + amount
    by_day[date] = by_day.get(date, 0) + 1
top = max(by_cat, key=by_cat.get)
big = max(transactions, key=lambda t: t[2])
busy = max(by_day, key=by_day.get)
avg = sum([t[2] for t in transactions]) / len(transactions)
print(f"Top category: {top} (£{by_cat[top]:.2f})")
print(f"Biggest: {big[0]} {big[1]} £{big[2]:.2f}")
print(f"Busiest day: {busy} ({by_day[busy]} transactions)")
print(f"Average: £{avg:.2f}")
`},
tb_aa_password:{title:'Password rules',lvl:'l2',task:'Check four rules: at least 8 characters, an upper-case letter, a digit, a symbol (not a letter or digit). Print a line for each <b>failed</b> rule in that order, or <code>Strong</code>. Use <code>any()</code>.',stdin:'tea4two',code:'pw = input("Password: ")\n',
 tests:[T('tea4two','Too short\nNeeds an upper-case letter\nNeeds a symbol'),T('Tea4two!','Strong'),T('ABCDEFGH','Needs a digit\nNeeds a symbol')],
 sol:py`pw = input("Password: ")
problems = []
if len(pw) < 8:
    problems.append("Too short")
if not any(c.isupper() for c in pw):
    problems.append("Needs an upper-case letter")
if not any(c.isdigit() for c in pw):
    problems.append("Needs a digit")
if not any(not c.isalnum() for c in pw):
    problems.append("Needs a symbol")
if problems:
    for p in problems:
        print(p)
else:
    print("Strong")
`},
tb_aa_form:{title:'Is the form complete?',lvl:'l2',task:'Read name, email and phone (in that order) into a dict. If <b>all</b> are filled in (after stripping) print <code>Thanks!</code>, otherwise <code>Please fill in: email, phone</code> listing the missing fields in order.',stdin:'Sara\n \n07700 900123',code:'',
 tests:[T('Sara\n \n07700 900123','Please fill in: email'),T('Sara\nsara@x.com\n1','Thanks!'),T('\n\n','Please fill in: name, email, phone')],
 sol:py`form = {}
for field in ["name", "email", "phone"]:
    form[field] = input(f"{field}: ").strip()
if all(form.values()):
    print("Thanks!")
else:
    missing = [k for k, v in form.items() if not v]
    print("Please fill in: " + ", ".join(missing))
`},
tb_aa_sorted:{title:'Is it sorted?',lvl:'l3',task:'Use <code>all()</code> with <code>zip(nums, nums[1:])</code> to decide if the numbers are in non-decreasing order. Print <code>Sorted</code> or <code>Not sorted at position N</code> (1-based position of the first number that is smaller than the one before).',stdin:'1 3 3 7 9',code:'',
 tests:[T('1 3 3 7 9','Sorted'),T('1 5 4 6','Not sorted at position 3'),T('8','Sorted')],
 sol:py`nums = [int(x) for x in input("Numbers: ").split()]
if all(a <= b for a, b in zip(nums, nums[1:])):
    print("Sorted")
else:
    for i, (a, b) in enumerate(zip(nums, nums[1:]), 2):
        if a > b:
            print(f"Not sorted at position {i}")
            break
`},
tb_aa_boss:{title:'Boss: magic square',lvl:'l5',task:'Read 3 lines of 3 numbers. It\'s a magic square if it uses each of 1–9 exactly once and every row, column and both diagonals add up to the same total. Print <code>Magic</code> or <code>Not magic</code>. Build a list of all 8 sums and use <code>all()</code>.',stdin:'2 7 6\n9 5 1\n4 3 8',code:'',
 tests:[T('2 7 6\n9 5 1\n4 3 8','Magic'),T('1 2 3\n4 5 6\n7 8 9','Not magic'),T('5 5 5\n5 5 5\n5 5 5','Not magic')],
 sol:py`grid = []
for _ in range(3):
    grid.append([int(x) for x in input("Row: ").split()])
numbers = []
for row in grid:
    for n in row:
        numbers.append(n)
sums = [sum(row) for row in grid]
for c in range(3):
    sums.append(grid[0][c] + grid[1][c] + grid[2][c])
sums.append(grid[0][0] + grid[1][1] + grid[2][2])
sums.append(grid[0][2] + grid[1][1] + grid[2][0])
if sorted(numbers) == [1, 2, 3, 4, 5, 6, 7, 8, 9] and all(s == sums[0] for s in sums):
    print("Magic")
else:
    print("Not magic")
`},
tb_js_tags:{title:'Clean hashtags',lvl:'l1',task:'Input is comma-separated tags with messy spaces and case, maybe empty ones. Print them lower case, each with <code>#</code>, separated by spaces.',stdin:' Python, CS50 ,, Loops ',code:'',
 tests:[T(' Python, CS50 ,, Loops ','#python #cs50 #loops'),T('a','#a')],
 sol:py`raw = input("Tags: ")
tags = [t.strip().lower() for t in raw.split(",") if t.strip()]
print(" ".join(["#" + t for t in tags]))
`},
tb_js_log:{title:'Only the errors',lvl:'l2',task:'Print only the ERROR lines from the log as <code>TIME MESSAGE</code>. Use <code>split(" ", 3)</code> so the message stays in one piece.',code:py`log = [
    "2026-11-02 09:01:12 INFO Server started",
    "2026-11-02 09:17:03 ERROR Payment declined for order 1182",
    "2026-11-02 10:03:21 ERROR Database timeout after 30s",
    "2026-11-02 10:30:44 INFO User omar logged in",
]
`,tests:[T('','09:17:03 Payment declined for order 1182\n10:03:21 Database timeout after 30s')],
 sol:py`log = [
    "2026-11-02 09:01:12 INFO Server started",
    "2026-11-02 09:17:03 ERROR Payment declined for order 1182",
    "2026-11-02 10:03:21 ERROR Database timeout after 30s",
    "2026-11-02 10:30:44 INFO User omar logged in",
]
for line in log:
    date, time, level, message = line.split(" ", 3)
    if level == "ERROR":
        print(time, message)
`},
tb_js_english:{title:'Lists in plain English',lvl:'l2',task:'Write <code>english(items)</code> that returns: one item → <code>tea</code>; two → <code>tea and jam</code>; more → <code>tea, jam and milk</code>; none → <code>nothing</code>.',code:py`# write english(items) here


print(english([]))
print(english(["tea"]))
print(english(["tea", "jam"]))
print(english(["tea", "jam", "milk", "eggs"]))
`,tests:[T('','nothing\ntea\ntea and jam\ntea, jam, milk and eggs')],
 sol:py`def english(items):
    if len(items) == 0:
        return "nothing"
    if len(items) == 1:
        return items[0]
    return ", ".join(items[:-1]) + " and " + items[-1]


print(english([]))
print(english(["tea"]))
print(english(["tea", "jam"]))
print(english(["tea", "jam", "milk", "eggs"]))
`},
tb_js_wrap:{title:'Title case, properly',lvl:'l3',task:'Book titles capitalise every word except the small words <code>a, an, and, of, the, in, on</code>, unless the small word is the first word. Strip and lower-case first.',stdin:'  the LORD of the rings ',code:'small = ["a", "an", "and", "of", "the", "in", "on"]\n',
 tests:[T('  the LORD of the rings ','The Lord of the Rings'),T('a tale of two cities','A Tale of Two Cities'),T('war and peace','War and Peace')],
 sol:py`small = ["a", "an", "and", "of", "the", "in", "on"]
words = input("Title: ").strip().lower().split()
result = []
for i, w in enumerate(words):
    if i > 0 and w in small:
        result.append(w)
    else:
        result.append(w.capitalize())
print(" ".join(result))
`},
tb_js_boss:{title:'Boss: a real CSV line parser',lvl:'l5',task:'<code>split(",")</code> breaks on commas <i>inside</i> quotes. Write <code>parse(line)</code> that walks the line character by character, tracking whether you are inside quotes, and returns the list of fields (quotes removed; <code>""</code> inside quotes means one quote). The calls print each result.',code:py`# write parse(line) here


print(parse('Sara,42,London'))
print(parse('Sara,"London, UK",42'))
print(parse('"She said ""hi""",x'))
print(parse('a,,c'))
`,tests:[T('',"['Sara', '42', 'London']\n['Sara', 'London, UK', '42']\n['She said \"hi\"', 'x']\n['a', '', 'c']")],
 sol:py`def parse(line):
    fields = []
    current = ""
    quoted = False
    i = 0
    while i < len(line):
        ch = line[i]
        if quoted:
            if ch == '"':
                if i + 1 < len(line) and line[i + 1] == '"':
                    current += '"'
                    i += 1
                else:
                    quoted = False
            else:
                current += ch
        elif ch == '"':
            quoted = True
        elif ch == ",":
            fields.append(current)
            current = ""
        else:
            current += ch
        i += 1
    fields.append(current)
    return fields


print(parse('Sara,42,London'))
print(parse('Sara,"London, UK",42'))
print(parse('"She said ""hi""",x'))
print(parse('a,,c'))
`},
/* ---------------- dict toolkit */
tb_d_stock:{title:'Stock movements',lvl:'l2',task:'Start from the stock dict. Read moves like <code>tea -3</code> until <code>done</code> (new items allowed). Print the final stock A–Z as <code>item: qty</code>, adding <code> (check!)</code> to negatives.',stdin:'tea -3\njam 5\nmilk -9\ndone',code:'stock = {"tea": 10, "milk": 4}\n',
 tests:[T('tea -3\njam 5\nmilk -9\ndone','jam: 5\nmilk: -5 (check!)\ntea: 7'),T('done','milk: 4\ntea: 10')],
 sol:py`stock = {"tea": 10, "milk": 4}
while True:
    line = input("Move: ")
    if line == "done":
        break
    item, change = line.split()
    stock[item] = stock.get(item, 0) + int(change)
for item in sorted(stock):
    note = " (check!)" if stock[item] < 0 else ""
    print(f"{item}: {stock[item]}{note}")
`},
tb_d_group:{title:'Group by department',lvl:'l2',task:'Read <code>name,dept</code> lines until <code>done</code>. With <code>setdefault</code>, group names by department, then print <code>DEPT: name, name</code> in order of first appearance.',stdin:'Sara,IT\nOmar,HR\nLina,IT\ndone',code:'',
 tests:[T('Sara,IT\nOmar,HR\nLina,IT\ndone','IT: Sara, Lina\nHR: Omar'),T('done','')],extra:c=>/setdefault/.test(c)?null:'Use setdefault for the grouping.',
 sol:py`groups = {}
while True:
    line = input("Row: ")
    if line == "done":
        break
    name, dept = line.split(",")
    groups.setdefault(dept, []).append(name)
for dept, names in groups.items():
    print(f"{dept}: {', '.join(names)}")
`},
tb_d_settings:{title:'Settings with defaults',lvl:'l3',task:'Read <code>key=value</code> lines until <code>done</code>. Known keys override the defaults; unknown keys print <code>Unknown setting KEY</code> (repr). Finally print all settings A–Z as <code>key = value</code>.',stdin:'theme=dark\ncolour=red\ndecimals=3\ndone',code:'defaults = {"currency": "GBP", "decimals": "2", "theme": "light"}\n',
 tests:[T('theme=dark\ncolour=red\ndecimals=3\ndone',"Unknown setting 'colour'\ncurrency = GBP\ndecimals = 3\ntheme = dark"),T('done','currency = GBP\ndecimals = 2\ntheme = light')],
 sol:py`defaults = {"currency": "GBP", "decimals": "2", "theme": "light"}
settings = defaults.copy()
while True:
    line = input("Setting: ")
    if line == "done":
        break
    key, value = line.split("=", 1)
    if key in defaults:
        settings[key] = value
    else:
        print(f"Unknown setting {key!r}")
for key in sorted(settings):
    print(f"{key} = {settings[key]}")
`},
tb_d_boss:{title:'Boss: invert enrolments',lvl:'l5',task:'Turn student → courses into course → students. Print each course A–Z with its students A–Z and the count, then <code>Most popular: COURSE</code> (A–Z first if tied).',spec:'art (2): Lina, Omar\nmaths (3): Lina, Omar, Sara\n...',code:py`enrolled = {
    "Sara": ["maths", "python"],
    "Omar": ["art", "python", "maths"],
    "Lina": ["maths", "art", "python"],
    "Zaid": ["history"],
}
`,tests:[T('','art (2): Lina, Omar\nhistory (1): Zaid\nmaths (3): Lina, Omar, Sara\npython (3): Lina, Omar, Sara\nMost popular: maths')],
 sol:py`enrolled = {
    "Sara": ["maths", "python"],
    "Omar": ["art", "python", "maths"],
    "Lina": ["maths", "art", "python"],
    "Zaid": ["history"],
}
courses = {}
for student, subjects in enrolled.items():
    for course in subjects:
        courses.setdefault(course, []).append(student)
for course in sorted(courses):
    names = sorted(courses[course])
    print(f"{course} ({len(names)}): {', '.join(names)}")
best = min(sorted(courses), key=lambda c: -len(courses[c]))
print(f"Most popular: {best}")
`},
/* ---------------- format */
tb_f_invoice:{title:'Invoice',lvl:'l2',task:'Print the invoice exactly: item left-aligned in 14, qty right-aligned in 4, line total right-aligned in 10 with 2 decimals; a 28-dash rule; then the total with thousands separators, right-aligned so it lines up.',spec:'Laptop           1   1199.00\nMouse            2     39.98\nMonitor          2    459.98\n----------------------------\nTOTAL              £1,698.96',code:'items = [("Laptop", 1, 1199.00), ("Mouse", 2, 19.99), ("Monitor", 2, 229.99)]\n',
 tests:[T('','Laptop           1   1199.00\nMouse            2     39.98\nMonitor          2    459.98\n----------------------------\nTOTAL              £1,698.96')],
 sol:py`items = [("Laptop", 1, 1199.00), ("Mouse", 2, 19.99), ("Monitor", 2, 229.99)]
total = 0
for name, qty, price in items:
    line = qty * price
    total += line
    print(f"{name:<14}{qty:>4}{line:>10.2f}")
print("-" * 28)
print(f"{'TOTAL':<14}{'£' + format(total, ',.2f'):>14}")
`},
tb_f_growth:{title:'Growth report',lvl:'l2',task:'Read last year\'s and this year\'s revenue. Print both with commas and no decimals, then growth as a signed percentage with 1 decimal, e.g. <code>Growth: +12.5%</code>.',stdin:'80000\n90000',code:'',
 tests:[T('80000\n90000','Last year: £80,000\nThis year: £90,000\nGrowth: +12.5%'),T('50000\n48500','Last year: £50,000\nThis year: £48,500\nGrowth: -3.0%')],
 sol:py`last = float(input("Last year: "))
this = float(input("This year: "))
print(f"Last year: £{last:,.0f}")
print(f"This year: £{this:,.0f}")
print(f"Growth: {(this - last) / last:+.1%}")
`},
tb_f_table:{title:'Auto-width table',lvl:'l3',task:'Print a table whose Name column is exactly as wide as the longest name plus 2. Columns: Name (left), Age (right, width 4), City (left, after one space). Header first, then a dash rule as long as the header line.',spec:'Name                 Age City\n----------------------------\nSara                  31 Leeds\n...',code:py`people = [("Sara", 31, "Leeds"), ("Muhammad Ali", 27, "York"), ("Lina", 45, "Hull")]
`,tests:[T('','Name           Age City\n-----------------------\nSara            31 Leeds\nMuhammad Ali    27 York\nLina            45 Hull')],
 sol:py`people = [("Sara", 31, "Leeds"), ("Muhammad Ali", 27, "York"), ("Lina", 45, "Hull")]
w = max(len(name) for name, _, _ in people) + 2
header = f"{'Name':<{w}}{'Age':>4} City"
print(header)
print("-" * len(header))
for name, age, city in people:
    print(f"{name:<{w}}{age:>4} {city}")
`},
tb_f_boss:{title:'Boss: bank statement',lvl:'l5',task:'Print a statement with a running balance. Description: left, width 16, cut to 13 characters + <code>...</code> if longer than 16. Amount: signed, 2 decimals, right width 10. Balance: commas, 2 decimals, right width 12. Start balance is in the code.',spec:'Opening balance: £1,200.00\n2026-10-01 Salary            +2400.00    3,600.00\n...',code:py`opening = 1200.00
moves = [
    ("2026-10-01", "Salary", 2400.00),
    ("2026-10-02", "Tesco Superstore Leeds", -42.15),
    ("2026-10-05", "Rent", -950.00),
    ("2026-10-09", "Refund from shop", 19.99),
]
`,tests:[T('','Opening balance: £1,200.00\n2026-10-01 Salary            +2400.00    3,600.00\n2026-10-02 Tesco Superst...    -42.15    3,557.85\n2026-10-05 Rent               -950.00    2,607.85\n2026-10-09 Refund from shop    +19.99    2,627.84\nClosing balance: £2,627.84')],
 sol:py`opening = 1200.00
moves = [
    ("2026-10-01", "Salary", 2400.00),
    ("2026-10-02", "Tesco Superstore Leeds", -42.15),
    ("2026-10-05", "Rent", -950.00),
    ("2026-10-09", "Refund from shop", 19.99),
]
balance = opening
print(f"Opening balance: £{balance:,.2f}")
for date, desc, amount in moves:
    if len(desc) > 16:
        desc = desc[:13] + "..."
    balance += amount
    print(f"{date} {desc:<16}{amount:>+10.2f}{balance:>12,.2f}")
print(f"Closing balance: £{balance:,.2f}")
`},
/* ---------------- WEEK 2 BOSS */
b2_rank:{title:'Competition ranking',lvl:'l5',task:'Read <code>name score</code> lines until <code>done</code>. Sort by score (high first), ties A–Z. Equal scores share a rank and the next rank skips ("1, 2, 2, 4"). Print <code>RANK. NAME (SCORE)</code>.',stdin:'Sara 88\nOmar 95\nLina 88\nZaid 70\ndone',code:'',
 tests:[T('Sara 88\nOmar 95\nLina 88\nZaid 70\ndone','1. Omar (95)\n2. Lina (88)\n2. Sara (88)\n4. Zaid (70)'),T('A 5\nB 5\nC 5\ndone','1. A (5)\n1. B (5)\n1. C (5)')],
 sol:py`people = []
while True:
    line = input("Entry: ")
    if line == "done":
        break
    name, score = line.split()
    people.append((name, int(score)))
people.sort(key=lambda p: (-p[1], p[0]))
rank = 0
for i, (name, score) in enumerate(people, 1):
    if i == 1 or score != people[i - 2][1]:
        rank = i
    print(f"{rank}. {name} ({score})")
`},
b2_caesar:{title:'Caesar cipher',lvl:'l5',task:'Ask for <code>e</code> or <code>d</code> (encrypt/decrypt), a shift, and text. Shift letters round the alphabet, keep case, leave everything else. New tools, explained here: <code>ord("a")</code> gives the number for that character (97) and <code>chr(97)</code> turns a number back into <code>"a"</code>. So the position of a letter in the alphabet is <code>ord(ch) - ord("a")</code>; add the shift, wrap round with <code>% 26</code>, and convert back with <code>chr</code>.',stdin:'e\n3\nHello, World!',code:'',
 tests:[T('e\n3\nHello, World!','Khoor, Zruog!'),T('d\n3\nKhoor, Zruog!','Hello, World!'),T('e\n27\nxyz','yza')],
 sol:py`mode = input("e or d: ").strip()
shift = int(input("Shift: "))
text = input("Text: ")
if mode == "d":
    shift = -shift
out = ""
for ch in text:
    if ch.isalpha():
        base = ord("A") if ch.isupper() else ord("a")
        out += chr((ord(ch) - base + shift) % 26 + base)
    else:
        out += ch
print(out)
`},
b2_luhn:{title:'Card number check (Luhn)',lvl:'l5',task:'Real payment forms check card numbers with the Luhn algorithm before contacting the bank. Remove spaces. Starting from the <b>rightmost</b> digit, double every second digit; if a doubled value is over 9 subtract 9; add everything up. Valid if the total ends in 0 and there are 13–19 digits. Print <code>Valid</code> or <code>Invalid</code>. To walk from the right, loop <code>i</code> over <code>range(len(number))</code> and read <code>number[len(number) - 1 - i]</code>. (These are standard test numbers, not real cards.)',stdin:'4539 1488 0343 6467',code:'',
 tests:[T('4539 1488 0343 6467','Valid'),T('4539 1488 0343 6468','Invalid'),T('79927398713','Invalid'),T('4111 1111 1111 1111','Valid')],
 sol:py`number = input("Card: ").replace(" ", "")
total = 0
for i in range(len(number)):
    d = int(number[len(number) - 1 - i])
    if i % 2 == 1:
        d *= 2
        if d > 9:
            d -= 9
    total += d
if number.isdigit() and 13 <= len(number) <= 19 and total % 10 == 0:
    print("Valid")
else:
    print("Invalid")
`},
b2_anagram:{title:'Anagram groups',lvl:'l5',task:'Group the input words (lower case) that are anagrams of each other. Hint: <code>"".join(sorted(word))</code> is the same for all anagrams; use it as a dict key. Print groups with 2+ words in order of first appearance, words joined by <code>, </code>; or <code>No anagrams</code>.',stdin:'listen enlist google tinsel banana silent elgoog',code:'',
 tests:[T('listen enlist google tinsel banana silent elgoog','listen, enlist, tinsel, silent\ngoogle, elgoog'),T('a b c','No anagrams')],
 sol:py`groups = {}
for word in input("Words: ").lower().split():
    key = "".join(sorted(word))
    groups.setdefault(key, []).append(word)
found = False
for words in groups.values():
    if len(words) > 1:
        print(", ".join(words))
        found = True
if not found:
    print("No anagrams")
`},
b2_streak:{title:'Longest goal streak',lvl:'l5',task:'Daily steps, space-separated. Find the longest run of consecutive days with 10,000+ steps (first one if tied). Print <code>Longest streak: N days (day A to day B)</code> with 1-based days, or <code>No goal days</code>.',stdin:'8000 12000 11000 9000 10000 15000 10500 3000',code:'',
 tests:[T('8000 12000 11000 9000 10000 15000 10500 3000','Longest streak: 3 days (day 5 to day 7)'),T('1 2 3','No goal days'),T('10000','Longest streak: 1 days (day 1 to day 1)')],
 sol:py`steps = [int(x) for x in input("Steps: ").split()]
best_len = 0
best_start = 0
run = 0
for i, s in enumerate(steps):
    if s >= 10000:
        run += 1
        if run > best_len:
            best_len = run
            best_start = i - run + 1
    else:
        run = 0
if best_len == 0:
    print("No goal days")
else:
    print(f"Longest streak: {best_len} days (day {best_start + 1} to day {best_start + best_len})")
`},
b2_wrap:{title:'Word wrap in a box',lvl:'l5',task:'Ask for a width, then text. Fill each line with as many whole words as fit (words separated by single spaces; assume no word is longer than the width). Print every line inside a box: <code>|line padded to width|</code>.',stdin:'16\nThe quick brown fox jumps over the lazy dog',code:'',
 tests:[T('16\nThe quick brown fox jumps over the lazy dog','|The quick brown |\n|fox jumps over  |\n|the lazy dog    |'),T('5\na bb ccc','|a bb |\n|ccc  |')],
 sol:py`width = int(input("Width: "))
words = input("Text: ").split()
lines = []
current = ""
for w in words:
    if current == "":
        current = w
    elif len(current) + 1 + len(w) <= width:
        current += " " + w
    else:
        lines.append(current)
        current = w
if current:
    lines.append(current)
for line in lines:
    print(f"|{line:<{width}}|")
`},
b2_pascal:{title:'Pascal\'s triangle',lvl:'l5',task:'Print N rows. Each row starts and ends with 1; each inner number is the sum of the two above it. Build each row from the previous one. Print numbers space-separated.',stdin:'5',code:'',
 tests:[T('5','1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1'),T('1','1')],
 sol:py`n = int(input("Rows: "))
row = [1]
for _ in range(n):
    print(" ".join(str(x) for x in row))
    row = [1] + [a + b for a, b in zip(row, row[1:])] + [1]
`},
b2_pages:{title:'Pagination',lvl:'l5',task:'Ask for page size and a page number. Print <code>Page P of N</code>, then the items on that page numbered by their overall position (<code>11. item</code>). Out-of-range page → <code>No such page</code>. Pages are 1-based; the last page may be shorter.',stdin:'4\n3',code:'items = ["apple", "banana", "cherry", "date", "elder", "fig", "grape", "honeydew", "kiwi", "lemon"]\n',
 tests:[T('4\n3','Page 3 of 3\n9. kiwi\n10. lemon'),T('4\n1','Page 1 of 3\n1. apple\n2. banana\n3. cherry\n4. date'),T('5\n3','No such page'),T('10\n1','Page 1 of 1\n1. apple\n2. banana\n3. cherry\n4. date\n5. elder\n6. fig\n7. grape\n8. honeydew\n9. kiwi\n10. lemon')],
 sol:py`items = ["apple", "banana", "cherry", "date", "elder", "fig", "grape", "honeydew", "kiwi", "lemon"]
size = int(input("Page size: "))
page = int(input("Page: "))
pages = (len(items) + size - 1) // size
if page < 1 or page > pages:
    print("No such page")
else:
    print(f"Page {page} of {pages}")
    start = (page - 1) * size
    for n, item in enumerate(items[start:start + size], start + 1):
        print(f"{n}. {item}")
`},
b2_ttt:{title:'Noughts and crosses judge',lvl:'l5',task:'Read 3 lines of 3 characters (<code>X</code>, <code>O</code> or <code>.</code>). Print <code>X wins</code>, <code>O wins</code>, <code>Draw</code> (full board, no winner) or <code>In progress</code>. Build the 8 lines (3 rows, 3 columns, 2 diagonals) as strings.',stdin:'XOX\n.X.\nO.X',code:'',
 tests:[T('XOX\n.X.\nO.X','X wins'),T('XOX\nXOO\nOXX','Draw'),T('OOO\nX.X\n...','O wins'),T('X..\n...\n..O','In progress'),T('XO.\nXO.\n.O.','O wins')],
 sol:py`b = [input("Row: ").strip() for _ in range(3)]
lines = b[:]
lines += ["".join(b[r][c] for r in range(3)) for c in range(3)]
lines.append(b[0][0] + b[1][1] + b[2][2])
lines.append(b[0][2] + b[1][1] + b[2][0])
if "XXX" in lines:
    print("X wins")
elif "OOO" in lines:
    print("O wins")
elif all("." not in row for row in b):
    print("Draw")
else:
    print("In progress")
`},
b2_reconcile:{title:'Bank reconciliation',lvl:'l5',task:'Accountants match the bank statement to their own ledger. Amounts can repeat, so count them (a tally per amount). Print amounts that appear more times in the bank than the ledger as <code>Bank only: AMOUNT xCOUNT</code>, then the reverse as <code>Ledger only: …</code>, both in ascending amount order; or <code>All matched</code>.',code:py`bank = [12.50, 40.00, 12.50, 99.99, 5.00, 40.00]
ledger = [40.00, 12.50, 99.99, 5.00, 7.25]
`,tests:[T('','Bank only: 12.50 x1\nBank only: 40.00 x1\nLedger only: 7.25 x1')],
 sol:py`bank = [12.50, 40.00, 12.50, 99.99, 5.00, 40.00]
ledger = [40.00, 12.50, 99.99, 5.00, 7.25]
b = {}
for a in bank:
    b[a] = b.get(a, 0) + 1
l = {}
for a in ledger:
    l[a] = l.get(a, 0) + 1
problems = 0
for amount in sorted(b):
    extra = b[amount] - l.get(amount, 0)
    if extra > 0:
        print(f"Bank only: {amount:.2f} x{extra}")
        problems += 1
for amount in sorted(l):
    extra = l[amount] - b.get(amount, 0)
    if extra > 0:
        print(f"Ledger only: {amount:.2f} x{extra}")
        problems += 1
if problems == 0:
    print("All matched")
`},
b2_merge:{title:'Merge two shops\' stock',lvl:'l5',task:'Combine both shops\' stock (adding quantities). Print every item A–Z as <code>item: total (leeds A + york B)</code>, then <code>Only in Leeds: …</code> and <code>Only in York: …</code> (A–Z, separated by <code>, </code>). Build the list of all items with a loop, adding each item only once.',code:py`leeds = {"tea": 12, "jam": 4, "milk": 9}
york = {"tea": 3, "bread": 7, "milk": 1, "eggs": 6}
`,tests:[T('','bread: 7 (leeds 0 + york 7)\neggs: 6 (leeds 0 + york 6)\njam: 4 (leeds 4 + york 0)\nmilk: 10 (leeds 9 + york 1)\ntea: 15 (leeds 12 + york 3)\nOnly in Leeds: jam\nOnly in York: bread, eggs')],
 sol:py`leeds = {"tea": 12, "jam": 4, "milk": 9}
york = {"tea": 3, "bread": 7, "milk": 1, "eggs": 6}
items = []
for item in leeds:
    items.append(item)
for item in york:
    if item not in items:
        items.append(item)
for item in sorted(items):
    a = leeds.get(item, 0)
    b = york.get(item, 0)
    print(f"{item}: {a + b} (leeds {a} + york {b})")
only_leeds = sorted([i for i in leeds if i not in york])
only_york = sorted([i for i in york if i not in leeds])
print("Only in Leeds: " + ", ".join(only_leeds))
print("Only in York: " + ", ".join(only_york))
`},
b2_spiral:{title:'Number spiral',lvl:'l5',task:'Fill an N×N grid with 1 to N² in a clockwise spiral starting top-left, then print each row with every number right-aligned in width 3. Make the grid with <code>[[0] * n for _ in range(n)]</code>, then move right/down/left/up, turning when you hit the edge or a filled cell.',stdin:'4',code:'',
 tests:[T('4','  1  2  3  4\n 12 13 14  5\n 11 16 15  6\n 10  9  8  7'),T('1','  1'),T('3','  1  2  3\n  8  9  4\n  7  6  5')],
 sol:py`n = int(input("N: "))
grid = [[0] * n for _ in range(n)]
moves = [(0, 1), (1, 0), (0, -1), (-1, 0)]
r = c = d = 0
for k in range(1, n * n + 1):
    grid[r][c] = k
    nr, nc = r + moves[d][0], c + moves[d][1]
    if not (0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0):
        d = (d + 1) % 4
        nr, nc = r + moves[d][0], c + moves[d][1]
    r, c = nr, nc
for row in grid:
    print("".join(f"{x:3}" for x in row))
`},
b2_roman:{title:'Roman numerals',lvl:'l5',task:'Convert 1–3999 to Roman numerals. Loop over value/symbol pairs from biggest to smallest (including 900 CM, 400 CD, 90 XC, 40 XL, 9 IX, 4 IV) and subtract while you can.',stdin:'1994',code:'',
 tests:[T('1994','MCMXCIV'),T('2026','MMXXVI'),T('4','IV'),T('3999','MMMCMXCIX')],
 sol:py`n = int(input("Number: "))
pairs = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"),
         (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
out = ""
for value, symbol in pairs:
    while n >= value:
        out += symbol
        n -= value
print(out)
`},
b2_histogram:{title:'Score histogram',lvl:'l5',task:'Scores (0–100) on one line. Count them in bands of 10 (90–100 is one band). Print every band from the lowest used band to the highest as <code> 50-59 | ### 3</code>: band start right-aligned in 3, end left-aligned in 3.',stdin:'55 61 67 72 58 90 100 53',code:'',
 tests:[T('55 61 67 72 58 90 100 53',' 50-59 | ### 3\n 60-69 | ## 2\n 70-79 | # 1\n 80-89 |  0\n 90-100| ## 2'),T('5','  0-9  | # 1')],
 sol:py`scores = [int(x) for x in input("Scores: ").split()]
bands = {}
for s in scores:
    b = min(s // 10, 9)
    bands[b] = bands.get(b, 0) + 1
for b in range(min(bands), max(bands) + 1):
    lo = b * 10
    hi = 100 if b == 9 else lo + 9
    n = bands.get(b, 0)
    print(f"{lo:>3}-{hi:<3}| {'#' * n} {n}")
`},
/* ---------------- PROJECTS */
pj_log:{title:'Project: server log analyser',lvl:'proj',files:{'server.log':SERVER_LOG},code:py`# Your log analyser. Read server.log and build the report step by step.
with open("server.log") as f:
    lines = f.read().splitlines()
`,stages:[
 {title:'Count levels',task:'Your manager wants a quick health check. Print how many lines there are for each level in this exact order: <code>INFO: n</code>, <code>WARNING: n</code>, <code>ERROR: n</code>. Each line looks like <code>DATE TIME LEVEL message</code>.',
  tests:[{inp:'',exp:'INFO: 4\nWARNING: 2\nERROR: 6',label:'counts for server.log'},{inp:'',files:{'server.log':SERVER_LOG2},exp:'INFO: 1\nWARNING: 1\nERROR: 3',label:'counts for a different log (no hard-coding!)'}],
  sol:py`with open("server.log") as f:
    lines = f.read().splitlines()

levels = {"INFO": 0, "WARNING": 0, "ERROR": 0}
for line in lines:
    date, time, level, message = line.split(" ", 3)
    levels[level] += 1
for level, n in levels.items():
    print(f"{level}: {n}")
`},
 {title:'Errors by hour',task:'Next they ask when errors happen. After the counts, print <code>Errors by hour:</code> and then <code>HH: n</code> for each hour that had errors, in time order.',
  tests:[{inp:'',exp:'Errors by hour:\n09: 1\n10: 2\n11: 2\n12: 1',label:'server.log'},{inp:'',files:{'server.log':SERVER_LOG2},exp:'Errors by hour:\n08: 2\n14: 1',label:'another log'}],
  sol:py`with open("server.log") as f:
    lines = f.read().splitlines()

levels = {"INFO": 0, "WARNING": 0, "ERROR": 0}
by_hour = {}
for line in lines:
    date, time, level, message = line.split(" ", 3)
    levels[level] += 1
    if level == "ERROR":
        hour = time[:2]
        by_hour[hour] = by_hour.get(hour, 0) + 1
for level, n in levels.items():
    print(f"{level}: {n}")
print("Errors by hour:")
for hour in sorted(by_hour):
    print(f"{hour}: {by_hour[hour]}")
`},
 {title:'Top errors',task:'Now: which errors should engineers fix first? After the hours, print <code>Top errors:</code> then up to 3 lines <code>Nx message</code>, most frequent first (ties: the one that appeared first in the log comes first).',
  tests:[{inp:'',exp:'Top errors:\n3x Payment declined\n2x Database timeout\n1x Invalid coupon',label:'server.log'},{inp:'',files:{'server.log':SERVER_LOG2},exp:'Top errors:\n2x Disk full\n1x Timeout',label:'another log'}],
  sol:py`with open("server.log") as f:
    lines = f.read().splitlines()

levels = {"INFO": 0, "WARNING": 0, "ERROR": 0}
by_hour = {}
messages = {}
for line in lines:
    date, time, level, message = line.split(" ", 3)
    levels[level] += 1
    if level == "ERROR":
        hour = time[:2]
        by_hour[hour] = by_hour.get(hour, 0) + 1
        messages[message] = messages.get(message, 0) + 1
for level, n in levels.items():
    print(f"{level}: {n}")
print("Errors by hour:")
for hour in sorted(by_hour):
    print(f"{hour}: {by_hour[hour]}")
print("Top errors:")
for message, n in sorted(messages.items(), key=lambda m: m[1], reverse=True)[:3]:
    print(f"{n}x {message}")
`},
 {title:'Save the report',task:'Finally, save the level counts to <code>report.csv</code> with the header <code>level,count</code> and one row per level (INFO, WARNING, ERROR order), then print <code>Report saved</code> as the last line.',
  tests:[{inp:'',file:'report.csv',exp:'level,count\nINFO,4\nWARNING,2\nERROR,6',label:'report.csv for server.log'},{inp:'',exp:'Report saved',label:'prints Report saved last'},{inp:'',files:{'server.log':SERVER_LOG2},file:'report.csv',exp:'level,count\nINFO,1\nWARNING,1\nERROR,3',label:'report.csv for another log'}],
  sol:py`with open("server.log") as f:
    lines = f.read().splitlines()

levels = {"INFO": 0, "WARNING": 0, "ERROR": 0}
by_hour = {}
messages = {}
for line in lines:
    date, time, level, message = line.split(" ", 3)
    levels[level] += 1
    if level == "ERROR":
        hour = time[:2]
        by_hour[hour] = by_hour.get(hour, 0) + 1
        messages[message] = messages.get(message, 0) + 1
for level, n in levels.items():
    print(f"{level}: {n}")
print("Errors by hour:")
for hour in sorted(by_hour):
    print(f"{hour}: {by_hour[hour]}")
print("Top errors:")
for message, n in sorted(messages.items(), key=lambda m: m[1], reverse=True)[:3]:
    print(f"{n}x {message}")

with open("report.csv", "w") as f:
    f.write("level,count\n")
    for level, n in levels.items():
        f.write(f"{level},{n}\n")
print("Report saved")
`}]},
pj_grades:{title:'Project: gradebook',lvl:'proj',stdin:'Sara,88\nOmar,95\nbad line\nLina,88\nZaid,140\nNoor,49\nAli,72\ndone',code:py`# Read "name,score" lines until done, then build the gradebook step by step.
`,stages:[
 {title:'Validate input',task:'Teachers paste messy data. Read lines until <code>done</code>. A valid line has exactly one comma, a non-empty name and a whole-number score from 0 to 100 (strip both parts). For each invalid line print <code>Skipped line N: RAW</code> (N counts every line read, starting at 1; RAW as repr). At the end print <code>Valid students: K</code>.',
  tests:[T('Sara,88\nOmar,95\nbad line\nLina,88\nZaid,140\nNoor,49\nAli,72\ndone',"Skipped line 3: 'bad line'\nSkipped line 5: 'Zaid,140'\nValid students: 5"),T(',50\nA,x\nB,-1\nC, 7 \ndone',"Skipped line 1: ',50'\nSkipped line 2: 'A,x'\nSkipped line 3: 'B,-1'\nValid students: 1")],
  sol:py`students = []
n = 0
while True:
    raw = input("Line: ")
    if raw == "done":
        break
    n += 1
    parts = raw.split(",")
    ok = len(parts) == 2
    if ok:
        name = parts[0].strip()
        score = parts[1].strip()
        ok = name != "" and score.isdigit() and int(score) <= 100
    if ok:
        students.append((name, int(score)))
    else:
        print(f"Skipped line {n}: {raw!r}")
print(f"Valid students: {len(students)}")
`},
 {title:'Statistics',task:'After the validation lines, print <code>Average: X</code> (1 decimal), <code>Highest: NAME (S)</code> and <code>Lowest: NAME (S)</code> (first in input order if tied).',
  tests:[T('Sara,88\nOmar,95\nbad line\nLina,88\nZaid,140\nNoor,49\nAli,72\ndone','Valid students: 5\nAverage: 78.4\nHighest: Omar (95)\nLowest: Noor (49)'),T('A,10\nB,10\ndone','Average: 10.0\nHighest: A (10)\nLowest: A (10)')],
  sol:py`students = []
n = 0
while True:
    raw = input("Line: ")
    if raw == "done":
        break
    n += 1
    parts = raw.split(",")
    ok = len(parts) == 2
    if ok:
        name = parts[0].strip()
        score = parts[1].strip()
        ok = name != "" and score.isdigit() and int(score) <= 100
    if ok:
        students.append((name, int(score)))
    else:
        print(f"Skipped line {n}: {raw!r}")
print(f"Valid students: {len(students)}")
scores = [s for _, s in students]
print(f"Average: {sum(scores) / len(scores):.1f}")
top = max(students, key=lambda s: s[1])
low = min(students, key=lambda s: s[1])
print(f"Highest: {top[0]} ({top[1]})")
print(f"Lowest: {low[0]} ({low[1]})")
`},
 {title:'Grade distribution',task:'Then print the distribution: <code>A: n</code>, <code>B: n</code>, <code>C: n</code>, <code>F: n</code> (A 70+, B 60–69, C 50–59, F below 50), always all four.',
  tests:[T('Sara,88\nOmar,95\nbad line\nLina,88\nZaid,140\nNoor,49\nAli,72\ndone','A: 4\nB: 0\nC: 0\nF: 1'),T('A,60\nB,50\nC,69\ndone','A: 0\nB: 2\nC: 1\nF: 0')],
  sol:py`students = []
n = 0
while True:
    raw = input("Line: ")
    if raw == "done":
        break
    n += 1
    parts = raw.split(",")
    ok = len(parts) == 2
    if ok:
        name = parts[0].strip()
        score = parts[1].strip()
        ok = name != "" and score.isdigit() and int(score) <= 100
    if ok:
        students.append((name, int(score)))
    else:
        print(f"Skipped line {n}: {raw!r}")
print(f"Valid students: {len(students)}")
scores = [s for _, s in students]
print(f"Average: {sum(scores) / len(scores):.1f}")
top = max(students, key=lambda s: s[1])
low = min(students, key=lambda s: s[1])
print(f"Highest: {top[0]} ({top[1]})")
print(f"Lowest: {low[0]} ({low[1]})")
grades = {"A": 0, "B": 0, "C": 0, "F": 0}
for s in scores:
    if s >= 70:
        grades["A"] += 1
    elif s >= 60:
        grades["B"] += 1
    elif s >= 50:
        grades["C"] += 1
    else:
        grades["F"] += 1
for g, count in grades.items():
    print(f"{g}: {count}")
`},
 {title:'Ranked list',task:'Finally print <code>Ranking:</code> and every student as <code>RANK. NAME SCORE</code>, highest first, ties A–Z sharing a rank (1, 2, 2, 4 style).',
  tests:[T('Sara,88\nOmar,95\nbad line\nLina,88\nZaid,140\nNoor,49\nAli,72\ndone','Ranking:\n1. Omar 95\n2. Lina 88\n2. Sara 88\n4. Ali 72\n5. Noor 49'),T('B,5\nA,5\ndone','Ranking:\n1. A 5\n1. B 5')],
  sol:py`students = []
n = 0
while True:
    raw = input("Line: ")
    if raw == "done":
        break
    n += 1
    parts = raw.split(",")
    ok = len(parts) == 2
    if ok:
        name = parts[0].strip()
        score = parts[1].strip()
        ok = name != "" and score.isdigit() and int(score) <= 100
    if ok:
        students.append((name, int(score)))
    else:
        print(f"Skipped line {n}: {raw!r}")
print(f"Valid students: {len(students)}")
scores = [s for _, s in students]
print(f"Average: {sum(scores) / len(scores):.1f}")
top = max(students, key=lambda s: s[1])
low = min(students, key=lambda s: s[1])
print(f"Highest: {top[0]} ({top[1]})")
print(f"Lowest: {low[0]} ({low[1]})")
grades = {"A": 0, "B": 0, "C": 0, "F": 0}
for s in scores:
    if s >= 70:
        grades["A"] += 1
    elif s >= 60:
        grades["B"] += 1
    elif s >= 50:
        grades["C"] += 1
    else:
        grades["F"] += 1
for g, count in grades.items():
    print(f"{g}: {count}")
print("Ranking:")
ranked = sorted(students, key=lambda s: (-s[1], s[0]))
rank = 0
for i, (name, score) in enumerate(ranked, 1):
    if i == 1 or score != ranked[i - 2][1]:
        rank = i
    print(f"{rank}. {name} {score}")
`}]},
pj_cart:{title:'Project: shopping cart',lvl:'proj',stdin:'add tea 2\nadd cake 1\nadd pizza 1\nremove tea 1\nlist\nadd tea 3\ncheckout',code:py`prices = {"tea": 1.80, "coffee": 2.40, "cake": 3.10, "sandwich": 4.50}

# Read commands until "checkout".
`,stages:[
 {title:'add and checkout',task:'Build a till that reads commands until <code>checkout</code>. <code>add ITEM QTY</code> adds to the cart (an item can be added several times). For now ignore other commands. At checkout print <code>Total: £X.XX</code>.',
  tests:[T('add tea 2\nadd cake 1\ncheckout','Total: £6.70'),T('add tea 1\nadd tea 1\ncheckout','Total: £3.60'),T('checkout','Total: £0.00')],
  sol:py`prices = {"tea": 1.80, "coffee": 2.40, "cake": 3.10, "sandwich": 4.50}

cart = {}
while True:
    words = input("> ").split()
    if words == ["checkout"]:
        break
    if words[0] == "add":
        item, qty = words[1], int(words[2])
        cart[item] = cart.get(item, 0) + qty
total = sum(prices[item] * qty for item, qty in cart.items())
print(f"Total: £{total:.2f}")
`},
 {title:'Validation and remove',task:'Make it safe. <code>add</code> of an unknown product prints <code>Unknown product: ITEM</code> (repr). <code>remove ITEM QTY</code> reduces the quantity; if it reaches 0 or below, the item leaves the cart; removing something not in the cart prints <code>Not in cart: ITEM</code> (repr). Any other command prints <code>Unknown command</code>.',
  tests:[T('add pizza 1\nadd tea 2\nremove tea 1\nremove jam 1\nfly\ncheckout',"Unknown product: 'pizza'\nNot in cart: 'jam'\nUnknown command\nTotal: £1.80"),T('add cake 1\nremove cake 5\ncheckout','Total: £0.00')],
  sol:py`prices = {"tea": 1.80, "coffee": 2.40, "cake": 3.10, "sandwich": 4.50}

cart = {}
while True:
    words = input("> ").split()
    if words == ["checkout"]:
        break
    if words[0] == "add":
        item, qty = words[1], int(words[2])
        if item not in prices:
            print(f"Unknown product: {item!r}")
        else:
            cart[item] = cart.get(item, 0) + qty
    elif words[0] == "remove":
        item, qty = words[1], int(words[2])
        if item not in cart:
            print(f"Not in cart: {item!r}")
        else:
            cart[item] -= qty
            if cart[item] <= 0:
                del cart[item]
    else:
        print("Unknown command")
total = sum(prices[item] * qty for item, qty in cart.items())
print(f"Total: £{total:.2f}")
`},
 {title:'The list command',task:'Add <code>list</code>: print each cart line in the order items were first added, formatted <code>f"{item:<10}{qty:>3}  £{cost:>6.2f}"</code>, or <code>Cart is empty</code>.',
  tests:[T('add tea 2\nadd cake 1\nlist\ncheckout','tea         2  £  3.60\ncake        1  £  3.10\nTotal: £6.70'),T('list\ncheckout','Cart is empty\nTotal: £0.00')],
  sol:py`prices = {"tea": 1.80, "coffee": 2.40, "cake": 3.10, "sandwich": 4.50}

cart = {}
while True:
    words = input("> ").split()
    if words == ["checkout"]:
        break
    if words[0] == "add":
        item, qty = words[1], int(words[2])
        if item not in prices:
            print(f"Unknown product: {item!r}")
        else:
            cart[item] = cart.get(item, 0) + qty
    elif words[0] == "remove":
        item, qty = words[1], int(words[2])
        if item not in cart:
            print(f"Not in cart: {item!r}")
        else:
            cart[item] -= qty
            if cart[item] <= 0:
                del cart[item]
    elif words == ["list"]:
        if not cart:
            print("Cart is empty")
        for item, qty in cart.items():
            cost = prices[item] * qty
            print(f"{item:<10}{qty:>3}  £{cost:>6.2f}")
    else:
        print("Unknown command")
total = sum(prices[item] * qty for item, qty in cart.items())
print(f"Total: £{total:.2f}")
`},
 {title:'Offers at checkout',task:'Marketing adds two offers. (1) Tea: every 3rd tea is free (<code>tea_qty // 3</code> free teas). (2) If the total after the tea offer is £20 or more, 10% off. At checkout print <code>Subtotal: £X</code>, then <code>Tea offer: -£X</code> only if it applies, then <code>10% off: -£X</code> only if it applies, then <code>Total: £X</code> (all 2 decimals).',
  tests:[T('add tea 7\ncheckout','Subtotal: £12.60\nTea offer: -£3.60\nTotal: £9.00'),T('add sandwich 4\nadd tea 3\ncheckout','Subtotal: £23.40\nTea offer: -£1.80\n10% off: -£2.16\nTotal: £19.44'),T('add cake 1\ncheckout','Subtotal: £3.10\nTotal: £3.10')],
  sol:py`prices = {"tea": 1.80, "coffee": 2.40, "cake": 3.10, "sandwich": 4.50}

cart = {}
while True:
    words = input("> ").split()
    if words == ["checkout"]:
        break
    if words[0] == "add":
        item, qty = words[1], int(words[2])
        if item not in prices:
            print(f"Unknown product: {item!r}")
        else:
            cart[item] = cart.get(item, 0) + qty
    elif words[0] == "remove":
        item, qty = words[1], int(words[2])
        if item not in cart:
            print(f"Not in cart: {item!r}")
        else:
            cart[item] -= qty
            if cart[item] <= 0:
                del cart[item]
    elif words == ["list"]:
        if not cart:
            print("Cart is empty")
        for item, qty in cart.items():
            cost = prices[item] * qty
            print(f"{item:<10}{qty:>3}  £{cost:>6.2f}")
    else:
        print("Unknown command")
subtotal = sum(prices[item] * qty for item, qty in cart.items())
print(f"Subtotal: £{subtotal:.2f}")
total = subtotal
tea_free = cart.get("tea", 0) // 3 * prices["tea"]
if tea_free > 0:
    print(f"Tea offer: -£{tea_free:.2f}")
    total -= tea_free
if total >= 20:
    discount = total * 0.1
    print(f"10% off: -£{discount:.2f}")
    total -= discount
print(f"Total: £{total:.2f}")
`}]},
});
