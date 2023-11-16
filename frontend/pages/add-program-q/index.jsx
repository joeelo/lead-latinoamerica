import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
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
          <Box p={4}>
            <Typography>
              Question 1 out of 6
            </Typography>
            <Typography variant='h1' fontWeight={600}>
              What is the name of the program?
            </Typography>
          </Box>
        </Box>
        <Box width="50%" display="flex"  bgcolor='rgb(245, 245, 245)'  alignItems="center" p={4}>
          <TextField sx={{
            '.MuiInputBase-input': {
              minHeight: '75px', 
              fontSize: 48, 
            }
          }}/>
        </Box>
      </Box>
    </>
  )
}