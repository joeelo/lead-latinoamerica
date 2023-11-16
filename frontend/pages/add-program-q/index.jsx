import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import NavBar from '@/components/nav/NavBar'

export default function AddProgramSlides() {
  const [currentQuestion, setCurrentQuestion] = useState(1)

  return (
    <>
      <NavBar />

      <Box display="flex" minHeight='90vh'>
        <Box width="50%" display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Typography>
              Question 1 out of 6
            </Typography>
            <Typography variant='h1'>
              first question
            </Typography>
          </Box>
        </Box>
        <Box width="50%" display="flex"  bgcolor='rgb(245, 245, 245)' justifyContent="center" alignItems="center">

        </Box>
      </Box>
    </>
  )
}