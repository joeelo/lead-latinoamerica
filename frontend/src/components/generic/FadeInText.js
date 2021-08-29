import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import useOnScreen from '@/hooks/useOnScreen';

const FadeInText = ({ textArray, onlyRunOneTransition, fontSize }) => {

	const [ animate, setAnimation ] = useState(false);
	const ref = useRef(); 
	const isOnScreen = useOnScreen(ref); 

	useEffect(() => {
		if (isOnScreen && onlyRunOneTransition) {
			setAnimation(true);
			return; 
		}
		if (isOnScreen) {
			setAnimation(true);
		}
		if (!isOnScreen && !onlyRunOneTransition) {
			setAnimation(false);
		}

	}, [ isOnScreen ]);

	return (
		<Container ref={ref}>
			{ isOnScreen &&
				<P {...{ fontSize }}> this is some text, should fade in </P>
			}	
		</Container>
	)
}

export default FadeInText; 

FadeInText.propTypes = {
	textArray: PropTypes.array
}

FadeInText.defaultProps = {
	textArray: [],
}

const fadeIn = keyframes`
	0% {
		opacity: 0;
		top: 30px; 
	}
	100% {
		opacity: 1;
		top: 0;
	}
`

const Container = styled.div`
	width: auto; 
	position: relative; 
`

const P = styled.p`
	animation: ${fadeIn} 2s; 
	animation-iteration-count: 1;  
	color: white; 
	position: relative; 
	color: white;
	font-size: ${ props => props.fontSize ? props.fontSize : '24px' };
`