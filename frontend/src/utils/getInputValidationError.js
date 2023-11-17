/**
 * @param {string | []} value 
 * @param {{ min: number, max: number}} validation 
 */

export default function getInputValidationError(value, validation) {
  const { min, max } = validation

  if (typeof value === 'string') {
    const inputLength = value.length

    if (min && inputLength < min) {
      return `Must be longer than ${min} characters`
    }

    if (max && inputLength > max) {
      return `Must be short than ${max} characters`
    }
  }

  return ''
}