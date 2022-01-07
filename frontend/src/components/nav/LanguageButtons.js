import styled from 'styled-components';
import { useRouter } from 'next/router';

const LanguageButtons = () => {

	const router = useRouter(); 

	const handleClick = (lang) => {
		const { asPath } = router;
		router.push(`/${lang}${asPath}`, `/${lang}${asPath}`, { locale: lang, shallow: true });
	}

	return (
		<Container>
			<Span onClick={ () => handleClick('en') }> EN </Span>
			<CenterDivider></CenterDivider>
			<Span onClick={ () => handleClick('es') }> ES </Span>
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