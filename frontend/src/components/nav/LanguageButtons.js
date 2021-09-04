import styled from 'styled-components';
import { useLanguageContext } from '@/context/LanguageContext';

const LanguageButtons = () => {

	const language = useLanguageContext(); 
	console.log('Lang: ', language); 

	return (
		<Container>
			<Span> EN </Span>
			<CenterDivider></CenterDivider>
			<Span> ES </Span>
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