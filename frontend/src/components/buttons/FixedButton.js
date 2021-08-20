import styled from 'styled-components'; 
import { findProgramAndUpdate } from '@/fetch/requests';

const FixedButton = ({ approve, deny, text, bgColor, href }) => {

	const handleClick = () => {
		if (approve || deny) {
			const bool = approve ? true : false
			findProgramAndUpdate({}, `program/edit/${href}/${bool}`);
		}
	}

	return (
		<Button onClick={ handleClick } {...{ bgColor, approve }}>
			{ text }
		</Button>
	)
}

export default FixedButton;

const Button = styled.div`
	position: fixed; 
	top: ${ props => props.approve ? '100px' : '160px'};
	right: 100px; 
	width: 100px; 
	padding: 10px; 
	width: 150px;
	text-align: center;
	background-color: ${ props => props.bgColor };
	z-index: 10000;
	color: white; 
	border-radius: 4px; 
	font-size: 18px;
	transition: .4s ease-in-out all; 

	:hover {
		cursor: pointer;
		background-color: ${ props => props.bgColorHover }; 
	}
`