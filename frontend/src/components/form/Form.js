import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/form/FormInput';

const Form = ({ formData, objKey }) => {
  const { register, handleSubmit } = useForm(); 
  const data = formData[objKey];
  return (
    <Container>
      <Title> { data.formTitle } </Title>
      { data.list.map((obj, index) => {
        return <FormInput key={index} data={obj}/>
      })}
    </Container>
  )
}

export default Form;

const Container = styled.div`
  margin-left: 50px; 
  margin-top: 50px; 
  box-shadow: 10px 10px 25px -4px rgba(0,0,0,0.5);
  min-width: 300px; 
  width: 50vw; 
  min-height: 600px; 
  max-width: 800px; 
  border-radius: 10px;
  padding: 20px;
  display: flex; 
  flex-direction: column;

`

const Title = styled.h2`
  font-size: 48px; 
  color: darkblue; 
  font-weight: normal;
`