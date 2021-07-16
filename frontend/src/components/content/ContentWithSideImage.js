import styled from 'styled-components';
import CenterFlexContainer from '../generic/CenterFlexContainer';
import Image from 'next/image';
import PropTypes from 'prop-types';

const ContentWithSideImage = ({ children, bgColor, imageSrc }) => {
	return (
		<Container bgColor={ bgColor }>
			<ChangingTItle></ChangingTItle>
			<CenterFlexContainer bgColor={ bgColor }>
				<TextSection> { children } </TextSection>
				<ImageContainer>
					<Image src={ imageSrc } layout='fill' quality='100' objectFit='cover'/>
				</ImageContainer>
			</CenterFlexContainer>
		</Container>
	)
}

ContentWithSideImage.propTypes = {
	children: PropTypes.any, 
	bgColor: PropTypes.string, 
	imageSrc: PropTypes.string, 
}

ContentWithSideImage.defaultProps = {
	children: {}, 
	bgColor: '#000000', 
	imageSrc: '/', 
}



export default ContentWithSideImage;

const Container = styled.div`
	width: 100vw; 
	display: flex; 
	max-width: 1000px; 
	width: 90%; 
	justify-content: space-between; 

	@media screen and (max-width: 768px) {
		flex-direction: column; 
	}

`

const TextSection = styled.div`
	width:  48%; 
`

const ImageContainer = styled.div`
	width: 48%; 
	min-height: 400px;

`

