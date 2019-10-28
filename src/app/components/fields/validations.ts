import memoizee from 'memoizee';

type ValidationType = string | undefined;

function isNonEmptyString(value: any): boolean {
    return typeof value === 'string' && value.length > 0;
}

function isNumber(value: any): boolean {
    return typeof value === 'number' && !Number.isNaN(value);
}

function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

function isNonEmptyValue(value: any): boolean {
    return isNonEmptyString(value)
        || isNumber(value)
        || isObject(value)
        || isNonEmptyObject(value);

}

function isNonEmptyObject(value: any): boolean {
    return isObject(value) && Object.keys(value).length > 0;
}

const required = memoizee((message?: string): any => {
    return (value: any): ValidationType => {
        if (!isNonEmptyValue(value)) {
            return message || 'Field is required';
        }

        if (typeof value === 'string') {
            return whiteSpaceValidator(value);
        }

        return undefined;
    };
});


const minLength = memoizee((length: number, message?: string): any => {
    return (value: string): ValidationType => {
        if (value && value.trim().length < length) {
            return message || 'Too short';

        }

        return undefined;
    };
});

const lengthWithoutWhitespaces = memoizee((minLengthWithoutWhitespaces: number = 1, message?: string): any => {
    return (value: string): ValidationType => {
        if (value) {
            const trimmedValue = value.trim();

            if (!isNonEmptyString(trimmedValue) || minLength(minLengthWithoutWhitespaces)(trimmedValue)) {
                return message || "Field is not valid";
            }
        }

        return undefined;
    };
});

const whiteSpaceValidator = lengthWithoutWhitespaces();


export {
    required,
};
