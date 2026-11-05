Object.assign(R,{
w5_assert:{title:"Write a useful assertion",lvl:"l1",task:"Define is_even(n) returning True for even integers and False otherwise. Then assert the three supplied cases.",code:py`# define is_even(n)

assert is_even(4) is True
assert is_even(7) is False
assert is_even(0) is True
print("All assertions passed")
`,tests:[T("","All assertions passed")],sol:py`def is_even(n):
    return n % 2 == 0

assert is_even(4) is True
assert is_even(7) is False
assert is_even(0) is True
print("All assertions passed")
`},
w5_edges:{title:"Test boundary values",lvl:"l2",task:"Define clamp(value, low, high), returning low if value is below low, high if above high, otherwise value. Run all supplied assertions.",code:py`# define clamp(value, low, high)

assert clamp(5, 0, 10) == 5
assert clamp(-2, 0, 10) == 0
assert clamp(12, 0, 10) == 10
assert clamp(0, 0, 10) == 0
print("Boundary tests passed")
`,tests:[T("","Boundary tests passed")],sol:py`def clamp(value, low, high):
    return max(low, min(value, high))

assert clamp(5, 0, 10) == 5
assert clamp(-2, 0, 10) == 0
assert clamp(12, 0, 10) == 10
assert clamp(0, 0, 10) == 0
print("Boundary tests passed")
`},
w5_test:{title:"Test a ledger fee function",lvl:"l3",task:"Define fee(amount) returning 0 for amounts below 10, otherwise 1.5. Keep the supplied assertions unchanged.",code:py`# define fee(amount)

assert fee(0) == 0
assert fee(9.99) == 0
assert fee(10) == 1.5
assert fee(100) == 1.5
print("Fee tests passed")
`,tests:[T("","Fee tests passed")],sol:py`def fee(amount):
    if amount < 10:
        return 0
    return 1.5

assert fee(0) == 0
assert fee(9.99) == 0
assert fee(10) == 1.5
assert fee(100) == 1.5
print("Fee tests passed")
`}
});