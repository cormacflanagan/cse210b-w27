const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const icons = require("react-icons/fa");

// ---- palette: navy verification theme -------------------------------------
const NAVY = "1E2761";
const ICE = "CADCFC";
const ICE_LT = "EAF1FC";
const WHITE = "FFFFFF";
const INK = "1A1F36";
const MUT = "5A6478";
const ACC = "0E7C86"; // teal accent
const CORAL = "F96167"; // sparing use, deltas/warnings

const HEAD = "Cambria";
const BODY = "Calibri";

async function iconPng(name, color, px = 256) {
  const el = React.createElement(icons[name], { color: "#" + color, size: px });
  const svg = ReactDOMServer.renderToStaticMarkup(el);
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const P = {}; // icon cache
  for (const [k, n, c] of [
    ["gear", "FaCogs", WHITE], ["search", "FaSearch", WHITE],
    ["wrench", "FaWrench", WHITE], ["chart", "FaChartBar", WHITE],
    ["scale", "FaBalanceScale", WHITE], ["comments", "FaComments", WHITE],
    ["flask", "FaFlask", WHITE], ["book", "FaBookOpen", WHITE],
    ["bolt", "FaBolt", WHITE], ["compass", "FaCompass", WHITE],
    ["gearN", "FaCogs", NAVY], ["flag", "FaFlagCheckered", WHITE],
  ]) P[k] = await iconPng(n, c);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  const W = 13.33, H = 7.5;

  const title = (s, txt, opts = {}) =>
    s.addText(txt, Object.assign({ x: 0.6, y: 0.42, w: W - 1.2, h: 0.75,
      fontFace: HEAD, fontSize: 30, bold: true, color: INK, margin: 0 }, opts));

  const kicker = (s, txt, opts = {}) =>
    s.addText(txt.toUpperCase(), Object.assign({ x: 0.62, y: 0.14, w: 9, h: 0.3,
      fontFace: BODY, fontSize: 12, bold: true, color: ACC, charSpacing: 2, margin: 0 }, opts));

  const foot = (s, n) => {
    s.addText("CSE 210B · SE + PL in the Age of AI · Winter 2027", {
      x: 0.6, y: H - 0.42, w: 6.5, h: 0.3, fontFace: BODY, fontSize: 9.5,
      color: MUT, margin: 0 });
    s.addText(String(n), { x: W - 1.1, y: H - 0.42, w: 0.5, h: 0.3,
      fontFace: BODY, fontSize: 9.5, color: MUT, align: "right", margin: 0 });
  };

  const circIcon = (s, key, x, y, d = 0.52, fill = NAVY) => {
    s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: fill } });
    s.addImage({ data: P[key], x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56 });
  };

  // ============ 1. TITLE (dark) =============================================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addText("PAPER PRESENTATION · READING #39 · SESSION 13 · PAIRED WITH #40 DRAFT, SKETCH \u0026 PROVE", {
      x: 0.9, y: 0.95, w: 11, h: 0.35, fontFace: BODY, fontSize: 13, bold: true,
      color: ICE, charSpacing: 2, margin: 0 });
    s.addText("Baldur: Whole-Proof Generation and Repair with Large Language Models", {
      x: 0.9, y: 1.55, w: 11.5, h: 1.9, fontFace: HEAD, fontSize: 40, bold: true,
      color: WHITE, margin: 0 });
    s.addText("Emily First · Markus N. Rabe · Talia Ringer · Yuriy Brun", {
      x: 0.9, y: 3.6, w: 11, h: 0.4, fontFace: BODY, fontSize: 18, color: ICE, margin: 0 });
    s.addText("ESEC/FSE 2023 · ACM SIGSOFT Distinguished Paper", {
      x: 0.9, y: 4.08, w: 11, h: 0.4, fontFace: BODY, fontSize: 14, italic: true,
      color: ICE, margin: 0 });
    s.addShape("line", { x: 0.9, y: 5.2, w: 5.2, h: 0, line: { color: ACC, width: 2 } });
    s.addText([
      { text: "Presented by ", options: { color: ICE } },
      { text: "<your name>", options: { color: WHITE, bold: true } },
      { text: "  ·  Thu Feb 18, 2027", options: { color: ICE } },
    ], { x: 0.9, y: 5.45, w: 11, h: 0.4, fontFace: BODY, fontSize: 15, margin: 0 });
    s.addText("Example deck, auto-drafted from the course reading list — replace highlighted fields after your own read + reality check.", {
      x: 0.9, y: 6.55, w: 11.5, h: 0.35, fontFace: BODY, fontSize: 11, italic: true,
      color: "8FA3D9", margin: 0 });
  }

  // ============ 2. WHY THIS PAPER ==========================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 1 · Problem & context");
    title(s, "Why this paper is on our list");
    const rows = [
      ["book", "A paradigm pivot", "Before Baldur, neural proving mostly predicted one tactic at a time inside a search loop. Baldur made the case for generating the whole proof in one shot — now the dominant paradigm."],
      ["bolt", "The course thesis, in miniature", "Proof engineering is the cost we claim LLMs slash by 10–100x. This is one of the first rigorous, large-scale measurements of that claim on real proof corpora."],
      ["compass", "Bridge to our project work", "Generate → check → repair with the verifier's error message is exactly the loop you will live in during your course project."],
    ];
    let y = 1.55;
    for (const [ic, h, b] of rows) {
      circIcon(s, ic, 0.62, y + 0.06);
      s.addText(h, { x: 1.4, y: y, w: 11.2, h: 0.35, fontFace: BODY, fontSize: 17,
        bold: true, color: INK, margin: 0 });
      s.addText(b, { x: 1.4, y: y + 0.38, w: 11.2, h: 0.85, fontFace: BODY,
        fontSize: 14, color: MUT, margin: 0 });
      y += 1.62;
    }
    s.addShape("roundRect", { x: 0.62, y: 6.35, w: 12.1, h: 0.62, rectRadius: 0.08,
      fill: { color: ICE_LT } });
    s.addText([
      { text: "Course fit ★★★★★   ·   ", options: { bold: true, color: NAVY } },
      { text: "Section 8: LLMs and interactive theorem proving  ·  ~61 citations (Jul 2026 snapshot)",
        options: { color: MUT } },
    ], { x: 0.85, y: 6.42, w: 11.7, h: 0.48, fontFace: BODY, fontSize: 13, margin: 0 });
    foot(s, 2);
  }

  // ============ 3. THE PROBLEM =============================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 1 · Problem & context");
    title(s, "Formal proof is powerful — and painfully manual");
    s.addText([
      { text: "Interactive theorem provers (here: Isabelle/HOL) give the strongest guarantee software can have: a machine-checked proof.\n", options: { breakLine: true } },
      { text: "The price is proof engineering: a human writes every proof step, and verified developments routinely take ", options: {} },
      { text: "multiple person-years per project", options: { bold: true, color: NAVY } },
      { text: " (seL4, CompCert).", options: {} },
    ], { x: 0.62, y: 1.6, w: 6.4, h: 2.3, fontFace: BODY, fontSize: 15.5,
      color: INK, paraSpaceAfter: 10, margin: 0 });
    s.addText([
      { text: "The automation on offer in 2023:\n", options: { bold: true, breakLine: true } },
      { text: "Hammers (Sledgehammer): strong but plateaued", options: { bullet: true, breakLine: true } },
      { text: "Tactic-prediction + search (GPT-f, Thor): one step at a time, huge search trees", options: { bullet: true, breakLine: true } },
      { text: "Each checker call is slow; search cost explodes with depth", options: { bullet: true } },
    ], { x: 0.62, y: 4.0, w: 6.4, h: 2.4, fontFace: BODY, fontSize: 14.5,
      color: MUT, paraSpaceAfter: 6, margin: 0 });
    // right panel: the loop diagram
    s.addShape("roundRect", { x: 7.5, y: 1.6, w: 5.2, h: 4.9, rectRadius: 0.1,
      fill: { color: ICE_LT } });
    s.addText("ONE PROOF, THE OLD WAY", { x: 7.8, y: 1.85, w: 4.6, h: 0.3,
      fontFace: BODY, fontSize: 11, bold: true, color: NAVY, charSpacing: 2, margin: 0 });
    const steps = ["predict a tactic", "run the checker", "branch & backtrack", "repeat… hundreds of times"];
    let sy = 2.35;
    steps.forEach((t, i) => {
      s.addShape("roundRect", { x: 8.0, y: sy, w: 4.2, h: 0.62, rectRadius: 0.08,
        fill: { color: i === 3 ? NAVY : WHITE }, line: { color: NAVY, width: 1 } });
      s.addText(t, { x: 8.0, y: sy, w: 4.2, h: 0.62, align: "center",
        fontFace: BODY, fontSize: 13.5, color: i === 3 ? WHITE : INK,
        bold: i === 3, margin: 0 });
      if (i < 3) s.addText("▼", { x: 9.9, y: sy + 0.62, w: 0.4, h: 0.32,
        align: "center", fontFace: BODY, fontSize: 12, color: ACC, margin: 0 });
      sy += 0.95;
    });
    s.addText("Search depth × checker latency = the bottleneck", {
      x: 7.8, y: 6.05, w: 4.6, h: 0.4, fontFace: BODY, fontSize: 12, italic: true,
      color: MUT, margin: 0 });
    foot(s, 3);
  }

  // ============ 4. KEY IDEA ================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 2 · Technique");
    title(s, "Key idea: generate the whole proof at once");
    // two columns comparison
    const col = (x, hdr, hdrFill, items, itemColor) => {
      s.addShape("roundRect", { x, y: 1.7, w: 5.9, h: 0.62, rectRadius: 0.08,
        fill: { color: hdrFill } });
      s.addText(hdr, { x, y: 1.7, w: 5.9, h: 0.62, align: "center", fontFace: BODY,
        fontSize: 16, bold: true, color: WHITE, margin: 0 });
      s.addText(items.map((t, i) => ({ text: t, options: { bullet: true,
        breakLine: i < items.length - 1 } })), { x: x + 0.25, y: 2.55, w: 5.5,
        h: 2.5, fontFace: BODY, fontSize: 14.5, color: itemColor,
        paraSpaceAfter: 8, margin: 0 });
    };
    col(0.62, "Tactic-by-tactic search", MUT, [
      "Model predicts one step; checker validates; search branches",
      "Checker in the inner loop — slow and expensive",
      "Model never sees the proof as a whole",
    ], MUT);
    col(6.85, "Baldur: whole-proof generation", NAVY, [
      "Fine-tuned LLM emits a complete proof from the theorem statement",
      "Checker runs once per candidate — sampling replaces tree search",
      "If it fails: a repair model consumes the error message and tries again",
    ], INK);
    s.addShape("roundRect", { x: 0.62, y: 5.5, w: 12.1, h: 1.35, rectRadius: 0.1,
      fill: { color: NAVY } });
    s.addText([
      { text: "The bet:  ", options: { bold: true, color: ICE } },
      { text: "an LLM that has read millions of proofs can draft a plausible whole proof more cheaply than search can assemble one — and the proof checker makes wrong drafts free.",
        options: { color: WHITE } },
    ], { x: 0.95, y: 5.62, w: 11.5, h: 1.1, fontFace: BODY, fontSize: 16, margin: 0 });
    foot(s, 4);
  }

  // ============ 5. TECHNIQUE ===============================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 2 · Technique");
    title(s, "The pipeline: generate, check, repair");
    const boxes = [
      ["gear", "Generate", "Minerva models (8B / 62B) fine-tuned on Isabelle/HOL proof corpora emit complete candidate proofs; sample N candidates per theorem."],
      ["search", "Check", "Isabelle checks each candidate. Accepted proof ⇒ done. The checker is the ground truth — hallucinated proofs cost nothing but compute."],
      ["wrench", "Repair", "A second fine-tuned model takes (statement, failed proof, checker error message) and emits a corrected proof — error messages are training signal, not noise."],
    ];
    let x = 0.62;
    for (const [ic, h, b] of boxes) {
      s.addShape("roundRect", { x, y: 1.75, w: 3.85, h: 3.6, rectRadius: 0.1,
        fill: { color: ICE_LT } });
      circIcon(s, ic, x + 0.3, y0 = 2.05, 0.6);
      s.addText(h, { x: x + 1.05, y: 2.12, w: 2.6, h: 0.45, fontFace: HEAD,
        fontSize: 19, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: x + 0.3, y: 2.95, w: 3.25, h: 2.2, fontFace: BODY,
        fontSize: 13.5, color: INK, margin: 0 });
      if (x < 8) s.addText("▶", { x: x + 3.92, y: 3.3, w: 0.32, h: 0.4,
        fontFace: BODY, fontSize: 14, color: ACC, align: "center", margin: 0 });
      x += 4.25;
    }
    s.addText([
      { text: "Also in the paper:  ", options: { bold: true, color: NAVY } },
      { text: "adding file context (nearby lemmas and definitions) to the prompt further improves proof rates — an early premise-selection signal that LeanDojo (#41) and Rango (#44) later industrialize.",
        options: { color: MUT } },
    ], { x: 0.62, y: 5.75, w: 12.1, h: 0.95, fontFace: BODY, fontSize: 14, margin: 0 });
    foot(s, 5);
  }

  // ============ 6. EVALUATION SETUP ========================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 3 · Evaluation");
    title(s, "Evaluation: 6,336 real Isabelle/HOL theorems");
    const cells = [
      ["flask", "Benchmark", "6,336 theorems and their human proofs, drawn from real Isabelle/HOL developments (the PISA setup used by Thor)."],
      ["chart", "Metric", "Proof rate: fraction of theorems for which some generated candidate is accepted by the checker."],
      ["scale", "Baselines", "Thor (LM + Sledgehammer, prior SOTA) and Sledgehammer alone; ablations isolate repair, context, and model scale."],
      ["comments", "Question to ask", "Are benchmark theorems representative of the proofs you actually need in a verified development — or the easy tail?"],
    ];
    const pos = [[0.62, 1.75], [6.85, 1.75], [0.62, 4.15], [6.85, 4.15]];
    cells.forEach(([ic, h, b], i) => {
      const [cx, cy] = pos[i];
      s.addShape("roundRect", { x: cx, y: cy, w: 5.9, h: 2.15, rectRadius: 0.1,
        fill: { color: i === 3 ? NAVY : ICE_LT } });
      circIcon(s, ic, cx + 0.28, cy + 0.28, 0.52, i === 3 ? ACC : NAVY);
      s.addText(h, { x: cx + 0.98, y: cy + 0.32, w: 4.6, h: 0.4, fontFace: BODY,
        fontSize: 16, bold: true, color: i === 3 ? WHITE : NAVY, margin: 0 });
      s.addText(b, { x: cx + 0.28, y: cy + 0.95, w: 5.35, h: 1.1, fontFace: BODY,
        fontSize: 13, color: i === 3 ? ICE : INK, margin: 0 });
    });
    foot(s, 6);
  }

  // ============ 7. RESULTS =================================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 3 · Evaluation");
    title(s, "Results: whole-proof generation works");
    const stat = (x, big, lbl, sub, dark) => {
      s.addShape("roundRect", { x, y: 1.8, w: 3.85, h: 3.1, rectRadius: 0.1,
        fill: { color: dark ? NAVY : ICE_LT } });
      s.addText(big, { x, y: 2.15, w: 3.85, h: 1.2, align: "center",
        fontFace: HEAD, fontSize: 54, bold: true, color: dark ? WHITE : NAVY, margin: 0 });
      s.addText(lbl, { x: x + 0.25, y: 3.45, w: 3.35, h: 0.5, align: "center",
        fontFace: BODY, fontSize: 14.5, bold: true, color: dark ? ICE : INK, margin: 0 });
      s.addText(sub, { x: x + 0.25, y: 4.0, w: 3.35, h: 0.75, align: "center",
        fontFace: BODY, fontSize: 11.5, color: dark ? ICE : MUT, margin: 0 });
    };
    stat(0.62, "+8.7%", "more theorems than Thor", "the prior state of the art (LM + hammer)", false);
    stat(4.87, "65.7%", "proved in combination with Thor", "of 6,336 theorems — complementary strengths", true);
    stat(9.12, "1 call", "to the checker per candidate", "sampling + repair replaces deep tree search", false);
    s.addText([
      { text: "What drives it:  ", options: { bold: true, color: NAVY } },
      { text: "repair with the actual error message beats spending the same budget on more samples, and file context helps — both findings that shaped every later system on our list.",
        options: { color: MUT } },
    ], { x: 0.62, y: 5.35, w: 12.1, h: 0.8, fontFace: BODY, fontSize: 14.5, margin: 0 });
    s.addText("Numbers from the published FSE 2023 version — verify against your own reality-check run before presenting.", {
      x: 0.62, y: 6.35, w: 12.1, h: 0.35, fontFace: BODY, fontSize: 11, italic: true,
      color: MUT, margin: 0 });
    foot(s, 7);
  }

  // ============ 8. CRITICAL READING ========================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 3½ · Critique");
    title(s, "Critical reading: what to push on");
    const items = [
      ["Isabelle-only", "Does whole-proof generation transfer to Lean 4 and Rocq, where proof styles differ (term-mode, structured tactics)? (Spoiler for discussion: 2024–26 says yes — but the paper couldn't know that.)"],
      ["Fine-tuning freeze", "Baldur is a fine-tuned 2022-era model. What survives when frontier in-context models (COPRA, #42) skip fine-tuning entirely?"],
      ["Benchmark validity", "Held-out theorems from the same corpora the community mines for training — how worried should we be about leakage in 2023-era evals?"],
      ["Cost accounting", "62B fine-tune + N samples per theorem: what is the $/proved-theorem, and how does it compare with a proof engineer's hour?"],
    ];
    let y = 1.65;
    items.forEach(([h, b], i) => {
      s.addShape("roundRect", { x: 0.62, y, w: 0.42, h: 0.42, rectRadius: 0.06,
        fill: { color: NAVY } });
      s.addText(String(i + 1), { x: 0.62, y, w: 0.42, h: 0.42, align: "center",
        fontFace: BODY, fontSize: 15, bold: true, color: WHITE, margin: 0 });
      s.addText([
        { text: h + " — ", options: { bold: true, color: INK } },
        { text: b, options: { color: MUT } },
      ], { x: 1.25, y: y - 0.03, w: 11.4, h: 1.1, fontFace: BODY, fontSize: 14, margin: 0 });
      y += 1.28;
    });
    foot(s, 8);
  }

  // ============ 9. REALITY CHECK ===========================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 4 · Reality check — required slide", { color: CORAL });
    title(s, "Reality check: Baldur's numbers in 2027");
    s.addShape("roundRect", { x: 0.62, y: 1.7, w: 5.9, h: 4.6, rectRadius: 0.1,
      fill: { color: ICE_LT } });
    s.addText("THE PAPER (2023)", { x: 0.95, y: 1.95, w: 5.2, h: 0.3, fontFace: BODY,
      fontSize: 11, bold: true, color: NAVY, charSpacing: 2, margin: 0 });
    s.addText([
      { text: "Proof rate: 65.7% (with Thor) on 6,336 Isabelle theorems", options: { bullet: true, breakLine: true } },
      { text: "Model: fine-tuned Minerva 8B / 62B", options: { bullet: true, breakLine: true } },
      { text: "Repair uses checker error messages", options: { bullet: true, breakLine: true } },
      { text: "Claimed limits: context length, no search, Isabelle only", options: { bullet: true } },
    ], { x: 0.95, y: 2.4, w: 5.3, h: 3.6, fontFace: BODY, fontSize: 14, color: INK,
      paraSpaceAfter: 10, margin: 0 });
    s.addShape("roundRect", { x: 6.85, y: 1.7, w: 5.9, h: 4.6, rectRadius: 0.1,
      fill: { color: WHITE }, line: { color: CORAL, width: 1.5, dashType: "dash" } });
    s.addText("YOUR RERUN (2027) — fill me in", { x: 7.18, y: 1.95, w: 5.2, h: 0.3,
      fontFace: BODY, fontSize: 11, bold: true, color: CORAL, charSpacing: 2, margin: 0 });
    s.addText([
      { text: "Setup: model + version, theorem sample, budget", options: { bullet: true, breakLine: true } },
      { text: "Your proof rate:  ____ %  on  ____ theorems", options: { bullet: true, breakLine: true } },
      { text: "Which 2023 limitations still hold?", options: { bullet: true, breakLine: true } },
      { text: "Which are gone? (one concrete example)", options: { bullet: true, breakLine: true } },
      { text: "Cost: wall-clock / tokens / $", options: { bullet: true } },
    ], { x: 7.18, y: 2.4, w: 5.3, h: 3.6, fontFace: BODY, fontSize: 14, color: MUT,
      paraSpaceAfter: 10, margin: 0 });
    s.addText("Log the result in reality-checks.md after class — the paper's number is the baseline; your delta is the finding.", {
      x: 0.62, y: 6.5, w: 12.1, h: 0.4, fontFace: BODY, fontSize: 12.5, italic: true,
      color: INK, margin: 0 });
    foot(s, 9);
  }

  // ============ 10. DISCUSSION =============================================
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Beat 5 · Discussion");
    title(s, "Discussion (seeded from your submitted questions)");
    const qs = [
      "If sampling + repair beats search, what is left for classical proof automation (hammers, decision procedures) — junior partner or inner loop?",
      "Baldur treats the checker as free and the model as expensive. In 2027 the economics have flipped. How should that invert the system design?",
      "Whole-proof generation succeeds on benchmark theorems. Would it survive the definitional layer of a fresh POPL-paper mechanization (our coda problem)?",
    ];
    let y = 1.7;
    qs.forEach((q, i) => {
      s.addShape("roundRect", { x: 0.62, y, w: 12.1, h: 1.28, rectRadius: 0.1,
        fill: { color: i === 2 ? NAVY : ICE_LT } });
      s.addText("Q" + (i + 1), { x: 0.9, y: y + 0.33, w: 0.7, h: 0.6, fontFace: HEAD,
        fontSize: 22, bold: true, color: i === 2 ? ACC : NAVY, margin: 0 });
      s.addText(q, { x: 1.75, y: y + 0.14, w: 10.7, h: 1.0, fontFace: BODY,
        fontSize: 14.5, color: i === 2 ? WHITE : INK, margin: 0 });
      y += 1.5;
    });
    s.addText("+ the best of tonight's submitted questions — reviewed at 9pm yesterday, woven in here.", {
      x: 0.62, y: 6.35, w: 12.1, h: 0.35, fontFace: BODY, fontSize: 12.5, italic: true,
      color: MUT, margin: 0 });
    foot(s, 10);
  }

  // ============ 11. COURSE ARC + CLOSE (dark) ==============================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addText("WHERE BALDUR SITS IN OUR ARC", { x: 0.9, y: 0.7, w: 11, h: 0.35,
      fontFace: BODY, fontSize: 12, bold: true, color: ACC, charSpacing: 2, margin: 0 });
    s.addText("One paper, three descendants on our reading list", {
      x: 0.9, y: 1.1, w: 11.5, h: 0.7, fontFace: HEAD, fontSize: 28, bold: true,
      color: WHITE, margin: 0 });
    const rel = [
      ["#40  Draft, Sketch & Prove", "the informal-to-formal bridge Baldur's one-shot drafts hint at"],
      ["#43  PALM", "diagnoses why whole proofs fail (structure right, details wrong) and repairs symbolically"],
      ["#44  Rango", "retrieval-adapted whole-proof generation for real Coq software projects"],
    ];
    let y = 2.15;
    for (const [h, b] of rel) {
      s.addShape("roundRect", { x: 0.9, y, w: 11.5, h: 1.05, rectRadius: 0.1,
        fill: { color: "27346F" } });
      s.addText(h, { x: 1.2, y: y + 0.12, w: 3.6, h: 0.8, fontFace: BODY,
        fontSize: 15.5, bold: true, color: ICE, margin: 0 });
      s.addText(b, { x: 4.9, y: y + 0.12, w: 7.3, h: 0.8, fontFace: BODY,
        fontSize: 13.5, color: WHITE, margin: 0 });
      y += 1.25;
    }
    s.addShape("line", { x: 0.9, y: 6.2, w: 5.2, h: 0, line: { color: ACC, width: 2 } });
    s.addText("Takeaway: the checker turns hallucination from a bug into a search strategy — Baldur was the proof of concept.", {
      x: 0.9, y: 6.4, w: 11.5, h: 0.6, fontFace: BODY, fontSize: 15, italic: true,
      color: ICE, margin: 0 });
  }

  await pres.writeFile({ fileName: "baldur-example-deck.pptx" });
  console.log("written");
})().catch(e => { console.error(e); process.exit(1); });
