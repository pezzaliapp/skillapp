# skillapp

**A Codex of Minor Arts** — a typographic field manual for the deliberate practice of small, specific human skills.

Live: <https://www.alessandropezzali.it/skillapp/>

---

## What it is

Seventeen tiny, ancient, peculiar skills — the kind that take ten focused minutes a day for a season and leave a permanent mark on the body. Mental multiplication of two-digit numbers. The Major system for memorising digits. The Doomsday algorithm. The sailor's bowline. Pitch interval recognition. The freehand circle. Threading a needle.

Each article in the codex carries:

- a brief poetic description and a one-paragraph history;
- a numbered **practice protocol** — five short instructions, no more;
- a **calibration test** — a measurable instrument that produces a number;
- a piece of **marginalia** in italics, an aphorism to keep nearby;
- a running **chart** of your past readings.

Eight of the seventeen articles ship with the test built into the page (mental multiplication runs five random problems against the clock; ten random clock faces appear for you to read aloud; the Web Audio synth plays five intervals you must name; the hidden one-minute timer reports your error in seconds; and so on). The other nine record manual readings — seconds held, knots tied, hits in the bin.

The app keeps a **ledger**. The ledger groups by day, sums in the foot, exports as text. There are no streaks, no levels, no badges, no points. The reading is the only currency and the chart is the only history.

A **Daily Rite** picks three articles deterministically from the date — the same three on every device for the same date — and gives each a five-minute timer. Tomorrow it will be three other articles.

## What it isn't

- It isn't Duolingo. There are no green owls and no daily streak you can break.
- It isn't Habitica. There are no stats, no quests, no party.
- It isn't a productivity tool. Five of the seventeen articles will not improve your career in any direction.
- It isn't a checklist. You don't tick. You record a reading, or you don't.

## How to use

Open `index.html` in any modern browser. That's it.

For development convenience there's a small script:

```sh
python3 -m http.server 4173    # or:  npm start
# then open http://localhost:4173
```

All readings live in your browser's `localStorage` under the key `skillapp.calibrations.v1`. They never leave the device. There are no accounts, no servers, no analytics, no third-party requests beyond Google Fonts (which can be blocked without consequence — system mono and a serif fallback will load instead).

## Files

```
index.html      single page, scripts at the foot
style.css       cream paper, deep ink, rust accent, JetBrains Mono + EB Garamond
data.js         the seventeen articles and their metadata
app.js          routing, views, storage, charts, calibration widgets
.nojekyll       so GitHub Pages does not eat the underscore-prefixed files
```

No build step. No bundler. No `node_modules`. The `package.json` only carries metadata and the dev-server script.

## Deployment

Pushed to the `main` branch of <https://github.com/pezzaliapp/skillapp>. GitHub Pages serves it under <https://pezzaliapp.github.io/skillapp/>, and the user-level custom domain `alessandropezzali.it` (configured separately) resolves <https://www.alessandropezzali.it/skillapp/> to the same content.

Three rules kept this from breaking:

1. All assets sit in the repository root. There is no `public/` or `dist/`.
2. All paths are relative (`app.js`, not `/app.js`) so the site survives in a sub-path.
3. There is no `CNAME` file in this repository. The custom domain is set at the user level on `pezzaliapp.github.io` and adding a `CNAME` here would override it.

A `.nojekyll` file in the root disables Jekyll processing on Pages.

## Design

The estate is brutalist-monospace by way of an Oxford reference manual: a cream paper with a faint CSS grain, a single column at the measure of a paperback, hairline rules with labelled chapters in small caps, marginalia in italic Garamond against a thin rust border, drop caps in the second-colour ink. Numerals are Roman; chapter heads are italic Garamond at 30 to 34px; the apparatus — buttons, inputs, status lines, the timer — is monospace with tracked letter-spacing.

There is exactly one accent colour. It is rust (`#a93f2c`).

## Credits and licence

Compiled in the spring of 2026 by Alessandro Pezzali, with the patient assistance of Claude Opus.

Marginalia and aphorisms paraphrase or invoke Italo Calvino, John Conway, Persi Diaconis, Zoltán Kodály, Ludovico degli Arrighi, Jacques Cousteau, the *Anguttara Nikāya*, and the British schoolroom. The reading-pace passage is from Stevenson's *Strange Case of Dr Jekyll and Mr Hyde*, 1886, public domain.

MIT.
