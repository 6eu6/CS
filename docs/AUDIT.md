# Deep audit: progress, exercises, teaching (2026-11-04)

Method: live site tested in Chromium; every exercise's reference solution mutated and re-tested in real CPython
(`bash tools/qa/mutation.sh`); lesson text and exercise prompts read; concept usage measured from the solutions' syntax trees.

## What works well
- **Gating is correct.** Lesson 1 is locked for a new learner, the next lesson unlocks only when *every* graded item in the current one passes (1 of 5 done keeps it locked), weeks unlock in order or via the week test, project parts need their week.
- **No cheap credit.** Run alone does not count, a wrong answer fails, hard-coding the expected output fails, viewing the Solution does not give credit.
- **Spaced review works as designed.** Wrong quiz answers come back after 1 day, then 3, 7, 14, 28.
- **Exercise tests are strong for normal exercises.** Mutation score: warm-up 75%, core 82%, challenge 81%, boss 81%, debug 84%. 484/484 reference tests pass in CPython.
- **Explanations are precise and beginner-friendly** (every symbol explained, real error messages, common mistakes called out).
- **Exercise prompts are realistic scenarios** with 3-6 test cases at the harder levels.

## Gaps (ordered by impact)
1. **Practice is uneven.** Exercises per week: Week 0 = 38, Week 1 = 20, Week 2 = 70+. Week 1 has no debug exercises and an overview of 151 words.
2. **Taught but never practiced.** `match` (Lecture 1) has 0 exercises and cannot run in Skulpt at all; `round()` 0; `type()`, `abs()`, `del` 1 each; `continue`, default parameter values, `is None` 3 each.
3. **Only quiz questions are reviewed.** Coding exercises never come back, so coding skill is not retained by the spaced-review system.
4. **Quizzes are guessable.** The correct option is the 2nd in 60% of questions (101/168) and the 3rd in 3%; 25% of questions have only 2 options; option order never changes on retake; 80% of a 3-4 question quiz means 100%.
5. **Week tests are multiple choice only**, yet passing one unlocks the next week (placement).
6. **Guided exercise types are rare**: 4 Parsons, 3 fill-in, 6 bug hunts in the whole course. The core Week 0 lessons have none of them and no prediction drills.
7. **Promised lesson parts are mostly missing**: learning objectives 0/37 lessons, common-misconceptions box 2/37, recap 8/37, real-world callout 4/37.
8. **5 input-reading exercises have a single scenario** (hard-codable) and 42 stages have a single test.
9. **Pocket Ledger stage tests check only the new part** (mutation score 54%); earlier helper functions are not re-tested.
10. **Engine limits**: Skulpt differs from CPython (float repr, `match`, `{x=}`, `.3e`, `removeprefix`).
11. **Scenarios are UK-flavoured** (postcodes, NHS, council bins, pounds).
