import React, { useState, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import useMousePosition from '@/hooks/useMousePosition'

Popover.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
}

function Popover({ anchorEl, setAnchorEl, children }) {
  if (!anchorEl) {
    return null
  }

  console.log('ANCHOR EL ', anchorEl)

  const containerRef = useRef(null)
  const mousePosition = useMousePosition()

  const { offsetLeft } = anchorEl

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [left, setLeft] = useState(offsetLeft)

  useEffect(() => {
    const updateSize = debounce(() => setInnerWidth(window.innerWidth), 50)

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    setLeft(offsetLeft)
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
  }, [containerRef.current, innerWidth])

  useEffect(() => {
    const { left, bottom, right } = containerPosition
    const { mouseX, mouseY } = mousePosition

    if (mouseX < left || mouseX > right || mouseY > bottom) {
      setAnchorEl(null)
    }
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
