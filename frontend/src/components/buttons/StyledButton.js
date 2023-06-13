import styled from 'styled-components'

const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: ${(props) => (props.color ? props.color : 'blue')};
  border: 0;
  margin-top: 30px;
  color: white;
  font-size: 20px;
  transition: 0.4s ease all;
  font-weight: light;
  max-height: 60px;

  :hover {
    cursor: pointer;
    background-color: #3a3970;
  }
`

export { StyledButton }
