Object.assign(R,{
w4_math:{title:"Use the math library",lvl:"l1",task:"Import math. Read a positive number and print its ceiling (smallest integer not less than it).",stdin:"4.2",code:"",tests:[T("4.2","5"),T("7","7"),T("0.1","1")],sol:py`import math
number = float(input("Number: "))
print(math.ceil(number))
`},
w4_stats:{title:"Summarise a data set",lvl:"l2",task:"Import statistics. Read three numbers on separate lines and print their median.",stdin:"8\n2\n5",code:"",tests:[T("8\n2\n5","5.0"),T("1\n9\n3","3.0")],sol:py`import statistics
values = [float(input()) for _ in range(3)]
print(statistics.median(values))
`},
w4_cli:{title:"Parse command-line options",lvl:"l2",task:"Use argparse to accept a required --name option. Parse the supplied argument list and print Hello NAME.",code:py`import argparse
parser = argparse.ArgumentParser()
# add --name and parse ["--name", "Mina"]
args = parser.parse_args(["--name", "Mina"])
print(f"Hello {args.name}")
`,tests:[T("","Hello Mina")],sol:py`import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--name", required=True)
args = parser.parse_args(["--name", "Mina"])
print(f"Hello {args.name}")
`},
w4_random:{title:"Random choices with reproducibility",lvl:"l2",task:"Import random, set the seed to 7, then print random.randint(1, 6).",code:"",tests:[T("","3")],sol:py`import random
random.seed(7)
print(random.randint(1, 6))
`}
});