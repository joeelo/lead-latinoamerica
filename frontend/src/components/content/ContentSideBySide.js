import styled from 'styled-components';
import CenterFlexContainer from '../generic/CenterFlexContainer';
import Image from 'next/image';

const ContentSideBySide = ({ bgColor }) => {
	return (
		<Container bgColor={ bgColor }>
			<ChangingTItle></ChangingTItle>
			<CenterFlexContainer bgColor={ bgColor }>
				<TextSection></TextSection>
				<ImageContainer></ImageContainer>
			</CenterFlexContainer>
		</Container>
	)
}

export default ContentSideBySide;

const Container = styled.div`
	width: 100vw; 
`
