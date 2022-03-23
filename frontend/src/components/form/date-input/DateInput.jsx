import { useCallback, useEffect, useState } from 'react';
import TextInput from '@/components/form/text-input/TextInput';

const DateInput = ({ register, name, placeHolder, setValue, watch }) => {
  let date = watch(name);
  const [isBackspace, setIsBackspace] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkForDateValidity = (trueLength) => {
    if (trueLength === 2) {
      const month = date.slice(0, 2);
      const dateObj = new Date(`2022-${month}-01`);
      return dateObj;
    }
  };

  const formatDate = useCallback(() => {
    if (!date) {
      return;
    }

    const trueLength = date.replaceAll('/', '').length;
    const isValid = checkForDateValidity(trueLength);

    console.log('ISVALID: ', isValid);

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
