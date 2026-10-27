// Study score transcribed from the saved animation data.
// 16 bars in 2/4; this melody layer is not the original full audio renderer.
// At quarter note = 100 BPM, one 2/4 bar lasts 1.2 seconds.
setcpm(50)

const bars = [
  "~", "~", "~", "~", "~", "~", "~",
  "b4 c#5 d#5 c#5",
  "b4 d#5 f#5 d#5",
  "d#5 f#5 g#5 f#5",
  "b4 ~ g#4 ~",
  "b4 ~ g#4 ~",
  "b4 ~ g#4 ~",
  "~", "~", "~"
]

arrange(...bars.map(bar => [1, note(bar)])).sound("piano")
