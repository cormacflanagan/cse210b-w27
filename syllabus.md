# CSE 210B: SE + PL in the Age of AI

### Engineering Formally Verified Software with Large Language Models

**UC Santa Cruz — Winter Quarter 2027**
**Meetings:** Tuesdays & Thursdays (20 meetings, Jan 5 – Mar 11)
**Instructor:** Cormac Flanagan
**Prerequisite:** CSE 210A or equivalent (operational/axiomatic semantics,
Hoare logic, and mechanized verification in Coq/Rocq)

> *Draft syllabus — schedule, grading weights, and the presented-paper
> selection are subject to revision before the quarter begins.*

---

## Course description

Large language models are transforming how software is written, tested,
debugged, and — most interestingly for this course — *verified*. Tasks that
once consumed person-years of proof engineering (loop invariants, tactic
proofs, specification drafting, proof repair) can now often be automated or
dramatically accelerated: the effective cost of formal verification has
dropped by 10–100x. This makes a long-standing dream newly plausible:
**large-scale software systems that are formally verified as a matter of
routine engineering practice.**

This seminar surveys the emerging research landscape at the intersection of
software engineering, programming languages, and AI. We will read and discuss
current papers spanning:

- LLMs as code generators, and what "correct" means for generated code
- AI coding agents and their evaluation on realistic SE tasks
- LLM-powered testing, fuzzing, debugging, and program repair
- Security, trust, and human factors of AI-assisted development
- LLMs for program analysis: specifications, invariants, and postconditions
- LLM-assisted auto-active verification (Dafny, Verus, F*)
- LLMs for interactive theorem proving (Coq/Rocq, Lean, Isabelle) and
  autoformalization

A central through-line: if generating code is cheap but trusting it is hard,
formal specifications and machine-checked proofs become *more* valuable, not
less — they are the trust anchor that lets us safely consume AI-generated
code. We will repeatedly ask: what should SE and PL research look like when
the marginal cost of both code and proof approaches zero?

**A note on reading papers in a fast-moving field.** Publication latency
means even the 2025 papers on our list lag what frontier tools do today by
one or more capability generations. We handle this head-on rather than
pretending otherwise: **read the papers for questions and methods, run the
tools for answers, and treat every gap you find between them as data.**
Mechanically, that means every presentation includes a *reality check*
(rerun the paper's core task with current tools — see below), each week
pairs the paper with one piece of current capability evidence, and the
class maintains a shared obsolescence log
([`reality-checks.md`](reality-checks.md)) that becomes raw material for
the final synthesis session.

## Learning goals

By the end of the quarter, students should be able to:

1. Critically read and evaluate current research on LLMs for software
   engineering and formal methods.
2. Present a research paper: distill its claims, technique, and evaluation,
   and lead a discussion of its strengths and weaknesses.
3. Use LLM-based tools hands-on to produce a formally verified software
   artifact, and assess where the tools help, where they fail, and why.
4. Identify open research problems at the SE/PL/AI intersection suitable for
   dissertation-scale work.

## Course format

This is a **student-led reading seminar**.

- **Fifteen paper sessions** (meetings 2–16): seven single-paper sessions
  and eight pair sessions, for **23 presented papers**. The selected
  program, with a contextual summary of each session, is
  [`reading-15.md`](reading-15.md); the full candidate pool remains
  [`readings.md`](readings.md). Reading load never exceeds three papers
  per week.
- **Pair sessions** put two presenters on stage, ~20 minutes of slides
  each, then a joint moderated discussion. Three pairs are **debates**
  (the papers genuinely disagree — each presenter defends their paper's
  worldview); five are **complements** (the papers answer each other's
  open question).
- **Single-paper presentations** run ~35–40 minutes of prepared material,
  interleaved with discussion the presenter moderates for the remainder of
  the session.
- **Slides:** roughly 15–20 slides, with five required beats — problem &
  context, technique, evaluation, your **reality-check slide** (paper's
  number vs. yours), and 2–3 discussion questions seeded from the class's
  submitted questions. Post your deck to the course repo after class.
- **Enrollment scaling:** with ~16 students, everyone leads once (debate
  sessions have two presenters). With fewer, some students present twice.
  With more than ~19, put *pairs of students on one paper* — co-presenting
  keeps the reading load flat, and the work divides naturally (one owns
  the paper, one runs the reality check).
- **Everyone reads every paper.** The seminar works only if the room has
  read the paper. For debate sessions, your two reading questions may
  address either or both papers.

### Reading questions

By **9:00 pm the evening before each meeting**, every student (except that
day's presenter) submits **two discussion questions** on the paper.

- Questions are submitted via the course GitHub repository (one discussion
  thread per paper; mechanism finalized in week 1).
- Good questions probe assumptions, evaluation validity, connections to
  other papers we've read, or implications for practice — not surface recall.
- The presenter reviews the submitted questions before class and works the
  best of them into the discussion.
- Reading questions are graded credit/no-credit; two free passes for the
  quarter.

### Presenter responsibilities

1. Claim your paper by the end of week 1 (sign-up sheet is the
   session-by-session program in [`reading-15.md`](reading-15.md); the
   session-1 presenters for Thu Jan 7 are recruited before the quarter
   starts).
2. **Run the reality check.** Before your presentation, rerun the paper's
   core task with a current frontier model (most papers on our list have
   public benchmarks/artifacts — sample a subset if the full benchmark is
   large). Your presentation must include one slide: the paper's headline
   number vs. yours, and which of the paper's claimed limitations still
   hold. The paper is the baseline; your delta is a finding.
3. Meet with the instructor (office hours or by appointment) at least two
   days before your presentation to walk through your slides.
4. Read the submitted questions the night before; select and sequence
   discussion topics.
5. Within one week after presenting, post a short written recap
   (half a page: key points, main discussion threads, open questions) to
   the course repo, and log your reality-check results in
   [`reality-checks.md`](reality-checks.md).

### Capability evidence track

Because current capability evidence lives in leaderboards, system cards,
and eval reports rather than proceedings, each week pairs the papers with
**one non-paper item** — e.g., the current SWE-bench Verified leaderboard,
miniF2F/PutnamBench saturation curves, a frontier-lab eval or system card,
or Terence Tao's running notes on AI-assisted Lean formalization. We spend
the first ~10 minutes of each Tuesday on it: what moved since last week,
and which paper on our list it updates.

## Course project

A quarter-long project, in teams of 1–2: **use LLMs to build a formally
verified software artifact**, and report on the experience.

- **Verification stack:** your choice — Coq/Rocq, Lean 4, Dafny, Verus,
  F*, or another auto-active/interactive verifier approved by the
  instructor. (CSE 210A gives you the Coq background; branching out is
  encouraged.)
- **Scope:** an artifact that would have been a heavy lift to verify by hand
  in a quarter — e.g., a verified data structure or protocol core, a
  verified compiler pass or interpreter, verified parsing/serialization
  round-trips, or reproducing/extending a result from a paper we read.
- **Flagship genre — mechanize a published PL paper:** take a POPL/PLDI/
  ICFP-style paper (its core calculus, semantics, and soundness theorem)
  and produce a faithful Lean or Rocq mechanization with LLM assistance.
  This workflow is something current tools do in practice but no published
  paper yet describes (see the "open problem" coda in
  [`readings.md`](readings.md)) — so a careful experience report here is
  itself near-publishable. Pay particular attention to *definitional
  fidelity*: the failure mode that matters is not a proof that won't close
  but a definition that quietly diverges from the paper's.
- **The experience report matters as much as the artifact.** Keep a log:
  where did the LLM save you time (spec drafting, invariants, proof search,
  proof repair)? Where did it mislead you? What was the human/AI division of
  labor? Estimate the speedup honestly.

**Milestones**

| Date | Milestone |
|---|---|
| Thu Jan 21 | Project proposal (1 page: goal, stack, verification target) |
| Week 6 | Checkpoint meeting with instructor (spec written, proof skeleton) |
| Mar 2 – Mar 11 (meetings 17–20) | In-class project presentations |
| Fri Mar 19 (end of finals week) | Final report (~6 pages) + artifact repo |

## Grading (draft)

| Component | Weight |
|---|---|
| Paper presentation (incl. reality check, prep meeting, recap) | 25% |
| Reading questions (credit/no-credit, per paper) | 15% |
| Discussion participation | 15% |
| Course project (proposal 5%, checkpoint 5%, presentation 10%, report + artifact 25%) | 45% |

## Schedule

Winter 2027 instruction runs Mon Jan 4 – Fri Mar 12; final exams Mar 15–19.
No Tuesday/Thursday holidays this quarter. One instructor intro, fifteen
paper sessions (the selected program — see
[`reading-15.md`](reading-15.md) for session-by-session context), and four
project-presentation classes. Entry numbers (#N) refer to
[`readings.md`](readings.md).

| # | Date | Topic |
|---|------|-------|
| 1 | Tue Jan 5 | **Instructor intro:** Live demo first — mechanizing a piece of PL metatheory with Claude + Lean, unedited, failures included. Then: the case that verification just got 10–100x cheaper; course mechanics; how the benchmarks work; paper sign-ups (session-1 presenters recruited in advance) |
| 2 | Thu Jan 7 | **S1 (pair):** Foundations — #1 Codex/HumanEval + #3 EvalPlus: generation, and whether to believe the numbers |
| 3 | Tue Jan 12 | **S2 (debate):** #7 Copilot telemetry vs. #8 METR RCT — perceived vs. measured productivity |
| 4 | Thu Jan 14 | **S3:** #9 SWE-bench — the agents' yardstick. Incl. in-class exercise: plot capability-over-time from the reading list's own numbers |
| 5 | Tue Jan 19 | **S4 (debate):** #10 SWE-agent vs. #12 Agentless — agency vs. pipelines |
| 6 | Thu Jan 21 | **S5:** #15 CoverUp — analysis-in-the-loop test generation — *project proposals due* |
| 7 | Tue Jan 26 | **S6:** #21 Perry et al. — overtrust, and why human review doesn't scale |
| 8 | Thu Jan 28 | **S7 (pair):** #24 nl2postcond + #30 SatLM — specs from intent; translate, don't reason |
| 9 | Tue Feb 2 | **S8 (pair):** #27 Loopy + #29 Lemur — LLM invariants in practice and in theory |
| 10 | Thu Feb 4 | **S9:** #31 Verified Dafny methods — feasibility of verified codegen |
| 11 | Tue Feb 9 | **S10:** #32 Clover — verified against *what*? The trust triangle |
| 12 | Thu Feb 11 | **S11 (debate):** #34 AutoVerus vs. #35 AlphaVerus — craft vs. self-improvement (and reward-hacking the verifier) |
| 13 | Tue Feb 16 | **S12:** #36 Neural synthesis for F* — verification at industrial scale — *checkpoint week* |
| 14 | Thu Feb 18 | **S13 (pair):** #39 Baldur + #40 Draft, Sketch & Prove — the ITP paradigm papers |
| 15 | Tue Feb 23 | **S14:** #44 Rango — proof automation for real software projects |
| 16 | Thu Feb 25 | **S15 (pair, closing):** #47 AlphaProof + #49 Formal Mathematical Reasoning — the frontier and the agenda; class drafts the "what should PL/SE research do now?" list (incl. paper-scale autoformalization — a POPLmark for the LLM era) |
| 17 | Tue Mar 2 | **Project presentations I** |
| 18 | Thu Mar 4 | **Project presentations II** |
| 19 | Tue Mar 9 | **Project presentations III** |
| 20 | Thu Mar 11 | **Project presentations IV** + course wrap: reality-checks synthesis |

## Policies

- **AI use:** enthusiastically encouraged — it is the subject of the course.
  Use any model or tool for the project and for understanding papers.
  Two hard rules: (1) reading questions and presentation critiques must
  reflect *your* engagement with the paper — you may use AI to probe a paper,
  but not to outsource having read it; (2) all AI assistance on the project
  must be documented in the experience report (that documentation is a
  deliverable, not a confession).
- **Attendance:** this is a discussion seminar; attendance is expected.
  Contact the instructor in advance about unavoidable absences.
- **Academic integrity & accommodations:** standard UCSC graduate policies
  apply; students needing accommodations should contact the
  [Disability Resource Center](https://drc.ucsc.edu/) and the instructor
  early in the quarter.
