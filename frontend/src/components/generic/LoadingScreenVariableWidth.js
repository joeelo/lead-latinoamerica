import { useState, useEffect } from "react";
import styled from 'styled-components';

const LoadingScreenVariableWidth = () => {

	const words = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];
	const [ currentIndex, setCurrentIndex ] = useState(-1);

	useEffect(() => {
		const interval = setInterval(() => {
			let newIndex = currentIndex + 1;
			if (newIndex === words.length)  newIndex = 0; 
			setCurrentIndex(newIndex);
		}, 300);
		return () => clearInterval(interval);
	}, [ currentIndex ])
	
	return (
		<Container>
			{ words.map((letter, index) => {
				return <LetterDiv key={ letter } currentLetter={ currentIndex === index }>{ letter }</LetterDiv>
			})}
		</Container>
	)
}	

export default LoadingScreenVariableWidth; 

const Container = styled.div`
	display: flex; 
	align-items: center; 
	justify-content: center; 
	min-height: 100vh; 
	min-width: 100vw; 
`

const LetterDiv = styled.div`
	padding: 10px 4px; 
	font-size: 64px; 
	transition: .6s ease-in-out all; 
	font-weight: ${ props => props.currentLetter ? '900' : '300' };
`