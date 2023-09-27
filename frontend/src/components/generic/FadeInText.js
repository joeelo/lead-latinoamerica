/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import useOnScreen from '@/hooks/useOnScreen'

const FadeInText = ({
  textArray,
  onlyRunOneTransition,
  fontSize,
  mobileFontSize,
  maxWidth,
}) => {
  const [animate, setAnimation] = useState(false)
  const ref = useRef()
  const isOnScreen = useOnScreen(ref)
  const [hasBeenOnScreen, setHasBeenOnScreen] = useState(false)

  useEffect(() => {
    if (hasBeenOnScreen) {
      return
    }

    if (isOnScreen && onlyRunOneTransition) {
      setAnimation(true)
      setHasBeenOnScreen(true)

      return
    }
    if (isOnScreen) {
      setAnimation(true)
    }
    if (!isOnScreen && !onlyRunOneTransition) {
      setAnimation(false)
    }
  }, [isOnScreen])

  return (
    <Box ref={ref} maxWidth={maxWidth} width="auto" position="relative">
      {animate &&
        textArray &&
        textArray.map((text) => (
          <Box
            component="p"
            key={text}
            sx={{
              '@keyframes fade-in': {
                '0%': {
                  opacity: 0,
                  top: '30px',
                },
                '100%': {
                  opacity: 1,
                  top: 0,
                },
              },
              animation: 'fade-in 2s',
              animationIterationCount: 1,
              color: 'white',
              position: 'relative',
              fontSize: fontSize || 24,
              '@media screen and (max-width: 768px)': {
                fontSize: mobileFontSize || 20,
              },
            }}
          >
            {text}
          </Box>
        ))}
    </Box>
  )
}

export default FadeInText

FadeInText.propTypes = {
  textArray: PropTypes.array,
}

FadeInText.defaultProps = {
  textArray: [],
}
