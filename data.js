/* SKILLAPP — A Codex of Minor Arts
   Structural data: identifiers, numerals, glyphs, categories, and
   calibration types for the seventeen articles. All translatable text
   (titles, descriptions, origins, protocols, marginalia, UI strings,
   codex meta) lives in i18n.js, keyed by locale. */

window.SKILLS = [
  { id: "mental-mult",     numeral: "I",     glyph: "×",  category: "mind",  lowerIsBetter: true,  hasWarning: false, calibration: { type: "mentalMult"     } },
  { id: "major-system",    numeral: "II",    glyph: "✦",  category: "mind",  lowerIsBetter: false, hasWarning: false, calibration: { type: "majorSystem"    } },
  { id: "doomsday",        numeral: "III",   glyph: "☉",  category: "mind",  lowerIsBetter: false, hasWarning: false, calibration: { type: "doomsday"       } },
  { id: "one-minute",      numeral: "IV",    glyph: "⏲",  category: "mind",  lowerIsBetter: true,  hasWarning: false, calibration: { type: "oneMinute"      } },
  { id: "clock-read",      numeral: "V",     glyph: "◐",  category: "eye",   lowerIsBetter: true,  hasWarning: false, calibration: { type: "clockRead"      } },
  { id: "pitch-intervals", numeral: "VI",    glyph: "♪",  category: "ear",   lowerIsBetter: false, hasWarning: false, calibration: { type: "pitchInterval"  } },
  { id: "reading-pace",    numeral: "VII",   glyph: "❡",  category: "voice", lowerIsBetter: false, hasWarning: false, calibration: { type: "readingPace"    } },
  { id: "freehand-circle", numeral: "VIII",  glyph: "○",  category: "hand",  lowerIsBetter: false, hasWarning: false, calibration: { type: "circleSelfRate" } },
  { id: "bowline",         numeral: "IX",    glyph: "⌘",  category: "hand",  lowerIsBetter: true,  hasWarning: false, calibration: { type: "manual"         } },
  { id: "riffle-shuffle",  numeral: "X",     glyph: "♠",  category: "hand",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } },
  { id: "knuckle-roll",    numeral: "XI",    glyph: "⨀",  category: "hand",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } },
  { id: "plank",           numeral: "XII",   glyph: "▬",  category: "body",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } },
  { id: "breath-hold",     numeral: "XIII",  glyph: "◌",  category: "body",  lowerIsBetter: false, hasWarning: true,  calibration: { type: "manual"         } },
  { id: "paper-throw",     numeral: "XIV",   glyph: "▲",  category: "body",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } },
  { id: "italic-hand",     numeral: "XV",    glyph: "✎",  category: "hand",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } },
  { id: "needle-thread",   numeral: "XVI",   glyph: "⤳",  category: "hand",  lowerIsBetter: true,  hasWarning: false, calibration: { type: "manual"         } },
  { id: "pen-spin",        numeral: "XVII",  glyph: "↻",  category: "hand",  lowerIsBetter: false, hasWarning: false, calibration: { type: "manual"         } }
];
