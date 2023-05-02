import styled from 'styled-components';
import Image from 'next/image';
import PropTypes from 'prop-types';

const ContentWithSideImage = ({ text, backgroundColor, imageSrc, textColor }) => {
	return (
		<Container bgColor={ backgroundColor }>
				<Section> 
					{text.map((sentence) => 
						<P key={sentence} textColor={textColor}> {sentence} <br/></P>
					)} 
				</Section>
				
				<ImageContainer>
					<Image src={`${imageSrc}`} layout='fill' quality='100' objectFit='cover'/>
				</ImageContainer>
		</Container>
	)
}

ContentWithSideImage.propTypes = {
	text: PropTypes.array, 
	backgroundColor: PropTypes.string, 
	imageSrc: PropTypes.string, 
	textColor: PropTypes.string
}

ContentWithSideImage.defaultProps = {
	text: [],
	backgroundColor: '#000000', 
	imageSrc: '/', 
	textColor: 'white',
}



export default ContentWithSideImage;

const Container = styled.div`
	width: 100%; 
	display: flex; 
	max-width: 1000px; 
	width: 90%; 
	justify-content: space-between; 
	padding-bottom: 60px; 
	align-items: center; 

	@media screen and (max-width: 768px) {
		flex-direction: column; 
	}
`


const Section = styled.div`
	width: 48%; 
	display: flex; 
	flex-direction: column;
	margin-top: 40px; 

	p {
		font-size: 24px; 
	}

	@media screen and (max-width: 768px) {
		width: 100%; 

		p { 
			font-size: 18px;
		}
	}
`

const ImageContainer = styled.div`
	width: 48%; 
	height: 600px;
	max-width: 48%;
	position: relative;
	margin-top: 40px;

	@media screen and (max-width: 768px) {
		max-width: 95%;
		width: 100%;
		max-height: 400px;
	}
`

const P = styled.p`
	color: ${ props => props.textColor };
	margin-bottom: 20px; 
	font-size: 26px; 
`
