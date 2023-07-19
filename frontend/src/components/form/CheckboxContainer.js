import styled from 'styled-components'

import Checkbox from './checkbox/Checkbox'

const CheckboxContainer = ({ data, register }) => {
  return (
    <Container>
      {data.label}
      {data.options.map((option) => (
        <Checkbox
          key={option}
          option={option}
          label={data.label}
          register={register}
        />
      ))}
    </Container>
  )
}

export default CheckboxContainer

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 26px;

  ::first-child {
    margin-bottom: 10px;
  }
`
