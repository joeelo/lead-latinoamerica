import Box from '@/components/generic/Box'
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/nav/NavBar'
import { ThemeContext } from 'styled-components'
import { useContext } from 'react'

const ThanksPartnerPage = () => {
  const theme = useContext(ThemeContext)

  return (
    <>
      <NavBar />
      <Box align="center" justify="center" mt="100px" center>
        <ChangingBackgroundText
          text="Hooray! Thanks for Joining Us!"
          fontSize="24px"
          initialColor={theme.colors.white}
          secondaryColor={theme.colors.darkBlue}
          fontColorInitial={theme.colors.darkBlue}
          fontColorSecondary={theme.colors.cultured}
          onlyRunOneTransition={true}
        />

        <Box display="flex" wrap="true" justify="center">
          <span
            style={{ margin: 40, fontSize: 24, maxWidth: 500 }}
            width="al-fu"
          >
            Thanks so much for submitting your info! We will review your request
            and get back to you shortly!
          </span>
        </Box>
      </Box>
      
      <Footer />
    </>
  )
}

export default ThanksPartnerPage
