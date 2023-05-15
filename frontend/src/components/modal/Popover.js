import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import useMousePosition from '@/hooks/useMousePosition'

Popover.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
}

function Popover({ anchorEl, setAnchorEl, children }) {
  const updateInnerWidth = useMemo(() => {
    debounce(() => setInnerWidth(window.innerWidth), 50)
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
    <Container left={left} ref={containerRef}>
      {children}
    </Container>
  )
}

export default Popover

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  transition: 0.4s ease-in-out all;
  opacity: ${(props) => (props.left ? 1 : 0)};
  background-color: white;
  z-index: 1000;
  top: 70px;
  box-shadow: 5px 5px 6px -2px rgba(0, 0, 0, 0.5);
  padding: 20px;
  cursor: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
`
