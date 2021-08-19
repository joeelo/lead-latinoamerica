import styled from 'styled-components'; 

const FixedButton = ({ approve, deny, text, bgColor }) => {

	const handleClick = () => {
		console.log('clicked');
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
	top: ${ props => props.approve ? '100px' : '150px'};
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

	:hover {
		cursor: pointer;
	}
`