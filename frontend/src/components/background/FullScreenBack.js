import styled from 'styled-components';
import Image from 'next/image';
import TitleWithBackground from '../generic/TitleWithBackground';
import PropTypes from 'prop-types';

const FullScreenBack = ({ src, children, titleInfo, height }) => {

	const { text, backgroundColor, color, show } = titleInfo

	return (
		<OuterWrapper>
			<Container {...{ height }}>
				<Image 
					className=".next-image"
					priority={true}
					src={src}
					layout='fill'
					objectFit="cover"
					objectPosition="center"
				/>
				<div style={{ zIndex: 10, position: 'relative' }}>
					{ children }
				</div>
			</Container>

			{show &&
				<TitleContainer className='titleContainer'>
					<TitleWithBackground 
						text={text} 
						backgroundColor={backgroundColor} 
						color={color} 
						absolute
						marginBottom
					/>
				</TitleContainer>
			}
		</OuterWrapper>
	)
}

export default FullScreenBack;

FullScreenBack.propTypes = {
	src: PropTypes.string, 
	children: PropTypes.node, 
	titleInfo: PropTypes.object, 
	height: PropTypes.string,
}

FullScreenBack.defaultProps = {
	src: '', 
	children: '', 
	titleInfo: {}, 
}

const OuterWrapper = styled.div`
	position: relative;
	margin-bottom: 100px;
`

const Container = styled.div`
	position: relative; 
	min-width: 100vw; 
	min-height: ${ props => props.height ? props.height : '70vh'};
	background-color: azure; 
	overflow-x: hidden;
`

const TitleContainer = styled.div`
	position: absolute;
	z-index: 10;
	bottom: 60px;
`