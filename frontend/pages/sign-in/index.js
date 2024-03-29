import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { signIn, useSession } from 'next-auth/client'
import styled from 'styled-components'

import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'
import Footer from "@/components/footer/Footer"
import Button from '@/components/generic/Button'
import NavBar from "@/components/nav/NavBar"
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/signIn.json'
import es from '@/language/locales/es/signIn.json'

const Signup = () => {
  const theme = useTheme()
  const t = useLocale() === 'en' ? en : es
  const isEnglish = useLocale() === 'en'
  
  //session comes back with google info - https://github.com/nextauthjs/next-auth
  const [session] = useSession()

  return (
    <Box position="relative" minHeight="100vh" height="100vh" minWidth="100vw">
      <NavBar />
        <Box 
          display="flex" 
          maxWidth="100%" 
          minHeight="65vh"
          sx={{
            flexDirection: { 
              sm: 'column', 
              xs: 'column', 
              md: 'row' }
          }}
        >
          <PhotoWithText>
            <Title>
              {t.signIn} <br/>
              {t.lead}
            </Title>
          </PhotoWithText>

          <Column>
            <ChangingBackgroundText 
              initialColor={theme.colors.cultured}
              secondaryColor={theme.colors.darkBlue}
              text={isEnglish ? 'Sign in' : 'Iniciar sesión'}
              fontColorInitial={theme.colors.darkBlue}
              fontColorSecondary={theme.colors.cultured}
              maxWidth='400px'
              onlyRunOneTransition
            />
            {!session ? (
              <>
                <LoginButton onClick={() => signIn('google', {
                  callbackUrl: '/profile', 
                })}>
                  <GoogleLogo src='/images/google-logo.png'/>
                  {t.googleSignIn}
                </LoginButton>
              </>
            ): (
              <span style={{marginTop: 20, fontSize: 24}}>You&apos;re signed in!</span>
            )}
    
          </Column>
        </Box>
      <Footer noMarginTop/>
    </Box>
  )
}

export default Signup

const PhotoWithText = styled.div`
  width: 60%; 
  min-height: 700px; 
  background-image: url('/images/library-unsplash.jpg');
  background-size: cover; 
  background-position: center center; 
  background-repeat: no-repeat; 
  display: flex; 
  justify-content: center; 

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const Title = styled.h2`
  font-size: 64px; 
  font-weight: 800; 
  color: white; 
  text-align: center; 
  margin-top: 150px;
`

const Column = styled.div`
  flex-direction: column; 
  align-items: center;
  padding-top: 150px; 
  width: 40%; 
  display: flex; 
  @media screen and (max-width: 768px) {
    width: 90%;
    padding-top: 60px;
    margin-bottom: 60px;
    align-items: center;
    justify-content: center;
  }
`

const LoginButton = styled(Button)`
  background-color: white; 
  color: #222;
  width: 400px;
  border: 1px solid #999;
  box-shadow: 3px 8px 9px 0px rgba(184,177,184,1);
  height: 80px;
  position: relative; 
  max-width: 90%;
  
  &:hover {
    box-shadow: 3px 5px 6px -2px rgba(184,177,184,1);
  }
`

const GoogleLogo = styled.img`
  max-width: 30px; 
  max-height: 30px; 
  position: absolute; 
  left: 10px;
  top: 25px;
`
