Object.assign(R,{
w8_class:{title:"Create a transaction class",lvl:"l1",task:"Create class Transaction with __init__(self, description, amount), storing both attributes. Create one object and print its fields.",code:"",tests:[T("","Rent 900")],sol:py`class Transaction:
    def __init__(self, description, amount):
        self.description = description
        self.amount = amount

item = Transaction("Rent", 900)
print(item.description, item.amount)
`},
w8_method:{title:"Add a method",lvl:"l2",task:"Create class Transaction with amount and method is_income() returning True when amount is positive. Test both examples.",code:py`# define Transaction

print(Transaction(20).is_income())
print(Transaction(-5).is_income())
`,tests:[T("","True\nFalse")],sol:py`class Transaction:
    def __init__(self, amount):
        self.amount = amount

    def is_income(self):
        return self.amount > 0

print(Transaction(20).is_income())
print(Transaction(-5).is_income())
`},
w8_inherit:{title:"Use inheritance",lvl:"l3",task:"Create base class Account with owner, then SavingsAccount(Account) with interest_rate. Instantiate and print owner and rate.",code:"",tests:[T("","Sam 0.03")],sol:py`class Account:
    def __init__(self, owner):
        self.owner = owner

class SavingsAccount(Account):
    def __init__(self, owner, interest_rate):
        super().__init__(owner)
        self.interest_rate = interest_rate

account = SavingsAccount("Sam", 0.03)
print(account.owner, account.interest_rate)
`}
});