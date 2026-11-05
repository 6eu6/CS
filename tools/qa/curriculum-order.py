"""Static checks for prerequisite order and nearby official references in Week 0."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[2]
W0 = ROOT / "content" / "week0"

def fail(message):
    raise SystemExit("CURRICULUM ORDER FAIL: " + message)

print_lesson = (W0 / "w0-print.html").read_text()
if re.search(r"\\binput\\s*\\(", print_lesson):
    fail("input() appears in the print lesson before the Variables lesson teaches it")

vars_lesson = (W0 / "w0-vars.html").read_text()
early_methods = re.findall(r"\\.(strip|lstrip|rstrip|lower|upper|title|capitalize|replace|split)\\s*\\(", vars_lesson)
if early_methods:
    fail("string methods appear before the Strings lesson: " + ", ".join(sorted(set(early_methods))))

widgets = (W0 / "widgets.js").read_text()
start = widgets.find("w0vars:{title:'Step through: variables'")
end = widgets.find("w0scope:{", start)
if start < 0 or end < 0:
    fail("the Variables step-through widget could not be located")
stepper = widgets[start:end]
early_stepper_methods = re.findall(r"\\.(strip|lstrip|rstrip|lower|upper|title|capitalize|replace|split)\\s*\\(", stepper)
if early_stepper_methods:
    fail("the Variables step-through uses string methods too early: " + ", ".join(sorted(set(early_stepper_methods))))

for filename in ("w0-print.html", "w0-vars.html", "w0-str.html", "w0-num.html", "w0-func.html", "w0-choose.html"):
    source = (W0 / filename).read_text()
    if "https://docs.python.org/3/" not in source:
        fail(filename + " has no nearby official Python documentation reference")

print("PASS Week 0 prerequisite order and official references")
