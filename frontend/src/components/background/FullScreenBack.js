import styled from 'styled-components'
import Image from 'next/image'
import TitleWithBackground from '../generic/TitleWithBackground'
import PropTypes from 'prop-types'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

const FullScreenBack = ({ src, children, titleInfo, height }) => {
	const t = useLocale() === 'en' ? en : es
	const { text, backgroundColor, color, show } = titleInfo

	const blurDataUrl = 'data:image/png;base64,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'


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
					placeholder='blur'
					blurDataURL={blurDataUrl}
				/>
				<div style={{ zIndex: 10, position: 'relative' }}>
					{ children }
				</div>
			</Container>

			{show &&
				<TitleContainer className='titleContainer'>
					<TitleWithBackground 
						text={t[text].headline} 
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