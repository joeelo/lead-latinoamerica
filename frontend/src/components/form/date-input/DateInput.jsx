import { useCallback, useEffect, useState } from 'react';
import TextInput from '@/components/form/text-input/TextInput';

const INVALID_MESSAGES = {
  VALID_DATE: '',
  INVALID_DAY: 'Please make sure you have a valid day range input',
  INVALID_MONTH: 'Please make sure you have a valid month',
  INVALID_YEAR: 'Please make sure the year is a valid year in the future',
};

const DateInput = ({ register, name, placeHolder, setValue, watch }) => {
  let date = watch(name);
  const [isBackspace, setIsBackspace] = useState(false);
  const [isValid, setIsValid] = useState({ showError: false, error: '' });

  const checkForDateValidity = (trueLength) => {
    if (!date) {
      return null;
    }

    const month = date.slice(0, 2);
    const day = date.slice(3, 5);
    const year = date.slice(6, 10);

    if (trueLength === 8) {
      const date = new Date(`${year}-${month}-${day}`);
      if (!date) {
        setIsValid({ showError: true, message: INVALID_MESSAGES.INVALID_YEAR });
      } else if (date && isValid.showError) {
        setIsValid({ showError: false, message: '' });
      }
    }

    if (trueLength === 4) {
      const date = new Date(`2022-${month}-${day}`);
      if (!date) {
        setIsValid({ showError: true, message: INVALID_MESSAGES.INVALID_DAY });
      } else if (date && isValid.showError) {
        setIsValid({ showError: false, message: '' });
      }
    }

    if (trueLength === 2) {
      const date = new Date(`2022-${month}-1`);
      if (!date) {
        setIsValid({
          showError: true,
          message: INVALID_MESSAGES.INVALID_MONTH,
        });
      } else if (date && isValid.showError) {
        setIsValid({ showError: false, message: '' });
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
      console.log(date.substring(5));
      const insertedSecondSlashStr = `${date.substring(0, 5)}/${date.substring(
        5
      )}`;
      console.log('insertedSecondSlashStr: ', insertedSecondSlashStr);
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
    <TextInput
      register={register}
      name={name}
      placeHolder={placeHolder}
      onKeyDown={(event) => event && setIsBackspace(event.keyCode === 8)}
    />
  );
};

export default DateInput;
