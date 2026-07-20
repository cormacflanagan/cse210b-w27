# Slides

Presentation decks for the seminar. Presenters: post your deck here after
class, named `<reading ##> - <short name> - <your name>.pptx`.

## Example deck

[`39 - Baldur - example presentation.pptx`](39%20-%20Baldur%20-%20example%20presentation.pptx)
is an auto-drafted example for reading #39 (Baldur, ESEC/FSE 2023) showing
the expected shape of a presentation: ~11–20 slides covering the five
required beats from `syllabus.md`:

1. **Problem & context** — why the paper exists, where it sits in our arc
2. **Technique** — the key idea and the system
3. **Evaluation** — setup, results, and a critical-reading slide
4. **Reality check** — the required paper-number-vs-your-number slide
   (left as fill-in fields in the example)
5. **Discussion** — 2–3 seeded questions, plus the class's submitted ones

Treat it as a starting point, not a ceiling: it was drafted from the
paper's published headline results, so a real presentation should go
deeper on the technique and use figures/examples from the paper itself.

## Auto-drafting a deck for your paper

`make_deck.js` is the generator that produced the example (Node +
[pptxgenjs](https://gitbrent.github.io/PptxGenJS/)). To draft a deck for a
different paper, edit the slide content in the script and run:

```sh
npm install pptxgenjs react-icons react react-dom sharp
node make_deck.js
```

— or just hand the script plus your paper's PDF to an LLM and ask it to
regenerate the content for your paper. (Meta-note: using AI to draft your
deck is fine and on-theme; presenting a deck you haven't verified against
the paper is not. The reality-check slide keeps everyone honest.)
