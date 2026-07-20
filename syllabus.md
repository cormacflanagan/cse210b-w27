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

- **One paper per meeting.** Each paper is presented by one student
  (depending on enrollment, some students may present twice, or pairs may
  share a paper).
- **Presentations** run ~35–40 minutes of prepared material (background,
  problem, technique, evaluation, critique), interleaved with discussion the
  presenter moderates for the remainder of the session.
- **Everyone reads every paper.** The seminar works only if the room has
  read the paper.

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

1. Claim your paper by the end of week 2 (sign-up sheet seeded from
   [`readings.md`](readings.md) after the instructor down-selects).
2. Meet with the instructor (office hours or by appointment) at least two
   days before your presentation to walk through your slides.
3. Read the submitted questions the night before; select and sequence
   discussion topics.
4. Within one week after presenting, post a short written recap
   (half a page: key points, main discussion threads, open questions) to the
   course repo.

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
| Tue Mar 9 / Thu Mar 11 | In-class project presentations |
| Fri Mar 19 (end of finals week) | Final report (~6 pages) + artifact repo |

## Grading (draft)

| Component | Weight |
|---|---|
| Paper presentation (incl. prep meeting + recap) | 25% |
| Reading questions (credit/no-credit, per paper) | 15% |
| Discussion participation | 15% |
| Course project (proposal 5%, checkpoint 5%, presentation 10%, report + artifact 25%) | 45% |

## Schedule

Winter 2027 instruction runs Mon Jan 4 – Fri Mar 12; final exams Mar 15–19.
No Tuesday/Thursday holidays this quarter. Papers below are **slots**, to be
filled from [`readings.md`](readings.md) once the presented set is
down-selected (~18 of ~40 candidates); the topic arc is indicative.

| # | Date | Topic |
|---|------|-------|
| 1 | Tue Jan 5 | **Instructor:** Course overview. The case that verification just got 10–100x cheaper; course mechanics; paper sign-ups open |
| 2 | Thu Jan 7 | **Instructor:** Foundations — how LLMs generate code; benchmarks and their discontents (background reading assigned) |
| 3 | Tue Jan 12 | Foundations of LLM code generation (paper 1) |
| 4 | Thu Jan 14 | Foundations / evaluating generated code (paper 2) |
| 5 | Tue Jan 19 | Human factors of AI-assisted programming (paper 3) |
| 6 | Thu Jan 21 | Human factors / productivity evidence (paper 4) — *project proposals due* |
| 7 | Tue Jan 26 | Coding agents for large-scale SE (paper 5) |
| 8 | Thu Jan 28 | Coding agents, continued (paper 6) |
| 9 | Tue Feb 2 | LLM-powered testing & fuzzing (paper 7) |
| 10 | Thu Feb 4 | LLM-powered debugging & repair (paper 8) |
| 11 | Tue Feb 9 | Security & trust of AI-generated code (paper 9) |
| 12 | Thu Feb 11 | Security & trust, continued (paper 10) |
| 13 | Tue Feb 16 | Specifications & invariants from LLMs (paper 11) — *checkpoint week* |
| 14 | Thu Feb 18 | Specifications & invariants, continued (paper 12) |
| 15 | Tue Feb 23 | LLM-assisted auto-active verification: Dafny (paper 13) |
| 16 | Thu Feb 25 | LLM-assisted auto-active verification: Verus / F* (paper 14) |
| 17 | Tue Mar 2 | LLMs for interactive theorem proving (paper 15) |
| 18 | Thu Mar 4 | LLMs for ITP / autoformalization (paper 16) |
| 19 | Tue Mar 9 | **Project presentations I** |
| 20 | Thu Mar 11 | **Project presentations II** + synthesis: what should PL/SE research do now? (incl. the open problem of paper-scale autoformalization — a POPLmark for the LLM era) |

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
