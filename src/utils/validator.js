export const required = (value) => {
    if(value) return undefined
    return 'Field is required'
}
export const maxLengthCreator = (maxL) => (value) => {
    if(value.length > maxL) return `Max length is ${maxL} required`
    return undefined
}