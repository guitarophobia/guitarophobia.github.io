import { NamedValue } from "../NamedValue.ts";
import { fileRead, fileWrite } from "../file.ts";
import { embed } from "../embed.ts";

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

function build4(): void {
  const data = fileRead("./scales.json");
  let scales = JSON.parse(data);

  let toc = "";
  for (let scale of scales) {
    toc += "<tr>" + "\n";
    toc +=
      '<td class="lefted" style="width:25%">' + scale.name + "</td>" + "\n";
    for (let tone of scale.tones) {
      const filename =
        scale.abbr + "-" + tone.root.toLowerCase().replace("#", "s") + ".html";
      const pathname = "exercises/scales/" + filename;
      console.log(pathname);
      let root = adjustCyllable(tone.root);
      if (root.length === 1) {
        toc += '<td style="width:5%"><a href="';
      } else {
        toc += '<td style="width:8%"><a href="';
      }
      toc += pathname + '">' + root + "</a>";
    }
    toc += "</tr>" + "\n";
  }

  const htmlTemplate = fileRead("./tocTemplate.html");
  const embeddings: NamedValue[] = [new NamedValue("toc", toc)];
  const html = embed(htmlTemplate, embeddings);
  fileWrite("results/toc.html", html);
}

build4();
