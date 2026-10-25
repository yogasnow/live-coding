setcpm(25)

stack(
  arrange(
    [48, note("<[g#3,c4,d#4] [c#4,f4,g#4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [f3,g#3,c4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4]>")],
    [16, note("<[g#3,c4,d#4] [c#4,f4,g#4] [f3,g#3,c4] [a#3,c#4,f4] [d#3,g3,a#3,c#4] [g#3,c4,d#4] [c#4,f4,g#4] [g#3,c4,d#4]>")]
  ).sound("piano").gain(.25),

  arrange(
    [48, note("<g#1 c#2 d#2 g#1 f1 a#1 d#2 g#1>").struct("x ~ ~ x ~ ~ x ~")],
    [16, note("<g#1 c#2 f1 a#1 d#2 g#1 c#2 g#1>").struct("x ~ ~ x ~ ~ x ~")]
  ).sound("gm_acoustic_bass").gain(.65),

  arrange(
    [31, note("c5 ~ g#4 ~").gain(.3)],
    [1, note("g#5 ~ a#5 ~").clip(.18).gain(.4)],
    [8, note("d#5 f5 g#5 a#5").clip(.18).gain("<.45 .5 .55 .6 .65 .7 .75 .8>")],
    [8, note("g#5 ~ f5 ~").clip(.95).gain("<.7 .65 .6 .55 .5 .45 .4 .35>")],
    [16, note("c5 ~ g#4 ~").clip(.9).gain(.28)]
  ).sound("gm_violin"),

  sound("bd ~ ~ ~ bd ~ ~ ~").bank("RolandTR808").gain(.35),
  note("g#4 ~ ~ d#5 ~ ~ ~ ~").sound("triangle")
    .gain(sine.range(.03,.17).slow(4))
    .lpf("<500 1200 2200 800>/4").room(.6),
  arrange(
    [31, sound("~")],
    [17, sound("~ hh ~ [~ hh] ~ hh ~ [~ hh]").gain(.07)],
    [16, sound("~ hh ~ ~ ~ ~ ~ ~").gain("<.06 .055 .05 .045 .04 .035 .03 .025 .02 .018 .016 .014 .012 .01 .008 .005>")]
  ).crush(6).delay(.2)
)
