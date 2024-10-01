import { useCallback, useEffect, useState } from 'react'

import InputErrorMessage from '@/components/form/errors/InputErrorMessage'
import TextInput from '@/components/form/text-input/TextInput'

const INVALID_MESSAGES = {
  VALID_DATE: '',
  INVALID_DAY:
    'Please make sure you input a valid day of the month, ie: 02/08/',
  INVALID_MONTH: 'Please make sure you input a valid month, ie: February = 02',
  // INVALID_YEAR: 'Please make sure the year is in the future',
  NUMBERS_ONLY: 'Only numbers are allowed in field.',
}

const DateInput = ({
  register,
  name,
  placeHolder,
  setValue,
  watch,
  errors,
  isRequired,
}) => {
  let date = watch(name)
  const [isBackspace, setIsBackspace] = useState(false)
  const [isValid, setIsValid] = useState({
    showError: false,
    errorMessage: '',
  })
  const [dateHasBeenReset, setDateHasBeenReset] = useState(false)

  const checkForDateValidity = (trueLength) => {
    if (!date) {
      return null
    }

    const lastChar = date.charAt(date.length - 1)
    const isLastCharInvalid = lastChar !== '/' && isNaN(lastChar)
    if (isLastCharInvalid) {
      setIsValid({
        showError: true,
        errorMessage: INVALID_MESSAGES.NUMBERS_ONLY,
      })
      const nonAlphabetizedDate = date.slice(0, date.length - 1)
      setValue(name, nonAlphabetizedDate)
    } else if (!isLastCharInvalid && isValid.showError) {
      setIsValid({
        showError: false,
        errorMessage: '',
      })
    }

    const month = date.slice(0, 2)
    const day = date.slice(3, 5)
    const year = date.slice(6, 10)

    if (trueLength === 8) {
      const dateTime = new Date(`${year}-${month}-${day}`)
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_YEAR,
        })
      } else if (date && isValid.showError) {
        setIsValid({ showError: false, errorMessage: '' })
      }
    }

    if (trueLength === 4) {
      const dateTime = new Date(`2022-${month}-${day}`)
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_DAY,
        })
        const clearDay = date.slice(0, 3)
        setValue(name, clearDay)
        setDateHasBeenReset(true)
      } else if (dateTime && isValid.showError) {
        setIsValid({ showError: false, errorMessage: '' })
        setDateHasBeenReset(false)
      }
    }

    if (trueLength === 2) {
      const dateTime = new Date(`2022-${month}-1`)
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_MONTH,
        })
        const clearDay = date.slice(0, 0)
        setValue(name, clearDay)
      } else if (dateTime && isValid.showError && !dateHasBeenReset) {
        setIsValid({ showError: false, errorMessage: '' })
      }
    }

    return null
  }

  const formatDate = useCallback(() => {
    if (!date) {
      return
    }

    const trueLength = date.replaceAll('/', '').length
    checkForDateValidity(trueLength)

    if (trueLength === 3 && !date.includes('/')) {
      const insertedSlashStr = `${date.substring(0, 2)}/${date.substring(2)}`
      setValue(name, insertedSlashStr)
    }

    if (trueLength === 5 && date[5] !== '/') {
      const insertedSecondSlashStr = `${date.substring(0, 5)}/${date.substring(
        5
      )}`
      setValue(name, insertedSecondSlashStr)
    }

    if (trueLength > 8) {
      setValue(name, date.slice(0, 10))
    }

    if (trueLength === 2 && !date.includes('/') && !isBackspace) {
      setValue(name, `${date}/`)
    }

    if (trueLength === 4 && date[5] !== '/' && !isBackspace) {
      setValue(name, `${date}/`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    formatDate()
  }, [formatDate])

  return (
    <>
      <TextInput
        register={register}
        name={name}
        rules={{
          required: isRequired ? 'You must put an expiration date' : false,
        }}
        placeHolder={placeHolder}
        onKeyDown={(event) => {
          if (event.keyCode) {
            setIsBackspace(event.keyCode === 8)

            if (event.keyCode === 191) {
              const correctedDate = date && date.slice(0, date.length - 1)
              setValue(name, correctedDate)
            }

            return
          }

          return null
        }}
        onPaste={(event) => {
          event.preventDefault()
          return false
        }}
      />
      <InputErrorMessage error={isValid.errorMessage} />
      {errors && errors[name] && (
        <InputErrorMessage error={errors[name].message} />
      )}
    </>
  )
}

export default DateInput

/**
 * TODO:
 *
 * Make sure date is in the future
 *
 * format date for viewing onBlur and add edit button
 */
