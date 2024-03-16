/* eslint-disable @next/next/no-img-element */
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

import VideoBackground from '@/components/background/VideoBackground'
import Footer from '@/components/footer/Footer'
import FadeInContent from '@/components/generic/FadeInContent'
import NavBar from '@/components/nav/NavBar'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

export default function HomeScreenPage () {
  const quote = useGetRandomQuote() || {}
  const isMobile = useMediaQuery('(max-width:768px)')
  const isTablet = useMediaQuery('(max-width:1008px)')
  const t = useLocale() === 'en' ? en : es

  const mobileColumnFlex = isMobile ? 'column' : 'row'

  const renderPercent = (percent, text) => {
    return (
      <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex} mb={1} textAlign='center'>
        <Typography variant="h2">
          {/* https://kinsta.com/blog/css-text-outline/ */}
          <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
          {`${percent}%`}
          </span>
        </Typography>
        <Typography pl={2} fontSize={22} color="white" textAlign={isMobile ? 'center' : 'left'}>
          {text}
        </Typography>
      </Box>
    )
  }

  return (
    <Box position="relative">
      <NavBar />
      <VideoBackground src="/images/pexels-offrideli-14623516.mp4">
        <Box
          position= 'relative'
          left='20px'
          top='20px'
          max-width='90vw'
        >
          <img alt="lead" style={{ maxWidth: 250 }} src="/images/svg/logo-FFFFFF.svg" />
          <Typography
            sx={{
              fontSize: '16px',
              position: 'relative',
              top: '-10px',
              left: '5px',
              color: 'white',
              marginBottom: '45px',
              '@media screen and (max-width: 768px)': {
                fontSize: '14px',
                top: 0,
                left: 0,
                linHeight: '20px',
                marginBottom: '35px',
              }
            }}
          >
            {t.headline2}
          </Typography>
        </Box>

        <Box
          position='relative'
          left='20px'
          max-width='90vw'
          color="white"
        >
          <Box
            sx={{
              fontSize: '36px', 
              position: 'relative', 
              '@media screen and (max-width: 768px)': {
                fontSize: '18px',
              },
            }}
          >
            <h2>{t.headline3}</h2>
            <h2>{t.headline4}</h2>
          </Box>
        </Box>
      </VideoBackground>

      <Box
        pt={3}
        maxWidth={isMobile ? '1200' : '90%'}
        margin='0 auto'
      >
        <FadeInContent>
          <Typography variant='h2' fontWeight={500} textAlign='center' mt={4}>
            {t.purpose}
          </Typography>
        </FadeInContent>

        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" minHeight={700} >
          <Box width={!isMobile ? '50%' : '100%'} p={4} maxWidth={650} sx={{ marginRight: [0, 0, 4, 4, 4]}}>
            <FadeInContent>
              <Typography mb={3} fontSize={22}>
                {t.purposeArray.sentence1}
              </Typography>
              <Typography mb={3} fontSize={22}>
                {t.purposeArray.sentence2}
              </Typography>
              <Typography mb={3} fontSize={22}> 
                {t.purposeArray.sentence3}
              </Typography>
            </FadeInContent>
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

      <Box display="flex" mt={isMobile ? 5 : 2} flexWrap='wrap' minHeight={700}>
        <Box width={!isTablet ? '60%' : '100%'} minHeight='35vw'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hari-nandakumar-fbJr86YN574-unsplash.jpg" alt="mission mural" width="100%" height="100%" style={{ minHeight: '100%' }}/>
        </Box>

        <Box 
          bgcolor='#1C68F0' 
          width={!isTablet ? '40%' : '100%'} 
          px={5} 
          py={8} 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
        >
          <FadeInContent>
            <Box></Box>
            {renderPercent(80, 'of students graduate from Mission high.')}
            {renderPercent(58, 'Percentage of graduates who meet UC/CSU entrance requirements.')}
            {renderPercent(25, 'SAT 12th grade college readiness rate.')}

            <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex} mt={isMobile ? 5 : 0} textAlign='center'>
              <Typography pl={2} fontSize={22} color="white">
                We aim to bring this number to 
              </Typography>
              <Typography variant="h2" pl={3}>
                {/* https://kinsta.com/blog/css-text-outline/ */}
                <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                  100%
                </span>
              </Typography>
            </Box>
          </FadeInContent>
        </Box>
      </Box>

      <Box 
        p={5} 
        color='#1C68F0' 
        mb={5} 
        minHeight={600} 
        maxWidth='80%'
        display="flex" 
        mr="auto"
        ml="auto"
        alignItems="center" 
        justifyContent="space-around" 
        flexDirection={isTablet ? 'column-reverse' : 'row'}
      >
        <FadeInContent>
          <Box>
            <Typography variant="h2" fontWeight={500}> Why Lead Exists?</Typography>  
            <Box display="flex" alignItems="center" mt={4}>
              <RadioButtonChecked />
              <Typography ml={1.5} fontSize={22}> We want every parent to know what their child can qualify for</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={4}>
              <RadioButtonChecked />
              <Typography ml={1.5} fontSize={22}> Every kid deserves a chance at all opportunities available</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={4}>
              <RadioButtonChecked />
              <Typography ml={1.5} fontSize={22}> To bridge the gap between information and application</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={4}>
              <RadioButtonChecked />
              <Typography ml={1.5} fontSize={22}> To break down language barriers and make all information accessible</Typography>
            </Box>
          </Box>
        </FadeInContent>

        <Box maxWidth={!isTablet ? 600 : 400} marginLeft='auto'>
          <img src="/images/backpack-rochak-shukla.jpg" alt="backpack-svg" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </Box>
      </Box>

      <VideoBackground src="/pexels-rodnae-productions-8419363.mp4" height='75vh'>
        <Box display="flex" p={isMobile ? 3 : 12}>
          <FadeInContent>
            <Typography variant="h2" color="white" width="80%">
              {`${quote.text} - ${quote.author}`}
            </Typography>
          </FadeInContent>
        </Box>
      </VideoBackground>

      <Footer showQuote={false} noMarginTop />
    </Box>
  )
}
