Object.assign(R,{
w6_read:{title:"Read text safely",lvl:"l1",task:"Use io.StringIO as an in-memory file. Read all lines, strip only newline characters, and print each line. Do not use a real file path.",code:py`import io
data = "rent\nfood\ntravel\n"
# read and print each line
`,tests:[T("","rent\nfood\ntravel")],sol:py`import io
data = "rent\nfood\ntravel\n"
with io.StringIO(data) as file:
    for line in file:
        print(line.rstrip("\n"))
`},
w6_csv:{title:"Read CSV rows",lvl:"l2",task:"Use csv.DictReader with io.StringIO to read the supplied CSV and print each description followed by its amount.",code:py`import csv
import io
data = "description,amount\nRent,900\nFood,45.5\n"
# parse with DictReader
`,tests:[T("","Rent 900\nFood 45.5")],sol:py`import csv
import io
data = "description,amount\nRent,900\nFood,45.5\n"
for row in csv.DictReader(io.StringIO(data)):
    print(row["description"], row["amount"])
`},
w6_write:{title:"Write CSV data",lvl:"l2",task:"Write two rows to an in-memory CSV using csv.writer and io.StringIO. Print the resulting CSV text.",code:py`import csv
import io
output = io.StringIO()
# create writer and write header and rows
`,tests:[T("","date,amount\n2026-01-01,12.5\n2026-01-02,8.0")],sol:py`import csv
import io
output = io.StringIO()
writer = csv.writer(output, lineterminator="\n")
writer.writerow(["date", "amount"])
writer.writerow(["2026-01-01", 12.5])
writer.writerow(["2026-01-02", 8.0])
print(output.getvalue(), end="")
`}
});