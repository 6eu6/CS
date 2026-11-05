Object.assign(R,{
w9_sets:{title:"Remove duplicate categories",lvl:"l1",task:"Read three category names and print the number of unique categories using a set.",stdin:"food\ntravel\nfood",code:"",tests:[T("food\ntravel\nfood","2"),T("rent\nrent\nrent","1")],sol:py`categories = {input("Category: ") for _ in range(3)}
print(len(categories))
`},
w9_comp:{title:"Build a list comprehension",lvl:"l2",task:"Read three integers and print a list containing the squares of only the even values, using a list comprehension.",stdin:"2\n3\n4",code:"",tests:[T("2\n3\n4","[4, 16]"),T("1\n5\n7","[]")],sol:py`numbers = [int(input()) for _ in range(3)]
squares = [n ** 2 for n in numbers if n % 2 == 0]
print(squares)
`},
w9_types:{title:"Add type hints and a docstring",lvl:"l3",task:"Define total(values: list[float]) -> float with a docstring, returning the sum. Print the supplied result.",code:py`# define total(values: list[float]) -> float

print(total([2.5, 3.5]))
`,tests:[T("","6.0")],sol:py`def total(values: list[float]) -> float:
    """Return the sum of transaction amounts."""
    return sum(values)

print(total([2.5, 3.5]))
`}
});