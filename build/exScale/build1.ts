// Run following command in PowerShell
// > deno --allow-write ./build1.ts

import {fileWrite} from "../file.ts";
import { Interval, getIntervalByName, intervals, Pitch, getPitchByName } from "../music.ts";
import { tunings, getFretByMnn } from "../guitar.ts";
import { ScaleStructure, scaleStructures } from "./scaleStructure.ts";
import { Scale, Pattern } from "./scale.ts";

const makePattern = (scale: ScaleStructure, name: string): Pattern => {
  let pattern: Pattern = { name: name, notes: [] };

  let lowestIndex = 0;
  if (name === "6/1") {
    lowestIndex = 0;
  } else if (name === "6/2") {
    lowestIndex = 6;
  } else if (name === "6/4") {
    lowestIndex = 5;
  } else if (name === "5/1") {
    lowestIndex = 4;
  } else if (name === "5/2") {
    lowestIndex = 3;
  } else if (name === "5/4") {
    lowestIndex = 2;
  } else if (name === "4/1") {
    lowestIndex = 1;
  }

  const e3 = tunings[6];
  let degree = lowestIndex + 1;
  let lastMnn = e3.mnn;
  for (let i = 0; i < 18; i++) {
    const str = 6 - Math.floor(i / 3);
    const index = i % scale.intervals.length;
    let mnn = e3.mnn;
    if (i == 0) {
      pattern.notes.push({ str: str, fret: 0, degree: degree });
    } else {
      let mnn =
        e3.mnn +
        scale.getIntervalByName(degree - 1).step -
        scale.getIntervalByName(lowestIndex).step;
      while (mnn < lastMnn) {
        mnn += 12;
      }
      const fret = getFretByMnn(str, mnn);
      pattern.notes.push({ str: str, fret: fret, degree: degree });
      lastMnn = mnn;
    }
    degree++;
    if (7 < degree) {
      degree = 1;
    }
  }

  return pattern;
};

const build1 = (): void => {
  let scaleBases: Scale[] = [];
  for (let scaleStructure of scaleStructures) {
    if (scaleStructure.intervals.length == 7) {
      let scale = new Scale(scaleStructure.name,scaleStructure.abbr, "X");
      scale.patterns = [];
      scale.patterns.push(makePattern(scaleStructure, "6/1"));
      scale.patterns.push(makePattern(scaleStructure, "6/2"));
      scale.patterns.push(makePattern(scaleStructure, "6/4"));
      scale.patterns.push(makePattern(scaleStructure, "5/1"));
      scale.patterns.push(makePattern(scaleStructure, "5/2"));
      scale.patterns.push(makePattern(scaleStructure, "5/4"));
      scale.patterns.push(makePattern(scaleStructure, "4/1"));
      scaleBases.push(scale);
    }
  }

  fileWrite("./scaleTemplates.json", JSON.stringify(scaleBases));
};

build1();
