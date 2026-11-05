Object.assign(R,{
w6_read:{title:"Read a real text file",lvl:"l1",task:"Open notes.txt with UTF-8 encoding using a with statement. Print each line without its newline character. The file is supplied in the exercise workspace.",files:{"notes.txt":"rent\nfood\ntravel\n"},code:"# open notes.txt and print its lines\n",tests:[T("","rent\nfood\ntravel")],sol:py`with open("notes.txt", encoding="utf-8") as file:
    for line in file:
        print(line.rstrip("\\n"))
`},
w6_csv:{title:"Read CSV rows",lvl:"l2",task:"Use csv.DictReader with io.StringIO to read the supplied CSV and print each description followed by its amount.",code:py`import csv
import io
data = "description,amount\\nRent,900\\nFood,45.5\\n"
# parse with DictReader
`,tests:[T("","Rent 900\nFood 45.5")],sol:py`import csv
import io
data = "description,amount\\nRent,900\\nFood,45.5\\n"
for row in csv.DictReader(io.StringIO(data)):
    print(row["description"], row["amount"])
`},
w6_write:{title:"Write a summary file",lvl:"l2",task:"Create summary.txt using a with open(..., 'w') block and write the two supplied lines. The checker inspects the file contents, not just printed output.",code:"# write summary.txt with two lines\n",tests:[{inp:"",file:"summary.txt",exp:"Monthly summary\nNet: 125.50\n",label:"summary.txt has the expected content"}],sol:py`with open("summary.txt", "w", encoding="utf-8") as file:
    file.write("Monthly summary\\n")
    file.write("Net: 125.50\\n")
`}
});