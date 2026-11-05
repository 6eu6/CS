/* Pocket Ledger project extensions: one milestone per remaining CS50P week. */
Object.assign(R,{
ledger_d:{title:"Part D · resilient transaction parsing",lvl:"proj",task:"Implement parse_transaction(line). The line is date,description,amount separated by commas. Return a tuple (date, description, float amount). Raise ValueError for a missing field or a non-numeric amount. Do not catch errors inside the function.",code:py`# define parse_transaction(line)

for line in ["2026-11-01,Salary,1800.00", "2026-11-02,Food,abc", "bad,row"]:
    try:
        print(parse_transaction(line))
    except ValueError:
        print("Invalid transaction")
`,tests:[T("","('2026-11-01', 'Salary', 1800.0)\nInvalid transaction\nInvalid transaction")],sol:py`def parse_transaction(line):
    parts = line.split(",")
    if len(parts) != 3:
        raise ValueError("expected three fields")
    date, description, raw_amount = parts
    try:
        amount = float(raw_amount)
    except ValueError:
        raise ValueError("amount must be numeric")
    if not date or not description:
        raise ValueError("date and description are required")
    return date, description, amount

for line in ["2026-11-01,Salary,1800.00", "2026-11-02,Food,abc", "bad,row"]:
    try:
        print(parse_transaction(line))
    except ValueError:
        print("Invalid transaction")
`},
ledger_e:{title:"Part E · monthly statistics",lvl:"proj",task:"Implement monthly_stats(amounts) returning (total, median). Use the statistics module for median. Print both values to 2 decimal places.",code:py`# define monthly_stats(amounts)

total, middle = monthly_stats([10.0, 20.0, 90.0, 30.0])
print(f"Total: £{total:.2f}")
print(f"Median: £{middle:.2f}")
`,tests:[T("","Total: £150.00\nMedian: £25.00")],sol:py`import statistics

def monthly_stats(amounts):
    return sum(amounts), statistics.median(amounts)

total, middle = monthly_stats([10.0, 20.0, 90.0, 30.0])
print(f"Total: £{total:.2f}")
print(f"Median: £{middle:.2f}")
`},
ledger_f:{title:"Part F · test the ledger rules",lvl:"proj",task:"Implement is_valid_amount(amount): True only for positive amounts. Keep the supplied assertions. In your real project, move these checks into pytest test functions.",code:py`# define is_valid_amount(amount)

assert is_valid_amount(0.01) is True
assert is_valid_amount(0) is False
assert is_valid_amount(-5) is False
print("Ledger validation tests passed")
`,tests:[T("","Ledger validation tests passed")],sol:py`def is_valid_amount(amount):
    return amount > 0

assert is_valid_amount(0.01) is True
assert is_valid_amount(0) is False
assert is_valid_amount(-5) is False
print("Ledger validation tests passed")
`},
ledger_g:{title:"Part G · import a bank CSV",lvl:"proj",task:"Use csv.DictReader and io.StringIO to read the supplied CSV. Return a list of (description, float amount) tuples.",code:py`import csv
import io
data = """date,description,amount
2026-11-01,Salary,1800.00
2026-11-02,Food,-25.50
"""
# define read_transactions(data)
print(read_transactions(data))
`,tests:[T("","[('Salary', 1800.0), ('Food', -25.5)]")],sol:py`import csv
import io
data = "date,description,amount\\n2026-11-01,Salary,1800.00\\n2026-11-02,Food,-25.50\\n"

def read_transactions(data):
    rows = []
    for row in csv.DictReader(io.StringIO(data)):
        rows.append((row["description"], float(row["amount"])))
    return rows

print(read_transactions(data))
`},
ledger_h:{title:"Part H · parse messy bank text",lvl:"proj",task:"Use re.search with named groups to extract a date (YYYY-MM-DD) and signed decimal amount from the supplied line. Print date and amount separated by a space, or Invalid line.",stdin:"Card payment 2026-11-05 amount -12.50 GBP",code:"",tests:[T("Card payment 2026-11-05 amount -12.50 GBP","2026-11-05 -12.50"),T("no transaction data","Invalid line")],sol:py`import re
line = input("Bank text: ")
match = re.search(r"(?P<date>[0-9]{4}-[0-9]{2}-[0-9]{2}).*?(?P<amount>-?[0-9]+\\.[0-9]{2})", line)
if match:
    print(match.group("date"), match.group("amount"))
else:
    print("Invalid line")
`},
ledger_i:{title:"Part I · model transactions as objects",lvl:"proj",task:"Create a Transaction class with date, description and amount attributes. Add an is_income() method. Print the description and result.",code:py`# define Transaction(date, description, amount)

item = Transaction("2026-11-01", "Salary", 1800.0)
print(item.description, item.is_income())
`,tests:[T("","Salary True")],sol:py`class Transaction:
    def __init__(self, date, description, amount):
        self.date = date
        self.description = description
        self.amount = amount

    def is_income(self):
        return self.amount > 0

item = Transaction("2026-11-01", "Salary", 1800.0)
print(item.description, item.is_income())
`},
ledger_j:{title:"Part J · command-line ledger",lvl:"proj",task:"Use argparse to define a command positional argument with choices summary and categories. Parse the supplied argument list and print the chosen command.",code:py`# create an ArgumentParser and add the command argument

args = parser.parse_args(["summary"])
print(args.command)
`,tests:[T("","summary")],sol:py`import argparse
parser = argparse.ArgumentParser()
parser.add_argument("command", choices=["summary", "categories"])
args = parser.parse_args(["summary"])
print(args.command)
`}
});