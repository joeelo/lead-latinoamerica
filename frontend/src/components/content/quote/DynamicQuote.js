import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import useGetRandomQuote from '@/hooks/useGetRandomQuote'

const DynamicQuote = () => {
  const theme = useTheme()
  const quote = useGetRandomQuote()
  const isMobile = useMediaQuery('(max-width:768px)')

  const fontSize = isMobile ? 24 : 32

  return (
    <Box
      backgroundColor={theme.colors.darkBlue}
      alignItems="center"
      minHeight="250px"
      justifyContent="center"
      display="flex"
      fontFamily="Montserrat"
    >
      <Box
        flexDirection="column"
        display="flex"
        color="white"
        p={1.5}
        justifyContent="center"
        maxWidth={isMobile ? '95%' : '90%'}
      >
        <Typography fontSize={fontSize}>{quote?.text}</Typography>
        <Typography textAlign="right" fontSize={fontSize - 4} fontWeight={300}>
          - {quote?.author}
        </Typography>
      </Box>
    </Box>
  )
}

export default DynamicQuote
