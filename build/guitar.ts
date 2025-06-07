import { Pitch, pitches, getPitchByName, isSyllable } from "./music.ts";

export const tunings: Pitch[] = [
  getPitchByName["CL"],
  getPitchByName("E4"), // 1st
  getPitchByName("B3"), // 2nd
  getPitchByName("G3"), // 3rd
  getPitchByName("D3"), // 4th
  getPitchByName("A2"), // 5th
  getPitchByName("E2"), // 6th
];

export function getFretByMnn(str: number, mnn: number): number {
  if (1 <= str && str <= 6 && 0 <= mnn && mnn <= 127) {
    return mnn - tunings[str].mnn;
  } else {
    return 0;
  }
}

export function getFretBySyllable(str: number, syllable: string): number {
  if (isSyllable(syllable)) {
    const tuning = tunings[str];
    for (let i = 0; pitches.length; i++) {
      if (tuning.mnn <= pitches[i].mnn && pitches[i].syllable === syllable) {
        return pitches[i].mnn - tuning.mnn;
      }
    }
  }
  return 0;
}