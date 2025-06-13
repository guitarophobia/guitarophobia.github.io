// Run following command in PowerShell
// > deno --allow-read --allow-write ./build2.ts

import { fileRead, fileWrite } from "../file.ts";
import { Scale, Tone, Pattern, Note } from "./scale.ts";
import { getFretBySyllable } from "../guitar.ts";

function makePattern(
  root: string,
  name: string,
  templateNotes: Note[]
): Pattern {
  let pattern = new Pattern(name, []);

  let diff = 0;
  if (name === "6/1") {
    const rootFret = getFretBySyllable(6, root);
    diff = rootFret - templateNotes[0].fret;
  } else if (name === "6/2") {
    const rootFret = getFretBySyllable(6, root);
    diff = rootFret - templateNotes[1].fret;
    if (templateNotes[2].fret - templateNotes[1].fret === 1) {
      pattern.name = "6/3";
    }
  } else if (name === "6/4") {
    const rootFret = getFretBySyllable(6, root);
    diff = rootFret - templateNotes[2].fret;
  } else if (name === "5/1") {
    const rootFret = getFretBySyllable(5, root);
    diff = rootFret - templateNotes[3].fret;
  } else if (name === "5/2") {
    const rootFret = getFretBySyllable(5, root);
    diff = rootFret - templateNotes[4].fret;
    if ((templateNotes[5].fret - templateNotes[4].fret) === 1) {
      pattern.name = "5/3";
    }
  } else if (name === "5/4") {
    const rootFret = getFretBySyllable(5, root);
    diff = rootFret - templateNotes[5].fret;
  } else if (name === "4/1") {
    const rootFret = getFretBySyllable(4, root);
    diff = rootFret - templateNotes[6].fret;
  }

  for (let templateNote of templateNotes) {
    const note: Note = {
      str: templateNote.str,
      fret: templateNote.fret + diff,
      degree: templateNote.degree,
    };
    pattern.notes.push(note);
  }

  const lowerNotes = pattern.notes.length;
  for (let i = 0; i < lowerNotes; i++) {
    const lowerNote = pattern.notes[i];
    const upperNote: Note = {
      str: lowerNote.str,
      fret: lowerNote.fret + 12,
      degree: lowerNote.degree,
    };
    pattern.notes.push(upperNote);
  }

  return pattern;
}

const build2 = (): void => {
  let scales: Scale[] = [];

  const roots = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const data = fileRead("./scaleTemplates.json");
  let scaleTemplates = JSON.parse(data);

  for (let scaleTemplate of scaleTemplates) {
    let scale = new Scale(scaleTemplate.name, scaleTemplate.abbr);
    for (let root of roots) {
      let tone = new Tone(root);
      console.log(`${scaleTemplate.name} ${root}`);
      for (let toneTemplate of scaleTemplate.tones) {
        for (let patternTemplate of toneTemplate.patterns) {
          let pattern = makePattern(
            root,
            patternTemplate.name,
            patternTemplate.notes
          );
          tone.patterns.push(pattern);
        }
      }
      scale.tones.push(tone);
    }
    scales.push(scale);
  }

  fileWrite("./scales.json", JSON.stringify(scales));
};

build2();
