# Reality Checks — the class obsolescence log

Every presented paper gets an entry here, written by its presenter after
class (see presenter responsibilities in [`syllabus.md`](syllabus.md)).
The premise: our readings document the field 12–24 months behind current
practice, so for each paper we rerun its core task with current tools and
record what moved. The paper's number is the baseline; the delta is a
finding.

By week 10 this file is the raw material for the final synthesis session —
and collectively, a draft of a "we replicated N LLM-verification papers in
2027; here is what moved" experience report.

**Norms**

- Record exactly what you ran: model + version, tool versions, prompt/agent
  setup, and which subset of the benchmark (sampling is fine; say so).
- Report failures and non-replications as prominently as improvements. A
  limitation that *still holds* in 2027 is at least as interesting as a
  number that doubled.
- Estimate cost/effort honestly (wall-clock, tokens/dollars if known).
- Keep entries short; link out to scripts/transcripts in your own repo or a
  `reality-checks/` subdirectory if you want to share artifacts.

---

## Entry template

Copy the block below; keep entries in course-schedule order.

```markdown
## [#NN] Short Paper Name (Venue Year) — checked YYYY-MM-DD by <name>

- **Paper's headline result:** <metric, number, setting as published>
- **What I ran:** <model + version; tools/verifier versions; benchmark
  subset and how sampled; prompting/agent setup in one line>
- **2027 result:** <same metric, your number>
- **Delta:** <one line: what moved, what didn't>
- **Limitations that still hold:** <which of the paper's claimed
  limitations/failure modes you could still reproduce>
- **Limitations that no longer hold:** <which are gone, with one example>
- **Cost/effort:** <wall-clock, approximate tokens/$ if known>
- **Notes for the synthesis session:** <one or two sentences: what this
  says about where the field's published record most lags practice>
```

---

<!-- Entries begin here. Keep in course-schedule order. -->

*No entries yet — the first reality checks land with session 1
(Thu Jan 7).*

---

## End-of-quarter synthesis (week 10)

To be filled collectively before the final session:

- **Biggest deltas:** which papers' results moved the most, and why
  (model capability vs. tooling vs. benchmark saturation)?
- **What held:** which findings, taxonomies, and limitations survived
  intact from publication to now?
- **Systematic biases:** where does the published record most lag practice
  (e.g., definitional autoformalization — see the coda in
  [`readings.md`](readings.md))?
- **What we'd write:** if this log were the seed of a paper, what is its
  thesis?
