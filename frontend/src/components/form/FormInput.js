import styled from 'styled-components';

const FormInput = ({ data, register, hasError  }) => {
  // register and hasError are properties of parent
  return (
    <Container>
      <Label> { data.label } </Label>
      <StyledInput 
        {...register(data.label, { required: true})}
        placeholder={ data.placeHolder }
        hasError={ hasError }
      />
    </Container>
  )
}

export default FormInput;

const Container = styled.div`
  margin-top: 20px; 
`

const Label = styled.label`
  font-size: 32px; 
  color: darkblue; 
  padding-left: 5px;
  text-transform: capitalize;
`
  
  const StyledInput = styled.input`
  width: 100%; 
  min-height: 40px;
  height: 40px;
  font-size: 24px; 
  padding: 5px 5px 2px 5px;
  border: 0px;
  border-bottom: 1px solid darkblue;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-size: 18px; 
  }
`