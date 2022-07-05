import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

NavModal.propTypes = {
  anchorEl: PropTypes.object.isRequired,
}

function NavModal({ anchorEl }) {
  const { offsetLeft } = anchorEl
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const [left, setLeft] = useState(offsetLeft)

  console.log('innerWidth: ', innerWidth)

  useEffect(() => {
    const updateSize = debounce(() => setInnerWidth(window.innerWidth), 50)

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    setLeft(offsetLeft)
  }, [innerWidth])

  return <Container left={left}>working and working</Container>
}

export default NavModal

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
`
