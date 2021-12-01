import styled, { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

const FormInput = ({ register, name, label, isRequired, placeHolder }) => {
  // register and hasError are properties of parent
  const theme = useContext(ThemeContext);

  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <Container focused={isInFocus}>
      {label && <Label theme={theme}> {label} </Label>}

      <StyledInput
        {...register(name, { required: isRequired })}
        placeholder={placeHolder}
        theme={theme}
        onFocus={() => setIsInFocus(true)}
        onBlur={() => setIsInFocus(false)}
      />
    </Container>
  );
};

export default FormInput;

const Container = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  padding-left: 10px;
  transition: 0.4s ease-in-out all;
  box-shadow: ${(props) =>
    props.focused
      ? '1px 2px 13px 0px rgba(184, 177, 184, 1)'
      : '1px 1px 4px 0px rgba(184, 177, 184, 1)'};
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.darkBlue};
  padding-left: 5px;
  text-transform: capitalize;
`;

const StyledInput = styled.input`
  width: 100%;
  min-height: 40px;
  height: 40px;
  font-size: 24px;
  padding: 5px 5px 2px 5px;
  margin-bottom: 10px;
  border: 0px;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-size: 18px;
  }
`;
