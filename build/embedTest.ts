import {NamedValue} from "./namedValue.ts";
import {embed} from "./embed.ts";

let embeddings: NamedValue[] = [
    new NamedValue("i", "吾輩"),
    new NamedValue("amacat", "は猫である"),
];

console.log(embed("abc{i}defg{amacat}hij", embeddings));