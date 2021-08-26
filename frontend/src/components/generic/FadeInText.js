import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import useOnScreen from '@/hooks/useOnScreen';

const FadeInText = ({ textArray, onlyRunOneTransition }) => {

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

	}, [isOnScreen]);

	return (
		<Container ref={ref}>
		
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

`

const Container = styled.div`
	width: auto; 
`

const P = styled.p`

`