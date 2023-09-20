import Box from '@mui/material/Box'
import Image from 'next/image'
import styled from 'styled-components'

import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

import TitleWithBackground from '../generic/TitleWithBackground'

export default function FullScreenBack({ 
  src = '', 
  children = '', 
  titleInfo = {}, 
  height, 
  title, 
  noMarginBottom = true, 
}) {
  const t = useLocale() === 'en' ? en : es
  const { text, backgroundColor, color, show } = titleInfo

  const blurDataUrl = 'LKDvT59~E2af~pIuNHodIVt6s:WC'
  const { headline } = (t[text] || { headline: '' } || titleInfo)

  return (
    <Box position="relative" mb={noMarginBottom ? 0 : 10}>
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
            position: 'absolute' 
          }}
        />
        <div style={{ zIndex: 10, position: 'relative' }}>{children}</div>
      </Container>

      {show && (
        <Box 
          bottom={60}
          className="titleContainer"
          position="relative"
          zIndex={10}
        >
          <TitleWithBackground
            text={headline || title}
            backgroundColor={backgroundColor}
            color={color}
            absolute
            marginBottom
          />
        </Box>
      )}
    </Box>
  )
}

const Container = styled.div`
  position: relative;
  min-width: 100vw;
  min-height: ${(props) => (props.height ? props.height : '70vh')};
  background-color: azure;
  overflow-x: hidden;
`
