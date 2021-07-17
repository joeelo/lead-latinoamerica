import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import useOnScreen from '@/hooks/useOnScreen';

const ChangingBackgroundText = ({ fontSize, initialColor, secondaryColor, text }) => {

	const ref = useRef(); 
	const [ changeTextColor, setChangeTextColor ] = useState(false);
	const isOnScreen = useOnScreen(ref);

	console.log('isOnScreen: ', isOnScreen);

	useEffect(() => {
		const timer = setTimeout(() => {
			setChangeTextColor(true);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);
	
	return (
		<Container ref={ ref } >
			<>
				<StyledHeading 
					textColor={ changeTextColor } 
					isOnScreen={ isOnScreen }
					style={{ color: isOnScreen === true ? 'black' : 'white'}}
				> 
					{ text } 
				</StyledHeading>
				<InnerContainer 
					fontSize={ fontSize }
					initialColor={ initialColor }
					secondaryColor={ secondaryColor }
					isOnScreen={ isOnScreen }
				>
				</InnerContainer>
			</>
				
			
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
	max-width: 500px; 
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
	animation-name: ${props => props.isOnScreen ? slideRight : null }; 
	animation-duration: 3s;
	animation-fill-mode: forwards;
	background-color: ${ props => props.secondaryColor }; 
	// animation-fill-mode: forwards;
`

const StyledHeading = styled.h2`
	z-index: 10;
	transition: 3s ease-in all;
	color: ${ props => props.isOnScreen === true ? 'black' : 'white'}; 
`
