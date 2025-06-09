export class Note {
  str: number;
  fret: number;
  degree: number;

  constructor(str: number, fret: number, degree: number) {
    this.str = str;
    this.fret = fret;
    this.degree = degree;
  }
}

export class Pattern {
  name: string;
  notes: Note[];

  constructor(name: string, notes: Note[]) {
    this.name = name;
    this.notes = notes;
  }
}

export class Tone {
  root: string;
  patterns: Pattern[];

  constructor(root: string) {
    this.root = root;
    this.patterns = [];
  }
}

export class Scale {
  name: string;
  abbr: string;
  tones: Tone[];

  constructor(name: string, abbr: string) {
    this.name = name;
    this.abbr = abbr;
    this.tones = [];
  }
}
