export class NamedValue {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  static search(namedValues: NamedValue[], name: string): NamedValue | null {
    for (let namedValue of namedValues) {
      if (namedValue.name === name) {
        return namedValue;
      }
    }
    return null;
  }

  static getValue(namedValues: NamedValue[], name: string): string | null {
    const thing = this.search(namedValues, name);
    if (thing) {
      return thing.value;
    } else {
      return null;
    }
  }
}
