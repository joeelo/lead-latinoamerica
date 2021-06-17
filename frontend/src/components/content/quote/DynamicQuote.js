import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';

const DynamicQuote = () => {
	
	const theme = useContext(ThemeContext);
	
	return (
		<CenterFlexContainer backgroundColor={theme.colors.darkBlue} align='center'>
			<Container>
				<QuoteText>
					Education is the most powerful weapon which you could use to change the world. 
				</QuoteText>
				<br/>
				<QuoteAuthor>
					- Nelson Mandela
				</QuoteAuthor>
			</Container>

		</CenterFlexContainer>
	)
}

// export default withTheme(DynamicQuote);
export default DynamicQuote;

const Container = styled.div`
	display: flex; 
	margin: 0 auto; 
	flex-direction: column;
	color: white;
	font-size: 34px; 
`

const QuoteText = styled.span`
	width: 100%; 
	text-align: center;
`

const QuoteAuthor = styled.span`
	text-align: right; 
	width: 100%; 
`