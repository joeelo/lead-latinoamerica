import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';

const Signup = () => {

  const theme = useContext(ThemeContext);

  return (
    <>
      <NavBar />
        <Container>
          <PhotoWithText>
            <Title>
              Sign in to <br/>
              Lead With Us
            </Title>
          </PhotoWithText>

          <Column>
            <ChangingBackgroundText 
              initialColor={ theme.colors.cultured }
              secondaryColor={ theme.colors.darkBlue }
              text={ 'Sign In' }
              fontColorInitial={ theme.colors.darkBlue }
              fontColorSecondary={ theme.colors.cultured }
              maxWidth='400px'
            />
          </Column>
        </Container>
      <Footer />
    </>
  )
}

export default Signup; 

const Container = styled.div`
  display: flex; 
`

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
`