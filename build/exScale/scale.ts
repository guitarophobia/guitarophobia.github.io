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

export class Scale {
  name: string;
  abbr: string;
  key: string;
  patterns: Pattern[];

  constructor(name: string, abbr: string, key: string) {
    this.name = name;
    this.abbr = abbr;
    this.key = key;
    this.patterns = [];
  }
}
