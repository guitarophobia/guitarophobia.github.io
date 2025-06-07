import { Interval, getIntervalByName } from "../music.ts";

export class ScaleStructure {
  name: string;
  abbr: string;
  intervals: Interval[];

  constructor(name: string, abbr: string, intervalNames: string[] | null) {
    this.name = name;
    this.abbr = abbr;
    this.intervals = [];
    if (intervalNames && 0 < intervalNames.length) {
      for (name of intervalNames) {
        this.intervals.push(getIntervalByName(name));
      }
    }
  }

  getIntervalByName(index: number): Interval {
    let subIndex = index;
    while (subIndex < 0) {
      subIndex += this.intervals.length;
    }
    if (this.intervals.length <= subIndex) {
      subIndex %= this.intervals.length;
    }
    return this.intervals[subIndex];
  }
}

export const scaleStructures: ScaleStructure[] = [
  new ScaleStructure("Ionian", "ion", [
    "per1",
    "maj2",
    "maj3",
    "per4",
    "per5",
    "maj6",
    "maj7",
  ]),
  new ScaleStructure("Dorian", "dor", [
    "per1",
    "maj2",
    "min3",
    "per4",
    "per5",
    "maj6",
    "min7",
  ]),
  new ScaleStructure("Phrygian", "phr", [
    "per1",
    "min2",
    "min3",
    "per4",
    "per5",
    "min6",
    "min7",
  ]),
  new ScaleStructure("Lydian", "lyd", [
    "per1",
    "maj2",
    "maj3",
    "aug4",
    "per5",
    "maj6",
    "maj7",
  ]),
  new ScaleStructure("Mixolydian", "mixlyd", [
    "per1",
    "maj2",
    "maj3",
    "per4",
    "per5",
    "maj6",
    "min7",
  ]),
  new ScaleStructure("Aeolian", "aeo", [
    "per1",
    "maj2",
    "min3",
    "per4",
    "per5",
    "min6",
    "min7",
  ]),
  new ScaleStructure("Locrian", "loc", [
    "per1",
    "min2",
    "min3",
    "per4",
    "dim5",
    "min6",
    "min7",
  ]),
  new ScaleStructure("Harmonic Minor", "harmin", [
    "per1",
    "maj2",
    "min3",
    "per4",
    "per5",
    "min6",
    "maj7",
  ]),
  new ScaleStructure("Melodic Minor", "mermin", [
    "per1",
    "maj2",
    "min3",
    "per4",
    "per5",
    "maj6",
    "maj7",
  ]),
  new ScaleStructure("Phrygian Dominant", "phrdom", [
    "per1",
    "min2",
    "maj3",
    "per4",
    "per5",
    "min6",
    "min7",
  ]),
  new ScaleStructure("Lydian Dominant", "lyddom", [
    "per1",
    "maj2",
    "maj3",
    "aug4",
    "per5",
    "maj6",
    "min7",
  ]),
  new ScaleStructure("Super Locrian", "suploc", [
    "per1",
    "min2",
    "min3",
    "dim4",
    "dim5",
    "min6",
    "min7",
  ]),
  new ScaleStructure("Whole Tone", "wt", [
    "per1",
    "maj2",
    "maj3",
    "aug4",
    "aug5",
    "aug6",
  ]),
  new ScaleStructure("Diminished", "dim", []),
  new ScaleStructure("Major Pentatonic", "majpen", []),
  new ScaleStructure("Minor Pentatonic", "minpen", []),
];
