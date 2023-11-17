/**
 * @param {string | []} value 
 * @param {{ min: number, max: number}} validation 
 */

export default function getInputValidationError(value, validation) {
  const { min, max } = validation

  if (typeof value === 'string') {
    if (min && value < min) {
      return `Must be longer than ${min} characters`
    }

    if (max && value > max) {
      return `Must be short than ${max} characters`
    }
  }

  return ''
}