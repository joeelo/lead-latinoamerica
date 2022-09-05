import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import { useForm } from 'react-hook-form';
import { postToDatabase } from '@/fetch/requests';
import CheckboxContainer from '@/components/form/CheckboxContainer';
import nestData from '@/data/nestData';
import { useRouter } from 'next/router';


const Form = ({ formData, objKey, endpoint, method, setFormSubmitted, query }) => {
	const { register, handleSubmit, formState: { errors } } = useForm(); 
	const data = formData[objKey];
	const router = useRouter(); 

	const submitHandler = async (data) => {
		const formattedData = formatCheckboxData(data);
		if (!!router.query.dev) {
			return;
		}
		try {
			if (method === 'POST') {
				const response = await postToDatabase(formattedData, endpoint, query);
				if (response.message === 'success') {
					setFormSubmitted(true);
					return response;
				}
			}
		} catch (error) {
				console.log(error);
			}
	}

	const formatCheckboxData = (data) => {
		const list = formData[objKey].list; 
			for (const el of list) {
				if (el.type === 'checkbox') {
					data[el.data] = {};
					const obj = data[el.data];
					const options = el.options;
					for (const option of options) {
						if (data[option]) {
							obj[data[option]] = true;
							delete data[option];
						}						
					}
				}
			}
		return data; 
	}

	const returnInput = (type, index, obj, register, errors) => {
		if (!type) return <FormInput key={ index } data={ obj } register={ register } hasError={ errors }/>
		if (type === 'textArea') return <FormTextarea key={ index } data={ obj } register={ register } hasError={ errors } />
		if (type === 'checkbox') return <CheckboxContainer key={ index } data={ obj } register={ register } />
	}

	return (
		<Container onSubmit={ handleSubmit(submitHandler) }>
			<Title> { data.formTitle } </Title>
			{ data.list.map((obj, index) => returnInput(obj.type, index, obj, register, errors[obj.label]) )}
			<SubmitButton>Submit</SubmitButton>
		</Container>
	)
}

export default Form;

Form.propTypes = {
	formData: PropTypes.object, 
	endpoint: PropTypes.string, 
	method: PropTypes.string, 
	query: PropTypes.object,
}

Form.defaultProps = {
	formData: {}, 
	endpoint: '', 
	method: 'GET', 
	query: {}
}

const Container = styled.form`
	margin-left: 50px; 
	margin-top: 50px; 
	box-shadow: 5px 5px 15px -4px rgba(0,0,0,0.5);
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
	font-size: 18px; 
	cursor: pointer; 
	transition: .2s ease-in-out all;
	font-family: 'Montserrat';

	:hover {
		background-color: #0066ff;
	}
`