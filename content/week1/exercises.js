/* Week 1 coded exercises + Pocket Ledger parts */
Object.assign(R,{
/* ---------------- week 1 */
w1c_range:{title:'Valid score?',lvl:'l1',task:'Read a whole number. Print <code>Valid</code> if it is from 0 to 100 inclusive, otherwise <code>Invalid</code>. Use one chained comparison.',stdin:'100',code:'',
 tests:[T('100','Valid'),T('0','Valid'),T('101','Invalid'),T('-1','Invalid')],extra:c=>/<=?\s*\w+\s*<=?/.test(c)?null:'Use a chained comparison like 0 <= n <= 100.',
 sol:py`n = int(input("Score: "))
if 0 <= n <= 100:
    print("Valid")
else:
    print("Invalid")
`},
w1c_leap:{title:'Leap year',lvl:'l2',task:'A year is a leap year if it is divisible by 4, except years divisible by 100, unless also divisible by 400. Write <code>is_leap(year)</code> that <b>returns</b> the Boolean expression directly (no if). Print <code>Leap</code> or <code>Not leap</code>.',stdin:'2024',code:'def is_leap(year):\n    ...\n\n\nyear = int(input("Year: "))\n',
 tests:[T('2024','Leap'),T('1900','Not leap'),T('2000','Leap'),T('2026','Not leap')],
 sol:py`def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


year = int(input("Year: "))
if is_leap(year):
    print("Leap")
else:
    print("Not leap")
`},
w1c_default:{title:'Defaults with or',lvl:'l2',task:'Ask for a name and a city. Empty (or spaces only) answers default to <code>Guest</code> and <code>London</code>. Use <code>or</code>, not if. Print <code>Hello NAME from CITY</code>.',stdin:' \nLeeds',code:'',
 tests:[T(' \nLeeds','Hello Guest from Leeds'),T('Sara\n','Hello Sara from London'),T('Omar\nYork','Hello Omar from York')],extra:c=>/\bor\b/.test(c)?null:'Use or for the defaults.',
 sol:py`name = input("Name: ").strip() or "Guest"
city = input("City: ").strip() or "London"
print(f"Hello {name} from {city}")
`},
w1c_guard:{title:'Safe first letter',lvl:'l2',task:'Print the first letter of the input in capitals, or <code>(empty)</code>. Use the short-circuit guard <code>text and ...</code> in one condition, so an empty input never reaches <code>text[0]</code>.',stdin:'python',code:'text = input("Text: ").strip()\n',
 tests:[T('python','P'),T('   ','(empty)'),T('a','A')],
 sol:py`text = input("Text: ").strip()
if text and text[0].isalpha():
    print(text[0].upper())
else:
    print("(empty)")
`},
w1i_grade:{title:'Grade bands',lvl:'l1',task:'Read a mark 0–100. Print the grade: A* 90+, A 80+, B 70+, C 60+, D 50+, otherwise U. Order the branches so each states one boundary.',stdin:'84',code:'',
 tests:[T('84','A'),T('90','A*'),T('49','U'),T('70','B'),T('60','C'),T('55','D')],
 sol:py`mark = int(input("Mark: "))
if mark >= 90:
    print("A*")
elif mark >= 80:
    print("A")
elif mark >= 70:
    print("B")
elif mark >= 60:
    print("C")
elif mark >= 50:
    print("D")
else:
    print("U")
`},
w1i_shipping:{title:'Shipping with guard clauses',lvl:'l2',task:'Write <code>shipping(total, country)</code> using guard clauses (early returns, no else): non-UK countries → <code>International</code>; UK totals of £50+ → <code>Free</code>; UK totals of £20+ → <code>£2.99</code>; otherwise <code>£4.99</code>. Country comparison ignores case and spaces.',code:py`# write shipping(total, country) here


print(shipping(60, "uk"))
print(shipping(25, " UK "))
print(shipping(5, "UK"))
print(shipping(100, "France"))
`,tests:[T('','Free\n£2.99\n£4.99\nInternational')],extra:c=>/else/.test(c)?'Use early returns instead of else.':null,
 sol:py`def shipping(total, country):
    if country.strip().upper() != "UK":
        return "International"
    if total >= 50:
        return "Free"
    if total >= 20:
        return "£2.99"
    return "£4.99"


print(shipping(60, "uk"))
print(shipping(25, " UK "))
print(shipping(5, "UK"))
print(shipping(100, "France"))
`},
w1i_bools:{title:'Boolean helpers',lvl:'l2',task:'Write three functions that each <b>return a Boolean expression directly</b> (no if): <code>is_adult(age)</code> (18 or over), <code>is_weekend(day)</code> (sat or sun, any case), <code>is_pin(text)</code> (exactly 4 characters and all digits). The prints are written.',code:py`# write is_adult, is_weekend, is_pin here


print(is_adult(18), is_adult(17))
print(is_weekend("sat"), is_weekend("Sun"), is_weekend("Mon"))
print(is_pin("4821"), is_pin("482"), is_pin("48a1"))
`,tests:[T('','True False\nTrue True False\nTrue False False')],extra:c=>/\bif\b/.test(c)?'Return the Boolean expression directly, without if.':null,
 sol:py`def is_adult(age):
    return age >= 18


def is_weekend(day):
    return day.lower() == "sat" or day.lower() == "sun"


def is_pin(text):
    return len(text) == 4 and text.isdigit()


print(is_adult(18), is_adult(17))
print(is_weekend("sat"), is_weekend("Sun"), is_weekend("Mon"))
print(is_pin("4821"), is_pin("482"), is_pin("48a1"))
`},
w1i_triangle:{title:'Triangle classifier',lvl:'l3',task:'Read three side lengths (whole numbers, one per line). Print <code>Not a triangle</code> if any side is 0 or less, or if any two sides together are not longer than the third; otherwise <code>Equilateral</code>, <code>Isosceles</code> or <code>Scalene</code>. Use <code>or</code> and <code>and</code>.',stdin:'3\n4\n5',code:'',
 tests:[T('3\n4\n5','Scalene'),T('2\n2\n2','Equilateral'),T('5\n5\n8','Isosceles'),T('1\n2\n3','Not a triangle'),T('0\n4\n4','Not a triangle')],
 sol:py`a = int(input("a: "))
b = int(input("b: "))
c = int(input("c: "))
if a <= 0 or b <= 0 or c <= 0 or a + b <= c or a + c <= b or b + c <= a:
    print("Not a triangle")
elif a == b and b == c:
    print("Equilateral")
elif a == b or b == c or a == c:
    print("Isosceles")
else:
    print("Scalene")
`},
x1_fizzone:{title:'One FizzBuzz answer',lvl:'l2',task:'Read one number and print its FizzBuzz answer (Fizz for multiples of 3, Buzz for 5, FizzBuzz for both, otherwise the number). Think about which test must come first.',stdin:'15',code:'',
 tests:[T('15','FizzBuzz'),T('9','Fizz'),T('10','Buzz'),T('7','7')],
 sol:py`n = int(input("N: "))
if n % 3 == 0 and n % 5 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)
`},
x1_bmi:{title:'BMI category',lvl:'l2',task:'Read weight (kg) and height (m). Print BMI to 1 decimal and the NHS adult category: under 18.5 Underweight; under 25 Healthy; under 30 Overweight; otherwise Obese. Format: <code>BMI 22.9: Healthy</code>.',stdin:'70\n1.75',code:'',
 tests:[T('70\n1.75','BMI 22.9: Healthy'),T('50\n1.8','BMI 15.4: Underweight'),T('95\n1.75','BMI 31.0: Obese'),T('80\n1.75','BMI 26.1: Overweight')],
 sol:py`kg = float(input("Weight: "))
m = float(input("Height: "))
bmi = kg / m ** 2
if bmi < 18.5:
    cat = "Underweight"
elif bmi < 25:
    cat = "Healthy"
elif bmi < 30:
    cat = "Overweight"
else:
    cat = "Obese"
print(f"BMI {bmi:.1f}: {cat}")
`},
x1_ticket:{title:'Cinema ticket price',lvl:'l3',task:'Read age and day (e.g. <code>tue</code>). Under 12: £6. 65 and over: £7. Everyone else: £11. Tuesdays everyone pays half. Print the price with 2 decimals, e.g. <code>£5.50</code>.',stdin:'30\nTue',code:'',
 tests:[T('30\nTue','£5.50'),T('8\nfri','£6.00'),T('70\ntue','£3.50'),T('12\nmon','£11.00')],
 sol:py`age = int(input("Age: "))
day = input("Day: ").strip().lower()
if age < 12:
    price = 6
elif age >= 65:
    price = 7
else:
    price = 11
if day == "tue":
    price = price / 2
print(f"£{price:.2f}")
`},
x1_time:{title:'Greeting by time',lvl:'l2',task:'Read a 24-hour time like <code>14:30</code>. Print <code>Good morning</code> (05:00–11:59), <code>Good afternoon</code> (12:00–17:59), <code>Good evening</code> (18:00–21:59) or <code>Good night</code>.',stdin:'14:30',code:'',
 tests:[T('14:30','Good afternoon'),T('05:00','Good morning'),T('04:59','Good night'),T('21:59','Good evening'),T('23:10','Good night')],
 sol:py`hours, minutes = input("Time: ").split(":")
h = int(hours)
if 5 <= h < 12:
    print("Good morning")
elif 12 <= h < 18:
    print("Good afternoon")
elif 18 <= h < 22:
    print("Good evening")
else:
    print("Good night")
`},
x1_vowel:{title:'a or an?',lvl:'l2',task:'Read a word. Print it with the right article: <code>an apple</code>, <code>a banana</code>. Use the vowel rule (a, e, i, o, u, any case). Empty input → <code>(nothing)</code>.',stdin:'Apple',code:'',
 tests:[T('Apple','an Apple'),T('banana','a banana'),T('  ','(nothing)'),T('umbrella','an umbrella')],
 sol:py`word = input("Word: ").strip()
if not word:
    print("(nothing)")
elif word[0].lower() in "aeiou":
    print(f"an {word}")
else:
    print(f"a {word}")
`},
x1_parking:{title:'Parking charge',lvl:'l3',task:'Read minutes parked. Stays of 30 minutes or less are free. Longer stays cost £1.50 for every <i>started</i> hour of the whole stay (61 minutes counts as 2 hours = £3.00). The charge is capped at £8. Print it with 2 decimals.',spec:'25 → £0.00\n31 → £1.50\n60 → £1.50\n61 → £3.00\n600 → £8.00',stdin:'61',code:'',
 tests:[T('25','£0.00'),T('31','£1.50'),T('60','£1.50'),T('61','£3.00'),T('600','£8.00')],
 sol:py`minutes = int(input("Minutes: "))
if minutes <= 30:
    charge = 0
else:
    hours = (minutes + 59) // 60
    charge = hours * 1.5
    if charge > 8:
        charge = 8
print(f"£{charge:.2f}")
`},
x1_tax:{title:'Simplified income tax',lvl:'l4',task:'A <b>simplified, made-up</b> tax for practice (not the real UK rules): the first £12,570 is tax-free; income from £12,571 to £50,270 is taxed at 20%; above £50,270 at 40%. Read an annual income and print the tax and the take-home pay with thousands separators.',stdin:'60000',code:'',
 tests:[T('60000','Tax: £11,432.00\nTake-home: £48,568.00'),T('10000','Tax: £0.00\nTake-home: £10,000.00'),T('30000','Tax: £3,486.00\nTake-home: £26,514.00')],
 sol:py`income = float(input("Income: "))
if income > 50270:
    tax = (income - 50270) * 0.4 + (50270 - 12570) * 0.2
elif income > 12570:
    tax = (income - 12570) * 0.2
else:
    tax = 0
print(f"Tax: £{tax:,.2f}")
print(f"Take-home: £{income - tax:,.2f}")
`},
x1_rps:{title:'Rock, paper, scissors judge',lvl:'l3',task:'Read two moves (player 1, player 2), any case. Print <code>Invalid move</code> if either is not rock, paper or scissors; otherwise <code>Draw</code>, <code>Player 1 wins</code> or <code>Player 2 wins</code>. Describe the three winning combinations for player 1 in one condition with <code>and</code>/<code>or</code>.',stdin:'rock\nScissors',code:'',
 tests:[T('rock\nScissors','Player 1 wins'),T('paper\nscissors','Player 2 wins'),T('rock\nrock','Draw'),T('rock\nlizard','Invalid move')],
 sol:py`a = input("P1: ").strip().lower()
b = input("P2: ").strip().lower()
a_ok = a == "rock" or a == "paper" or a == "scissors"
b_ok = b == "rock" or b == "paper" or b == "scissors"
if not a_ok or not b_ok:
    print("Invalid move")
elif a == b:
    print("Draw")
elif (a == "rock" and b == "scissors") or (a == "scissors" and b == "paper") or (a == "paper" and b == "rock"):
    print("Player 1 wins")
else:
    print("Player 2 wins")
`},
x1_postage:{title:'Parcel postage',lvl:'l4',task:'Read weight in kg and whether it is <code>first</code> or <code>second</code> class. Second: up to 1kg £3.20, up to 2kg £4.50, up to 10kg £7.90. First class costs £2 more in every band. Over 10kg → <code>Too heavy</code>. Unknown class → <code>Unknown service</code>. (Made-up prices.)',stdin:'1.5\nfirst',code:'',
 tests:[T('1.5\nfirst','£6.50'),T('0.4\nsecond','£3.20'),T('12\nfirst','Too heavy'),T('2\nexpress','Unknown service'),T('10\nSecond','£7.90')],
 sol:py`kg = float(input("Weight: "))
service = input("Class: ").strip().lower()
if service != "first" and service != "second":
    print("Unknown service")
elif kg > 10:
    print("Too heavy")
else:
    if kg <= 1:
        price = 3.20
    elif kg <= 2:
        price = 4.50
    else:
        price = 7.90
    if service == "first":
        price = price + 2
    print(f"£{price:.2f}")
`},
x1_date:{title:'Valid date?',lvl:'l5',task:'Read a day, a month and a year (whole numbers, one per line). Print <code>Valid</code> or <code>Invalid</code>. Check the month is 1–12 and the day fits that month, including February in leap years (divisible by 4, except centuries unless divisible by 400).',stdin:'29\n2\n2024',code:'',
 tests:[T('29\n2\n2024','Valid'),T('29\n2\n2026','Invalid'),T('31\n4\n2026','Invalid'),T('31\n12\n2026','Valid'),T('0\n1\n2026','Invalid'),T('15\n13\n2026','Invalid')],
 sol:py`d = int(input("Day: "))
m = int(input("Month: "))
y = int(input("Year: "))
leap = y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)
if m == 4 or m == 6 or m == 9 or m == 11:
    days = 30
elif m == 2:
    days = 29 if leap else 28
elif 1 <= m <= 12:
    days = 31
else:
    days = 0
if 1 <= d <= days:
    print("Valid")
else:
    print("Invalid")
`},
x1_council:{title:'Bin day finder',lvl:'l4',task:'A council publishes bin days by the area part of the postcode (before the space, upper case): NW10 → Tuesday, NW2 → Wednesday, W3 → Thursday, HA0 → Monday. Anything else → <code>Not our area</code>. Print <code>Bins out on DAY</code>. Split the postcode into its two parts with unpacking.',stdin:'nw10 4ab',code:'',
 tests:[T('nw10 4ab','Bins out on Tuesday'),T('W3 6AB','Bins out on Thursday'),T('E1 6AN','Not our area')],
 sol:py`area, rest = input("Postcode: ").strip().upper().split(" ")
if area == "NW10":
    print("Bins out on Tuesday")
elif area == "NW2":
    print("Bins out on Wednesday")
elif area == "W3":
    print("Bins out on Thursday")
elif area == "HA0":
    print("Bins out on Monday")
else:
    print("Not our area")
`},
x1_validator:{title:'Sign-up validator',lvl:'l5',task:'Read username, age and email. Report <b>every</b> problem, in this order (separate ifs!): username not 3–15 characters → <code>Username length</code>; username not only letters/digits → <code>Username characters</code>; age not all digits or under 13 → <code>Age</code>; email without exactly one <code>@</code>, or without a dot after the @ → <code>Email</code>. If there were no problems: <code>Account created</code>. Keep a Boolean variable that starts True and becomes False on any problem.',stdin:'sara_99\n12\nsara.example.com',code:'',
 tests:[T('sara_99\n12\nsara.example.com','Username characters\nAge\nEmail'),T('ab\nx\na@b@c.uk','Username length\nAge\nEmail'),T('Sara99\n30\nsara@mail.co.uk','Account created'),T('Sara99\n30\nsara@mailcouk','Email')],
 sol:py`user = input("Username: ").strip()
age = input("Age: ").strip()
email = input("Email: ").strip()
ok = True
if not 3 <= len(user) <= 15:
    print("Username length")
    ok = False
if not user.isalnum():
    print("Username characters")
    ok = False
if not age.isdigit() or int(age) < 13:
    print("Age")
    ok = False
if email.count("@") != 1:
    print("Email")
    ok = False
else:
    name, domain = email.split("@")
    if "." not in domain:
        print("Email")
        ok = False
if ok:
    print("Account created")
`},
ledger_a:{title:'Pocket Ledger · Part A',lvl:'proj',code:py`# Pocket Ledger, part A: helper functions (Week 0 tools only)


def money(amount):
    ...


def main():
    ...


main()
`,stages:[
 {title:'money()',task:'Write <code>money(amount)</code> that <b>returns</b> the amount as pounds with thousands separators and 2 decimals: <code>money(1234.5)</code> → <code>£1,234.50</code>. Leave <code>main()</code> empty for now. The check calls your function directly.',
  tests:[{inp:'',after:'print(money(1234.5))\nprint(money(7))\nprint(money(0.456))\nprint(money(1000000))',exp:'£1,234.50\n£7.00\n£0.46\n£1,000,000.00',label:'money(1234.5), money(7), money(0.456), money(1000000)'}],
  sol:py`# Pocket Ledger, part A: helper functions (Week 0 tools only)


def money(amount):
    return f"£{amount:,.2f}"


def main():
    ...


main()
`},
 {title:'parse_amount()',task:'People type amounts like <code> £1,250.50 </code>. Add <code>parse_amount(text)</code> that strips spaces, removes <code>£</code> and commas, and <b>returns a float</b>.',
  tests:[{inp:'',after:'print(parse_amount(" £1,250.50 ") + 1)\nprint(parse_amount("12"))\nprint(parse_amount("£0.99"))',exp:'1251.5\n12.0\n0.99',label:'parse_amount on three inputs'}],
  sol:py`# Pocket Ledger, part A: helper functions (Week 0 tools only)


def money(amount):
    return f"£{amount:,.2f}"


def parse_amount(text):
    return float(text.strip().replace("£", "").replace(",", ""))


def main():
    ...


main()
`},
 {title:'percent_of()',task:'Add <code>percent_of(part, whole)</code> that returns the share as a string with 1 decimal: <code>percent_of(450, 1000)</code> → <code>45.0%</code>. Use the <code>%</code> format type.',
  tests:[{inp:'',after:'print(percent_of(450, 1000))\nprint(percent_of(1, 3))\nprint(percent_of(950, 2300))',exp:'45.0%\n33.3%\n41.3%',label:'percent_of on three inputs'}],
  sol:py`# Pocket Ledger, part A: helper functions (Week 0 tools only)


def money(amount):
    return f"£{amount:,.2f}"


def parse_amount(text):
    return float(text.strip().replace("£", "").replace(",", ""))


def percent_of(part, whole):
    return f"{part / whole:.1%}"


def main():
    ...


main()
`},
 {title:'A first summary',task:'Now fill in <code>main()</code>: ask for a name, a monthly income and the rent (amounts may be typed with £ and commas). Print exactly these four lines, using your three helpers.',spec:'Hi Sara!\nIncome: £2,300.00\nRent: £950.00 (41.3% of income)\nLeft after rent: £1,350.00',
  tests:[T('  sara \n£2,300\n950','Hi Sara!\nIncome: £2,300.00\nRent: £950.00 (41.3% of income)\nLeft after rent: £1,350.00'),T('OMAR\n1,800.50\n£700','Hi Omar!\nIncome: £1,800.50\nRent: £700.00 (38.9% of income)\nLeft after rent: £1,100.50')],
  sol:py`# Pocket Ledger, part A: helper functions (Week 0 tools only)


def money(amount):
    return f"£{amount:,.2f}"


def parse_amount(text):
    return float(text.strip().replace("£", "").replace(",", ""))


def percent_of(part, whole):
    return f"{part / whole:.1%}"


def main():
    name = input("Name: ").strip().title()
    income = parse_amount(input("Monthly income: "))
    rent = parse_amount(input("Rent: "))
    print(f"Hi {name}!")
    print(f"Income: {money(income)}")
    print(f"Rent: {money(rent)} ({percent_of(rent, income)} of income)")
    print(f"Left after rent: {money(income - rent)}")


main()
`}]},
ledger_b:{title:'Pocket Ledger · Part B',lvl:'proj',carry:'ledger_a',stdin:'Tesco Express\n-23.40\n250',stages:[
 {title:'category()',task:'Your code from Part A is loaded. Add <code>category(description)</code> that lower-cases the description and returns: <code>groceries</code> if it contains tesco, sainsbury or aldi; <code>subscriptions</code> for netflix or spotify; <code>transport</code> for tfl, uber or train; <code>rent</code> for rent; <code>income</code> for salary; otherwise <code>other</code>. <b>Watch the order:</b> "ne<b>tfl</b>ix" contains "tfl", so subscriptions must be checked before transport. Substring rules have traps like this in real systems too. The check calls it directly, after your <code>main()</code> runs with sample input.',
  tests:[{inp:'Sara\n2300\n950',after:'print(category("Tesco Express"))\nprint(category("TfL Travel"))\nprint(category("SPOTIFY"))\nprint(category("Netflix"))\nprint(category("Rent"))\nprint(category("Salary"))\nprint(category("Cinema"))',exp:'groceries\ntransport\nsubscriptions\nsubscriptions\nrent\nincome\nother',label:'seven descriptions (including the Netflix trap)'}],
  sol:'@LA+cat'},
 {title:'Negative money',task:'Bank exports show spending as negative numbers. Improve <code>money()</code> so negatives show the sign before the £: <code>money(-12)</code> → <code>-£12.00</code>. Positive amounts stay the same.',
  tests:[{inp:'Sara\n2300\n950',after:'print(money(-12))\nprint(money(-1234.5))\nprint(money(5))',exp:'-£12.00\n-£1,234.50\n£5.00',label:'money with negatives'}],
  sol:'@LA+cat+neg'},
 {title:'budget_status()',task:'Add <code>budget_status(spent, budget)</code>: return <code>OK</code> if spent is at most 80% of the budget, <code>Warning</code> if at most 100%, otherwise <code>Over by £X</code> (use <code>money()</code> for the excess).',
  tests:[{inp:'Sara\n2300\n950',after:'print(budget_status(100, 250))\nprint(budget_status(200, 250))\nprint(budget_status(250, 250))\nprint(budget_status(262.5, 250))',exp:'OK\nOK\nWarning\nOver by £12.50',label:'four budget cases'}],
  sol:'@LA+cat+neg+bud'},
 {title:'Check one transaction',task:'Replace <code>main()</code>: ask for a description, an amount (negative = spending) and the monthly budget for its category. Print the two lines below. For income (positive amounts), print <code>Budget: n/a</code> instead of a status.',spec:'Tesco Express: groceries, -£23.40\nBudget: OK',
  tests:[T('Tesco Express\n-23.40\n250','Tesco Express: groceries, -£23.40\nBudget: OK'),T(' uber \n-140\n120','Uber: transport, -£140.00\nBudget: Over by £20.00'),T('Salary\n2300\n0','Salary: income, £2,300.00\nBudget: n/a')],
  sol:'@LB'}]},
ledger_c:{title:'Pocket Ledger · Part C',lvl:'proj',carry:'ledger_b',files:{'transactions.csv':TX_OCT},stdin:'transactions.csv',stages:[
 {title:'load()',task:'Your Part B code is loaded. The file <b>transactions.csv</b> (see its tab) has lines <code>date,description,amount</code>. Add <code>load(filename)</code> that returns a list of <code>(date, description, amount)</code> tuples with amount as a float. Read with <code>with open(filename) as f: lines = f.read().splitlines()</code> and skip blank lines. Keep main() as it is for now: the check gives it input.',
  tests:[{inp:'Tesco\n-1\n10',after:'tx = load("transactions.csv")\nprint(len(tx))\nprint(tx[0])\nprint(tx[-1][2] + 1)',exp:"13\n('2026-10-01', 'Salary', 2300.0)\n-11.0",label:'load the October file'},{inp:'Tesco\n-1\n10',files:{'transactions.csv':TX_NOV},after:'print(len(load("transactions.csv")))',exp:'5',label:'load another file'}],
  sol:'@LC1'},
 {title:'Totals by category',task:'Add <code>totals_by_category(transactions)</code> returning a dict of category → total <b>spent</b> as a positive number. Only negative amounts count (income is ignored). Use your <code>category()</code>.',
  tests:[{inp:'Tesco\n-1\n10',after:'t = totals_by_category(load("transactions.csv"))\nfor k in sorted(t):\n    print(k, round(t[k], 2))',exp:'groceries 175.5\nother 47.0\nrent 950.0\nsubscriptions 22.98\ntransport 69.7',label:'October totals'}],
  sol:'@LC2'},
 {title:'The report',task:'Add <code>report(transactions)</code> that <b>prints</b> the report below: income, spent, saved; then each category by spend, biggest first, as <code>f"  {cat:&lt;14}{money(total):&gt;10}"</code>; then the biggest single purchase (most negative amount).',spec:"Income: £2,300.00\nSpent: £1,265.18\nSaved: £1,034.82\nBy category:\n  rent             £950.00\n  groceries        £175.50\n  transport         £69.70\n  other             £47.00\n  subscriptions     £22.98\nBiggest purchase: Rent (£950.00)",
  tests:[{inp:'Tesco\n-1\n10',after:'report(load("transactions.csv"))',exp:"Income: £2,300.00\nSpent: £1,265.18\nSaved: £1,034.82\nBy category:\n  rent             £950.00\n  groceries        £175.50\n  transport         £69.70\n  other             £47.00\n  subscriptions     £22.98\nBiggest purchase: Rent (£950.00)",label:'October report'},{inp:'Tesco\n-1\n10',files:{'transactions.csv':TX_NOV},after:'report(load("transactions.csv"))',exp:"Income: £1,850.00\nSpent: £420.00\nSaved: £1,430.00\nBy category:\n  groceries        £280.00\n  transport        £140.00\nBiggest purchase: Tesco (£160.00)",label:'November report'}],
  sol:'@LC3'},
 {title:'The real program',task:'Replace <code>main()</code>: ask for the file name, print the report, then a line <code>Budgets:</code> and, for each budget in the dict below (in this order), <code>  CATEGORY: STATUS</code> using your <code>budget_status()</code> (0 spent if the category is missing). Add this dict at the top of your file: <code>BUDGETS = {"groceries": 250, "transport": 120, "subscriptions": 25, "other": 200}</code>.',
  tests:[T('transactions.csv','Budgets:\n  groceries: OK\n  transport: OK\n  subscriptions: Warning\n  other: OK'),{inp:'transactions.csv',files:{'transactions.csv':TX_NOV},exp:'Budgets:\n  groceries: Over by £30.00\n  transport: Over by £20.00\n  subscriptions: OK\n  other: OK',label:'November budgets'}],
  sol:'@LC4'}]},
});

/* ledger reference solutions, built step by step */
(function(){
 const head='# Pocket Ledger\n\n\n';
 const money0='def money(amount):\n    return f"£{amount:,.2f}"\n\n\n';
 const moneyNeg='def money(amount):\n    if amount < 0:\n        return f"-£{-amount:,.2f}"\n    return f"£{amount:,.2f}"\n\n\n';
 const parse='def parse_amount(text):\n    return float(text.strip().replace("£", "").replace(",", ""))\n\n\n';
 const pct='def percent_of(part, whole):\n    return f"{part / whole:.1%}"\n\n\n';
 const cat=`def category(description):
    d = description.lower()
    if "tesco" in d or "sainsbury" in d or "aldi" in d:
        return "groceries"
    elif "netflix" in d or "spotify" in d:
        return "subscriptions"
    elif "tfl" in d or "uber" in d or "train" in d:
        return "transport"
    elif "rent" in d:
        return "rent"
    elif "salary" in d:
        return "income"
    return "other"


`;
 const bud=`def budget_status(spent, budget):
    if spent <= budget * 0.8:
        return "OK"
    if spent <= budget:
        return "Warning"
    return "Over by " + money(spent - budget)


`;
 const mainA=`def main():
    name = input("Name: ").strip().title()
    income = parse_amount(input("Monthly income: "))
    rent = parse_amount(input("Rent: "))
    print(f"Hi {name}!")
    print(f"Income: {money(income)}")
    print(f"Rent: {money(rent)} ({percent_of(rent, income)} of income)")
    print(f"Left after rent: {money(income - rent)}")


main()
`;
 const mainB=`def main():
    description = input("Description: ").strip().title()
    amount = parse_amount(input("Amount: "))
    budget = parse_amount(input("Budget: "))
    print(f"{description}: {category(description)}, {money(amount)}")
    if amount >= 0:
        print("Budget: n/a")
    else:
        print(f"Budget: {budget_status(-amount, budget)}")


main()
`;
 const load=`def load(filename):
    with open(filename) as f:
        lines = f.read().splitlines()
    transactions = []
    for line in lines:
        if not line.strip():
            continue
        date, description, amount = line.split(",")
        transactions.append((date, description, float(amount)))
    return transactions


`;
 const totals=`def totals_by_category(transactions):
    totals = {}
    for date, description, amount in transactions:
        if amount < 0:
            c = category(description)
            totals[c] = totals.get(c, 0) - amount
    return totals


`;
 const report=`def report(transactions):
    income = sum(a for _, _, a in transactions if a > 0)
    spent = -sum(a for _, _, a in transactions if a < 0)
    print(f"Income: {money(income)}")
    print(f"Spent: {money(spent)}")
    print(f"Saved: {money(income - spent)}")
    print("By category:")
    totals = totals_by_category(transactions)
    for cat, total in sorted(totals.items(), key=lambda kv: kv[1], reverse=True):
        print(f"  {cat:<14}{money(total):>10}")
    biggest = min(transactions, key=lambda t: t[2])
    print(f"Biggest purchase: {biggest[1]} ({money(-biggest[2])})")


`;
 const mainC=`def main():
    filename = input("File: ").strip()
    transactions = load(filename)
    report(transactions)
    totals = totals_by_category(transactions)
    print("Budgets:")
    for cat, budget in BUDGETS.items():
        print(f"  {cat}: {budget_status(totals.get(cat, 0), budget)}")


main()
`;
 const budgets='BUDGETS = {"groceries": 250, "transport": 120, "subscriptions": 25, "other": 200}\n\n\n';
 const S={
  '@LA+cat':head+money0+parse+pct+cat+mainA,
  '@LA+cat+neg':head+moneyNeg+parse+pct+cat+mainA,
  '@LA+cat+neg+bud':head+moneyNeg+parse+pct+cat+bud+mainA,
  '@LB':head+moneyNeg+parse+pct+cat+bud+mainB,
  '@LC1':head+moneyNeg+parse+pct+cat+bud+load+mainB,
  '@LC2':head+moneyNeg+parse+pct+cat+bud+load+totals+mainB,
  '@LC3':head+moneyNeg+parse+pct+cat+bud+load+totals+report+mainB,
  '@LC4':head+budgets+moneyNeg+parse+pct+cat+bud+load+totals+report+mainC,
 };
 ['ledger_b','ledger_c'].forEach(id=>R[id].stages.forEach(s=>{if(S[s.sol])s.sol=S[s.sol]}));
 R.ledger_b.code=R.ledger_a.stages[3].sol;   // reference starter if Part A isn't finished
 R.ledger_c.code=S['@LB'];
})();
