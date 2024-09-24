/**
 * @param {string | []} value
 * @param {{ min: number, max: number}} validation
 */

export default function getInputValidationError(value, validation) {
  if (!validation) {
    return ''
  }

  const isString = typeof value === 'string'
  const isArray = Array.isArray(value)
  const isValidationFunction = typeof validation === 'function'

  const { min, max } = validation

  if (isValidationFunction) {
    return validation()
  }

  if (isString || isArray) {
    const valueLength = value.length

    if (min && valueLength < min && isString) {
      return `Must be longer than ${min} characters`
    }

    if (min && valueLength < min && isArray) {
      return `Must select at least one option`
    }

    if (max && valueLength > max && isString) {
      return `Must be short than ${max} characters`
    }
  }

  return ''
}
