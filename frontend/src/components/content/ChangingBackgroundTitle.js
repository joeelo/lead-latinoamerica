import sytled from 'styled-components';
import PropTypes from 'prop-types';

const ChangingBackgroundText = ({ fontSize, initialColor, secondaryColor }) => {
	return (
		<Container>
			<InnerContainer>

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
`

const InnerContainer = styled.div`
	position: absolute; 
	height: 100%; 
	left: 0; 
	top: 0; 
	background-color: 
	animation: 1s ${ slideRight } forwards;
	// animation-fill-mode: forwards;
`

