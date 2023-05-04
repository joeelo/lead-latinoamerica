import { useContext } from 'react'
import CenterFlexContainer from '@/components/generic/CenterFlexContainer'
import styled, { ThemeContext } from 'styled-components'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'

const DynamicQuote = () => {
	
	const theme = useContext(ThemeContext)
	const quote = useGetRandomQuote() 
	
	return (
		<CenterFlexContainer backgroundColor={theme.colors.darkBlue} align='center' minHeight='300px'>
			<Container>
				<QuoteText>
					{ quote?.text }
				</QuoteText>
				<br/>
				<QuoteAuthor>
					- { quote?.author }
				</QuoteAuthor>
			</Container>

		</CenterFlexContainer>
	)
}

export default DynamicQuote;

const Container = styled.div`
	display: flex; 
	margin: 0 auto; 
	flex-direction: column;
	color: white;
	font-size: 34px; 

	@media screen and (max-width: 768px) {
		padding: 0 10px;
	}
`

const QuoteText = styled.span`
	width: 100%; 
	text-align: center;
`

const QuoteAuthor = styled.span`
	text-align: right; 
	width: 100%; 
`