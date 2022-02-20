import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import Button from '@/components/generic/Button';
import { useSession, signIn } from 'next-auth/client';
import Box from '@/components/generic/Box';

const Signup = () => {

  const theme = useContext(ThemeContext);
  
  //session comes back with google info - https://github.com/nextauthjs/next-auth
  const [ session ] = useSession(); 

  return (
    <>
      <NavBar />
        <Box stackOnMobile display="flex" >
          <PhotoWithText>
            <Title>
              Sign in to <br/>
              Lead With Us
            </Title>
          </PhotoWithText>

          <Column>
            <ChangingBackgroundText 
              initialColor={theme.colors.cultured}
              secondaryColor={theme.colors.darkBlue}
              text='Sign In'
              fontColorInitial={theme.colors.darkBlue}
              fontColorSecondary={theme.colors.cultured}
              maxWidth='400px'
              onlyRunOneTransition
            />
            {!session ? (
              <>
                <LoginButton onClick={() => signIn('google', {
                  callbackUrl: '/', 
                })}>
                  <GoogleLogo src='/images/google-logo.png'/>
                  Sign in with Google
                </LoginButton>
                <Span>Don't have an account?</Span>
              </>
            ): (
              <span style={{marginTop: 20, fontSize: 24}}>Your signed in!</span>
            )}
    
          </Column>
        </Box>
      <Footer />
    </>
  )
}

export default Signup; 

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
    width: 100%;
    padding-top: 60px;
    margin-bottom: 60px;
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

const Span = styled.span`
  margin-top: 40px; 
  font-weight: bold; 
  font-size: 18px; 
`
