# CSE 210B Winter 2027 — The 15-Session Program

The selected reading program: **15 paper sessions** (meetings 2–16,
Thu Jan 7 – Thu Feb 25), preceded by one instructor intro (Tue Jan 5) and
followed by four project-presentation classes (Mar 2 – Mar 11).

- **7 single-paper sessions** — one presenter, ~35–40 min + discussion.
- **8 pair sessions** — two presenters, ~20 min each, joint discussion.
  Three are **debates** (the papers genuinely disagree); five are
  **complements** (the papers answer each other's open question).
- **23 presented papers** total → 23 presenter slots. Reading load never
  exceeds 3 papers/week.

Numbers (#N) refer to entries in [`readings.md`](readings.md), which has
full citations, links, ratings, and per-paper summaries; the summaries
below instead explain *why this paper, here, in this order*. Alternates
for swapping are listed at the end.

The arc in one paragraph: **Act I** (sessions 1–6) establishes what LLMs
can do to software and why none of it can be trusted on testing alone.
**Act II** (sessions 7–12) builds the answer bottom-up — specifications
from intent, invariants with sound checkers, then verified code
generation in Dafny, Verus, and F*. **Act III** (sessions 13–15) lifts to
full theorem proving and ends at the research frontier the students'
projects will step into.

---

## Act I — The new raw material (and why not to trust it)

### Session 1 · Thu Jan 7 — PAIR (complements)
**#1 Codex/HumanEval** (Chen et al., 2021) + **#3 EvalPlus** (Liu et al., NeurIPS 2023)

The course's opening move: the paper that created modern code generation,
paired with the paper that showed its yardstick was broken. Codex
establishes the primitives we use all quarter — sampling, functional
correctness, pass@k — and EvalPlus demonstrates that merely adding tests
to HumanEval collapses reported scores by up to ~29%, exposing how soft
"correct" was all along. Presented together they seed the question every
later session answers a bit more: *if tests are this weak a filter, what
is the strong one?* The reality checks for both are cheap to run and set
the norm for the quarter on day one.

### Session 2 · Tue Jan 12 — DEBATE
**#7 Copilot productivity telemetry** (Ziegler et al., CACM 2024) vs. **#8 METR RCT** (Becker et al., 2025)

The field's two best-known productivity numbers point in opposite
directions: vendor telemetry and surveys say assistants make developers
feel dramatically faster; the METR randomized trial found experienced
maintainers were 19% *slower* with AI while believing they were ~20%
faster. Each presenter defends one methodology — what it can and cannot
see, whose developers it studied, what generalizes. The debate calibrates
the course's own 10–100x verification claim: gains this large must be
measured, not felt. This is the lens students should carry into their
project experience reports.

### Session 3 · Thu Jan 14 — SINGLE
**#9 SWE-bench** (Jimenez et al., ICLR 2024)

The benchmark that turned "coding agents" into a measurable field: real
GitHub issues, repository-scale edits, the projects' own tests as judge.
The paper matters both for what it built and for what its capability
curve since 2023 (2% → majority-solved) says about pace — the presenter's
reality check is essentially a live reading of the current leaderboard,
plus the contamination and test-weakness critiques. Sets up the next
session's fight, and gives Act II its recurring worry: the judge (tests)
is the weakest part of the pipeline.

### Session 4 · Tue Jan 19 — DEBATE
**#10 SWE-agent** (Yang et al., NeurIPS 2024) vs. **#12 Agentless** (Xia et al., FSE 2025)

Agency versus pipelines, argued by the original papers. SWE-agent claims
the interface and autonomy are the point; Agentless shows a fixed
three-phase pipeline beat most agents at a tenth of the complexity. The
resolution — when does planning-in-the-loop earn its cost? — is directly
load-bearing for Act II, where the same design fork reappears inside
verification tools (AutoVerus's agent network vs. simpler sampling
loops), and for students' own project tooling choices.

### Session 5 · Thu Jan 21 — SINGLE *(project proposals due)*
**#15 CoverUp** (Altmayer Pizzorno & Berger, FSE 2025)

Emery Berger's coverage-guided test generator is the cleanest example of
the pattern Act II industrializes: cheap program analysis (coverage) in
the loop, steering an expensive generative model toward exactly what it
hasn't handled yet. Beats the prior hybrid (CodaMosa) decisively. The
presenter should draw the template on the board — *analyze → point the
model → check → repeat* — because sessions 8–12 are all instances of it
with the "check" upgraded from coverage to proof. (See-also thread:
Fuzz4All (#17), which fuzzes Z3 and CVC5 — the very solvers Act II
trusts.)

### Session 6 · Tue Jan 26 — SINGLE
**#21 Do Users Write More Insecure Code with AI Assistants?** (Perry et al., CCS 2023)

Act I's closing argument. Users with an assistant wrote less secure code
*and* were more confident it was secure — the overtrust result. Combined
with the ~40%-vulnerable generation numbers it cites (Pearce et al.,
#20, the natural see-also), the session lands the course thesis by
elimination: human review doesn't scale, tests are weak (session 1), and
self-assessed confidence is anti-correlated with reality. The only
scalable trust anchor left standing is the machine-checkable kind —
which is where the course turns next.

---

## Act II — Making it trustworthy: specs, invariants, verified code

### Session 7 · Thu Jan 28 — PAIR (complements)
**#24 nl2postcond** (Endres et al., FSE 2024) + **#30 SatLM** (Ye, Chen, Dillig, Durrett, NeurIPS 2023)

Verification needs specifications, and both papers argue LLMs' real
talent is *translation into formal languages*, not reasoning. nl2postcond
defines the SE version — natural-language intent to postconditions, with
metrics for whether a spec actually discriminates buggy code — while
Isil Dillig's SatLM makes the general architectural claim: have the model
emit a declarative formal problem and let a solver do the sound part.
One is an evaluation framework students can reuse on their projects; the
other is the division-of-labor principle behind every system in Act II.

### Session 8 · Tue Feb 2 — PAIR (complements)
**#27 Loopy** (Kamath et al., FMCAD 2024) + **#29 Lemur** (Wu, Barrett, Narodytska, ICLR 2024)

The invariant-synthesis session: practice and theory of the same loop.
Loopy shows the working system — LLM proposes loop invariants, SMT-backed
tools prune and repair the hallucinations, and the combination beats
purely symbolic baselines. Lemur supplies what Loopy's engineering
implicitly assumes: a proof calculus stating exactly when an unsound
proposer plus a sound checker yields a sound system, with the soundness
theorem a PL audience should demand. Together they are the course's
core architecture — *creative generator, mechanical judge* — stated once
as code and once as rules.

### Session 9 · Thu Feb 4 — SINGLE
**#31 AI-Assisted Synthesis of Verified Dafny Methods** (Misu, Lopes, Ma, Noble, FSE 2024)

The feasibility result for verified code generation: GPT-4 producing
Dafny method bodies *with* specs and proof annotations, 19% → 58%
verified as prompting improves. Deliberately modest problems (MBPP), which
is exactly why it's presentable: every design choice is visible, the
prompt-sensitivity is honest, and the reality check (rerun MBPP-DFY with
a current model) is the most tractable in the course — and likely the
most dramatic delta. Establishes the baseline that sessions 10–12 scale
up.

### Session 10 · Tue Feb 9 — SINGLE
**#32 Clover** (Sun, Sheng, Padon, Barrett, SAIV 2024)

Session 9 leaves a loose thread that would unravel everything: verified
against *what*? A program can provably satisfy the wrong spec. Clover's
answer is architectural — check mutual consistency among code, formal
annotations, and the natural-language docstring, so informal intent
becomes a checked participant rather than a bystander. It's the
"trusted specification base" conversation the course has been building
toward since nl2postcond, and the right week for it: students are
writing their own project specs now.

### Session 11 · Thu Feb 11 — DEBATE
**#34 AutoVerus** (Yang et al., OOPSLA 2025) vs. **#35 AlphaVerus** (Aggarwal, Parno, Welleck, ICML 2025)

Two answers to scaling Rust/Verus proof generation, in genuine tension.
AutoVerus encodes human proof-engineering expertise into a network of LLM
agents and wins >90% on its benchmark; AlphaVerus refuses hand-encoding
and bootstraps capability by translation from Dafny plus tree-search over
verifier feedback — and must then defend against its own models
*reward-hacking the verifier* with trivial specs. Craft versus
self-improvement, plus the quarter's first hard look at what happens
when the checker becomes a training signal. The strongest debate of the
course; schedule your strongest presenters here.

### Session 12 · Tue Feb 16 — SINGLE *(project checkpoint week)*
**#36 Neural Synthesis for Proof-Oriented Programming** (Chakraborty et al., ICSE 2025)

Act II's reality-scale datapoint: 600K+ lines of open-source F*,
including production code from Windows and Firefox — and the surprise
that fine-tuned small models rival GPT-4 at a fraction of the cost. The
session's discussion is the one every verification team is having in
2027: frontier model by API or specialized model in CI? Falling in
checkpoint week is deliberate — students are now deep enough in their
own proof debugging to argue about tooling economics from experience.

---

## Act III — Proofs at the frontier

### Session 13 · Thu Feb 18 — PAIR (complements)
**#39 Baldur** (First, Rabe, Ringer, Brun, ESEC/FSE 2023) + **#40 Draft, Sketch, and Prove** (Jiang et al., ICLR 2023)

The two 2023 papers that set the paradigm for LLM theorem proving, and
the bridge from Act II's auto-active verifiers to full ITP. Baldur:
generate *whole proofs* and repair from checker errors, retiring
tactic-by-tactic search. DSP: use an informal natural-language proof as
the scaffold for the formal one — the architecture closest to how anyone
actually uses Claude with Lean today, and the method students should
steal for their projects. Presented together they explain the entire
modern stack: whole-proof drafting (Baldur) guided by informal reasoning
(DSP). An example presentation deck for Baldur is in
[`slides/`](slides/).

### Session 14 · Tue Feb 23 — SINGLE
**#44 Rango** (Thompson et al., ICSE 2025)

The state of the art for the thing this course actually cares about:
proving theorems in *software* verification projects, in Coq, adapting
by retrieval to each project's local definitions and idioms — 32% of
CoqStoq test theorems fully automatically. For students fresh from
CSE 210A, this is the "how much of my problem-set suffering was
automatable?" paper, and its project-adaptive retrieval is the closest
published system to the workflow of mechanizing something new (the
course coda's territory). See-also thread: PALM (#43) for the failure
taxonomy, CoqPilot for a tool students can use this week.

### Session 15 · Thu Feb 25 — PAIR (complements) · closing session
**#47 AlphaProof** (Hubert et al., Nature 2025) + **#49 Formal Mathematical Reasoning: A New Frontier in AI** (Yang et al., ICML 2025)

The finale pairs the capability high-water mark with the research
agenda. AlphaProof — IMO silver via reinforcement learning over millions
of *auto-formalized* problems — shows what verifier-grounded training
does at scale, and invites the course's closing question: what is the
software-engineering analogue of that training pipeline? The position
paper then maps the open problems, including research-level
autoformalization — precisely the gap the course coda names and several
projects will have just spent a quarter inside. The session should end
by drafting, as a class, the "what should PL/SE research do now?" list
that the project presentations the following two weeks will test against
reality.

---

## What was cut, and swaps

Strong papers left out for space, grouped by the session they could swap
into: Grounded Copilot #5 and Lost at C #25 → session 2 or 6;
AlphaCode #2 and the LLM4SE survey #4 → session 1 (or intro-class
background); SWE-Lancer/SWE-bench-Verified (see-alsos of #9) → session 3;
ChatDBG #18, ChatRepair #19, Fuzz4All #17, TitanFuzz #16 → session 5;
package hallucinations #22 and CRUST-Bench #23 → session 6; SpecGen #25,
nl2spec #26, invariant-ranking #28 → sessions 7–8; dafny-annotator #33,
DafnyBench (see-also), LLMLift #37, Verina #38 → sessions 9–12;
COPRA #42, PALM #43, TacMiner #45 → sessions 13–14; Autoformalization
#46, Goedel-Prover #48 → session 15.

**Presenter-slot math:** 23 slots. Enrollment ≈ 23 → one slot each;
under 23 → strongest students take a second slot (or convert a pair to a
single); over 23 → co-present the single-paper sessions (one owns the
paper, one owns the reality check).
