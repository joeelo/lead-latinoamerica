import styled from 'styled-components';
import Checkbox from './Checkbox';

const CheckboxGroup = ({ options, register }) => {
	return (
		<Container>
			{options.map(opt => 
				<Checkbox 
					key={ opt.value } 
					option={ opt } 
					label={ opt.label }
					register={ register }
				/>
			)}
		</Container>
	)
}

export default CheckboxGroup; 


const Container = styled.div`
	width: 100%; 
	display: flex; 
	flex-direction: column; 
	font-size: 26px;

	::first-child {
		margin-bottom: 10px;
	}
`