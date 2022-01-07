import styled from 'styled-components';
import Image from 'next/image';
import TitleWithBackground from '../generic/TitleWithBackground';
import PropTypes from 'prop-types';

const FullScreenBack = ({ src, children, titleInfo, height }) => {

	const loadHandler = () => {
		console.log('loaded');
	}

	return (
		<OuterWrapper>
			<Container {...{ height }}>
				<Image 
					// placeholder="blur"
					// blurDataURL
					src={ src }
					layout='fill'
					objectFit="cover"
					objectPosition="center"
					style={{ zIndex: -1, position: 'absolute' }}
					onLoad={loadHandler}
				/>
				<div style={{ zIndex: 10, position: 'relative' }}>
					{ children }
				</div>
			</Container>

			{ titleInfo.show &&
				<TitleContainer className={'titleContainer'}>
					<TitleWithBackground 
						text={ titleInfo.text } 
						backgroundColor={ titleInfo.backgroundColor } 
						color={ titleInfo.color } 
						absolute={ true }
						marginBottom={ true }
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
	// margin-bottom: 140px;
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