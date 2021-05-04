import styled from 'styled-components';

const FormInput = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <Label> { data.label } </Label>
      <StyledInput placeholder={data.placeHolder} />
    </Container>
  )
}

export default FormInput;

const Container = styled.div`
  margin-top: 20px; 
`

const Label = styled.label`
  font-size: 24px; 
  color: darkblue; 
  padding-left: 5px;
  text-transform: capitalize;
`
  
  const StyledInput = styled.input`
  width: 100%; 
  min-height: 40px;
  height: 40px;
  font-size: 24px; 
  padding: 5px;
  border: 0px;
  border-bottom: 2px solid darkblue;

  &:focus {
    outline: none;
  }
`