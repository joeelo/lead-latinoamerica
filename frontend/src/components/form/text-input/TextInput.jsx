import styled, { ThemeContext } from 'styled-components'
import { useContext, useState, useEffect } from 'react'

const TextInput = ({
  register,
  rules,
  setValue,
  name,
  label,
  placeHolder,
  initialVal,
  ...props
}) => {
  // register and hasError are properties of parent
  const theme = useContext(ThemeContext)

  const [isInFocus, setIsInFocus] = useState(false)

  useEffect(() => {
    if (initialVal) {
      setValue(name, initialVal)
    }
  }, [initialVal])

  return (
    <Container focused={isInFocus}>
      {label && <Label theme={theme}> {label} </Label>}

      <StyledInput
        {...register(name, rules)}
        placeholder={placeHolder}
        theme={theme}
        onFocus={() => setIsInFocus(true)}
        onBlur={() => setIsInFocus(false)}
        {...props}
      />
    </Container>
  )
}

export default TextInput

const Container = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  padding-left: 10px;
  transition: 0.4s ease-in-out all;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.focused
      ? '1px 2px 13px 0px rgba(184, 177, 184, 1)'
      : '1px 1px 4px 0px rgba(184, 177, 184, 1)'};
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
  font-size: 16px;
  padding: 5px 5px 2px 5px;
  margin-bottom: 10px;
  border: 0px;
  font-weight: lighter;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-size: 14px;
  }
`
