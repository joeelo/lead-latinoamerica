import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import useGetRandomQuote from '@/hooks/useGetRandomQuote'

const DynamicQuote = () => {
  const theme = useContext(ThemeContext)
  const quote = useGetRandomQuote()
  const isMobile = useMediaQuery('(max-width:768px)')

  const fontSize = isMobile ? 24 : 32

  return (
    <Box
      backgroundColor={theme.colors.cyan}
      alignItems="center"
      minHeight="250px"
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
        <Typography fontSize={fontSize}>{quote?.text}</Typography>
        <Typography textAlign="right" fontSize={fontSize}>- {quote?.author}</Typography>
      </Box>
    </Box>
  )
}

export default DynamicQuote
