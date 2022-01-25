import styled from 'styled-components';

const InputErrorMessage = ({ error }) => {
  return <ErrorText>{error}</ErrorText>;
};

export default InputErrorMessage;

const ErrorText = styled.div`
  margin-top: 10px;
  color: #da5552;
  margin-left: 3px;
`;
