import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import DaConfetti from '@/components/confetti/DaConfetti'
import NavBar from '@/components/nav/NavBar'

export default function CongratsPage() {
  return (
    <Box>
      <DaConfetti />

      <NavBar />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 105px)"
        width="100vw"
        color="white"
        fontWeight="bold"
        sx={{
          // https://codepen.io/P1N2O/pen/pyBNzX
          background:
            'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        }}
      >
        <Box maxWidth={800} textAlign="center">
          <Typography fontSize={90}>THANK YOU!</Typography>
          <Typography fontSize={22} fontWeight={400}>
            We will review the opportunity shortly and reach out if we have any
            questions!
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
