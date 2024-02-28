'use client'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import styled from 'styled-components'

import FullScreenBack from '@/components/background/FullScreenBack'
import VideoBackground from '@/components/background/VideoBackground'
import ContentWithSideImage from '@/components/content/ContentWithSideImage'
import Footer from '@/components/footer/Footer'
import FadeInText from '@/components/generic/FadeInText'
import NavBar from '@/components/nav/NavBar'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

const HomeScreenPage = () => {
  const theme = useTheme()
  const quote = useGetRandomQuote()
  const isMobile = useMediaQuery('(max-width:600px)')
  const t = useLocale() === 'en' ? en : es

  return (
    <Box position="relative">
      <NavBar />
      <FullScreenBack src="/images/mission-high.jpeg">
        <PortalTitleContainer>
          <Logo src="/images/svg/logo-FFFFFF.svg" />
          <PortalSubTitle>{t.headline2}</PortalSubTitle>
        </PortalTitleContainer>

        <RelativeTextContainer>
          <LargeText>{t.headline3}</LargeText>
          <LargeText>{t.headline4}</LargeText>
        </RelativeTextContainer>
      </FullScreenBack>

      <Box
        pt={3}
        maxWidth={isMobile ? '1200' : '90%'}
        margin='0 auto'
      >
        <Typography variant='h1' fontWeight={500} textAlign='center' mt={4}>
          {t.purpose}
        </Typography>

        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" minHeight={725} >
          <Box width={!isMobile ? '50%' : '100%'} p={4} maxWidth={500} sx={{ marginRight: [0, 0 , 4, 4, 4]}}>
            <Typography mb={3} fontSize={20}>
              {t.purposeArray.sentence1}
            </Typography>
            <Typography mb={3} fontSize={20}>
              {t.purposeArray.sentence2}
            </Typography>
            <Typography mb={3} fontSize={20}> 
              {t.purposeArray.sentence3}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Image 
              src="/images/tony-luginsland-yXnnR9smke0-unsplash.jpg" 
              alt="mission-female-student-graduate" 
              width={400} 
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 12, boxShadow: '15px 15px 12px 7px rgba(0, 0, 0, 0.15)' }}
              height={600}
            />
          </Box>
        </Box>
      </Box>

      <VideoBackground src="/pexels-rodnae-productions-8419363.mp4">
        <Box display="flex" p={isMobile ? 3 : 12}>
          <FadeInText
            onlyRunOneTransition
            textArray={[quote?.text, `- ${quote?.author}`]}
            fontSize={isMobile ? 36 : 48}
            mobileFontSize={36}
          />
        </Box>
      </VideoBackground>

      <Footer showQuote={false} noMarginTop />
    </Box>
  )
}

export default HomeScreenPage

const PortalTitleContainer = styled.div`
  position: relative;
  left: 20px;
  top: 20px;
  max-width: 90vw;
`

const Logo = styled.img`
  max-width: 250px;

  @media screen and (max-width: 768px) {
    font-size: 34px;
  }
`

const PortalSubTitle = styled.p`
  font-size: 16px;
  position: relative;
  top: -10px;
  left: 5px;
  color: white;
  margin-bottom: 45px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    top: 0px;
    left: 0;
    line-height: 20px;
    margin-bottom: 35px;
  }
`

const RelativeTextContainer = styled.div`
  position: relative;
  left: 20px;
  max-width: 90vw;
`

const LargeText = styled.h1`
  color: white;
  font-size: 48px;
  position: relative;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`
