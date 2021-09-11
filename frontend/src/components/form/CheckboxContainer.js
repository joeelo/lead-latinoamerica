import styled from 'styled-components';
import FormCheckbox from '@/components/form/FormCheckbox';

const CheckboxContainer = ({ data, register }) => {
	return (
		<Container>
			{ data.label }
			{
				data.options.map(option => 
					<FormCheckbox 
						key={ option } 
						option={ option } 
						label={ data.label }
						register={ register }
					/>
				) 
			}
		</Container>
	)
}

export default CheckboxContainer; 


const Container = styled.div`
	width: 100%; 
	margin-top: 20px; 
	display: flex; 
	flex-direction: column; 
	font-size: 26px;

	::first-child {
		margin-bottom: 10px;
	}
`