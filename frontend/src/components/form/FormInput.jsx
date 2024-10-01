import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const FormInput = ({ data, register, hasError }) => {
  // register and hasError are properties of parent
  const theme = useContext(ThemeContext)

  return (
    <Container>
      <Label theme={theme}> {data.label} </Label>
      <StyledInput
        {...register(data.data, { required: true })}
        type={data.validations ? data.validations : null}
        placeholder={data.placeHolder}
        hasError={hasError}
        theme={theme}
      />
    </Container>
  )
}

export default FormInput

const Container = styled.div`
  margin-top: 20px;
`

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.darkBlue};
  padding-left: 5px;
  text-transform: capitalize;
`

const StyledInput = styled.input`
  width: 100%;
  min-height: 40px;
  height: 40px;
  font-size: 24px;
  padding: 5px 5px 2px 5px;
  margin-bottom: 10px;
  border: 0px;
  border-bottom: ${(props) => '1px solid ' + props.theme.colors.darkBlue};
  transition: 0.4s ease-in-out all;

  &:focus {
    outline: none;
    border-bottom: ${(props) => '1px solid ' + props.theme.colors.cyan};
  }

  ::placeholder {
    font-size: 18px;
  }
`
