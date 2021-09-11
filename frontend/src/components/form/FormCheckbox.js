import { useState } from 'react';
import styled from 'styled-components'; 

const FormCheckbox = ({ option, register }) => {
	
	const [ checked, setChecked ] = useState(false);
	const label = option; 
	console.log('register: ', register);

	const changeHandler = (event) => {
		setChecked(!checked);
	}

	return (
		<Container>
			<input
				name={ option }
				value={ option }
				checked={ checked }
				type='checkbox'
				onChange={ changeHandler }
				{...register(option)}
			/>
			<Label>
				{ label }
			</Label>
		</Container>
	)
}

export default FormCheckbox; 

const Container = styled.div`
	display: flex; 
`

const Label = styled.label`
	margin-left: 10px;
	font-size: 26px;
`