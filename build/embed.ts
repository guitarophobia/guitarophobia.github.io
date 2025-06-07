import {NamedValue} from "./namedValue.ts";

const embedStart = "{{";
const embedEnd = "}}";

export function embed(source: string, embeddings: NamedValue[]): string {
    let result = "";
    let start = 0;
    let end = 0;
    let str = "";
    while (true) {
        start = source.indexOf(embedStart, end);
        if (start < 0) {
            str = source.substring(end, source.length);
            result += str;
            break;
        }
        str = source.substring(end, start);
        result += str;
        end = source.indexOf(embedEnd, start);
        if (end < 0) {
            break;
        }
        let name = source.substring(start + embedStart.length, end)
        let value = NamedValue.getValue(embeddings, name);
        if (value) {
            result += value;
        }
        end += embedEnd.length;
    }
    return result;
}