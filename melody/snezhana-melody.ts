type Note = { pitch: string; beats: number };
type Bar = {
  meter: "4/4" | "3/4" | "5/4";
  chord: string;
  harmony: string[];
  bassRoot: string;
  bassFifth: string;
  melody: Note[];
};

const n = (pitch: string, beats: number): Note => ({ pitch, beats });
const bars: Bar[] = [
  { meter:"4/4", chord:"C",   harmony:["C4","E4","G4"],    bassRoot:"C2", bassFifth:"G2", melody:[n("C4",1),n("D4",.5),n("E4",.5),n("D4",2)] },
  { meter:"4/4", chord:"Am",  harmony:["A3","C4","E4"],    bassRoot:"A1", bassFifth:"E2", melody:[n("C4",1),n("A3",1),n("C4",1),n("E4",1)] },
  { meter:"4/4", chord:"F",   harmony:["F3","A3","C4"],    bassRoot:"F1", bassFifth:"C2", melody:[n("A4",1),n("G4",.5),n("F4",.5),n("E4",2)] },
  { meter:"4/4", chord:"G",   harmony:["G3","B3","D4"],    bassRoot:"G1", bassFifth:"D2", melody:[n("D4",1),n("G4",1),n("F4",1),n("D4",1)] },

  { meter:"4/4", chord:"C",   harmony:["C4","E4","G4"],    bassRoot:"C2", bassFifth:"G2", melody:[n("C4",.5),n("D4",.5),n("E4",1),n("G4",1),n("E4",1)] },
  { meter:"4/4", chord:"Am",  harmony:["A3","C4","E4"],    bassRoot:"A1", bassFifth:"E2", melody:[n("A4",1),n("G4",.5),n("E4",.5),n("C4",2)] },
  { meter:"3/4", chord:"Dm",  harmony:["D4","F4","A4"],    bassRoot:"D2", bassFifth:"A2", melody:[n("F4",1),n("A4",1),n("G4",1)] },
  { meter:"3/4", chord:"G",   harmony:["G3","B3","D4"],    bassRoot:"G1", bassFifth:"D2", melody:[n("D4",.5),n("E4",.5),n("F4",1),n("G4",1)] },

  { meter:"4/4", chord:"Em",  harmony:["E4","G4","B4"],    bassRoot:"E2", bassFifth:"B2", melody:[n("G4",1),n("B4",1),n("G4",1),n("E4",1)] },
  { meter:"4/4", chord:"Am",  harmony:["A3","C4","E4"],    bassRoot:"A1", bassFifth:"E2", melody:[n("A4",.5),n("C5",.5),n("B4",1),n("A4",1),n("E4",1)] },
  { meter:"5/4", chord:"F",   harmony:["F3","A3","C4"],    bassRoot:"F1", bassFifth:"C2", melody:[n("F4",1),n("A4",1),n("C5",1),n("A4",1),n("G4",1)] },
  { meter:"5/4", chord:"G7",  harmony:["G3","B3","D4","F4"], bassRoot:"G1", bassFifth:"D2", melody:[n("G4",.5),n("A4",.5),n("B4",1),n("D5",1),n("C5",1),n("B4",1)] },

  { meter:"4/4", chord:"C",   harmony:["C4","E4","G4"],    bassRoot:"C2", bassFifth:"G2", melody:[n("E5",1),n("D5",.5),n("C5",.5),n("G4",2)] },
  { meter:"4/4", chord:"F",   harmony:["F3","A3","C4"],    bassRoot:"F1", bassFifth:"C2", melody:[n("A4",1),n("C5",1),n("A4",1),n("F4",1)] },
  { meter:"4/4", chord:"G7",  harmony:["G3","B3","D4","F4"], bassRoot:"G1", bassFifth:"D2", melody:[n("G4",.5),n("A4",.5),n("B4",1),n("D5",1),n("B4",1)] },
  { meter:"4/4", chord:"C",   harmony:["C4","E4","G4"],    bassRoot:"C2", bassFifth:"G2", melody:[n("C5",4)] },
];

const events: { track: string; pitch: string; startBeat: number; beats: number }[] = [];
let startBeat = 0;

bars.forEach((bar, index) => {
  const barBeats = Number(bar.meter[0]);
  const melodyBeats = bar.melody.reduce((sum, note) => sum + note.beats, 0);
  if (melodyBeats !== barBeats) throw new Error(`Такт ${index + 1}: ${melodyBeats} вместо ${barBeats} долей`);

  let pos = startBeat;
  for (const note of bar.melody) {
    events.push({ track:"melody", pitch:note.pitch, startBeat:pos, beats:note.beats });
    pos += note.beats;
  }
  for (const pitch of bar.harmony) {
    events.push({ track:"chords", pitch, startBeat, beats:barBeats });
  }
  for (let beat = 0; beat < barBeats; beat++) {
    events.push({
      track:"bass",
      pitch:beat % 2 === 0 ? bar.bassRoot : bar.bassFifth,
      startBeat:startBeat + beat,
      beats:0.8,
    });
  }
  console.log(`Такт ${index + 1}: ${bar.meter} · ${bar.chord} · доли ${startBeat}–${startBeat + barBeats}`);
  startBeat += barBeats;
});

console.log(events); // Готовые события для MIDI, Web Audio или визуализации
