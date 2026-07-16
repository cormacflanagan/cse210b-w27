# Papers

PDFs for the candidate reading list in [`../readings.md`](../readings.md),
one file per numbered entry, named `<Title> - <Authors>.pdf`.

To populate this directory, run:

```sh
cd papers && ./download.sh
```

or, to prefix each file with its (zero-padded) entry number from
`readings.md` so the PDFs sort in course order:

```sh
cd papers && ./download-num.sh      # "09 - SWE-bench - Can Language Models ... - Jimenez et al.pdf"
```

The script pulls each paper from arXiv (or the open-access publisher copy
where no arXiv version exists), skips files already present, and verifies
that each download is a real PDF. Entry 6 (CHI 2022) comes from the ACM
Digital Library and may require campus network/VPN access; entry 7 downloads
the arXiv preprint version of the CACM article; entry 27 is the arXiv
preprint of the FMCAD 2024 paper.

*The PDFs are not committed here (yet): the remote session that authored this
repo runs under a network policy that blocks arxiv.org, so the files could
not be fetched from there. Run the script locally — or rerun the session in
an environment whose network policy allows arxiv.org — and commit the
results if you want the PDFs versioned. Note that ~49 PDFs add roughly
100–200 MB to the repository; an alternative is keeping this directory in
`.gitignore` and treating the script as the source of truth.*
