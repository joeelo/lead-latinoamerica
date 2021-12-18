import { useState, useEffect } from 'react';
import styled from 'styled-components';

const WordSelectInput = ({ name }) => {
  const [isInFocus, setIsInFocus] = useState(false);

  return (
    <>
      <Container focused={isInFocus}>
        <StyledInput
          onFocus={() => setIsInFocus(true)}
          onBlur={() => setIsInFocus(false)}
        />
      </Container>
    </>
  );
};

export default WordSelectInput;

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

const StyledInput = styled.input`
  width: 100%;
  min-height: 40px;
  height: 40px;
  font-size: 20px;
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
`;
