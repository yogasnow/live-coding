// 128 bars, 4/4, quarter = 100 BPM. G# major -> E# minor -> G# major.
// Enharmonic spellings for Strudel: G# = Ab, E#m = Fm, D# = Eb.
setcpm(25)

const C = {
  I:  ["[g#3,c4,d#4]", "g#1", "d#2"],
  IV: ["[c#4,f4,g#4]", "c#2", "g#1"],
  V:  ["[d#3,g3,a#3,c#4]", "d#2", "a#1"],
  vi: ["[f3,g#3,c4]", "f1", "c2"],
  ii: ["[a#3,c#4,f4]", "a#1", "f2"],
  vM: ["[c3,e3,g3,a#3]", "c2", "g1"], // C7 -> Fm
  bVII: ["[d#4,g4,a#4]", "d#2", "a#1"]
}
const home = ["I","IV","V","I","vi","ii","V","I","IV","I","vi","IV","ii","V","V","I"]
const minor = ["vi","ii","vM","vi","IV","ii","vM","vi","vi","IV","ii","vM","vi","ii","vM","vi"]
const bridge = ["vi","ii","bVII","I","IV","ii","V","I"]
const finale = ["I","IV","vi","ii","V","I","IV","I","vi","IV","ii","V","I","IV","V","I"]
const form = [
  ...home, ...home, ...home,   // 1-48: home; bar 32 changes articulation
  ...minor, ...minor,           // 49-80: relative minor; peak at 80
  ...bridge,                   // 81-88: smooth return
  ...home, ...home.slice(0,8), // 89-112: reprise
  ...finale                    // 113-128: coda
]

const homeTune = [
  "~", "c#5 ~ c5 ~", "a#4 ~ g4 ~", "g#4 ~ ~ ~",
  "c5 ~ g#4 ~", "c#5 ~ f5 ~", "a#4 ~ g4 ~", "g#4 ~ ~ ~",
  "c5 d#5 f5 d#5", "g5 f5 d#5 c5", "a#4 ~ g4 ~", "g#4 ~ ~ ~",
  "c5 ~ g#4 ~", "f5 ~ c#5 ~", "a#4 ~ g4 ~", "g#4 ~ ~ ~"
]
const minorTune = [
  "c5 ~ g#4 ~", "a#4 ~ c#5 ~", "e5 ~ d5 ~", "f5 ~ c5 ~",
  "g#4 c#5 f5 c#5", "a#4 ~ f5 ~", "e5 g5 e5 c5", "f5 ~ ~ ~",
  "c5 d#5 f5 g#5", "f5 ~ c#5 ~", "a#4 c#5 f5 c#5", "e5 ~ g5 ~",
  "f5 g#5 c6 g#5", "a#5 ~ f5 ~", "g5 a#5 c6 a#5", "c6 d#6 c6 g#5"
]
const h = form.map(k => C[k][0])
const bass = form.map((k, i) => {
  const [, root, fifth] = C[k]
  return i === 127 ? `${root} ~ ~ ~ ~ ~ ~ ~` :
    `${root} ~ ~ ${fifth} ~ ~ ${fifth} ~`
})
const violin = form.map((_, i) =>
  i >= 48 && i < 80 ? minorTune[(i - 48) % 16] : homeTune[i % 16])
violin[31] = "g#5 ~ a#5 ~ g#5 ~ f5 ~" // bar 32: staccato, mp

const level = form.map((_, i) => {
  if (i === 31) return .4
  if (i >= 32 && i < 40) return .44 + (i - 32) * .04
  if (i >= 72 && i < 80) return .5 + (i - 72) * .06
  if (i >= 80 && i < 96) return .75 - (i - 80) * .035
  if (i >= 112) return .5 - (i - 112) * .023
  return i < 16 ? .28 : .38
})
const waves = form.map((_, i) =>
  i % 4 === 3 ? "g#4 ~ d#5 ~" : "~")
const glitch = form.map((_, i) =>
  i >= 80 && i < 96 || i >= 112 ?
    (i % 2 ? "[~ g#5] ~ ~ ~" : "~ [~ d#5] ~ ~") : "~")

stack(
  arrange(...h.map(x => [1, note(x)])).sound("piano").gain(.25),
  arrange(...bass.map((x, i) => [1, note(x).clip(i === 31 ? .18 : .65)]))
    .sound("gm_acoustic_bass").gain(.65),
  arrange(...violin.map((x, i) => [1,
    note(x).gain(level[i]).clip(i >= 31 && i < 40 ? .18 : .92)
  ])).sound("gm_violin"),
  arrange(...waves.map((x, i) => [1,
    note(x).gain(i >= 112 ? .18 * (128 - i) / 16 : .2)
  ]))
    .sound("triangle").lpf("<600 1200 2000 850>/4").room(.6),
  arrange(...glitch.map((x, i) => [1,
    note(x).gain(i >= 112 ? .12 * (128 - i) / 16 : .1)
  ])).sound("square").clip(.08).crush(6).delay(.2)
)
