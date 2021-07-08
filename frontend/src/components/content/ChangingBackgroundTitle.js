import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const ChangingBackgroundText = ({ fontSize, initialColor, secondaryColor, text }) => {
	return (
		<Container>
			<StyledSpan> { text } </StyledSpan>
			<InnerContainer 
				fontSize={ fontSize }
				initialColor={ initialColor }
				secondaryColor={ secondaryColor }
			>
			</InnerContainer>
		</Container>
	)
}

export default ChangingBackgroundText;

ChangingBackgroundText.propTypes = {
	fontSize: PropTypes.any, 
	intialColor: PropTypes.string, 
	secondaryColor: PropTypes.string,
}

ChangingBackgroundText.defaultProps = {
	fontSize: null, 
	intialColor: '#222', 
	secondaryColor: 'white',
}

const slideRight = keyframes`
	0% {
		width: 0%; 
	}
	30% {
		width: 15%; 
	}
	100% {
		width: 100%; 
	}
`

const Container = styled.div`
	margin: 0 auto; 
	padding: 20px; 
	font-size: ${ props => props.fontSize ? props.fontSize : '24px' };
	font-weight: ${ props => props.fontWeight ? '700' : '400' };
	position: relative; 
	width: 90%;
	max-width: 300px; 
	display: flex; 
	align-items: center; 
	justify-content: center; 
	padding: 20px; 
`

const InnerContainer = styled.div`
	position: absolute; 
	height: 100%; 
	left: 0; 
	top: 0; 
	background-color: 
	width: 0%;
	animation-name: ${ slideRight }; 
	animation-duration: 3s;
	animation-fill-mode: forwards;
	background-color: ${ props => props.secondaryColor }; 
	// animation-fill-mode: forwards;
`

const StyledSpan = styled.span`
	z-index: 10;
`
