import Box from '@mui/material/Box'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import useMousePosition from '@/hooks/useMousePosition'

Popover.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
}

function Popover({ anchorEl, setAnchorEl, children }) {
  const updateInnerWidth = useMemo(() => {
    debounce(() => setInnerWidth(window.innerWidth), 25)
  }, [])

  const containerRef = useRef(null)
  const mousePosition = useMousePosition()

  const { offsetLeft } = anchorEl

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [left, setLeft] = useState(offsetLeft)

  useEffect(() => {
    window.addEventListener('resize', updateInnerWidth)
    return () => {
      window.removeEventListener('resize', updateInnerWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLeft(offsetLeft)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerWidth, anchorEl])

  const containerPosition = useMemo(() => {
    if (!containerRef.current) {
      return {}
    }

    const containerPositionAttributes =
      containerRef.current.getBoundingClientRect()

    return {
      top: containerPositionAttributes.top,
      left: containerPositionAttributes.left,
      bottom: containerPositionAttributes.bottom,
      right: containerPositionAttributes.right,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, innerWidth])

  useEffect(() => {
    if (!anchorEl) {
      return null
    }

    const { left, bottom, right } = containerPosition
    const { mouseX, mouseY } = mousePosition

    if (mouseX < left || mouseX > right || mouseY > bottom) {
      setAnchorEl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition])

  return (
    <Box
      position="absolute"
      transition="0.4s ease-in-out all"
      zIndex={100000}
      bgcolor="white"
      top="70px"
      boxShadow="4px 15px 12px 7px rgba(0, 0, 0, 0.15)"
      padding="20px"
      cursor="auto"
      borderRadius={2}
      left={left}
      ref={containerRef}
    >
      {children}
    </Box>
  )
}

export default Popover
