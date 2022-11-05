import { useMemo } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'

const CheckboxGroup = ({ name, options, register, checkedOnLoad = [] }) => {
  const initialValues = useMemo(() => {
    const initialObj = {}

    options.forEach((opt) => {
      // checked on load looks like ['value1', 'value2', 'value3']
      //opt.value looks like ['name.value1', 'name.value2', 'name.value3']
      if (checkedOnLoad.includes(opt.value.split('.')[1])) {
        initialObj[opt.value] = true
      }
    })

    return initialObj
  }, options)

  return (
    <Container>
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          option={opt}
          label={opt.label}
          register={register}
          checkOnLoad={!!initialValues[opt.value]}
        />
      ))}
    </Container>
  )
}

export default CheckboxGroup

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 26px;

  ::first-child {
    margin-bottom: 10px;
  }
`
