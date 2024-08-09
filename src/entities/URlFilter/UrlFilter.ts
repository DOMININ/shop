type UrlFilterValue = string | number;

export class UrlFilter {
    name;
    availableValues;
    currentValue;
    urlValue = '';
    separator;

    constructor(
        name: string,
        availableValues: UrlFilterValue[],
        defaultValue: UrlFilterValue[] = [],
        separator = '.'
    ) {
        this.name = name;
        this.availableValues = availableValues;
        this.currentValue = defaultValue;
        this.separator = separator;
        this.setUrlValue();
    }

    setValue(value: UrlFilterValue) {
        if (!this.availableValues.includes(value)) {
            throw new Error(`Невалидное значение для фильтра ${this.name}`);
        }
        if(this.currentValue.includes(value)) {
            this.currentValue = this.currentValue.filter(item => item!== value);
        } else {
            this.currentValue.push(value);
        }
        this.setUrlValue()
    }

    resetValue() {
        this.currentValue = [];
        this.setUrlValue();
    }

    setUrlValue() {
        this.urlValue = this.currentValue.join(this.separator);
    }
    isValueChecked(value: UrlFilterValue): boolean {
        return this.currentValue.includes(value);
    }
}

// class BooleanUrlFilter extends UrlFilter<true | false> {
//     constructor(name: string, currentValue: (true | false)[] = []) {
//         super(name, [true, false], currentValue, '.');
//     }
// }

// class DateFilter extends UrlFilter<string> {
//     constructor(name: string, values: string[], ) {
//         super(name, values, [], '_');
//     }
// }

// class UrlFilterManager {
//     filters: UrlFilter[] = []
//     constructor(filters: UrlFilter[]) {
//         this.filters = filters;
//     }
// }