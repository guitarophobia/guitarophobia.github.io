import { NamedValue } from "../NamedValue.ts";
import { fileRead, fileWrite } from "../file.ts";
import { embed } from "../embed.ts";

function build4(): void {
  const data = fileRead("./scales.json");
  let scales = JSON.parse(data);

  let toc = "";
  for (let scale of scales) {
    toc += "<tr>" + "\n";
    toc += "<td>" + scale.name + "</td>" + "\n";
    for (let tone of scale.tones) {
      const filename =
        scale.abbr + "-" + tone.root.toLowerCase().replace("#", "s") + ".html";
      const pathname = "exercises/scales/" + filename;
      console.log(pathname);
      toc += '<td><a href="' + pathname + ">" + tone.root + "</a>";
    }
    toc += "</tr>" + "\n";
  }

  const htmlTemplate = fileRead("./scaleTocTemplate.html");
  const embeddings: NamedValue[] = [new NamedValue("toc", toc)];
  const html = embed(htmlTemplate, embeddings);
  fileWrite("../results/scaleToc.html", html);
}

build4();
