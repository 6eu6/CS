/* Week 1 widgets and quizzes */
Object.assign(PARS,{
 pa_grade:{title:'Grade function',task:'Arrange a function that returns the grade for a mark: A for 70+, B for 60+, C for 50+, otherwise F.',lines:['def grade(mark):','    if mark >= 70:','        return "A"','    elif mark >= 60:','        return "B"','    elif mark >= 50:','        return "C"','    return "F"'],why:'Highest threshold first. The last return needs no else: it is only reached when every earlier condition was False.'},
});
Object.assign(BUGS,{
 bug_strcmp:{title:'99 is "bigger" than 100?',task:'The user typed 100 and then 99. It says 99 is bigger.',out:'99 is bigger',code:'a = input("First: ")\nb = input("Second: ")\nif a > b:\n    print(a, "is bigger")\nelse:\n    print(b, "is bigger")',line:1,why:'input() returns strings, and strings compare character by character: "9" > "1". Convert both to numbers when reading.',fix:'a = int(input("First: "))\nb = int(input("Second: "))',hint:'What type does input() return?'},
 bug_order:{title:'Everyone gets a C',task:'A mark of 85 prints C.',out:'C',code:'mark = 85\nif mark >= 50:\n    print("C")\nelif mark >= 60:\n    print("B")\nelif mark >= 70:\n    print("A")',line:2,why:'The first true branch wins, and 85 >= 50 is true, so the others are never checked. Order thresholds from highest to lowest.',fix:'if mark >= 70:\n    print("A")\nelif mark >= 60:\n    print("B")\nelif mark >= 50:\n    print("C")'},
});
Object.assign(ANAT,{
 a_if:{code:py`if temp > 25:
    print("Hot")
elif temp > 15:
    print("Mild")
else:
    print("Cold")`,ex:{
  '1:if':['keyword','Starts the decision. Python evaluates the condition after it.'],
  '1:temp':['variable','Its current value is used in the comparison.'],
  '1:>':['comparison','Gives True or False.'],
  '1:25':['number','The boundary. 25 itself is not "Hot" because > excludes it.'],
  '1::':['punctuation','The block for this branch starts on the next indented line.'],
  '2:indent':['indentation','Belongs to the if branch: runs only when temp > 25 is True.'],
  '3:elif':['keyword','"else if". Only checked when every condition above was False. So here we already know temp is 25 or less.'],
  '3:15':['number','The lower boundary of "Mild". The upper one (25) is implied by the order.'],
  '5:else':['keyword','No condition: runs when all conditions above were False. Optional.'],
  '6:indent':['indentation','Belongs to else.'],
 }},
});
Object.assign(Q,{
 w1cmp:[
  {q:'"10" < "9" is…',o:['True','False','an error'],a:0,e:'Strings compare character by character, and "1" < "9".'},
  {q:'Which values are falsy?',o:['0, "", [], None','0, "0", " ", None','False only'],a:0,e:'"0" and " " are non-empty strings, so they are truthy.'},
  {q:'"" or "Guest" evaluates to…',o:['True','"Guest"','""'],a:1,e:'or returns the first truthy operand.'},
  {q:'items = [] ; which is safe?',o:['if items[0] == "x" and items:','if items and items[0] == "x":'],a:1,e:'The guard must come first so short-circuiting protects the index.'},
  {q:'Compare to None with…',o:['x == None','x is None'],a:1,e:'is None is the Python convention.'}],
 w1if:[
  {q:'x = 15. if x > 5: A elif x > 10: B. What runs?',o:['A','B','A and B'],a:0,e:'The first true branch wins.'},
  {q:'Which is the best Boolean function body?',o:['if n > 0: return True else: return False','return n > 0'],a:1,e:'The comparison already is a bool.'},
  {q:'Several independent password rules should use…',o:['one if/elif chain','separate if statements'],a:1,e:'More than one rule can fail at once.'},
  {q:'"even" if n % 2 == 0 else "odd" is…',o:['a conditional expression','a syntax error','a match statement'],a:0,e:'It chooses between two values.'},
  {q:'A guard clause is…',o:['an early return for a special case','a try/except','a nested if'],a:0,e:'Handle special cases first, then the normal case without nesting.'}],
 w1choose:[
  {q:'Country code → country name for 200 codes',o:['200 elif branches','a dict with .get(code, "Unknown")'],a:1,e:'Data, not code.'},
  {q:'Tax bands by income',o:['ordered if/elif','a dict lookup'],a:0,e:'Ranges need comparisons.'},
  {q:'Default name when the input is blank',o:['name = input().strip() or "Guest"','if name == "": name = "Guest" else: pass'],a:0,e:'Short and idiomatic (both work).'},
  {q:'Commands "start", "stop", "pause" in Python 3.10+',o:['match','while'],a:0,e:'match reads like a menu.'}],
 w1test:[
  {q:'Output?',c:'x = 0\nif x:\n    print("A")\nelse:\n    print("B")',o:['A','B'],a:1,e:'0 is falsy.'},
  {q:'Output?',c:'n = 7\nprint(n > 5 and n < 10, not n > 5)',o:['True False','True True','False False'],a:0,e:'Both comparisons are true; not flips the second.'},
  {q:'Output?',c:'s = 65\nif s >= 50:\n    print("C")\nelif s >= 60:\n    print("B")',o:['C','B','C and B'],a:0,e:'First true branch wins: a classic ordering bug.'},
  {q:'Output?',c:'print(0 or "" or "x", 3 and 0 and 5)',o:['x 0','True False','x 5'],a:0,e:'or → first truthy; and → first falsy.'},
  {q:'Output?',c:'def f(n):\n    if n < 0:\n        return "neg"\n    if n == 0:\n        return "zero"\n    return "pos"\nprint(f(0), f(-2), f(9))',o:['zero neg pos','neg zero pos','pos pos pos'],a:0,e:'Guard clauses.'},
  {q:'Output?',c:'age = "18"\nprint(age == 18)',o:['True','False'],a:1,e:'A string never equals an int.'},
  {q:'Which is equivalent to 0 <= x <= 10?',o:['0 <= x and x <= 10','0 <= x or x <= 10'],a:0,e:'Chained comparisons are joined with and.'},
  {q:'Output?',c:'x = 4\nprint("even" if x % 2 == 0 else "odd")',o:['even','odd'],a:0,e:'4 % 2 is 0.'},
  {q:'Output?',c:'n = 12\nif n % 3 == 0:\n    print("three")\nif n % 4 == 0:\n    print("four")',o:['three','three then four','four'],a:1,e:'Separate ifs: both are checked.'},
  {q:'bool(" ") is…',o:['True','False'],a:0,e:'A space is a character: non-empty string.'}],
});

Object.assign(PRED,{"p_w1cmp": [{"c": "print(3 == 3.0, \"3\" == 3, \"a\" < \"B\")", "out": "True False False", "e": "Numbers compare by value; text never equals a number; capitals sort before lower case, so \"a\" < \"B\" is False."}, {"c": "print(\"apple\" < \"banana\", \"10\" < \"9\", 10 < 9)", "out": "True True False", "e": "Text compares character by character."}, {"c": "x = 7\nprint(0 < x < 5, 5 < x < 10)", "out": "False True", "e": "Chained comparisons."}, {"c": "print(bool(\"\"), bool(\" \"), bool(\"0\"), bool(0), bool([0]))", "out": "False True True False True", "e": "Only empty or zero values are falsy."}, {"c": "print(\"\" or \"Guest\", \"Sara\" or \"Guest\")", "out": "Guest Sara", "e": "or returns the first truthy value."}, {"c": "print(0 and 5, 3 and 5)", "out": "0 5", "e": "and returns the first falsy value, or the last value."}, {"c": "print(not 0, not \"hi\", not None)", "out": "True False True", "e": "not always gives a bool."}, {"c": "items = []\nprint(len(items) > 0 and items[0] == \"x\")", "out": "False", "e": "Short-circuit: the index is never evaluated."}], "p_w1if": [{"c": "x = 15\nif x > 10:\n    print(\"A\")\nelif x > 5:\n    print(\"B\")\nelse:\n    print(\"C\")", "out": "A", "e": "Only the first true branch runs."}, {"c": "x = 15\nif x > 10:\n    print(\"A\")\nif x > 5:\n    print(\"B\")", "out": "A\nB", "e": "Separate ifs are each checked."}, {"c": "score = 72\nif score >= 50:\n    print(\"C\")\nelif score >= 70:\n    print(\"A\")", "out": "C", "e": "Wrong order: 72 >= 50 is checked first."}, {"c": "def f(n):\n    if n < 0:\n        return \"neg\"\n    return \"non-neg\"\nprint(f(-1), f(0))", "out": "neg non-neg", "e": "A guard clause."}, {"c": "n = 1\nprint(f\"{n} item{'s' if n != 1 else ''}\")\nn = 3\nprint(f\"{n} item{'s' if n != 1 else ''}\")", "out": "1 item\n3 items", "e": "A conditional expression inside an f-string."}, {"c": "name = \"\"\nif name:\n    print(\"Hi\", name)\nelse:\n    print(\"No name\")", "out": "No name", "e": "Empty string is falsy."}, {"c": "t = 25\nif t > 25:\n    print(\"Hot\")\nelif t > 15:\n    print(\"Mild\")\nelse:\n    print(\"Cold\")", "out": "Mild", "e": "25 is not > 25."}]});
Object.assign(STEP,{"t_grade": {"title": "Step through: which branch runs?", "code": "def grade(mark):\n    if mark >= 70:\n        return \"A\"\n    elif mark >= 60:\n        return \"B\"\n    elif mark >= 50:\n        return \"C\"\n    return \"F\"\n\nprint(grade(65))", "steps": [{"l": 1, "n": "Define grade (not run yet).", "v": {"grade": "function"}, "out": "", "fr": "<module>"}, {"l": 10, "n": "Call grade(65). Python jumps into the function with mark = 65.", "v": {"grade": "function"}, "out": "", "fr": "<module>"}, {"l": 2, "n": "Is 65 >= 70? <b>False</b>. Skip this branch.", "v": {"mark": "65"}, "out": "", "fr": "grade"}, {"l": 4, "n": "elif: only checked because the first test was False. Is 65 >= 60? <b>True</b>.", "v": {"mark": "65"}, "out": "", "fr": "grade"}, {"l": 5, "n": "Return \"B\". The function ends here: lines 6–8 are never even looked at.", "v": {"mark": "65"}, "out": "", "fr": "grade"}, {"l": 10, "n": "Back on line 10 in the top level: print shows the value that grade returned.", "v": {"grade": "function"}, "out": "B", "fr": "<module>"}]}});

Object.assign(PRED,{"p_w1a": [{"c": "print(3 == 3.0, \"3\" == 3, \"a\" < \"B\")", "out": "True False False", "e": "Numbers compare by value; text never equals a number; capital letters sort before lower case, so \"a\" < \"B\" is False."}, {"c": "print(\"apple\" < \"banana\", \"10\" < \"9\", 10 < 9)", "out": "True True False", "e": "Text compares character by character."}, {"c": "x = 7\nprint(0 < x < 5, 5 < x < 10)", "out": "False True", "e": "Chained comparisons."}, {"c": "x = 15\nif x > 10:\n    print(\"A\")\nelif x > 5:\n    print(\"B\")\nelse:\n    print(\"C\")", "out": "A", "e": "Only the first true branch runs."}, {"c": "x = 15\nif x > 10:\n    print(\"A\")\nif x > 5:\n    print(\"B\")", "out": "A\nB", "e": "Separate ifs are each checked."}, {"c": "score = 72\nif score >= 50:\n    print(\"C\")\nelif score >= 70:\n    print(\"A\")", "out": "C", "e": "Wrong order: 72 >= 50 is checked first."}, {"c": "t = 25\nif t > 25:\n    print(\"Hot\")\nelif t > 15:\n    print(\"Mild\")\nelse:\n    print(\"Cold\")", "out": "Mild", "e": "25 is not > 25."}], "p_w1b": [{"c": "print(bool(\"\"), bool(\" \"), bool(\"0\"), bool(0), bool(None))", "out": "False True True False False", "e": "Only empty or zero values (and None) are falsy."}, {"c": "print(\"\" or \"Guest\", \"Sara\" or \"Guest\")", "out": "Guest Sara", "e": "or returns the first truthy value."}, {"c": "print(0 and 5, 3 and 5)", "out": "0 5", "e": "and returns the first falsy value, or the last value."}, {"c": "print(not 0, not \"hi\", not None)", "out": "True False True", "e": "not always gives a bool."}, {"c": "answer = \"no\"\nif answer == \"y\" or \"yes\":\n    print(\"OK\")\nelse:\n    print(\"Stopped\")", "out": "OK", "e": "The trap: \"yes\" on its own is truthy, so the condition is always true."}, {"c": "text = \"\"\nprint(text != \"\" and text[0] == \"A\")", "out": "False", "e": "Short-circuit: text[0] is never evaluated."}, {"c": "name = \"\"\nif name:\n    print(\"Hi\", name)\nelse:\n    print(\"No name\")", "out": "No name", "e": "An empty string is falsy."}, {"c": "print(\"2026\".isdigit(), \"20.5\".isdigit(), \"Sara\".isalpha(), \"@\" in \"a@b.uk\")", "out": "True False True True", "e": "A dot is not a digit."}], "p_w1c": [{"c": "print(17 % 2, 18 % 2, 7 % 3)", "out": "1 0 1", "e": "% gives the remainder."}, {"c": "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4), is_even(7))", "out": "True False", "e": "The function returns the comparison itself."}, {"c": "def f(n):\n    if n < 0:\n        return \"neg\"\n    return \"non-neg\"\n\nprint(f(-1), f(0))", "out": "neg non-neg", "e": "A guard clause."}, {"c": "n = 1\nprint(f\"{n} item{'s' if n != 1 else ''}\")\nn = 3\nprint(f\"{n} item{'s' if n != 1 else ''}\")", "out": "1 item\n3 items", "e": "A conditional expression inside an f-string."}, {"c": "x = 4\nlabel = \"even\" if x % 2 == 0 else \"odd\"\nprint(x, label)", "out": "4 even", "e": "Choosing between two values in one line."}]});
Object.assign(Q,{
 w1a:[
  {q:'"10" < "9" is…',o:['True','False','an error'],a:0,e:'Strings compare character by character, and "1" < "9". Convert input with int() first.'},
  {q:'Which line compares instead of storing?',o:['x = 5','x == 5'],a:1,e:'= stores a value; == asks a question.'},
  {q:'x = 15. if x > 5: print("A") elif x > 10: print("B"). What prints?',o:['A','B','A and B'],a:0,e:'The first true branch wins; the rest are skipped.'},
  {q:'A grade from a mark should use…',o:['one if/elif chain, highest threshold first','separate ifs, lowest first'],a:0,e:'Exactly one grade, and order removes repeated boundaries.'},
  {q:'0 <= n <= 10 asks…',o:['is n between 0 and 10 inclusive?','is 0 <= n, then compare True with 10'],a:0,e:'Python reads chained comparisons like maths.'}],
 w1b:[
  {q:'Which values are falsy?',o:['0, "", None','0, "0", " "','False only'],a:0,e:'"0" and " " are non-empty strings, so they are truthy.'},
  {q:'answer = "no". if answer == "y" or "yes": … runs?',o:['Yes, always','No'],a:0,e:'"yes" alone is truthy. Write answer == "y" or answer == "yes".'},
  {q:'"" or "Guest" evaluates to…',o:['True','"Guest"','""'],a:1,e:'or returns the first truthy operand.'},
  {q:'text = "". Which is safe?',o:['if text[0] == "A" and text != "":','if text != "" and text[0] == "A":'],a:1,e:'The guard must come first, so short-circuiting protects the index.'},
  {q:'"20.5".isdigit() is…',o:['True','False'],a:1,e:'The dot is not a digit.'}],
 w1c:[
  {q:'Which is the best Boolean function body?',o:['if n > 0: return True else: return False','return n > 0'],a:1,e:'The comparison already is a bool.'},
  {q:'n % 2 == 1 means n is…',o:['even','odd'],a:1,e:'Remainder 1 after dividing by 2.'},
  {q:'"even" if n % 2 == 0 else "odd" is…',o:['a conditional expression','a syntax error','a match statement'],a:0,e:'It chooses between two values.'},
  {q:'A guard clause is…',o:['an early return for a special case','a nested if'],a:0,e:'Handle special cases first, then the normal case without nesting.'},
  {q:'In match, case _: means…',o:['an error','anything that didn\'t match above'],a:1,e:'It\'s the catch-all, like else.'}],
});
Q.w1choose=[
  {q:'Tax bands by income',o:['ordered if/elif','separate ifs'],a:0,e:'Exclusive ranges need one ordered chain.'},
  {q:'Default name when the input is blank',o:['name = input().strip() or "Guest"','name = "Guest" and input()'],a:0,e:'or gives the first truthy value.'},
  {q:'Commands "start", "stop", "pause" in Python 3.10+',o:['match','separate ifs'],a:0,e:'match reads like a menu.'},
  {q:'Three password rules that can all fail at once',o:['one if/elif chain','separate ifs'],a:1,e:'A chain would stop at the first problem.'}];
