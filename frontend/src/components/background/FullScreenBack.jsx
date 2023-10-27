import Box from '@mui/material/Box'
import Image from 'next/image'

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
      <Box 
        position="relative"
        height={height || '70vh'}
        minWidth='100vw'
        bgcolor="azure"
        style={{ overFlowX: 'hidden' }}
      >
        <Image
          alt={`image-source-${src}`} // TODO: add alt props to images.
          priority={true}
          src={src}
          fill
          placeholder="blur"
          blurDataURL={blurDataUrl}
          style={{ 
            position: 'absolute', 
            objectFit: 'cover'
          }}
        />
        <div style={{ zIndex: 10, position: 'relative' }}>{children}</div>
      </Box>

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

