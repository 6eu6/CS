/* Week 3 · Exceptions — original practice */
Object.assign(R,{
w3_try_int:{title:"Safe integer conversion",lvl:"l1",task:"Read one input line. Print its integer value. If conversion fails, print exactly Invalid integer. Catch ValueError only.",stdin:"42",code:'text = input("Number: ")\n',tests:[T("42","42"),T("-7","-7"),T("hello","Invalid integer"),T("3.5","Invalid integer")],sol:py`text = input("Number: ")
try:
    number = int(text)
except ValueError:
    print("Invalid integer")
else:
    print(number)
`},
w3_raise:{title:"Validate a withdrawal",lvl:"l2",task:"Write withdraw(balance, amount). Raise ValueError if amount <= 0 or amount > balance; otherwise return balance - amount. The calls below are supplied.",code:py`# define withdraw(balance, amount)

print(withdraw(100, 25))
try:
    print(withdraw(100, 0))
except ValueError as error:
    print(type(error).__name__)
try:
    print(withdraw(100, 150))
except ValueError as error:
    print(type(error).__name__)
`,tests:[T("","75\nValueError\nValueError")],sol:py`def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount

print(withdraw(100, 25))
try:
    print(withdraw(100, 0))
except ValueError as error:
    print(type(error).__name__)
try:
    print(withdraw(100, 150))
except ValueError as error:
    print(type(error).__name__)
`},
w3_choose:{title:"Retry invalid input",lvl:"l2",task:"Keep asking for a whole number until valid input is entered. Invalid input prints Try again. Print Accepted: N for the first valid integer.",stdin:"abc\n2.5\n18",code:"",tests:[T("abc\n2.5\n18","Try again\nTry again\nAccepted: 18"),T("0","Accepted: 0")],sol:py`while True:
    try:
        number = int(input("Number: "))
    except ValueError:
        print("Try again")
    else:
        print(f"Accepted: {number}")
        break
`},
w3_lab_amount:{title:"Ledger amount parser",lvl:"l2",task:"Write parse_amount(text). Return a float for valid numeric text. Raise ValueError for invalid text and for amounts <= 0. The supplied caller prints the result or Invalid amount.",code:py`# define parse_amount(text)

for raw in ["12.50", "-4", "oops"]:
    try:
        print(f"{parse_amount(raw):.2f}")
    except ValueError:
        print("Invalid amount")
`,tests:[T("","12.50\nInvalid amount\nInvalid amount")],sol:py`def parse_amount(text):
    try:
        amount = float(text)
    except ValueError:
        raise ValueError("amount must be numeric")
    if amount <= 0:
        raise ValueError("amount must be positive")
    return amount

for raw in ["12.50", "-4", "oops"]:
    try:
        print(f"{parse_amount(raw):.2f}")
    except ValueError:
        print("Invalid amount")
`},
w3_lab_function:{title:"Safe division function",lvl:"l2",task:"Write divide(a, b). Raise ZeroDivisionError when b is zero; otherwise return a / b. Do not catch the error inside the function.",code:py`# define divide(a, b)

print(divide(10, 2))
try:
    divide(5, 0)
except ZeroDivisionError:
    print("Cannot divide by zero")
`,tests:[T("","5.0\nCannot divide by zero")],sol:py`def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("b cannot be zero")
    return a / b

print(divide(10, 2))
try:
    divide(5, 0)
except ZeroDivisionError:
    print("Cannot divide by zero")
`},
w3_test_parse:{title:"Assessment: parse safely",lvl:"l2",task:"Read a number. Print its reciprocal to 2 decimals. If input is not numeric or is zero, print Invalid input. Catch ValueError and ZeroDivisionError.",stdin:"4",code:"",tests:[T("4","0.25"),T("0","Invalid input"),T("abc","Invalid input"),T("-2","-0.50")],sol:py`try:
    number = float(input("Number: "))
    print(f"{1 / number:.2f}")
except (ValueError, ZeroDivisionError):
    print("Invalid input")
`},
w3_test_validate:{title:"Assessment: domain validation",lvl:"l2",task:"Write set_age(text). Convert text to int; raise ValueError for non-numeric input or values outside 0..120. The supplied caller prints the returned age or Invalid age.",code:py`# define set_age(text)

for value in ["37", "-1", "abc", "121"]:
    try:
        print(set_age(value))
    except ValueError:
        print("Invalid age")
`,tests:[T("","37\nInvalid age\nInvalid age\nInvalid age")],sol:py`def set_age(text):
    age = int(text)
    if not 0 <= age <= 120:
        raise ValueError("age outside supported range")
    return age

for value in ["37", "-1", "abc", "121"]:
    try:
        print(set_age(value))
    except ValueError:
        print("Invalid age")
`}
});