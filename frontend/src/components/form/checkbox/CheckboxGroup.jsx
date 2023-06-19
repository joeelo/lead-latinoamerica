import Box from '@mui/material/Box'
import Checkbox from './Checkbox'
import { useMemo } from 'react'

export default function CheckboxGroup ({ 
  options, 
  register, 
  checkedOnLoad = [] 
}){
  const initialValues = useMemo(() => {
    const initialObj = {}

    options.forEach((opt) => {
      // checked on load looks like ['value1', 'value2', 'value3']
      //opt.value looks like ['name.value1', 'name.value2', 'name.value3']
      if (checkedOnLoad.includes(opt.value)) {
        initialObj[opt.value] = true
      }
    })

    return initialObj
  }, [checkedOnLoad, options])

  return (
    <Box
      display="flex"
      width='100%'
      flexDirection='column'
      fontSize={22}
    >
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          option={opt}
          label={opt.label}
          register={register}
          checkOnLoad={!!initialValues[opt.value]}
        />
      ))}
    </Box>
  )
}
