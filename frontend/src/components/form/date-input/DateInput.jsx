import { useCallback, useEffect, useState } from 'react';
import TextInput from '@/components/form/text-input/TextInput';
import InputErrorMessage from '@/components/form/errors/InputErrorMessage';
import { addDays } from '@/utils/addDays';

const INVALID_MESSAGES = {
  VALID_DATE: '',
  INVALID_DAY: 'Please make sure you have a valid day of the month',
  INVALID_MONTH: 'Please make sure you input a valid month, ie: February = 02',
  // INVALID_YEAR: 'Please make sure the year is in the future',
  NUMBERS_ONLY: 'Only numbers are allowed in field.',
};

const DateInput = ({ register, name, placeHolder, setValue, watch }) => {
  let date = watch(name);
  const [isBackspace, setIsBackspace] = useState(false);
  const [isValid, setIsValid] = useState({
    showError: false,
    errorMessage: '',
  });
  const [dateHasBeenReset, setDateHasBeenReset] = useState(false);

  const checkForDateValidity = (trueLength) => {
    if (!date) {
      return null;
    }

    const lastChar = date.charAt(date.length - 1);
    if (lastChar !== '/' && isNaN(lastChar)) {
      setIsValid({
        showError: true,
        errorMessage: INVALID_MESSAGES.NUMBERS_ONLY,
      });
      const nonAlphabetizedDate = date.slice(0, date.length - 1);
      setValue(name, nonAlphabetizedDate);
    }

    const month = date.slice(0, 2);
    const day = date.slice(3, 5);
    const year = date.slice(6, 10);

    if (trueLength === 8) {
      const dateTime = new Date(`${year}-${month}-${day}`);
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_YEAR,
        });
      } else if (date && isValid.showError) {
        setIsValid({ showError: false, errorMessage: '' });
      }
    }

    if (trueLength === 4) {
      const dateTime = new Date(`2022-${month}-${day}`);
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_DAY,
        });
        const clearDay = date.slice(0, 3);
        setValue(name, clearDay);
        setDateHasBeenReset(true);
      } else if (dateTime && isValid.showError) {
        setIsValid({ showError: false, errorMessage: '' });
        setDateHasBeenReset(false);
      }
    }

    if (trueLength === 2) {
      const dateTime = new Date(`2022-${month}-1`);
      if (!isFinite(dateTime)) {
        setIsValid({
          showError: true,
          errorMessage: INVALID_MESSAGES.INVALID_MONTH,
        });
        const clearDay = date.slice(0, 0);
        setValue(name, clearDay);
      } else if (dateTime && isValid.showError && !dateHasBeenReset) {
        setIsValid({ showError: false, errorMessage: '' });
      }
    }

    return null;
  };

  const formatDate = useCallback(() => {
    if (!date) {
      return;
    }

    const trueLength = date.replaceAll('/', '').length;
    checkForDateValidity(trueLength);

    if (trueLength === 3 && !date.includes('/')) {
      const insertedSlashStr = `${date.substring(0, 2)}/${date.substring(2)}`;
      setValue(name, insertedSlashStr);
    }

    if (trueLength === 5 && date[5] !== '/') {
      const insertedSecondSlashStr = `${date.substring(0, 5)}/${date.substring(
        5
      )}`;
      setValue(name, insertedSecondSlashStr);
    }

    if (trueLength > 8) {
      setValue(name, date.slice(0, 10));
    }

    if (trueLength === 2 && !date.includes('/') && !isBackspace) {
      setValue(name, `${date}/`);
    }

    if (trueLength === 4 && date[5] !== '/' && !isBackspace) {
      setValue(name, `${date}/`);
    }
  }, [date]);

  useEffect(() => {
    formatDate();
  }, [formatDate]);

  return (
    <>
      <TextInput
        register={register}
        name={name}
        placeHolder={placeHolder}
        onKeyDown={(event) => {
          if (!event.keyCode) {
            return;
          }

          setIsBackspace(event.keyCode === 8);
        }}
        onPaste={(event) => {
          event.preventDefault();
          return false;
        }}
      />
      <InputErrorMessage error={isValid.errorMessage} />
    </>
  );
};

export default DateInput;
