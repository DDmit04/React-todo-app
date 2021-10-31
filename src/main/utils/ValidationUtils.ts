export const NotEmptyValidate = (value: string): boolean => {
    return value.trim() !== ''
}

export const NotEmptyValidateForall = (values: string[]): boolean => {
    let invalidElement = values.find(value => !NotEmptyValidate(value))
    return invalidElement == null
}

export const EqualityValidate = (firstVal: string, secVal: string): boolean => {
    return firstVal.trim() === secVal.trim()
}

export const EmailValidate = (value: string): boolean => {
    let filter = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
    return filter.test(value)
}