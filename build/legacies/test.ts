import * as mu from "./mu.ts";

console.log(mu.datetimeStr(undefined, "/"));

const date = new Date(2001, 0, 1, 0, 0, 0);
console.log(mu.datetimeStr(date));

console.log(mu.datetimeStr(undefined, undefined, true));
