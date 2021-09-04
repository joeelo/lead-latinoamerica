import styled from 'styled-components';
import { useLanguageContext } from '@/context/LanguageContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LanguageButtons = () => {

	const language = useLanguageContext(); 
	const router = useRouter(); 

	const handleClick = () => {
		router.push('/', '/', { locale: 'es' });
	}

	useEffect(() => {
		const timer = setTimeout(( ) => {
			router.push('/', '/', { locale: 'es' });
		}, 3000); 
		return () => clearTimeout(timer);
	}, [])

	return (
		<Container>
			<Span onClick={ handleClick }> EN </Span>
			<CenterDivider></CenterDivider>
			<Span onClick={ handleClick }> ES </Span>
		</Container>
	)
}

export default LanguageButtons;

const Container = styled.div`
	display: flex; 
	align-items: center;
	margin-bottom: 20px; 
`

const Span = styled.span`
	font-size: 34px;
	cursor: pointer;
`

const CenterDivider = styled.div`
	height: 20px; 
	width: 2px; 
	background-color: black; 
	margin: 0 10px; 
`