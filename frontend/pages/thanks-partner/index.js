import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import DaConfetti from '@/components/confetti/DaConfetti'
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'

const ThanksPartnerPage = () => {
  const theme = useTheme()

  return (
    <Box position="relative" height="100vh">
      <DaConfetti />

      <Box align="center" justifyContent="center" mt="100px">
        <ChangingBackgroundText
          text="Hooray! Thanks for Joining Us!"
          fontSize="24px"
          initialColor={theme.colors.white}
          secondaryColor={theme.colors.darkBlue}
          fontColorInitial={theme.colors.darkBlue}
          fontColorSecondary={theme.colors.cultured}
          onlyRunOneTransition={true}
        />

        <Box display="flex" justifyContent="center">
          <span
            style={{ margin: 40, fontSize: 24, maxWidth: 500 }}
            width="al-fu"
          >
            Thanks so much for submitting your info! We will review your request
            and get back to you shortly!
          </span>
        </Box>
      </Box>
    </Box>
  )
}

export default ThanksPartnerPage
