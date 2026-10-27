// 64 bars, 4/4, quarter note = 100 BPM.
// Concert pitches use enharmonic spellings that Strudel understands:
// G# major = Ab major, E# minor = F minor, D# major = Eb major.
setcpm(25)

const harmony = [
  "[g#3,c4,d#4]",      // 01 G# (I)
  "[c#4,f4,g#4]",      // 02 C# (IV)
  "[d#3,g3,a#3,c#4]", // 03 D#7 (V7)
  "[g#3,c4,d#4]",      // 04 G# (I)
  "[f3,g#3,c4]",       // 05 E#m (vi)
  "[c3,e3,g3,a#3]",   // 06 B#7 / C7 (V7 of E#m)
  "[f3,g#3,c4]",       // 07 E#m (new center)
  "[a#3,d4,f4,g#4]",  // 08 A#7 (V7 of D#)
  "[d#4,g4,a#4]",      // 09 D# (new center)
  "[d#4,g4,a#4]",      // 10 D# (climax)
  "[d#3,g3,a#3,c#4]", // 11 D#7 (V7 of G#)
  "[g#3,c4,d#4]",      // 12 G# (home)
  "[f3,g#3,c4]",       // 13 E#m (vi)
  "[c#4,f4,g#4]",      // 14 C# (IV)
  "[d#3,g3,a#3,c#4]", // 15 D#7 (V7)
  "[g#3,c4,d#4]"       // 16 G# (I)
]

const bass = [
  "g#1 ~ ~ d#2 ~ ~ d#2 ~", "c#2 ~ ~ g#1 ~ ~ g#1 ~",
  "d#2 ~ ~ a#1 ~ ~ a#1 ~", "g#1 ~ ~ d#2 ~ ~ d#2 ~",
  "f1 ~ ~ c2 ~ ~ c2 ~", "c2 ~ ~ g1 ~ ~ g1 ~",
  "f1 ~ ~ c2 ~ c2 ~ c2", "a#1 ~ ~ f2 ~ ~ f2 ~",
  "d#2 ~ ~ a#1 ~ ~ a#1 ~", "d#2 ~ a#2 ~ d#3 ~ a#2 ~",
  "d#2 ~ ~ a#1 ~ ~ a#1 ~", "g#1 ~ ~ d#2 ~ ~ d#2 ~",
  "f1 ~ ~ c2 ~ ~ c2 ~", "c#2 ~ ~ g#1 ~ ~ g#1 ~",
  "d#2 ~ ~ a#1 ~ ~ a#1 ~", "g#1 ~ ~ ~ ~ ~ ~ ~"
]

const violin = [
  "~", "~", "~", "d#5 ~ c5 ~",
  "c5 ~ g#4 ~", "c5 d5 e5 d5", "c5 ~ g#4 c5", "d5 f5 g#5 f5",
  "g5 f5 d#5 f5", "g5 a#5 g5 f5", "f5 ~ d#5 ~", "c5 ~ g#4 ~",
  "g#4 ~ ~ ~", "c#5 ~ c5 ~", "a#4 ~ g4 ~", "g#4 ~ ~ ~"
]

const violinLevel = [
  0, 0, 0, .27, .31, .37, .43, .55,
  .68, .85, .48, .35, .22, .27, .22, .2
]

// Four 16-bar arcs. Bar 32 begins the staccato crescendo;
// bar 40 (64 * 0.618 = 39.55) is the golden-section peak.
const h64 = [...harmony, ...harmony, ...harmony, ...harmony]
const b64 = [...bass, ...bass, ...bass, ...bass]
const v64 = [...violin, ...violin, ...violin, ...violin]
v64[31] = "g#5 ~ a#5 ~ g#5 ~ f5 ~" // bar 32, staccato, mp
const climb = [
  "c5 ~ d#5 ~ g#5 ~ f5 ~", "d#5 ~ f5 ~ g#5 ~ a#5 ~",
  "f5 ~ g#5 ~ a#5 ~ g#5 ~", "g#5 ~ a#5 ~ g#5 ~ f5 ~",
  "d#5 f5 g#5 a#5", "f5 g#5 a#5 c6",
  "g#5 a#5 c6 a#5", "a#5 c6 d#6 c6"
]
const fade = [
  "c6 ~ a#5 ~", "a#5 ~ g#5 ~", "g#5 ~ f5 ~", "f5 ~ d#5 ~",
  "d#5 ~ c5 ~", "c5 ~ g#4 ~", "g#4 ~ f4 ~", "g#4 ~ ~ ~"
]
for (let i = 0; i < 8; i++) {
  v64[32 + i] = climb[i]  // bars 33-40: crescendo and ornaments
  v64[40 + i] = fade[i]   // bars 41-48: legato diminuendo
}
const violinLevel64 = v64.map((_, i) => {
  if (i < 16) return violinLevel[i]
  if (i < 31) return .32
  if (i === 31) return .4        // mezzo-piano at bar 32
  if (i < 40) return .46 + (i - 32) * .06
  if (i < 48) return .72 - (i - 40) * .065
  return violinLevel[i - 48] * .7
})
const glitch = Array(64).fill("~")
for (let i = 31; i < 48; i++) {
  glitch[i] = i % 2 ? "[~ g#5] ~ ~ ~" : "~ [~ d#5] ~ ~"
}

stack(
  arrange(...h64.map(chord => [1, note(chord)]))
    .sound("piano").gain(.28),
  arrange(...b64.map((bar, i) => [1, note(bar).clip(i === 31 ? .18 : .65)]))
    .sound("gm_acoustic_bass").gain(.65),
  arrange(...v64.map((bar, i) => [1,
    note(bar).gain(violinLevel64[i]).clip(i >= 31 && i < 40 ? .18 : i < 48 ? .95 : .7)
  ])).sound("gm_violin"),
  arrange(...glitch.map(bar => [1, note(bar)]))
    .sound("square").clip(.08).crush(6).delay(.2).gain(.08),
  sound("bd ~ ~ ~ bd ~ ~ ~")
    .bank("RolandTR808").gain(.35),
  note("g#4 ~ ~ d#5 ~ ~ ~ ~")
    .sound("triangle").gain(sine.range(.03,.17).slow(4))
    .lpf("<500 1200 2200 800>/4").room(.6),
  sound("~ hh ~ [~ hh] ~ hh ~ [~ hh]")
    .crush(6).delay(.2).gain(.07)
)
