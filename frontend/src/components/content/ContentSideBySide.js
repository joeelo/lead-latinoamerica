import styled from 'styled-components';
import CenterFlexContainer from '../generic/CenterFlexContainer';

const ContentSideBySide = ({ bgColor }) => {
	return (
		<Container bgColor={ bgColor }>
			<ChangingTItle></ChangingTItle>
			<CenterFlexContainer bgColor={ bgColor }>

			</CenterFlexContainer>
		</Container>
	)
}

export default ContentSideBySide;

const Container = styled.div`
	width: 100vw; 

`