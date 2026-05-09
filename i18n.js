/* SKILLAPP — internationalisation
   All translatable text in one place, keyed by locale.
   Adding a new language is a matter of adding a new key under each of
   UI, META, and SKILL_TEXT. Missing keys fall back to English. */

window.UI = {};
window.META = {};
window.SKILL_TEXT = {};

/* ──────────────────────── English ──────────────────────── */

window.UI.en = {
  /* navigation */
  nav_codex: "codex",
  nav_ledger: "ledger",
  nav_rite: "daily rite",
  nav_colophon: "colophon",
  lang_label: "language",

  /* common buttons / labels */
  btn_record: "record",
  btn_record_reading: "record reading",
  btn_again: "again",
  btn_begin: "begin",
  btn_start: "start",
  btn_stop: "stop",
  btn_pause: "pause",
  btn_resume: "resume",
  btn_reset: "reset",
  btn_score: "score",
  btn_play: "play",
  btn_done: "done",
  btn_erase_ledger: "erase the ledger",
  btn_export_text: "export as text",
  btn_hide_recall: "hide and recall",
  btn_start_reading: "start reading",
  btn_start_min: "start {min}-min",
  remove_label: "remove reading",

  /* common */
  note_optional: "note (optional)",
  placeholder_value: "value",
  result_label: "result: ",
  back_to_codex: "← codex",
  article_prefix: "Article ",

  /* rule labels */
  rule_index: "the index",
  rule_order: "the order",
  rule_description: "description",
  rule_origin: "origin",
  rule_protocol: "protocol",
  rule_calibration: "calibration",
  rule_readings: "readings",

  /* atelier */
  atelier_an_art: "an art {cat} · calibrated in {unit}",
  atelier_warning_tag: "AVERTISSEMENT",
  atelier_enter_reading: "Enter your reading in {unit}. Press record when ready.",

  /* chart */
  chart_empty: "no calibrations yet",
  chart_improving: "↗ improving",
  chart_steady: "→ steady",
  chart_drifting: "↘ drifting",
  chart_over_n: " over {n} readings",

  /* ledger */
  ledger_title: "The Ledger",
  ledger_blurb: "All recorded calibrations, in reverse chronological order. The ledger is the only history.",
  ledger_empty: "No calibrations yet. Open any article in the codex and perform its test.",
  ledger_unknown: "(unknown skill)",
  ledger_erase_confirm: "Erase every recorded calibration? This cannot be undone.",
  ledger_summary: "{total} readings across {touched} articles · first entry {since}",

  /* daily rite */
  rite_title: "The Daily Rite",
  rite_blurb: "Three articles drawn from the codex for today. The same three on every device, for this date; tomorrow they will be other three.",
  rite_foot: "Five minutes per article. Fifteen minutes well spent. Open each article to perform the calibration and record a reading.",
  rite_done_today: "✓ a reading was recorded today",
  rite_ordinals: ["i.", "ii.", "iii."],

  /* colophon */
  colophon_title: "Colophon",
  colophon_tech: "Set in JetBrains Mono and EB Garamond. Printed in the browser, kept in the browser. All readings live in localStorage and never leave this device. No accounts, no servers, no analytics. View the source at ",
  colophon_source_text: "github.com/pezzaliapp/skillapp",
  colophon_source_period: ".",

  /* not found */
  not_found_title: "Article not found",
  not_found_blurb: "Return to the codex.",

  /* footer */
  foot_impressum: "impressum: a private printing",

  /* document titles */
  title_codex: "SKILLAPP — A Codex of Minor Arts",
  title_ledger: "SKILLAPP — Ledger",
  title_rite: "SKILLAPP — Daily Rite",
  title_colophon: "SKILLAPP — Colophon",
  title_atelier: "SKILLAPP — {title}",

  /* meta */
  meta_description: "A typographic field manual for the deliberate practice of small, specific human skills.",

  /* dates */
  months_short: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  months_long: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  days_short: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  days_long: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  date_long: "{dow}, {month} {day}, {year}",

  /* widgets — mental multiplication */
  w_mental_help: "Five problems. Type each answer and press Enter. The clock starts when the first problem is shown.",
  w_mental_problem: "problem {i} of {n}",
  w_mental_finish: "{c} of {n} correct in {s} seconds.",
  w_mental_note: "{c}/{n} correct",

  /* widgets — Major system */
  w_major_help: "Ten random digits will appear. Study them. When ready, hide them and type the recall.",
  w_major_compose: "Compose images. When ready, hide and recall.",
  w_major_type_order: "Type the digits in order.",
  w_major_finish: "{c} of {n} digits in correct positions.",
  w_major_shown_typed: "shown: {shown} · typed: {typed}",
  w_major_dash: "—",
  w_major_note: "of {n}",

  /* widgets — doomsday */
  w_doom_help: "Five random dates. Choose the weekday. The timer runs across the whole set.",
  w_doom_date: "date {i} of {n}",
  w_doom_finish: "{c} of {n} correct in {s}s.",
  w_doom_note_elapsed: "{s}s elapsed",

  /* widgets — one minute */
  w_one_help: "Press start. Wait until you feel one minute has passed. Press stop.",
  w_one_instruction: "do not count. Listen to the body's clock.",
  w_one_finish_long: "you stopped at {elapsed}s · error +{error}s",
  w_one_finish_short: "you stopped at {elapsed}s · error −{error}s",
  w_one_note_long: "long · stopped at {s}s",
  w_one_note_short: "short · stopped at {s}s",

  /* widgets — clock */
  w_clock_help: "Ten random clock faces. Type the time as 'h:mm' (12-hour). The timer runs across the set.",
  w_clock_face: "face {i} of {n}",
  w_clock_placeholder: "h:mm",
  w_clock_finish: "{c} of {n} in {s}s.",
  w_clock_note: "{c}/{n} correct (±1 min tolerated)",

  /* widgets — pitch */
  w_pitch_help: "Ten intervals. Two notes will sound. Choose the interval. Replay any time. Audio uses the browser's synth — turn the volume up gently.",
  w_pitch_interval: "interval {i} of {n}",
  w_pitch_finish: "{c} of {n} correct.",
  w_pitch_note: "of {n}",
  w_pitch_intervals: ["minor 3rd", "major 3rd", "perfect 4th", "perfect 5th", "octave"],

  /* widgets — reading pace */
  w_read_help: "Read the passage aloud, calmly, at a public-lectern pace. Press start when you begin and stop when you reach the final word. ({words} words.)",
  w_read_passage: (
    "Mr Utterson the lawyer was a man of a rugged countenance, that was never " +
    "lighted by a smile; cold, scanty, and embarrassed in discourse; backward in " +
    "sentiment; lean, long, dusty, dreary, and yet somehow lovable. At friendly " +
    "meetings, and when the wine was to his taste, something eminently human " +
    "beaconed from his eye; something indeed which never found its way into his " +
    "talk, but which spoke not only in these silent symbols of the after-dinner " +
    "face, but more often and loudly in the acts of his life. He was austere with " +
    "himself; drank gin when he was alone, to mortify a taste for vintages; and " +
    "though he enjoyed the theatre, had not crossed the doors of one for twenty " +
    "years. But he had an approved tolerance for others; sometimes wondering, " +
    "almost with envy, at the high pressure of spirits involved in their " +
    "misdeeds; and in any extremity inclined to help rather than to reprove. " +
    "'I incline to Cain's heresy,' he used to say quaintly; 'I let my brother " +
    "go to the devil in his own way.'"
  ),
  w_read_attribution: "Robert Louis Stevenson, 'The Strange Case of Dr Jekyll and Mr Hyde', 1886.",
  w_read_finish: "{words} words in {s}s · {wpm} wpm",
  w_read_note_elapsed: "{s}s elapsed",

  /* widgets — circle */
  w_circle_help: "Draw your circle on paper. Step three paces back. Then rate it honestly.",
  w_circle_verdict: "your verdict: ",
  w_circle_out_of: " / 10"
};

window.META.en = {
  edition: "MMXXVI",
  title: "A Codex of Minor Arts",
  subtitle: "for the deliberate practice of small, specific human skills",
  preface:
    "This is a private printing. Seventeen minor arts are gathered here, each chosen for being modest in scope, ancient in origin, and stubbornly bodily. None of them will earn you a salary. All of them, practiced for ten minutes a day, will rearrange a small portion of your nervous system within a season.",
  invocation:
    "Read the article. Perform the calibration. Let the body learn what the body learns. Return to the page only after you have practiced.",
  attribution:
    "Compiled in the spring of MMXXVI, after the manuals of Erasmus, the notebooks of Leonardo, the protocols of Anders Ericsson, the marginalia of Italo Calvino — and the patience of one's own hands.",
  categories: {
    mind:  "of the mind",
    eye:   "of the eye",
    ear:   "of the ear",
    voice: "of the voice",
    hand:  "of the hand",
    body:  "of the body"
  }
};

window.SKILL_TEXT.en = {
  "mental-mult": {
    title: "Mental Multiplication of Two-Digit Numbers",
    unit: "seconds for five problems",
    description:
      "The art of multiplying two two-digit numbers in the head, without paper, without resting the hand. Once a routine of clerks and clergy; now a small private discipline.",
    origin:
      "Until the abacus, then the slide rule, then the calculator displaced him in turn, the human computer was a respected position. The lightning-calculator Zerah Colburn squared 999 at the age of eight; Aitken multiplied four-digit pairs under the breath of a clock. Their methods are not lost — only no longer obligatory.",
    protocol: [
      "Sit upright. Hands flat. Eyes on a single point in the middle distance.",
      "Decompose to the left: 47 × 83 = (40 × 83) + (7 × 83).",
      "Hold the partial sum in the visual scratchpad behind the eyes.",
      "Resist writing. Resist pencilling on the table with the finger.",
      "Verify only after answering. Ten minutes daily for thirty days."
    ],
    marginalia:
      "There are no calculations, only the rhythm of attention. — after Calvino"
  },
  "major-system": {
    title: "The Major System for Memorising Digits",
    unit: "digits recalled (out of ten)",
    description:
      "A method, codified by Stanislaus Mink von Wennsshein in 1648, that converts each digit to a consonant sound and reassembles them into vivid words. Nine becomes a soft P; six a long SH; the rest follow. With it, one becomes able to memorise a phone number, a postcode, or a forgotten anniversary.",
    origin:
      "The system passed from German memory schools through Aimé Paris in nineteenth-century France and on to the conjurors of the Edwardian variety stage, where memory acts could fill a theatre. Today it survives among mnemonists and a quiet handful of medical students.",
    protocol: [
      "Memorise the cipher: 0=S/Z, 1=T/D, 2=N, 3=M, 4=R, 5=L, 6=J/SH, 7=K/G, 8=F/V, 9=P/B.",
      "When ten digits appear, group in pairs and conjure a single image per pair.",
      "Place each image along a familiar walk through your house.",
      "To recall, walk the house in order and read off the images.",
      "Vowels are free. Use them to hold the images together."
    ],
    marginalia:
      "Memory is a meadow that mows itself unless walked upon. — anonymous"
  },
  "doomsday": {
    title: "The Day of the Week of Any Date",
    unit: "correct in sixty seconds",
    description:
      "Given any date between, say, 1900 and 2099, name the weekday in under ten seconds. The trick is John Conway's Doomsday rule: each year has an anchor weekday on which the 4th of April, 6th of June, 8th of August, 10th of October and 12th of December all fall. From the anchor, every other date is a short hop.",
    origin:
      "Conway, the mathematician of games and surreal numbers, devised the algorithm in 1973 over coffee at Cambridge, and is reported to have practised it on his computer at every login until he could answer in under two seconds.",
    protocol: [
      "Memorise the century anchors: 1900s = Wednesday, 2000s = Tuesday.",
      "For a year YY in the 2000s: take YY/12, the remainder, and remainder/4; sum and add Tuesday.",
      "From the year's anchor, jump to the 'doomsday' nearest your target month (4/4, 6/6, 8/8, 10/10, 12/12; January 3rd or 4th; February's last day).",
      "Hop forward or back to the day in question.",
      "Practise five dates a morning. Report your tongue, not your fingers."
    ],
    marginalia:
      "Time is a wheel. The teeth fit always. — Conway, paraphrased"
  },
  "one-minute": {
    title: "The Estimation of One Minute by Feel",
    unit: "seconds of error",
    description:
      "Begin a hidden timer. Wait. Stop the timer when sixty seconds have, in your judgement, passed. The error is your reading. Most adults err by twelve to twenty seconds on the first attempt, by under five within a fortnight.",
    origin:
      "Internal clocks are cheap and inaccurate, but they can be calibrated. Submarine crews and free-divers train this skill explicitly; jazz drummers acquire it without thinking. The substrate appears to be the basal ganglia.",
    protocol: [
      "Sit. Breathe normally. Do not count.",
      "Begin the timer with eyes closed.",
      "Notice your sense of duration without coercing it.",
      "Stop when sixty feels right.",
      "Repeat three times. Variance is the lesson."
    ],
    marginalia:
      "Counting is cheating. Feel the minute. — Cousteau diving manual, 1953"
  },
  "clock-read": {
    title: "Reading the Analogue Clock at Speed",
    unit: "seconds for ten faces",
    description:
      "A skill once expected of every six-year-old, now in retreat. Ten random clock faces appear. You name each time aloud. Beneath the apparent triviality lies a fast geometric inference your eye still knows how to make.",
    origin:
      "Until the cheap LCD, the analogue dial was the public face of time itself: on station platforms, kitchen walls, school yards. Reading it under pressure — running for the train, finishing the test — was a daily ceremony.",
    protocol: [
      "Glance, do not stare.",
      "Hour hand first; quadrant only.",
      "Minute hand second; round to the nearest five.",
      "Speak the time before the next face is drawn.",
      "Drift, do not panic. Speed follows looseness."
    ],
    marginalia:
      "The clock is honest, only impatient. — schoolroom motto, England"
  },
  "pitch-intervals": {
    title: "The Recognition of Musical Intervals",
    unit: "correct out of ten",
    description:
      "Two notes sound. Name the distance between them. The perfect fifth opens the Star Wars theme; the minor third is the first two notes of Greensleeves; the tritone is the diabolus in musica. The vocabulary is small — the discrimination is a lifetime's training.",
    origin:
      "Solfège — do, re, mi — was systematised by Guido d'Arezzo around 1025 to teach monks to sing unfamiliar plainchant on sight. The interval names that fall out of his system are the same ones modern musicians use over coffee.",
    protocol: [
      "Pair each interval with a song you already know.",
      "Listen for the lower note first; sing it to yourself.",
      "Sing the upper note silently. The interval is the gap.",
      "Begin with three intervals. Add one a week.",
      "Train at the limit of confidence, never beyond."
    ],
    marginalia:
      "The ear is taught by the throat. — Zoltán Kodály"
  },
  "reading-pace": {
    title: "Reading Aloud at Two Hundred Words per Minute",
    unit: "words per minute",
    description:
      "An unhurried public reading sits at 150 wpm. A practiced lectern reader achieves 200. The aim is not haste but legibility at speed: phrasing, breath, the held consonant, the soft landing of the period.",
    origin:
      "Until the seventeenth century almost all reading was done aloud, even alone. To read silently was suspect; the lips were expected to move. The skill of reading aloud well was therefore the skill of reading itself.",
    protocol: [
      "Stand. Hold the page at sternum height.",
      "Breathe at commas, not at line breaks.",
      "Underweight the ends of sentences; the air should fall, not rush.",
      "Keep your jaw soft. The voice rides the breath.",
      "Time only the first thirty seconds; let the rest unspool."
    ],
    marginalia:
      "Read as if to a child sitting on the far side of a small fire. — anonymous, c. 1880"
  },
  "freehand-circle": {
    title: "The Freehand Circle",
    unit: "self-rated, zero to ten",
    description:
      "Stand at a board. With a single unbroken motion of the shoulder, draw a circle. The wrist must not move. The elbow contributes only by extension. The result is judged by the eye and the conscience — no compass.",
    origin:
      "Giotto, asked to send a sample of his work to the Pope, dipped his brush in red and drew a perfect circle in a single stroke. The Pope received it. Giotto was hired. Whether or not the story is true — and it almost certainly is not — the test has been used to entrance students of drawing for seven centuries.",
    protocol: [
      "Anchor the shoulder; lock the wrist.",
      "Draw a faint guide cross. The crossings are your tangent points.",
      "Begin at twelve o'clock; commit to a single sweep.",
      "Exhale through the stroke.",
      "Walk three paces back. Judge from there."
    ],
    marginalia:
      "Tondo come un O di Giotto. — Vasari, Vite, 1568"
  },
  "bowline": {
    title: "The Sailor's Bowline",
    unit: "seconds, eyes closed",
    description:
      "The king of knots. A loop that holds under any load and yet unties without effort once the load is released. To be considered fluent you must tie it behind the back, with one hand, in the dark, and around your own waist while drowning. (Practise in the daylight.)",
    origin:
      "The bowline appears in Egyptian rigging from the eighteenth dynasty. The mnemonic — 'the rabbit comes out of the hole, around the tree, and back into the hole' — was taught to British naval cadets through the nineteenth century, and is taught still.",
    protocol: [
      "Form a small overhand loop in the standing part: this is the rabbit's hole.",
      "Pass the working end up through the hole.",
      "Around the standing part — the tree.",
      "Back down through the hole.",
      "Snug, with the working end on the inside of the loop."
    ],
    marginalia:
      "If a knot will not untie under thumb, it is the wrong knot.",
    placeholder: "e.g. 6.5"
  },
  "riffle-shuffle": {
    title: "The Riffle Shuffle",
    unit: "clean shuffles out of twenty",
    description:
      "Two halves of a deck, bridged into a fall. The interleave, ideally one-to-one, alternating. A clean riffle is reckoned by the absence of clumps — three or more cards from one half landing together is a fault.",
    origin:
      "The riffle, like most card techniques, was perfected in the riverboats and gambling parlours of the nineteenth-century Mississippi, then borrowed by mathematicians who proved that seven shuffles are enough to thoroughly mix a deck (Bayer & Diaconis, 1992).",
    protocol: [
      "Cut the deck into two near-equal halves on a table.",
      "Hold each half at the short edge with thumb on top, fingers below.",
      "Draw the halves toward each other so the corners overlap.",
      "Release with the thumbs at equal speed; the weight is in the wrists, not the fingers.",
      "Bridge the cards by lifting the long edges and letting them fall."
    ],
    marginalia:
      "Seven is the magic number. Less is luck; more is theatre. — Diaconis",
    placeholder: "0–20"
  },
  "knuckle-roll": {
    title: "The Knuckle Roll of a Coin",
    unit: "rolls in thirty seconds",
    description:
      "A single coin walks across the back of the hand, knuckle by knuckle, on its edge. The coin must not stop. The hand must not tilt. A two-euro piece, a half-dollar, a fifty-pence — any heavy coin will do; copper is too light to carry the lesson.",
    origin:
      "Magicians call it the steeplechase or the muscle-pass. It originated, like most coin work, with eighteenth-century European street performers, and was domesticated for the parlour by the great American conjuror T. Nelson Downs.",
    protocol: [
      "Place the coin on the index knuckle, edge up.",
      "Tilt to roll it onto the middle knuckle, then the ring.",
      "Catch it at the little finger with the thumb beneath.",
      "Return it to the index from underneath.",
      "Practise in a coat pocket; the failure is silent."
    ],
    marginalia:
      "The coin is not your enemy. It is only heavier than you remember.",
    placeholder: "e.g. 24"
  },
  "plank": {
    title: "The Hold of the Plank",
    unit: "seconds held",
    description:
      "Forearms on the floor, shoulders directly over elbows, body a single line from heel to crown. Held for time. The art is not duration but quality: the moment the line breaks, the test is over, even if your stopwatch has not noticed.",
    origin:
      "Yogic isometric postures of this family are at least two thousand years old. The 'plank' as a measured fitness test enters Western training journals in the 1980s through gymnastic and military sources.",
    protocol: [
      "Set the elbows under the shoulders. Spread the fingers.",
      "Tuck the pelvis half a degree. The lower back must not yawn.",
      "Press the forearms down; do not let them rest.",
      "Breathe through the nose; six-count in, six-count out.",
      "End the hold the instant the line softens. Honesty is the test."
    ],
    marginalia:
      "It is the silent muscles that hold up the loud ones.",
    placeholder: "e.g. 90"
  },
  "breath-hold": {
    title: "The Single Static Breath-Hold (Dry)",
    unit: "seconds held",
    warning:
      "Practise on dry land only, seated, never near or in water, and not after large meals. Stop at the first urge to breathe; the urge is information, not weakness.",
    description:
      "Sat upright, lungs comfortably full, the airway closed at the throat. Time begins. The first urge to breathe arrives as a contraction in the diaphragm; it is to be observed, not obeyed, until it grows three times stronger — then released.",
    origin:
      "The Ama divers of Japan and the Haenyeo of Jeju island have for centuries practised long static apneas on land before and after their working dives. The modern figures (eight, ten, eleven minutes) belong to athletes; for the amateur, two minutes is a wonder, three a quiet astonishment.",
    protocol: [
      "Sit. Two minutes of slow nasal breathing first.",
      "A final breath: not maximal, but full and easy.",
      "Close the throat softly. Begin the timer.",
      "When the diaphragm twitches, count contractions; do not chase distance.",
      "Release before discomfort becomes alarm. The practice is in the calm, not the seconds."
    ],
    marginalia:
      "The lung learns by being trusted, not chased.",
    placeholder: "e.g. 75"
  },
  "paper-throw": {
    title: "The Crumpled-Page Throw",
    unit: "hits in ten attempts",
    description:
      "Crumple a sheet of A4 to a tight ball. Stand three paces from the bin. Throw underarm. Score one for each ball that lands and remains. The trial is ten balls, each a separate decision.",
    origin:
      "The skill is not basketball, which is performed under defenders and a clock. It is closer to pétanque or to lawn bowls: a still target, a still thrower, the body permitted to settle between attempts.",
    protocol: [
      "Take three measured paces from the bin. Mark the spot.",
      "Crumple each ball with the same force; weight should be uniform.",
      "Eyes on the rim, not the bin.",
      "A long, soft arc; the elbow leads, the wrist follows.",
      "Discard the previous result before the next throw."
    ],
    marginalia:
      "The basket is patient. So should you be.",
    placeholder: "0–10"
  },
  "italic-hand": {
    title: "The Italic Hand",
    unit: "self-rated legibility, zero to ten",
    description:
      "A slightly inclined cursive of italian humanist origin, designed for legibility at speed. Each minuscule a single, decisive stroke; the joins narrow rather than looped. Sit, ink the nib, and write a single line of nineteen letters: 'the quick brown fox jumps over the lazy dog'.",
    origin:
      "Niccolò Niccoli, a Florentine humanist of the early fifteenth century, devised the hand for the rapid copying of classical manuscripts. By the sixteenth century the great writing master Ludovico degli Arrighi had codified it in the first printed handwriting manual, La Operina, 1522.",
    protocol: [
      "A pen with a slight chisel — italic 1.1mm or a stub fountain.",
      "Hold the pen at forty-five degrees to the line.",
      "Slope the hand five degrees forward, no more.",
      "Each letter a single stroke, ending at the next letter's beginning.",
      "Loop nothing. Lift seldom. Let the line breathe."
    ],
    marginalia:
      "Scribere semper currens. — Arrighi, La Operina",
    placeholder: "your verdict"
  },
  "needle-thread": {
    title: "Threading the Needle",
    unit: "seconds to first thread",
    description:
      "A standard sewing needle, eye number nine. A length of cotton thread. The hand at rest, the breath shallow, the eyes a little farther from the needle than feels natural. Time begins when the thread first touches the eye and ends when it has passed cleanly through.",
    origin:
      "The threading of needles is the canonical example, in Buddhist scripture, of an action requiring complete and quiet attention. In the Anguttara Nikaya it serves as a parable: the steady hand is the steady mind.",
    protocol: [
      "Cut the thread on a sharp angle.",
      "Wet the cut between the lips; the fibres compress.",
      "Hold the needle at the same height as the heart.",
      "Bring thread to needle, not needle to thread.",
      "Breathe out as the eye approaches."
    ],
    marginalia:
      "The needle is a small calm. The thread is a small intention.",
    placeholder: "e.g. 4.2"
  },
  "pen-spin": {
    title: "The Pen Spin Around the Thumb",
    unit: "spins in thirty seconds",
    description:
      "A pen, balanced between index and middle finger, is propelled by a small impulse of the index. It rotates once around the thumb and is caught between middle and ring. The catch is the discipline; the spin is only the announcement.",
    origin:
      "Known to bored students of every nation, the move was formalised in Japanese high schools in the 1980s and given the name 'thumb around', one of the four foundational tricks of pen-spinning, alongside the sonic, the charge, and the fingerpass.",
    protocol: [
      "A pen of even weight; cap on. A heavier pen learns sooner.",
      "Grip between index and middle, with the thumb behind, lightly.",
      "Push with the index; the wrist remains still.",
      "Let the pen complete the orbit before reaching for it.",
      "The catch is between middle and ring — practise the catch alone first."
    ],
    marginalia:
      "Boredom, given a small task, becomes art.",
    placeholder: "e.g. 18"
  }
};

/* ──────────────────────── Italian ──────────────────────── */

window.UI.it = {
  /* navigation */
  nav_codex: "codice",
  nav_ledger: "registro",
  nav_rite: "rito quotidiano",
  nav_colophon: "colophon",
  lang_label: "lingua",

  /* common buttons / labels */
  btn_record: "registra",
  btn_record_reading: "registra rilevazione",
  btn_again: "di nuovo",
  btn_begin: "inizia",
  btn_start: "avvia",
  btn_stop: "ferma",
  btn_pause: "pausa",
  btn_resume: "riprendi",
  btn_reset: "azzera",
  btn_score: "valuta",
  btn_play: "ascolta",
  btn_done: "fatto",
  btn_erase_ledger: "cancella il registro",
  btn_export_text: "esporta come testo",
  btn_hide_recall: "nascondi e ricorda",
  btn_start_reading: "inizia a leggere",
  btn_start_min: "avvia {min} min",
  remove_label: "elimina rilevazione",

  /* common */
  note_optional: "nota (facoltativa)",
  placeholder_value: "valore",
  result_label: "risultato: ",
  back_to_codex: "← codice",
  article_prefix: "Articolo ",

  /* rule labels */
  rule_index: "l'indice",
  rule_order: "l'ordine",
  rule_description: "descrizione",
  rule_origin: "origine",
  rule_protocol: "protocollo",
  rule_calibration: "calibrazione",
  rule_readings: "rilevazioni",

  /* atelier */
  atelier_an_art: "un'arte {cat} · calibrata in {unit}",
  atelier_warning_tag: "AVVERTENZA",
  atelier_enter_reading: "Inserisci la rilevazione in {unit}. Premi registra quando sei pronto.",

  /* chart */
  chart_empty: "nessuna calibrazione ancora",
  chart_improving: "↗ in miglioramento",
  chart_steady: "→ costante",
  chart_drifting: "↘ in deriva",
  chart_over_n: " su {n} rilevazioni",

  /* ledger */
  ledger_title: "Il Registro",
  ledger_blurb: "Tutte le calibrazioni registrate, in ordine cronologico inverso. Il registro è l'unica storia.",
  ledger_empty: "Nessuna calibrazione ancora. Apri un articolo del codice ed esegui il suo test.",
  ledger_unknown: "(abilità sconosciuta)",
  ledger_erase_confirm: "Cancellare ogni calibrazione registrata? L'operazione non è reversibile.",
  ledger_summary: "{total} rilevazioni in {touched} articoli · prima voce {since}",

  /* daily rite */
  rite_title: "Il Rito Quotidiano",
  rite_blurb: "Tre articoli estratti dal codice per oggi. Gli stessi tre su qualunque dispositivo, per questa data; domani saranno altri tre.",
  rite_foot: "Cinque minuti per articolo. Quindici minuti ben spesi. Apri ciascun articolo per eseguire la calibrazione e registrare una rilevazione.",
  rite_done_today: "✓ una rilevazione è stata registrata oggi",
  rite_ordinals: ["i.", "ii.", "iii."],

  /* colophon */
  colophon_title: "Colophon",
  colophon_tech: "Composto in JetBrains Mono ed EB Garamond. Stampato nel browser, custodito nel browser. Tutte le rilevazioni vivono in localStorage e non lasciano mai questo dispositivo. Niente account, niente server, niente analytics. Codice sorgente su ",
  colophon_source_text: "github.com/pezzaliapp/skillapp",
  colophon_source_period: ".",

  /* not found */
  not_found_title: "Articolo non trovato",
  not_found_blurb: "Torna al codice.",

  /* footer */
  foot_impressum: "impressum: una stampa privata",

  /* document titles */
  title_codex: "SKILLAPP — Codice delle Arti Minori",
  title_ledger: "SKILLAPP — Registro",
  title_rite: "SKILLAPP — Rito Quotidiano",
  title_colophon: "SKILLAPP — Colophon",
  title_atelier: "SKILLAPP — {title}",

  /* meta */
  meta_description: "Un manuale tipografico per la pratica deliberata di piccole, specifiche abilità umane.",

  /* dates */
  months_short: ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],
  months_long:  ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],
  days_short:   ["dom","lun","mar","mer","gio","ven","sab"],
  days_long:    ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
  date_long:    "{dow} {day} {month} {year}",

  /* widgets — mental multiplication */
  w_mental_help: "Cinque problemi. Digita ogni risposta e premi Invio. Il cronometro parte quando appare il primo problema.",
  w_mental_problem: "problema {i} di {n}",
  w_mental_finish: "{c} corretti su {n} in {s} secondi.",
  w_mental_note: "{c}/{n} corretti",

  /* widgets — Major system */
  w_major_help: "Appariranno dieci cifre casuali. Studiale. Quando sei pronto, nascondile e digita ciò che ricordi.",
  w_major_compose: "Componi le immagini. Quando sei pronto, nascondi e ricorda.",
  w_major_type_order: "Digita le cifre nell'ordine.",
  w_major_finish: "{c} cifre su {n} nella posizione corretta.",
  w_major_shown_typed: "mostrate: {shown} · digitate: {typed}",
  w_major_dash: "—",
  w_major_note: "su {n}",

  /* widgets — doomsday */
  w_doom_help: "Cinque date casuali. Scegli il giorno della settimana. Il cronometro misura l'intera serie.",
  w_doom_date: "data {i} di {n}",
  w_doom_finish: "{c} corrette su {n} in {s}s.",
  w_doom_note_elapsed: "{s}s trascorsi",

  /* widgets — one minute */
  w_one_help: "Premi avvia. Aspetta finché ti sembra sia passato un minuto. Premi ferma.",
  w_one_instruction: "non contare. Ascolta l'orologio del corpo.",
  w_one_finish_long: "ti sei fermato a {elapsed}s · errore +{error}s",
  w_one_finish_short: "ti sei fermato a {elapsed}s · errore −{error}s",
  w_one_note_long: "lungo · fermato a {s}s",
  w_one_note_short: "corto · fermato a {s}s",

  /* widgets — clock */
  w_clock_help: "Dieci quadranti casuali. Digita l'ora come 'h:mm' (formato dodici ore). Il cronometro misura l'intera serie.",
  w_clock_face: "quadrante {i} di {n}",
  w_clock_placeholder: "h:mm",
  w_clock_finish: "{c} su {n} in {s}s.",
  w_clock_note: "{c}/{n} corretti (±1 min tollerato)",

  /* widgets — pitch */
  w_pitch_help: "Dieci intervalli. Suoneranno due note. Scegli l'intervallo. Riascolta quando vuoi. L'audio usa il sintetizzatore del browser — alza il volume con delicatezza.",
  w_pitch_interval: "intervallo {i} di {n}",
  w_pitch_finish: "{c} corretti su {n}.",
  w_pitch_note: "su {n}",
  w_pitch_intervals: ["terza minore", "terza maggiore", "quarta giusta", "quinta giusta", "ottava"],

  /* widgets — reading pace */
  w_read_help: "Leggi il brano ad alta voce, con calma, al ritmo di un lettore da leggio. Premi avvia quando inizi e ferma quando arrivi all'ultima parola. ({words} parole.)",
  w_read_passage: (
    "L'avvocato Utterson era un uomo dal volto rude, che un sorriso non rischiarò " +
    "mai; freddo, scarno, impacciato nei discorsi; ritroso nei sentimenti; magro, " +
    "lungo, polveroso, tetro, e tuttavia in qualche modo amabile. Negli incontri " +
    "tra amici, e quando il vino era di suo gusto, qualcosa di eminentemente " +
    "umano si accendeva nel suo sguardo; qualcosa che invero non trovava mai la " +
    "via dei suoi discorsi, ma che parlava non solo in quei muti segnali del volto " +
    "dopo cena, ma più spesso e più forte negli atti della sua vita. Era austero " +
    "con se stesso; quando era solo beveva gin, per mortificare il gusto dei vini " +
    "d'annata; e benché amasse il teatro, non ne aveva varcato la soglia per " +
    "vent'anni. Aveva tuttavia una tolleranza accertata per gli altri; talvolta si " +
    "stupiva, quasi con invidia, dell'alta pressione di spiriti che si sprigionava " +
    "nei loro misfatti; e in qualunque circostanza estrema era incline ad aiutare " +
    "anziché a riprovare. 'Inclino all'eresia di Caino,' diceva pittorescamente; " +
    "'lascio andare mio fratello al diavolo per la sua propria strada.'"
  ),
  w_read_attribution: "Robert Louis Stevenson, 'Lo strano caso del dottor Jekyll e del signor Hyde', 1886. Traduzione.",
  w_read_finish: "{words} parole in {s}s · {wpm} ppm",
  w_read_note_elapsed: "{s}s trascorsi",

  /* widgets — circle */
  w_circle_help: "Disegna il cerchio sulla carta. Allontanati di tre passi. Poi giudicalo onestamente.",
  w_circle_verdict: "il tuo verdetto: ",
  w_circle_out_of: " / 10"
};

window.META.it = {
  edition: "MMXXVI",
  title: "Codice delle Arti Minori",
  subtitle: "per la pratica deliberata di piccole, specifiche abilità umane",
  preface:
    "Questa è una stampa privata. Diciassette arti minori sono qui raccolte, ciascuna scelta perché modesta nella portata, antica nelle origini e ostinatamente corporea. Nessuna di esse ti farà guadagnare uno stipendio. Tutte, praticate per dieci minuti al giorno, riorganizzeranno una piccola porzione del tuo sistema nervoso nel giro di una stagione.",
  invocation:
    "Leggi l'articolo. Esegui la calibrazione. Lascia che il corpo impari ciò che il corpo impara. Torna alla pagina solo dopo aver praticato.",
  attribution:
    "Compilato nella primavera del MMXXVI, dietro i manuali di Erasmo, i taccuini di Leonardo, i protocolli di Anders Ericsson, le marginalia di Italo Calvino — e la pazienza delle proprie mani.",
  categories: {
    mind:  "della mente",
    eye:   "dell'occhio",
    ear:   "dell'orecchio",
    voice: "della voce",
    hand:  "della mano",
    body:  "del corpo"
  }
};

/* Italian skill text — titles, units, placeholders.
   Bodies (description, origin, protocol, marginalia, warning) are
   added in the next commit. Until then, those fall back to English. */

window.SKILL_TEXT.it = {
  "mental-mult": {
    title: "La Moltiplicazione Mentale di Numeri a Due Cifre",
    unit: "secondi per cinque problemi"
  },
  "major-system": {
    title: "Il Sistema di Major per Memorizzare le Cifre",
    unit: "cifre ricordate (su dieci)"
  },
  "doomsday": {
    title: "Il Giorno della Settimana di una Data Qualunque",
    unit: "corrette in sessanta secondi"
  },
  "one-minute": {
    title: "La Stima di un Minuto a Sensazione",
    unit: "secondi di errore"
  },
  "clock-read": {
    title: "La Lettura Veloce del Quadrante Analogico",
    unit: "secondi per dieci quadranti"
  },
  "pitch-intervals": {
    title: "Il Riconoscimento degli Intervalli Musicali",
    unit: "corretti su dieci"
  },
  "reading-pace": {
    title: "La Lettura ad Alta Voce a Duecento Parole al Minuto",
    unit: "parole al minuto"
  },
  "freehand-circle": {
    title: "Il Cerchio a Mano Libera",
    unit: "autovalutazione, da zero a dieci"
  },
  "bowline": {
    title: "Il Nodo Bolina del Marinaio",
    unit: "secondi, a occhi chiusi",
    placeholder: "es. 6.5"
  },
  "riffle-shuffle": {
    title: "Il Mischio a Pioggia",
    unit: "mischi puliti su venti",
    placeholder: "0–20"
  },
  "knuckle-roll": {
    title: "La Camminata della Moneta sulle Nocche",
    unit: "rotazioni in trenta secondi",
    placeholder: "es. 24"
  },
  "plank": {
    title: "La Tenuta del Plank",
    unit: "secondi tenuti",
    placeholder: "es. 90"
  },
  "breath-hold": {
    title: "L'Apnea Statica a Secco",
    unit: "secondi tenuti",
    placeholder: "es. 75"
  },
  "paper-throw": {
    title: "Il Tiro della Pagina Accartocciata",
    unit: "centri su dieci tentativi",
    placeholder: "0–10"
  },
  "italic-hand": {
    title: "La Scrittura Corsiva Italica",
    unit: "leggibilità autovalutata, da zero a dieci",
    placeholder: "il tuo verdetto"
  },
  "needle-thread": {
    title: "Infilare l'Ago",
    unit: "secondi al primo infilato",
    placeholder: "es. 4.2"
  },
  "pen-spin": {
    title: "La Rotazione della Penna Attorno al Pollice",
    unit: "rotazioni in trenta secondi",
    placeholder: "es. 18"
  }
};
