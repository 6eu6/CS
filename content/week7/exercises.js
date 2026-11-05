Object.assign(R,{
w7_search:{title:"Find a pattern",lvl:"l1",task:"Import re. Use re.search to check whether the text contains a run of at least three consecutive digits. Print Match or No match.",stdin:"Order 482 ready",code:"",tests:[T("Order 482 ready","Match"),T("Order 48 ready","No match"),T("1234","Match")],sol:py`import re
text = input("Text: ")
if re.search(r"\d{3}", text):
    print("Match")
else:
    print("No match")
`},
w7_extract:{title:"Extract all amounts",lvl:"l2",task:"Use re.findall to extract every integer or decimal number from the input and print the resulting Python list.",stdin:"Rent 900 and food 45.50",code:"",tests:[T("Rent 900 and food 45.50","['900', '45.50']"),T("No charges","[]")],sol:py`import re
text = input("Text: ")
print(re.findall(r"\d+(?:\.\d+)?", text))
`},
w7_validate:{title:"Validate a simple postcode-like code",lvl:"l3",task:"Use re.fullmatch to validate exactly two uppercase letters, one space, and three digits. Print Valid or Invalid.",stdin:"AB 123",code:"",tests:[T("AB 123","Valid"),T("ab 123","Invalid"),T("AB123","Invalid"),T("X 123","Invalid")],sol:py`import re
code = input("Code: ")
print("Valid" if re.fullmatch(r"[A-Z]{2} \d{3}", code) else "Invalid")
`}
});