// Run following command in PowerShell
// > deno --allow-read --allow-write ./build3.ts

import { NamedValue } from "../namedValue.ts";
import { fileRead, fileWrite } from "../file.ts";
import { embed } from "../embed.ts";

const rowTemplate =
  "----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-";

function makeRow(row: string, fret: number, degree: number): string {
  if (0 <= fret && fret <= 15) {
    
  }
  return row;
}

)
function build3(): void {
  const data = fileRead("./scales.json");
  let scales = JSON.parse(data);

  for (let scale of scales) {
    const title = scale.key + " " + scale.name;
    const fileName =
      scale.abbr + "-" + scale.key.toLowerCase().replace("#", "s") + ".html";
    console.log(fileName);
    const htmlTemplate = fileRead("./htmlTemplate.html");
    const embeddings: NamedValue[] = [
      new NamedValue("title", title),
      new NamedValue("main", "***"),
    ];
    const htmlModified = embed(htmlTemplate, embeddings);
    fileWrite("../results/exercises/scales/" + fileName, htmlModified);
  }
}

build3();
