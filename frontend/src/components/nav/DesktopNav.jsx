import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@/components/generic/Box'
import NavModal from './NavModal'

function DesktopNav() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Container>
      <Box display="flex" justify="flex-end">
        <Box width="125px" onMouseEnter={handleMouseEnter}>
          Get Involved
        </Box>
        <Box width="125px" onMouseEnter={handleMouseEnter}>
          Resources
        </Box>
        <Box width="100px">Home</Box>
        <Box width="100px">Login</Box>
      </Box>

      {anchorEl && <NavModal anchorEl={anchorEl} />}
    </Container>
  )
}

export default DesktopNav

const Container = styled.div`
  width: 100vw;
  background-color: white;
  padding: 30px;
  position: relative;
  font-size: 18px;
`
