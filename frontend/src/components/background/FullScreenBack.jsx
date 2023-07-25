import Image from 'next/image'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

import TitleWithBackground from '../generic/TitleWithBackground'

const FullScreenBack = ({ src, children, titleInfo, height }) => {
  const t = useLocale() === 'en' ? en : es
  const { text, backgroundColor, color, show } = titleInfo

  const blurDataUrl = 'LKDvT59~E2af~pIuNHodIVt6s:WC'
  const { headline } = t[text] || { headline: '' }

  return (
    <OuterWrapper>
      <Container {...{ height }}>
        <Image
          alt={`image-source-${src}`} // TODO: add alt props to images.
          priority={true}
          src={src}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={blurDataUrl}
          style={{ 
            zIndex: '-1', 
            position: 'absolute' 
          }}
        />
        <div style={{ zIndex: 10, position: 'relative' }}>{children}</div>
      </Container>

      {show && (
        <TitleContainer className="titleContainer">
          <TitleWithBackground
            text={headline}
            backgroundColor={backgroundColor}
            color={color}
            absolute
            marginBottom
          />
        </TitleContainer>
      )}
    </OuterWrapper>
  )
}

export default FullScreenBack

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
  min-height: ${(props) => (props.height ? props.height : '70vh')};
  background-color: azure;
  overflow-x: hidden;
`

const TitleContainer = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 60px;
`
