export class NamedValue {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    static getValue(namedValues: NamedValue[], name: string): string | null {
        for (let namedValue of namedValues) {
            if (namedValue.name === name) {
                return namedValue.value;
            }
        }
        return null;
    }
}