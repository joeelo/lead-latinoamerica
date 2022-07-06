import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

NavModal.propTypes = {
  anchorEl: PropTypes.object,
}

function NavModal({ anchorEl }) {
  if (!anchorEl) {
    return null
  }

  const dataName = anchorEl.dataset.name
  const isGetInvolvedButton = dataName === 'Get Involved'
  const isResourceButton = dataName === 'Resources'

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

  return (
    <Container left={left}>
      {isGetInvolvedButton && <>This is the get involved button</>}

      {isResourceButton && <> This is the resource button</>}
    </Container>
  )
}

export default NavModal

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  transition: 0.4s ease-in-out all;
  opacity: ${(props) => (props.left ? 1 : 0)};
`
