export function fileRead(name: string): string {
  const data = Deno.readTextFileSync(name);
  return data;
}

export function fileWrite(name: string, data: string): void {
  Deno.writeTextFileSync(name, data);
}
