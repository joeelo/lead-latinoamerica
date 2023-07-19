import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import useGetRandomQuote from '@/hooks/useGetRandomQuote'

const DynamicQuote = () => {
  const theme = useContext(ThemeContext)
  const quote = useGetRandomQuote()

  return (
    <Box
      backgroundColor={theme.colors.darkBlue}
      alignItems="center"
      minHeight="300px"
      justifyContent="center"
      display="flex"
    >
      <Box
        flexDirection="column"
        display="flex"
        color="white"
        p={1.5}
        maxWidth={800}
        justifyContent="center"
      >
        <Typography fontSize={34}>{quote?.text}</Typography>
        <Typography textAlign="right" fontSize={34}>- {quote?.author}</Typography>
      </Box>
    </Box>
  )
}

export default DynamicQuote
