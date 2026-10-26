type Note = { pitch: string; beats: number };
const n = (pitch: string, beats: number): Note => ({ pitch, beats });

// Первый такт из присланного Снежаной 16-тактового кода.
export const openingMotif: Note[] = [
  n("C4", 1),
  n("D4", 0.5),
  n("E4", 0.5),
  n("D4", 2),
];
