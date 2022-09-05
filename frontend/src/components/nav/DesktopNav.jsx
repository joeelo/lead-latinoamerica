import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Box from '@/components/generic/Box'
import NavModal from './NavModal'

function DesktopNav() {
  const [anchorEl, setAnchorEl] = useState(null)
  const timer = useRef(null)

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleExternalMouseEnter = () => {
    setAnchorEl(null)
  }

  return (
    <Container>
      <Box display="flex" justify="flex-end" width="100vw" mw="">
        <Box
          width="125px"
          onMouseEnter={handleMouseEnter}
          data-name="Get Involved"
          style={{ cursor: 'pointer' }}
        >
          Get Involved
        </Box>
        <Box
          width="125px"
          onMouseEnter={handleMouseEnter}
          data-name="Resources"
          style={{ cursor: 'pointer' }}
        >
          Resources
        </Box>
        <Box
          width="100px"
          onMouseEnter={handleExternalMouseEnter}
          style={{ cursor: 'pointer' }}
        >
          Home
        </Box>
        <Box
          width="100px"
          onMouseEnter={handleExternalMouseEnter}
          style={{ cursor: 'pointer' }}
        >
          Login
        </Box>
      </Box>

      {<NavModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
    </Container>
  )
}

export default DesktopNav

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 0;
  position: relative;
  font-size: 18px;
`
