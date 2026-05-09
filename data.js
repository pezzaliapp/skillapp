/* SKILLAPP — A Codex of Minor Arts
   data layer: the contents of the manual.

   Each entry describes one minor art: a small, measurable, specific
   human skill that can be cultivated by ten focused minutes a day.
   The codex is opinionated. It is not a checklist. */

window.CODEX_META = {
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
    mind: "of the mind",
    eye: "of the eye",
    ear: "of the ear",
    voice: "of the voice",
    hand: "of the hand",
    body: "of the body"
  }
};

window.SKILLS = [
  /* ──────────────────────────── I ──────────────────────────── */
  {
    id: "mental-mult",
    numeral: "I",
    title: "Mental Multiplication of Two-Digit Numbers",
    category: "mind",
    glyph: "×",
    unit: "seconds for five problems",
    lowerIsBetter: true,
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
      "There are no calculations, only the rhythm of attention. — after Calvino",
    calibration: { type: "mentalMult" }
  },

  /* ─────────────────────────── II ──────────────────────────── */
  {
    id: "major-system",
    numeral: "II",
    title: "The Major System for Memorising Digits",
    category: "mind",
    glyph: "✦",
    unit: "digits recalled (out of ten)",
    lowerIsBetter: false,
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
      "Memory is a meadow that mows itself unless walked upon. — anonymous",
    calibration: { type: "majorSystem" }
  },

  /* ────────────────────────── III ──────────────────────────── */
  {
    id: "doomsday",
    numeral: "III",
    title: "The Day of the Week of Any Date",
    category: "mind",
    glyph: "☉",
    unit: "correct in sixty seconds",
    lowerIsBetter: false,
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
      "Time is a wheel. The teeth fit always. — Conway, paraphrased",
    calibration: { type: "doomsday" }
  },

  /* ────────────────────────── IV ───────────────────────────── */
  {
    id: "one-minute",
    numeral: "IV",
    title: "The Estimation of One Minute by Feel",
    category: "mind",
    glyph: "⏲",
    unit: "seconds of error",
    lowerIsBetter: true,
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
      "Counting is cheating. Feel the minute. — Cousteau diving manual, 1953",
    calibration: { type: "oneMinute" }
  },

  /* ────────────────────────── V ────────────────────────────── */
  {
    id: "clock-read",
    numeral: "V",
    title: "Reading the Analogue Clock at Speed",
    category: "eye",
    glyph: "◐",
    unit: "seconds for ten faces",
    lowerIsBetter: true,
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
      "The clock is honest, only impatient. — schoolroom motto, England",
    calibration: { type: "clockRead" }
  },

  /* ────────────────────────── VI ───────────────────────────── */
  {
    id: "pitch-intervals",
    numeral: "VI",
    title: "The Recognition of Musical Intervals",
    category: "ear",
    glyph: "♪",
    unit: "correct out of ten",
    lowerIsBetter: false,
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
      "The ear is taught by the throat. — Zoltán Kodály",
    calibration: { type: "pitchInterval" }
  },

  /* ────────────────────────── VII ──────────────────────────── */
  {
    id: "reading-pace",
    numeral: "VII",
    title: "Reading Aloud at Two Hundred Words per Minute",
    category: "voice",
    glyph: "❡",
    unit: "words per minute",
    lowerIsBetter: false,
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
      "Read as if to a child sitting on the far side of a small fire. — anonymous, c. 1880",
    calibration: { type: "readingPace" }
  },

  /* ────────────────────────── VIII ─────────────────────────── */
  {
    id: "freehand-circle",
    numeral: "VIII",
    title: "The Freehand Circle",
    category: "hand",
    glyph: "○",
    unit: "self-rated, zero to ten",
    lowerIsBetter: false,
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
      "Tondo come un O di Giotto. — Vasari, Vite, 1568",
    calibration: { type: "circleSelfRate" }
  },

  /* ────────────────────────── IX ───────────────────────────── */
  {
    id: "bowline",
    numeral: "IX",
    title: "The Sailor's Bowline",
    category: "hand",
    glyph: "⌘",
    unit: "seconds, eyes closed",
    lowerIsBetter: true,
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
    calibration: { type: "manual", inputUnit: "seconds", placeholder: "e.g. 6.5" }
  },

  /* ────────────────────────── X ────────────────────────────── */
  {
    id: "riffle-shuffle",
    numeral: "X",
    title: "The Riffle Shuffle",
    category: "hand",
    glyph: "♠",
    unit: "clean shuffles out of twenty",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "clean shuffles", placeholder: "0–20" }
  },

  /* ────────────────────────── XI ───────────────────────────── */
  {
    id: "knuckle-roll",
    numeral: "XI",
    title: "The Knuckle Roll of a Coin",
    category: "hand",
    glyph: "⨀",
    unit: "rolls in thirty seconds",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "rolls in 30s", placeholder: "e.g. 24" }
  },

  /* ────────────────────────── XII ──────────────────────────── */
  {
    id: "plank",
    numeral: "XII",
    title: "The Hold of the Plank",
    category: "body",
    glyph: "▬",
    unit: "seconds held",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "seconds", placeholder: "e.g. 90" }
  },

  /* ────────────────────────── XIII ─────────────────────────── */
  {
    id: "breath-hold",
    numeral: "XIII",
    title: "The Single Static Breath-Hold (Dry)",
    category: "body",
    glyph: "◌",
    unit: "seconds held",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "seconds", placeholder: "e.g. 75" }
  },

  /* ────────────────────────── XIV ──────────────────────────── */
  {
    id: "paper-throw",
    numeral: "XIV",
    title: "The Crumpled-Page Throw",
    category: "body",
    glyph: "▲",
    unit: "hits in ten attempts",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "hits in 10", placeholder: "0–10" }
  },

  /* ────────────────────────── XV ───────────────────────────── */
  {
    id: "italic-hand",
    numeral: "XV",
    title: "The Italic Hand",
    category: "hand",
    glyph: "✎",
    unit: "self-rated legibility, zero to ten",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "0–10", placeholder: "your verdict" }
  },

  /* ────────────────────────── XVI ──────────────────────────── */
  {
    id: "needle-thread",
    numeral: "XVI",
    title: "Threading the Needle",
    category: "hand",
    glyph: "⤳",
    unit: "seconds to first thread",
    lowerIsBetter: true,
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
    calibration: { type: "manual", inputUnit: "seconds", placeholder: "e.g. 4.2" }
  },

  /* ────────────────────────── XVII ─────────────────────────── */
  {
    id: "pen-spin",
    numeral: "XVII",
    title: "The Pen Spin Around the Thumb",
    category: "hand",
    glyph: "↻",
    unit: "spins in thirty seconds",
    lowerIsBetter: false,
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
    calibration: { type: "manual", inputUnit: "spins in 30s", placeholder: "e.g. 18" }
  }
];
