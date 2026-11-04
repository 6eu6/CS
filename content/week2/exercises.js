/* Week 2 coded exercises */
const SOLEXP={"w2c_top":["Word,Count\nthat,13\nthe,11\nwe,10\nto,8\na,7\n"],"w2c_clean":["Word,Count\nthat,13\nthe,11\nwe,10\nto,8\nhere,8\na,7\nand,6\nnation,5\ncan,5\nof,5\nhave,5\nfor,5\nit,5\nnot,5\nthis,4\nin,4\ndedicated,4\nare,3\ngreat,3\nso,3\nwho,3\nis,3\ndead,3\nthey,3\nus,3\nshall,3\npeople,3\nour,2\non,2\nnew,2\nconceived,2\nmen,2\nwar,2\nor,2\nlong,2\ndedicate,2\ngave,2\nbut,2\nliving,2\nfar,2\nwhat,2\nrather,2\nbe,2\nwhich,2\nfrom,2\nthese,2\ndevotion,2\nfour,1\nscore,1\nseven,1\nyears,1\nago,1\nfathers,1\nbrought,1\nforth,1\ncontinent,1\nliberty,1\nproposition,1\nall,1\ncreated,1\nequal,1\nnow,1\nengaged,1\ncivil,1\ntesting,1\nwhether,1\nany,1\nendure,1\nmet,1\nbattle-field,1\ncome,1\nportion,1\nfield,1\nas,1\nfinal,1\nresting,1\nplace,1\nthose,1\ntheir,1\nlives,1\nmight,1\nlive,1\naltogether,1\nfitting,1\nproper,1\nshould,1\ndo,1\nlarger,1\nsense,1\nconsecrate,1\nhallow,1\nground,1\nbrave,1\nstruggled,1\nconsecrated,1\nabove,1\npoor,1\npower,1\nadd,1\ndetract,1\nworld,1\nwill,1\nlittle,1\nnote,1\nnor,1\nremember,1\nsay,1\nnever,1\nforget,1\ndid,1\nunfinished,1\nwork,1\nfought,1\nthus,1\nnobly,1\nadvanced,1\ntask,1\nremaining,1\nbefore,1\nhonored,1\ntake,1\nincreased,1\ncause,1\nlast,1\nfull,1\nmeasure,1\nhighly,1\nresolve,1\ndied,1\nvain,1\nunder,1\ngod,1\nbirth,1\nfreedom,1\ngovernment,1\nby,1\nperish,1\nearth,1\n"],"w2c_lengths":["Length,Words\n1,7\n2,50\n3,60\n4,58\n5,34\n6,24\n7,15\n8,6\n9,10\n10,4\n11,2\n12,1\n"]};
Object.assign(R,{
/* ---- while */
w2w_count:{title:'Count to N',lvl:'l1',task:'Ask for a whole number N and print 1 to N, one per line, using a <b>while</b> loop.',spec:'Input:  3\nOutput:\n1\n2\n3',stdin:'3',code:'n = int(input("N: "))\n',
 tests:[T('3','1\n2\n3'),T('1','1'),T('5','1\n2\n3\n4\n5')],extra:c=>/while/.test(c)?null:'Use a while loop for this one.',
 sol:py`n = int(input("N: "))
i = 1
while i <= n:
    print(i)
    i += 1
`},
w2w_evens:{title:'Even numbers',lvl:'l1',task:'Print the even numbers from 2 up to N (including N if it is even), one per line, with a while loop.',spec:'Input:  7\nOutput:\n2\n4\n6',stdin:'10',code:'',
 tests:[T('10','2\n4\n6\n8\n10'),T('7','2\n4\n6'),T('2','2')],extra:c=>/while/.test(c)?null:'Use a while loop.',
 sol:py`n = int(input("N: "))
i = 2
while i <= n:
    print(i)
    i += 2
`},
w2w_double:{title:'Doubling',lvl:'l2',task:'Start with 1 and keep doubling. How many doublings until the value is <b>greater than</b> N? Print the number of doublings and the final value. You don\'t know the count in advance, so it\'s a while loop.',spec:'Input:  100\nOutput:\nDoublings: 7\nValue: 128',stdin:'100',code:'',
 tests:[T('100','Doublings: 7\nValue: 128'),T('1','Doublings: 1\nValue: 2'),T('1000','Doublings: 10\nValue: 1024')],
 sol:py`n = int(input("N: "))
value = 1
doublings = 0
while value <= n:
    value *= 2
    doublings += 1
print(f"Doublings: {doublings}")
print(f"Value: {value}")
`},
w2w_digits:{title:'Digit sum (no strings)',lvl:'l2',task:'Add up the digits of a positive whole number <b>using maths only</b>: <code>n % 10</code> gives the last digit and <code>n // 10</code> removes it. Don\'t convert to a string.',spec:'Input:  4096\nOutput: 19',stdin:'4096',code:'',
 tests:[T('4096','19'),T('7','7'),T('1000','1'),T('99999','45')],extra:c=>/str\(|for\s+\w+\s+in/.test(c)?'Solve it with % and // in a while loop, without str() or a for loop.':null,
 sol:py`n = int(input("Number: "))
total = 0
while n > 0:
    total += n % 10
    n = n // 10
print(total)
`},
w2w_bug:{title:'Bug: the countdown never ends',lvl:'dbg',task:'Run it: it never stops (the runner cuts it off after 5 seconds). One line is missing. Add it.',stdin:'3',code:py`n = int(input("Count down from: "))
while n > 0:
    print(n)
print("Go!")
`,tests:[T('3','3\n2\n1\nGo!'),T('1','1\nGo!')],
 sol:py`n = int(input("Count down from: "))
while n > 0:
    print(n)
    n -= 1
print("Go!")
`},
/* ---- for */
w2f_table:{title:'Times table',lvl:'l1',task:'Print the 1 to 10 times table for N.',spec:'Input:  7\nOutput:\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70',stdin:'7',code:'',
 tests:[T('7',[1,2,3,4,5,6,7,8,9,10].map(i=>`7 x ${i} = ${7*i}`).join('\n')),T('3',[1,2,3,4,5,6,7,8,9,10].map(i=>`3 x ${i} = ${3*i}`).join('\n'))],
 sol:py`n = int(input("N: "))
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
`},
w2f_countdown:{title:'Countdown with range',lvl:'l1',task:'Count down from N to 1, then print <code>Go!</code>. Use <code>range</code> with a negative step.',stdin:'3',code:'',
 tests:[T('3','3\n2\n1\nGo!'),T('1','1\nGo!'),T('5','5\n4\n3\n2\n1\nGo!')],extra:c=>/range\([^)]*-1\s*\)/.test(c)?null:'Use range(..., ..., -1).',
 sol:py`n = int(input("From: "))
for i in range(n, 0, -1):
    print(i)
print("Go!")
`},
w2f_stars:{title:'Stars on one line',lvl:'l1',task:'Print N stars on one line using a <b>loop</b> and <code>end=""</code>. Don\'t use <code>"*" * n</code> this time.',spec:'Input:  5\nOutput: *****',stdin:'5',code:'',
 tests:[T('5','*****'),T('1','*'),T('8','********')],extra:c=>/["']\*["']\s*\*/.test(c)?'Use a loop with end="" instead of "*" * n.':null,
 sol:py`n = int(input("N: "))
for _ in range(n):
    print("*", end="")
print()
`},
w2f_vowels:{title:'Count vowels',lvl:'l2',task:'Count the vowels (a, e, i, o, u, in either case) in the input. Loop over the string one character at a time. Tip: <code>ch.lower() in "aeiou"</code> checks if a character is a vowel.',spec:'Input:  Banana\nOutput: Vowels: 3',stdin:'Banana',code:'',
 tests:[T('Banana','Vowels: 3'),T('rhythm','Vowels: 0'),T('AEIOU are vowels','Vowels: 9')],
 sol:py`text = input("Text: ")
count = 0
for ch in text:
    if ch.lower() in "aeiou":
        count += 1
print(f"Vowels: {count}")
`},
w2f_sumodd:{title:'Sum of odd numbers',lvl:'l2',task:'Add up all the odd numbers from 1 to N (inclusive). Use <code>range</code> with a step so the loop only visits odd numbers; no <code>if</code> needed.',spec:'Input:  10\nOutput: 25',stdin:'10',code:'',
 tests:[T('10','25'),T('7','16'),T('1','1')],extra:c=>/range\([^)]*,[^)]*,\s*2\s*\)/.test(c)?null:'Use range(1, ..., 2).',
 sol:py`n = int(input("N: "))
total = 0
for i in range(1, n + 1, 2):
    total += i
print(total)
`},
w2f_bug:{title:'Bug: one short',lvl:'dbg',task:'Should print 1 to N inclusive, but the last number is missing. Classic off-by-one. Fix it.',stdin:'4',code:py`n = int(input("N: "))
for i in range(1, n):
    print(i)
`,tests:[T('4','1\n2\n3\n4'),T('1','1')],
 sol:py`n = int(input("N: "))
for i in range(1, n + 1):
    print(i)
`},
/* ---- validation */
w2v_positive:{title:'Ask until positive',lvl:'l2',task:'Write <code>get_positive()</code> with a <code>while True</code> loop. It asks <code>Number: </code>; if the number is 0 or less it prints <code>Please enter a positive number.</code> and asks again; otherwise it <b>returns</b> the number. main prints <code>You chose N</code>.',stdin:'-3\n0\n5',code:py`def main():
    n = get_positive()
    print(f"You chose {n}")


def get_positive():
    ...


main()
`,tests:[T('-3\n0\n5','Please enter a positive number.\nPlease enter a positive number.\nYou chose 5','re-asks twice, then accepts 5'),T('8','You chose 8')],
 sol:py`def main():
    n = get_positive()
    print(f"You chose {n}")


def get_positive():
    while True:
        n = int(input("Number: "))
        if n > 0:
            return n
        print("Please enter a positive number.")


main()
`},
w2v_yesno:{title:'Yes or no',lvl:'l2',task:'Ask <code>Continue? </code> until the answer is y, yes, n or no (ignore case and spaces). Invalid answers print <code>Please answer yes or no.</code> Finally print <code>Yes</code> or <code>No</code>.',stdin:'maybe\n N ',code:'',
 tests:[T(' YES ','Yes'),T('maybe\n N ','Please answer yes or no.\nNo'),T('\nyes','Yes')],
 sol:py`while True:
    answer = input("Continue? ").strip().lower()
    if answer == "y" or answer == "yes":
        print("Yes")
        break
    elif answer == "n" or answer == "no":
        print("No")
        break
    print("Please answer yes or no.")
`},
w2v_total:{title:'Till: total until done',lvl:'l2',task:'A shop till. Read prices until the user types <code>done</code>. Then print how many items and the total.',spec:'Input:  1.50, 2, done\nOutput:\nItems: 2\nTotal: £3.50',stdin:'1.50\n2\ndone',code:'',
 tests:[T('1.50\n2\ndone','Items: 2\nTotal: £3.50'),T('done','Items: 0\nTotal: £0.00'),T('0.99\n0.99\n0.99\ndone','Items: 3\nTotal: £2.97')],
 sol:py`count = 0
total = 0
while True:
    item = input("Price: ")
    if item == "done":
        break
    total += float(item)
    count += 1
print(f"Items: {count}")
print(f"Total: £{total:.2f}")
`},
w2v_pin:{title:'Cash machine PIN',lvl:'l3',task:'The PIN is <code>4321</code>. The user has 3 attempts (prompt <code>PIN: </code>). Correct: print <code>Unlocked</code> and stop. Wrong with attempts left: print <code>Incorrect. N attempts left</code>. After the third wrong attempt: print <code>Card blocked</code>.',stdin:'1111\n4321',code:'',
 tests:[T('4321','Unlocked'),T('1111\n4321','Incorrect. 2 attempts left\nUnlocked'),T('1\n2\n3','Incorrect. 1 attempts left\nCard blocked'),T('1\n2\n4321','Unlocked')],
 sol:py`attempts = 3
while attempts > 0:
    pin = input("PIN: ")
    if pin == "4321":
        print("Unlocked")
        break
    attempts -= 1
    if attempts > 0:
        print(f"Incorrect. {attempts} attempts left")
    else:
        print("Card blocked")
`},
w2v_skip:{title:'Skip the blanks',lvl:'l2',task:'Read exactly 5 lines (<code>for _ in range(5)</code>). Print each non-blank line stripped and in capitals. Use <code>continue</code> to skip blank ones.',stdin:'apple\n\n  pear \n\nfig',code:'',
 tests:[T('apple\n\n  pear \n\nfig','APPLE\nPEAR\nFIG'),T('a\nb\nc\nd\ne','A\nB\nC\nD\nE'),T('\n\n\n\nx','X')],extra:c=>/continue/.test(c)?null:'Use continue to skip blank lines.',
 sol:py`for _ in range(5):
    line = input("Line: ").strip()
    if line == "":
        continue
    print(line.upper())
`},
/* ---- lists */
w2l_numbered:{title:'Numbered list',lvl:'l1',task:'Print the shopping list numbered from 1, like <code>1. milk</code>. Try <code>enumerate(items, 1)</code>.',code:py`items = ["milk", "eggs", "bread", "tea"]
`,tests:[T('','1. milk\n2. eggs\n3. bread\n4. tea')],
 sol:py`items = ["milk", "eggs", "bread", "tea"]
for i, item in enumerate(items, 1):
    print(f"{i}. {item}")
`},
w2l_stats:{title:'Number statistics',lvl:'l2',task:'Read numbers until <code>done</code>, storing them in a list. Then print the count, average (1 decimal), highest and lowest. If no numbers were entered, print <code>No numbers</code>.',spec:'Input:  4, 10, 7, done\nOutput:\nCount: 3\nAverage: 7.0\nHighest: 10\nLowest: 4',stdin:'4\n10\n7\ndone',code:'',
 tests:[T('4\n10\n7\ndone','Count: 3\nAverage: 7.0\nHighest: 10\nLowest: 4'),T('done','No numbers'),T('-2\n5\ndone','Count: 2\nAverage: 1.5\nHighest: 5\nLowest: -2')],
 sol:py`numbers = []
while True:
    text = input("Number: ")
    if text == "done":
        break
    numbers.append(int(text))
if len(numbers) == 0:
    print("No numbers")
else:
    print(f"Count: {len(numbers)}")
    print(f"Average: {sum(numbers) / len(numbers):.1f}")
    print(f"Highest: {max(numbers)}")
    print(f"Lowest: {min(numbers)}")
`},
w2l_filter:{title:'Warm days',lvl:'l2',task:'Input is temperatures separated by commas, like <code>14,22,19,25</code>. Turn them into a list of ints, then build a new list of the ones that are 20 or more. Print that list, then the count.',spec:'Input:  14,22,19,25\nOutput:\n[22, 25]\nWarm days: 2',stdin:'14,22,19,25',code:'',
 tests:[T('14,22,19,25','[22, 25]\nWarm days: 2'),T('5,6','[]\nWarm days: 0'),T('20,30,20','[20, 30, 20]\nWarm days: 3')],
 sol:py`temps = []
for t in input("Temps: ").split(","):
    temps.append(int(t))
warm = []
for t in temps:
    if t >= 20:
        warm.append(t)
print(warm)
print(f"Warm days: {len(warm)}")
`},
w2l_reverse:{title:'Reverse the words',lvl:'l2',task:'Print the words of the input in reverse order, separated by spaces. Do it with a loop: either loop with <code>range(len(words) - 1, -1, -1)</code>, or build a new list with <code>insert(0, w)</code>. Don\'t use <code>[::-1]</code> or <code>reverse</code>.',spec:'Input:  one two three\nOutput: three two one',stdin:'one two three',code:'',
 tests:[T('one two three','three two one'),T('solo','solo'),T('a b c d','d c b a')],extra:c=>/\[::-1\]|reverse/.test(c)?'Write the loop yourself, without [::-1] or reverse.':null,
 sol:py`words = input("Words: ").split()
for i in range(len(words) - 1, -1, -1):
    print(words[i], end=" ")
print()
`},
w2l_dedupe:{title:'Remove duplicates',lvl:'l3',task:'Print the unique words of the input, lower case, in the order they first appear, separated by spaces. Use a list and <code>in</code>.',spec:'Input:  The cat the Dog cat\nOutput: the cat dog',stdin:'The cat the Dog cat',code:'',
 tests:[T('The cat the Dog cat','the cat dog'),T('a a a','a'),T('x y z','x y z')],
 sol:py`seen = []
for word in input("Words: ").lower().split():
    if word not in seen:
        seen.append(word)
for word in seen:
    print(word, end=" ")
print()
`},
w2l_bug:{title:'Bug: IndexError',lvl:'dbg',task:'Run it and read the error. Fix the range so it prints every name with its position.',code:py`names = ["Sara", "Omar", "Lina"]
for i in range(len(names) + 1):
    print(i, names[i])
`,tests:[T('','0 Sara\n1 Omar\n2 Lina')],
 sol:py`names = ["Sara", "Omar", "Lina"]
for i in range(len(names)):
    print(i, names[i])
`},
/* ---- dicts */
w2d_lookup:{title:'Phone book',lvl:'l1',task:'Look up the name the user types (ignore spaces and case: tidy it with <code>.strip().title()</code>). Print the number, or <code>Not found</code>.',stdin:' sara ',code:py`phones = {"Sara": "07700 900123", "Omar": "07700 900456", "Lina": "07700 900789"}
`,tests:[T(' sara ','07700 900123'),T('OMAR','07700 900456'),T('Zaid','Not found')],
 sol:py`phones = {"Sara": "07700 900123", "Omar": "07700 900456", "Lina": "07700 900789"}
name = input("Name: ").strip().title()
if name in phones:
    print(phones[name])
else:
    print("Not found")
`},
w2d_order:{title:'Café order',lvl:'l2',task:'Take orders until <code>done</code>. For each item on the menu, add its price; for anything else print <code>Sorry, we don\'t have X</code> (X as typed, stripped). Ignore case. Finally print the total.',spec:'Input:  Tea, pizza, cake, done\nOutput (last lines):\nSorry, we don\'t have pizza\n...\nTotal: £4.90',stdin:'Tea\npizza\ncake\ndone',code:py`menu = {"tea": 1.80, "coffee": 2.40, "cake": 3.10}
`,tests:[T('Tea\npizza\ncake\ndone','Total: £4.90'),T('pizza\ndone',"Sorry, we don't have pizza\nTotal: £0.00"),T('COFFEE\ncoffee\ndone','Total: £4.80')],
 sol:py`menu = {"tea": 1.80, "coffee": 2.40, "cake": 3.10}
total = 0
while True:
    item = input("Item: ").strip()
    if item.lower() == "done":
        break
    if item.lower() in menu:
        total += menu[item.lower()]
    else:
        print(f"Sorry, we don't have {item}")
print(f"Total: £{total:.2f}")
`},
w2d_letters:{title:'Letter tally',lvl:'l2',task:'Count each letter of the input (letters only, lower case) and print <code>letter: count</code> in the order letters first appear. <code>ch.isalpha()</code> is True for letters.',spec:'Input:  Banana!\nOutput:\nb: 1\na: 3\nn: 2',stdin:'Banana!',code:'',
 tests:[T('Banana!','b: 1\na: 3\nn: 2'),T('A a, B','a: 2\nb: 1')],
 sol:py`counts = {}
for ch in input("Text: ").lower():
    if ch.isalpha():
        counts[ch] = counts.get(ch, 0) + 1
for ch, n in counts.items():
    print(f"{ch}: {n}")
`},
w2d_records:{title:'Class results',lvl:'l2',task:'Using the list of dicts, print each student as <code>Name: score</code>, then <code>Top: NAME (SCORE)</code> using the max pattern on the whole record, then <code>Average: X</code> to 1 decimal.',code:py`students = [
    {"name": "Sara", "score": 88},
    {"name": "Omar", "score": 72},
    {"name": "Lina", "score": 95},
    {"name": "Zaid", "score": 64},
]
`,tests:[T('','Sara: 88\nOmar: 72\nLina: 95\nZaid: 64\nTop: Lina (95)\nAverage: 79.8')],
 sol:py`students = [
    {"name": "Sara", "score": 88},
    {"name": "Omar", "score": 72},
    {"name": "Lina", "score": 95},
    {"name": "Zaid", "score": 64},
]
top = students[0]
total = 0
for s in students:
    print(f"{s['name']}: {s['score']}")
    total += s["score"]
    if s["score"] > top["score"]:
        top = s
print(f"Top: {top['name']} ({top['score']})")
print(f"Average: {total / len(students):.1f}")
`},
w2d_groups:{title:'Group by house',lvl:'l3',task:'Build a new dict that maps each house to a <b>list</b> of its members (a dict of lists), then print each house and its members separated by <code>, </code>. Build each output line with a loop (a faster tool for this, <code>join</code>, comes in the power tools).',spec:'Output:\nRed: Sara, Lina\nBlue: Omar, Zaid\nGreen: Noor',code:py`houses = {"Sara": "Red", "Omar": "Blue", "Lina": "Red", "Zaid": "Blue", "Noor": "Green"}
`,tests:[T('','Red: Sara, Lina\nBlue: Omar, Zaid\nGreen: Noor')],
 sol:py`houses = {"Sara": "Red", "Omar": "Blue", "Lina": "Red", "Zaid": "Blue", "Noor": "Green"}
groups = {}
for name, house in houses.items():
    if house not in groups:
        groups[house] = []
    groups[house].append(name)
for house, names in groups.items():
    line = ""
    for name in names:
        if line != "":
            line += ", "
        line += name
    print(f"{house}: {line}")
`},
w2d_bug:{title:'Bug: KeyError in a tally',lvl:'dbg',task:'Run it, read the KeyError, and fix the tally (either style is fine).',code:py`votes = ["yes", "no", "yes", "yes"]
tally = {}
for v in votes:
    tally[v] += 1
print(tally)
`,tests:[T('',"{'yes': 3, 'no': 1}")],
 sol:py`votes = ["yes", "no", "yes", "yes"]
tally = {}
for v in votes:
    tally[v] = tally.get(v, 0) + 1
print(tally)
`},
/* ---- nested */
w2n_square:{title:'Square of #',lvl:'l1',task:'Print an N × N square of <code>#</code> using <b>two nested loops</b> (no <code>"#" * n</code>).',spec:'Input:  3\nOutput:\n###\n###\n###',stdin:'3',code:'',
 tests:[T('3','###\n###\n###'),T('1','#'),T('4','####\n####\n####\n####')],extra:c=>/["']#["']\s*\*/.test(c)?'Use an inner loop with end="" instead of "#" * n.':null,
 sol:py`n = int(input("Size: "))
for row in range(n):
    for col in range(n):
        print("#", end="")
    print()
`},
w2n_triangle:{title:'Triangle',lvl:'l2',task:'Row 1 has one <code>#</code>, row 2 has two, … up to N rows. The inner loop\'s length depends on the row.',spec:'Input:  4\nOutput:\n#\n##\n###\n####',stdin:'4',code:'',
 tests:[T('4','#\n##\n###\n####'),T('1','#'),T('2','#\n##')],
 sol:py`n = int(input("Height: "))
for row in range(1, n + 1):
    for col in range(row):
        print("#", end="")
    print()
`},
w2n_right:{title:'Right-aligned triangle',lvl:'l3',task:'Same as the triangle, but pushed to the right with spaces. For row r (1 to N): N − r spaces, then r hashes. Plan it in a table first.',spec:'Input:  4\nOutput:\n   #\n  ##\n ###\n####',stdin:'4',code:'',
 tests:[T('4','   #\n  ##\n ###\n####'),T('1','#'),T('3','  #\n ##\n###')],
 sol:py`n = int(input("Height: "))
for row in range(1, n + 1):
    print(" " * (n - row) + "#" * row)
`},
w2n_times:{title:'Multiplication grid',lvl:'l3',task:'Print an N × N multiplication grid. Separate numbers on a row with a tab: <code>print(value, end="\\t")</code>, then <code>print()</code> at the end of each row.',spec:'Input:  3\nOutput:\n1  2  3\n2  4  6\n3  6  9   (tab-separated)',stdin:'3',code:'',
 tests:[T('3','1\t2\t3\n2\t4\t6\n3\t6\t9'),T('1','1')],
 sol:py`n = int(input("N: "))
for row in range(1, n + 1):
    for col in range(1, n + 1):
        print(row * col, end="\t")
    print()
`},
w2n_seats:{title:'Cinema seat map',lvl:'l4',task:'A cinema has R rows (lettered A, B, C…) and S seats per row. Print every seat label row by row, separated by spaces. Tip: <code>"ABCDEFGHIJ"[r]</code> gives the letter for row index r.',spec:'Input:  2 then 3\nOutput:\nA1 A2 A3\nB1 B2 B3',stdin:'2\n3',code:'',
 tests:[T('2\n3','A1 A2 A3\nB1 B2 B3'),T('3\n1','A1\nB1\nC1')],
 sol:py`rows = int(input("Rows: "))
seats = int(input("Seats per row: "))
letters = "ABCDEFGHIJ"
for r in range(rows):
    for s in range(1, seats + 1):
        print(f"{letters[r]}{s}", end=" ")
    print()
`},
/* ---- patterns */
w2p_acronym:{title:'Acronym (build)',lvl:'l1',task:'Build an acronym from the first letter of each word, in capitals.',spec:'Input:  portable network graphics\nOutput: PNG',stdin:'portable network graphics',code:'',
 tests:[T('portable network graphics','PNG'),T('as soon as possible','ASAP'),T('Python','P')],
 sol:py`acronym = ""
for word in input("Phrase: ").split():
    acronym += word[0].upper()
print(acronym)
`},
w2p_balance:{title:'Running balance (sum)',lvl:'l2',task:'Ask for a starting balance, then transactions (positive = money in, negative = money out) until <code>done</code>. After each, print the balance. At the end print the lowest balance reached (including the start).',spec:'Input:  100, -30, -80, 50, done\nOutput:\nBalance: £70.00\nBalance: £-10.00\nBalance: £40.00\nLowest: £-10.00',stdin:'100\n-30\n-80\n50\ndone',code:'',
 tests:[T('100\n-30\n-80\n50\ndone','Balance: £40.00\nLowest: £-10.00'),T('20\ndone','Lowest: £20.00'),T('5\n10\ndone','Balance: £15.00\nLowest: £5.00')],
 sol:py`balance = float(input("Start: "))
lowest = balance
while True:
    t = input("Transaction: ")
    if t == "done":
        break
    balance += float(t)
    print(f"Balance: £{balance:.2f}")
    if balance < lowest:
        lowest = balance
print(f"Lowest: £{lowest:.2f}")
`},
w2p_longest:{title:'Longest word (max)',lvl:'l2',task:'Print the longest word and its length without using <code>max()</code>. If there\'s a tie, keep the first one.',spec:'Input:  the quick brown fox\nOutput: quick (5)',stdin:'the quick brown fox',code:'',
 tests:[T('the quick brown fox','quick (5)'),T('a bb ccc','ccc (3)'),T('same size word','same (4)')],extra:c=>/max\(/.test(c)?'Write the max pattern yourself instead of max().':null,
 sol:py`words = input("Sentence: ").split()
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(f"{longest} ({len(longest)})")
`},
w2p_first:{title:'First match (search)',lvl:'l2',task:'Ask for a domain like <code>nhs.net</code>. Print the <b>first</b> email in the list that ends with <code>@</code> + that domain, or <code>None found</code>. Use <code>.endswith()</code> and <code>break</code>.',stdin:'nhs.net',code:py`emails = ["ali@gmail.com", "sara@nhs.net", "omar@ucl.ac.uk", "lina@nhs.net"]
`,tests:[T('nhs.net','sara@nhs.net'),T('ucl.ac.uk','omar@ucl.ac.uk'),T('bbc.co.uk','None found')],
 sol:py`emails = ["ali@gmail.com", "sara@nhs.net", "omar@ucl.ac.uk", "lina@nhs.net"]
domain = input("Domain: ").strip()
found = None
for e in emails:
    if e.endswith("@" + domain):
        found = e
        break
if found is None:
    print("None found")
else:
    print(found)
`},
w2p_combo:{title:'Pass average (filter + sum + count)',lvl:'l3',task:'Input: scores separated by commas. Print how many passed (50 or more) and the average of <b>only the passing</b> scores to 1 decimal. If nobody passed, print <code>No passes</code>.',spec:'Input:  45,80,62,30,90\nOutput:\nPassed: 3\nAverage of passes: 77.3',stdin:'45,80,62,30,90',code:'',
 tests:[T('45,80,62,30,90','Passed: 3\nAverage of passes: 77.3'),T('10,20','No passes'),T('50','Passed: 1\nAverage of passes: 50.0')],
 sol:py`total = 0
count = 0
for s in input("Scores: ").split(","):
    score = int(s)
    if score >= 50:
        total += score
        count += 1
if count == 0:
    print("No passes")
else:
    print(f"Passed: {count}")
    print(f"Average of passes: {total / count:.1f}")
`},
w2p_second:{title:'Second highest',lvl:'l3',task:'Input: whole numbers separated by spaces. Print the second-highest <b>distinct</b> value without sorting, in a single loop that tracks the best and second best. If there isn\'t one, print <code>None</code>.',spec:'Input:  4 9 2 9 7\nOutput: 7',stdin:'4 9 2 9 7',code:'',
 tests:[T('4 9 2 9 7','7'),T('5 5 5','None'),T('-1 -5 -3','-3'),T('1 2','1')],extra:c=>/sort/.test(c)?'Try it without sorting: track best and second in one loop.':null,
 sol:py`nums = []
for t in input("Numbers: ").split():
    nums.append(int(t))
best = None
second = None
for n in nums:
    if best is None or n > best:
        if best is not None:
            second = best
        best = n
    elif n != best and (second is None or n > second):
        second = n
print(second)
`},
/* ---- capstone */
w2c_full:{title:'Run the word counter',lvl:'',files:{'address.txt':'@GETTYS'},task:'The complete program from your class. Run it, then open the <b>counts.csv</b> result below the output.',code:'@FULL'},
w2c_top:{title:'Top 5 only',lvl:'l2',files:{'address.txt':'@GETTYS'},task:'Change <code>save_counts</code> so counts.csv has only the 5 most common words. <code>sorted(...)</code> returns a list, so you can slice it with <code>[:5]</code>. Ties keep their first-seen order (Python\'s sorting is "stable").',code:'@FULL',
 tests:[{inp:'',file:'counts.csv',exp:'@sol',label:'counts.csv has the header and the top 5 rows'}],solFrom:'top5'},
w2c_clean:{title:'Clean the punctuation',lvl:'l3',files:{'address.txt':'@GETTYS'},task:'"nation," and "nation" should be one word, and "--" isn\'t a word at all. In the comprehension, strip <code>.,;:!?-</code> from both ends of each word, and skip words that become empty. (Hint: a second comprehension with <code>if w != ""</code>.)',code:'@FULL',
 tests:[{inp:'',file:'counts.csv',exp:'@sol',label:'counts.csv uses cleaned words'}],solFrom:'clean'},
w2c_lengths:{title:'Word-length report',lvl:'l3',files:{'address.txt':'@GETTYS'},task:'New program, same patterns. Tally how many words have each <b>length</b> (strip <code>.,;:!?-</code> first, skip empty), and write <code>lengths.csv</code> with header <code>Length,Words</code>, sorted by length from short to long.',code:'# read address.txt, tally word lengths, write lengths.csv\n',
 tests:[{inp:'',file:'lengths.csv',exp:'@sol',label:'lengths.csv is correct'}],
 sol:py`def main():
    with open("address.txt") as f:
        words = f.read().split()
    tally = {}
    for w in words:
        w = w.strip(".,;:!?-")
        if w == "":
            continue
        tally[len(w)] = tally.get(len(w), 0) + 1
    with open("lengths.csv", "w") as f:
        f.write("Length,Words\n")
        for length in sorted(tally):
            f.write(f"{length},{tally[length]}\n")


main()
`},
/* ---- LAB */
x2_repeat:{title:'Repeat',lvl:'l1',task:'Ask for a word, then a number N. Print the word N times on one line, separated by spaces.',spec:'Input:  ha then 3\nOutput: ha ha ha',stdin:'ha\n3',code:'',
 tests:[T('ha\n3','ha ha ha'),T('go\n1','go')],sol:py`word = input("Word: ")
n = int(input("Times: "))
for _ in range(n):
    print(word, end=" ")
print()
`},
x2_sumto:{title:'Sum 1 to N',lvl:'l1',task:'Add up 1 + 2 + … + N with a for loop (accumulator).',stdin:'100',code:'',tests:[T('100','5050'),T('1','1'),T('10','55')],
 sol:py`n = int(input("N: "))
total = 0
for i in range(1, n + 1):
    total += i
print(total)
`},
x2_squares:{title:'Squares in a row',lvl:'l1',task:'Print the squares of 1 to N on one line, separated by spaces.',spec:'Input:  5\nOutput: 1 4 9 16 25',stdin:'5',code:'',tests:[T('5','1 4 9 16 25'),T('1','1')],
 sol:py`n = int(input("N: "))
for i in range(1, n + 1):
    print(i * i, end=" ")
print()
`},
x2_upper:{title:'Count capitals',lvl:'l1',task:'Count the capital letters in the input. <code>ch.isupper()</code> is True for a capital.',stdin:'Hello World from CS50',code:'',tests:[T('Hello World from CS50','Capitals: 4'),T('none here','Capitals: 0')],spec:'Output: Capitals: 4',
 sol:py`count = 0
for ch in input("Text: "):
    if ch.isupper():
        count += 1
print(f"Capitals: {count}")
`},
x2_fizz:{title:'FizzBuzz',lvl:'l2',task:'For each number 1 to N print: <code>FizzBuzz</code> if divisible by 3 and 5, <code>Fizz</code> if by 3, <code>Buzz</code> if by 5, otherwise the number. Think about which test must come first.',stdin:'15',code:'',
 tests:[T('15','1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'),T('5','1\n2\nFizz\n4\nBuzz')],
 sol:py`n = int(input("N: "))
for i in range(1, n + 1):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
`},
x2_revnum:{title:'Reverse a number',lvl:'l2',task:'Reverse the digits of a positive integer <b>with maths</b> (% and //), building the result as a number: <code>result = result * 10 + digit</code>.',spec:'Input:  1234\nOutput: 4321\n(1200 → 21)',stdin:'1234',code:'',
 tests:[T('1234','4321'),T('1200','21'),T('7','7')],extra:c=>/str\(|\[::-1\]/.test(c)?'Use % and // only.':null,
 sol:py`n = int(input("Number: "))
result = 0
while n > 0:
    result = result * 10 + n % 10
    n = n // 10
print(result)
`},
x2_strength:{title:'Password checker',lvl:'l2',task:'Count letters, digits and other characters in a password, print the three counts, then <code>Strong</code> if it has 8+ characters and at least one of each kind, else <code>Weak</code>. Use <code>.isalpha()</code> and <code>.isdigit()</code>.',spec:'Input:  Tea4two!\nOutput:\nLetters: 6\nDigits: 1\nOther: 1\nStrong',stdin:'Tea4two!',code:'',
 tests:[T('Tea4two!','Letters: 6\nDigits: 1\nOther: 1\nStrong'),T('password','Letters: 8\nDigits: 0\nOther: 0\nWeak'),T('a1!','Letters: 1\nDigits: 1\nOther: 1\nWeak')],
 sol:py`pw = input("Password: ")
letters = digits = other = 0
for ch in pw:
    if ch.isalpha():
        letters += 1
    elif ch.isdigit():
        digits += 1
    else:
        other += 1
print(f"Letters: {letters}")
print(f"Digits: {digits}")
print(f"Other: {other}")
if len(pw) >= 8 and letters > 0 and digits > 0 and other > 0:
    print("Strong")
else:
    print("Weak")
`},
x2_grades:{title:'Grade tally',lvl:'l2',task:'Read marks until <code>done</code>. A = 70+, B = 60–69, C = 50–59, F = below 50. Print the count for A, B, C and F in that order, including zeros. Start the dict with all four keys at 0.',spec:'Input:  72, 55, 90, 40, done\nOutput:\nA: 2\nB: 0\nC: 1\nF: 1',stdin:'72\n55\n90\n40\ndone',code:'',
 tests:[T('72\n55\n90\n40\ndone','A: 2\nB: 0\nC: 1\nF: 1'),T('done','A: 0\nB: 0\nC: 0\nF: 0'),T('60\n69\n70\n50\n49\ndone','A: 1\nB: 2\nC: 1\nF: 1')],
 sol:py`tally = {"A": 0, "B": 0, "C": 0, "F": 0}
while True:
    text = input("Mark: ")
    if text == "done":
        break
    mark = int(text)
    if mark >= 70:
        tally["A"] += 1
    elif mark >= 60:
        tally["B"] += 1
    elif mark >= 50:
        tally["C"] += 1
    else:
        tally["F"] += 1
for grade, n in tally.items():
    print(f"{grade}: {n}")
`},
x2_guess:{title:'Guess the number',lvl:'l3',task:'The secret is 42 (random numbers are Week 4). Ask <code>Guess: </code> until correct, printing <code>Too low</code> or <code>Too high</code>. When correct, print <code>Got it in N guesses</code>.',stdin:'50\n25\n42',code:'secret = 42\n',
 tests:[T('50\n25\n42','Got it in 3 guesses'),T('42','Got it in 1 guesses'),T('10\n90\n42','Too high\nGot it in 3 guesses')],
 sol:py`secret = 42
guesses = 0
while True:
    guess = int(input("Guess: "))
    guesses += 1
    if guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
    else:
        print(f"Got it in {guesses} guesses")
        break
`},
x2_temps:{title:'Weekly temperatures',lvl:'l3',task:'Input: 7 temperatures separated by spaces (Monday first). Print the max and its day, the min and its day, the average (1 decimal), and how many days were above average. Use the list <code>days</code>.',spec:'Input:  12 15 11 18 20 14 9\nOutput:\nMax: 20 on Fri\nMin: 9 on Sun\nAverage: 14.1\nDays above average: 3',stdin:'12 15 11 18 20 14 9',code:'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]\n',
 tests:[T('12 15 11 18 20 14 9','Max: 20 on Fri\nMin: 9 on Sun\nAverage: 14.1\nDays above average: 3'),T('5 5 5 5 5 5 5','Max: 5 on Mon\nMin: 5 on Mon\nAverage: 5.0\nDays above average: 0')],
 sol:py`days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temps = []
for t in input("Temps: ").split():
    temps.append(int(t))
hi = 0
lo = 0
for i in range(len(temps)):
    if temps[i] > temps[hi]:
        hi = i
    if temps[i] < temps[lo]:
        lo = i
avg = sum(temps) / len(temps)
above = 0
for t in temps:
    if t > avg:
        above += 1
print(f"Max: {temps[hi]} on {days[hi]}")
print(f"Min: {temps[lo]} on {days[lo]}")
print(f"Average: {avg:.1f}")
print(f"Days above average: {above}")
`},
x2_primes:{title:'Primes up to N',lvl:'l3',task:'Print every prime number from 2 to N on one line. A number is prime if nothing from 2 up to it (exclusive) divides it evenly. Nested loop with a flag variable (or break).',spec:'Input:  20\nOutput: 2 3 5 7 11 13 17 19',stdin:'20',code:'',
 tests:[T('20','2 3 5 7 11 13 17 19'),T('2','2'),T('30','2 3 5 7 11 13 17 19 23 29')],
 sol:py`n = int(input("N: "))
for x in range(2, n + 1):
    prime = True
    for d in range(2, x):
        if x % d == 0:
            prime = False
            break
    if prime:
        print(x, end=" ")
print()
`},
x2_collatz:{title:'Collatz sequence',lvl:'l3',task:'Start at N. If even, halve it; if odd, do 3n + 1. Repeat until it reaches 1. Print the whole sequence on one line, then the number of steps.',spec:'Input:  6\nOutput:\n6 3 10 5 16 8 4 2 1\nSteps: 8',stdin:'6',code:'',
 tests:[T('6','6 3 10 5 16 8 4 2 1\nSteps: 8'),T('1','1\nSteps: 0'),T('7','7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1\nSteps: 16')],
 sol:py`n = int(input("N: "))
steps = 0
print(n, end=" ")
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
    print(n, end=" ")
print()
print(f"Steps: {steps}")
`},
x2_rle:{title:'Run-length encoding',lvl:'l3',task:'Compress repeated letters: each run becomes the letter followed by how many times it repeats. Track the current letter and its count; when the letter changes, write out the run.',spec:'Input:  aaabccdddd\nOutput: a3b1c2d4',stdin:'aaabccdddd',code:'',
 tests:[T('aaabccdddd','a3b1c2d4'),T('x','x1'),T('aabbaa','a2b2a2')],
 sol:py`text = input("Text: ")
result = ""
current = text[0]
count = 0
for ch in text:
    if ch == current:
        count += 1
    else:
        result += current + str(count)
        current = ch
        count = 1
result += current + str(count)
print(result)
`},
x2_brackets:{title:'Balanced brackets',lvl:'l3',task:'Check whether round brackets are balanced: keep a counter, +1 for <code>(</code>, −1 for <code>)</code>. If it ever goes below 0, or isn\'t 0 at the end, it\'s not balanced.',spec:'Input:  (a(b)c)\nOutput: Balanced',stdin:'(a(b)c)',code:'',
 tests:[T('(a(b)c)','Balanced'),T('(()','Not balanced'),T(')(','Not balanced'),T('no brackets','Balanced')],
 sol:py`depth = 0
ok = True
for ch in input("Text: "):
    if ch == "(":
        depth += 1
    elif ch == ")":
        depth -= 1
        if depth < 0:
            ok = False
            break
if ok and depth == 0:
    print("Balanced")
else:
    print("Not balanced")
`},
x2_diamond:{title:'Diamond',lvl:'l3',task:'Print a diamond of <code>*</code> with N rows in the top half (including the widest row). Row r of the top half has N − r spaces and 2r − 1 stars. Then mirror it without repeating the widest row.',spec:'Input:  3\nOutput:\n  *\n ***\n*****\n ***\n  *',stdin:'3',code:'',
 tests:[T('3','  *\n ***\n*****\n ***\n  *'),T('1','*'),T('2',' *\n***\n *')],
 sol:py`n = int(input("N: "))
for r in range(1, n + 1):
    print(" " * (n - r) + "*" * (2 * r - 1))
for r in range(n - 1, 0, -1):
    print(" " * (n - r) + "*" * (2 * r - 1))
`},
x2_bank:{title:'Spending by category',lvl:'l4',task:'You exported your bank spending as lines like <code>food,12.50</code>. Read lines until <code>done</code>, total each category (in first-seen order, 2 decimals), then print the biggest category.',spec:'Input:  food,12.50 / travel,8.40 / food,30 / bills,25 / done\nOutput:\nfood: £42.50\ntravel: £8.40\nbills: £25.00\nBiggest: food (£42.50)',stdin:'food,12.50\ntravel,8.40\nfood,30\nbills,25\ndone',code:'',
 tests:[T('food,12.50\ntravel,8.40\nfood,30\nbills,25\ndone','food: £42.50\ntravel: £8.40\nbills: £25.00\nBiggest: food (£42.50)'),T('rent,950\ndone','rent: £950.00\nBiggest: rent (£950.00)')],
 sol:py`totals = {}
while True:
    line = input("Line: ").strip()
    if line == "done":
        break
    category, amount = line.split(",")
    totals[category] = totals.get(category, 0) + float(amount)
biggest = None
for cat, amt in totals.items():
    print(f"{cat}: £{amt:.2f}")
    if biggest is None or amt > totals[biggest]:
        biggest = cat
print(f"Biggest: {biggest} (£{totals[biggest]:.2f})")
`},
x2_quiz:{title:'Quiz game',lvl:'l4',task:'Ask each question in the dict in order. Answers are case-insensitive and ignore spaces. Print <code>Correct!</code> or <code>Wrong, it was ANSWER</code>, then the final <code>Score: k/3</code>.',stdin:'Cardiff\n 8 \nmars',code:py`questions = {
    "Capital of Wales? ": "cardiff",
    "Legs on a spider? ": "8",
    "Closest planet to the Sun? ": "mercury",
}
`,tests:[T('Cardiff\n 8 \nmars','Wrong, it was mercury\nScore: 2/3'),T('cardiff\n8\nMercury','Correct!\nScore: 3/3')],
 sol:py`questions = {
    "Capital of Wales? ": "cardiff",
    "Legs on a spider? ": "8",
    "Closest planet to the Sun? ": "mercury",
}
score = 0
for question, answer in questions.items():
    reply = input(question).strip().lower()
    if reply == answer:
        print("Correct!")
        score += 1
    else:
        print(f"Wrong, it was {answer}")
print(f"Score: {score}/{len(questions)}")
`},
x2_stock:{title:'Reorder report',lvl:'l4',task:'A shop\'s stock levels are in a dict. Ask for a threshold. Print <code>Reorder: item (qty)</code> for every item <b>below</b> the threshold, in alphabetical order, or <code>All stocked</code> if none.',stdin:'10',code:py`stock = {"tea": 24, "milk": 6, "bread": 3, "jam": 12, "eggs": 9}
`,tests:[T('10','Reorder: bread (3)\nReorder: eggs (9)\nReorder: milk (6)'),T('2','All stocked')],
 sol:py`stock = {"tea": 24, "milk": 6, "bread": 3, "jam": 12, "eggs": 9}
threshold = int(input("Threshold: "))
low = []
for item in sorted(stock):
    if stock[item] < threshold:
        low.append(item)
if len(low) == 0:
    print("All stocked")
for item in low:
    print(f"Reorder: {item} ({stock[item]})")
`},
x2_steps:{title:'Step tracker summary',lvl:'l4',task:'Input: 7 daily step counts, Monday first, separated by spaces. Print the total (with thousands separators), the daily average as a whole number (use <code>//</code>), the best day, and how many days hit the 10,000 goal.',spec:'Input:  8200 11050 6400 12000 9999 15000 4300\nOutput:\nTotal: 66,949\nAverage: 9564\nBest: Sat\nGoal days: 3',stdin:'8200 11050 6400 12000 9999 15000 4300',code:'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]\n',
 tests:[T('8200 11050 6400 12000 9999 15000 4300','Total: 66,949\nAverage: 9564\nBest: Sat\nGoal days: 3'),T('10000 10000 10000 10000 10000 10000 10000','Total: 70,000\nAverage: 10000\nBest: Mon\nGoal days: 7')],
 sol:py`days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
steps = []
for s in input("Steps: ").split():
    steps.append(int(s))
best = 0
goal = 0
for i in range(len(steps)):
    if steps[i] > steps[best]:
        best = i
    if steps[i] >= 10000:
        goal += 1
print(f"Total: {sum(steps):,}")
print(f"Average: {sum(steps) // len(steps)}")
print(f"Best: {days[best]}")
print(f"Goal days: {goal}")
`},
x2_receipt:{title:'Receipt with discount',lvl:'l4',task:'Read lines like <code>tea 2 1.80</code> (item, quantity, unit price) until <code>done</code>. Print each line as <code>tea x2 = £3.60</code>. Then <code>Subtotal</code>; if the subtotal is £50 or more, a 10% <code>Discount: -£x.xx</code> line; then <code>Total</code>.',spec:'Input:  tea 2 1.80 / cake 1 3.10 / done\nOutput:\ntea x2 = £3.60\ncake x1 = £3.10\nSubtotal: £6.70\nTotal: £6.70',stdin:'tea 2 1.80\ncake 1 3.10\ndone',code:'',
 tests:[T('tea 2 1.80\ncake 1 3.10\ndone','tea x2 = £3.60\ncake x1 = £3.10\nSubtotal: £6.70\nTotal: £6.70'),T('lamp 2 30\ndone','lamp x2 = £60.00\nSubtotal: £60.00\nDiscount: -£6.00\nTotal: £54.00')],
 sol:py`subtotal = 0
while True:
    line = input("Item: ").strip()
    if line == "done":
        break
    name, qty, price = line.split()
    cost = int(qty) * float(price)
    subtotal += cost
    print(f"{name} x{qty} = £{cost:.2f}")
print(f"Subtotal: £{subtotal:.2f}")
discount = 0
if subtotal >= 50:
    discount = subtotal * 0.1
    print(f"Discount: -£{discount:.2f}")
print(f"Total: £{subtotal - discount:.2f}")
`},
});
