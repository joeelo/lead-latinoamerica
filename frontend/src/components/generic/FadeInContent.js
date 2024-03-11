/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'

import useOnScreen from '@/hooks/useOnScreen'

const FadeInContent = ({
  children,
  onlyRunOneTransition = true,
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
      {animate && (
        <Box
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
          position: 'relative',
        }}
      >
        {children}
      </Box>
      )}
    </Box>
  )
}

export default FadeInContent
