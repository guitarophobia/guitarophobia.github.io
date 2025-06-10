// Run following command in PowerShell
// > deno --allow-read --allow-write ./build3.ts

import { NamedValue } from "../NamedValue.ts";
import { fileRead, fileWrite } from "../file.ts";
import { embed } from "../embed.ts";
import { Pattern } from "./scale.ts";

function adjustCyllable(name: string): string {
  let adjusted = name;
  if (adjusted === "C#") {
    adjusted = "C#/Db";
  } else if (adjusted === "D#") {
    adjusted = "D#/Eb";
  } else if (adjusted === "F#") {
    adjusted = "F#/Gb";
  } else if (adjusted === "G#") {
    adjusted = "G#/Ab";
  } else if (adjusted === "A#") {
    adjusted = "A#/Bb";
  }
  return adjusted;
}

const fbTemplate: string[] = [
  "     0     1     2     3     4     5     6     7     8     9     10    11    12    13    14    15",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
  "-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-",
];

function makePattern(pattern: Pattern): string {
  let result: string = "";

  let fb: string[] = [];
  for (let i = 0; i <= 6; i++) {
    fb[i] = fbTemplate[i];
  }

  result += "Pattern " + pattern.name + "\n";
  result += "<pre>\n";

  for (let note of pattern.notes) {
    const str = note.str;
    const fret = note.fret;
    const degree = note.degree;
    if (1 <= str && str <= 6 && 0 <= fret && fret <= 15) {
      let line = fb[str].substring(0, fret * 6 + 1);
      line += "(" + degree.toString() + ")";
      line += fb[str].substring(fret * 6 + 4, fb[str].length);
      fb[str] = line;
    }
  }

  for (let i = 0; i <= 6; i++) {
    result += fb[i] + "\n";
  }

  result += "</pre>\n";
  return result;
}

function build3(): void {
  const data = fileRead("./scales.json");
  let scales = JSON.parse(data);

  for (let scale of scales) {
    for (let tone of scale.tones) {
      let main = "";
      for (let pattern of tone.patterns) {
        main += makePattern(pattern);
      }

      const title = adjustCyllable(tone.root) + " " + scale.name;
      const filename =
        scale.abbr + "-" + tone.root.toLowerCase().replace("#", "s") + ".html";
      console.log(filename);
      const htmlTemplate = fileRead("./scaleTemplate.html");
      const embeddings: NamedValue[] = [
        new NamedValue("title", title),
        new NamedValue("main", main),
      ];
      const html = embed(htmlTemplate, embeddings);
      fileWrite("results/exercises/scales/" + filename, html);
    }
  }
}

build3();
