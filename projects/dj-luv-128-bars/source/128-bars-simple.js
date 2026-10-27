setcpm(25)

stack(
  // Chords: 48 home, 32 relative minor, 8 bridge, 24 reprise, 16 coda.
  arrange(
    [48, note("<[g#3,c4,d#4] [c#4,f4,g#4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [f3,g#3,c4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4]>")],
    [32, note("<[f3,g#3,c4] [a#3,c#4,f4] [c3,e3,g3,a#3] [f3,g#3,c4] [c#4,f4,g#4] [a#3,c#4,f4] [c3,e3,g3,a#3] [f3,g#3,c4]>")],
    [8, note("<[f3,g#3,c4] [a#3,c#4,f4] [d#4,g4,a#4] [g#3,c4,d#4] [c#4,f4,g#4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4]>")],
    [24, note("<[g#3,c4,d#4] [c#4,f4,g#4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [f3,g#3,c4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4]>")],
    [16, note("<[g#3,c4,d#4] [c#4,f4,g#4] [f3,g#3,c4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [c#4,f4,g#4] [g#3,c4,d#4] [f3,g#3,c4] [c#4,f4,g#4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [c#4,f4,g#4] [d#3,g3,a#3,c#4] [g#3,c4,d#4]>")]
  ).sound("piano").gain(.25),

  // Bass: eighth-note offbeats make the 4/4 syncopation.
  arrange(
    [48, note("<g#1 c#2 d#2 g#1 f1 a#1 d#2 g#1>").struct("x ~ ~ x ~ ~ x ~")],
    [32, note("<f1 a#1 c2 f1 c#2 a#1 c2 f1>").struct("x ~ ~ x ~ ~ x ~")],
    [8, note("<f1 a#1 d#2 g#1 c#2 a#1 d#2 g#1>").struct("x ~ ~ x ~ ~ x ~")],
    [24, note("<g#1 c#2 d#2 g#1 f1 a#1 d#2 g#1>").struct("x ~ ~ x ~ ~ x ~")],
    [16, note("<g#1 c#2 f1 a#1 d#2 g#1 c#2 g#1 f1 c#2 a#1 d#2 g#1 c#2 d#2 g#1>").struct("x ~ ~ x ~ ~ x ~")]
  ).sound("gm_acoustic_bass").gain(.6),

  // Violin: bar 32 starts staccato at mp; bar 80 is the main peak.
  arrange(
    [31, note("c5 ~ g#4 ~").gain(.3)],
    [1, note("g#5 ~ a#5 ~").clip(.18).gain(.4)],
    [8, note("d#5 f5 g#5 a#5").clip(.18).gain("<.45 .5 .55 .6 .65 .7 .75 .8>")],
    [8, note("g#5 ~ f5 ~").clip(.95).gain("<.7 .65 .6 .55 .5 .45 .4 .35>")],
    [24, note("c5 ~ g#4 ~").gain(.35)],
    [8, note("<c5 d#5 f5 g#5 a#5 c6 a#5 c6>").gain("<.5 .55 .6 .65 .7 .75 .8 .9>")],
    [16, note("c6 ~ g#5 ~").clip(.95).gain("<.75 .7 .65 .6 .55 .5 .45 .4 .35 .3 .28 .26 .24 .22 .2 .18>")],
    [16, note("c5 d#5 f5 d#5").gain(.38)],
    [16, note("g#5 ~ f5 ~").clip(.95).gain("<.5 .47 .44 .41 .38 .35 .32 .29 .26 .23 .2 .18 .16 .14 .12 .1>")]
  ).sound("gm_violin"),

  // Flickering waves and a quiet PsyGlitch afterglow.
  note("g#4 ~ d#5 ~").sound("triangle")
    .lpf("<600 1200 2000 850>/4").room(.6).gain(.08),
  arrange(
    [80, note("~")],
    [16, note("[~ g#5] ~ ~ ~").gain(.08)],
    [16, note("~")],
    [16, note("[~ d#5] ~ ~ ~").gain("<.1 .095 .09 .085 .08 .075 .07 .065 .06 .055 .05 .045 .04 .035 .03 .025>")]
  ).sound("square").clip(.08).crush(6).delay(.2)
)
