'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import styled from 'styled-components'

import FullScreenBack from '@/components/background/FullScreenBack'
import VideoBackground from '@/components/background/VideoBackground'
import Footer from '@/components/footer/Footer'
import FadeInText from '@/components/generic/FadeInText'
import NavBar from '@/components/nav/NavBar'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

const HomeScreenPage = () => {
  const quote = useGetRandomQuote()
  const isMobile = useMediaQuery('(max-width:768px)')
  const isTablet = useMediaQuery('(max-width:1008px)')
  const t = useLocale() === 'en' ? en : es

  const mobileColumnFlex = isMobile ? 'column' : 'row'

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

        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" minHeight={700} >
          <Box width={!isMobile ? '50%' : '100%'} p={4} maxWidth={650} sx={{ marginRight: [0, 0, 4, 4, 4]}}>
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

          <Box display="flex" alignItems="center" justifyContent="center" mb={isMobile ? 4 : 0}>
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

      <Box display="flex" mt={2} flexWrap='wrap' minHeight={750}>
        <Box width={!isTablet ? '60%' : '100%'} minHeight='35vw'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hari-nandakumar-fbJr86YN574-unsplash.jpg" alt="mission mural" width="100%" height="100%" style={{ minHeight: '100%' }}/>
        </Box>

        <Box bgcolor='#1C68F0' width={!isTablet ? '40%' : '100%'} px={5} py={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex}>
            <Typography variant="h1">
              {/* https://kinsta.com/blog/css-text-outline/ */}
              <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                80%
              </span>
            </Typography>
            <Typography pl={2} fontSize={22} color="white" textAlign={isMobile ? 'center' : 'left'}>
              of students graduate from Mission high. 
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex}>
            <Typography variant="h1" pl={6}>
              {/* https://kinsta.com/blog/css-text-outline/ */}
              <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                58%
              </span>
            </Typography>
            <Typography pl={2} fontSize={22} color="white" textAlign={isMobile ? 'center' : 'left'}>
              Percentage of graduates who meet UC/CSU entrance requirements
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex}>
            <Typography variant="h1" pl={3}>
              {/* https://kinsta.com/blog/css-text-outline/ */}
              <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                25%
              </span>
            </Typography>
            <Typography pl={2} fontSize={22} color="white" textAlign={isMobile ? 'center' : 'left'}>
              SAT 12th grade college readiness rate
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex} mt={isMobile ? 5 : 0}>
            <Typography pl={2} fontSize={22} color="white">
              We aim to bring this number to 
            </Typography>
            <Typography variant="h1" pl={3}>
              {/* https://kinsta.com/blog/css-text-outline/ */}
              <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                100%
              </span>
            </Typography>
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
