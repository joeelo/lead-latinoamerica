import styled from 'styled-components';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import { useForm } from 'react-hook-form';
import { postToDatabase } from '@/fetch/requests';

const Form = ({ formData, objKey }) => {
	const { register, handleSubmit, formState: { errors } } = useForm(); 
	const data = formData[objKey];

	const submitHandler = async (data) => {
		try {
			const response = await postToDatabase(data, 'program');
			console.log(response);
		} catch (error) {
			console.log('error: ', error);
		}
	}

	return (
		<Container onSubmit={ handleSubmit(submitHandler) }>
			<Title> { data.formTitle } </Title>
			{ data.list.map((obj, index) => {
				return obj.type !== 'textArea' 
				? <FormInput key={ index } data={ obj } register={ register } hasError={ errors[obj.label] }/>
				: <FormTextarea key={ index } data={ obj } register={ register } hasError={ errors[obj.label] } />
			})}
			<SubmitButton>Submit</SubmitButton>
		</Container>
	)
}

export default Form;

const Container = styled.form`
  margin-left: 50px; 
  margin-top: 50px; 
  box-shadow: 10px 10px 25px -4px rgba(0,0,0,0.5);
  min-width: 300px; 
  width: 90vw; 
  min-height: 600px; 
  max-width: 800px; 
  border-radius: 10px;
  padding: 20px;
  display: flex; 
  flex-direction: column;
  margin: 40px auto; 
  background-color: white;

`

const Title = styled.h2`
  font-size: 48px; 
  color: darkblue; 
  font-weight: normal;
`

const SubmitButton = styled.button`
  outline: none; 
  border-radius: 4px; 
  height: 50px; 
  margin-top: 20px; 
  color: white;
  background-color: darkblue;
  border: 0; 
  max-width: 200px; 
  width: 200px;
  margin-left: auto; 
  font-size: 24px; 
  cursor: pointer; 
  transition: .2s ease-in-out;

  :hover {
    background-color: skyblue;
    // color: white;  

  }
`