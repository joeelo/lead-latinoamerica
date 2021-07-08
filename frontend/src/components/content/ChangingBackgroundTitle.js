import sytled from 'styled-components';

const ChangingBackgroundText = ({ fontSize, initialColor, secondaryColor }) => {
	return (
		<Container>
			<InnerContainer>

			</InnerContainer>
		</Container>
	)
}

export default ChangingBackgroundText; 

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
	
`

