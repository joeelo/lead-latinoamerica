/* eslint-disable @next/next/no-img-element */
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import VideoBackground from '@/components/background/VideoBackground'
import FadeInContent from '@/components/generic/FadeInContent'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

import animationData2 from '../../public/lotti/lotti-student-walking.json'
import animationData from '../../public/lotti/lottie-animation-thanhlocgp.json'

export default function HomeScreenPage () {
  const quote = useGetRandomQuote() || {}
  const isMobile = useMediaQuery('(max-width:768px)')
  const isTablet = useMediaQuery('(max-width:1008px)')
  const t = useLocale() === 'en' ? en : es

  const mobileColumnFlex = isMobile ? 'column' : 'row'

  const renderPercent = (percent, text) => {
    return (
      <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex} mb={1} textAlign='center'>
        <Typography variant="h2" fontSize={isMobile ? '42px' : '78px'}>
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
    <>
    <Box>
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
        <Box 
          bgcolor='#1C68F0' 
          px={5} 
          py={8} 
          display="flex" 
          width="100%"
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
        >
          <FadeInContent>
            <Box></Box>
            {renderPercent(80, 'of students graduate from High School in Oakland.')}
            {renderPercent(58, 'Percentage of graduates who meet UC/CSU entrance requirements.')}
            {renderPercent(25, 'SAT 12th grade college readiness rate.')}

            <Box display="flex" alignItems="center" flexDirection={mobileColumnFlex} mt={isMobile ? 5 : 0} textAlign='center'>
              <Typography pl={2} fontSize={40} color="white">
                We aim to bring this number to 
              </Typography>
              <Typography variant="h2" pl={3} fontSize={isMobile ? '50px' : '108px'}>
                {/* https://kinsta.com/blog/css-text-outline/ */}
                <span style={{ WebkitTextStrokeWidth: '1px', color:'#1C68F0', WebkitTextStrokeColor: 'white' }}>
                  100%
                </span>
              </Typography>
            </Box>
          </FadeInContent>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" width="90%" margin="0 auto">
        <FadeInContent>
          <Box 
            p={5} 
            color='#1C68F0' 
            width="100%"
            minHeight={600} 
            mb={isMobile ? - 10 : -15}
            display="flex" 
            alignItems="center" 
            justifyContent="space-around" 
            flexDirection={isTablet ? 'column-reverse' : 'row'}
          >
            <Box mr={isMobile ? '0' : 5}>
              <Typography 
                variant="h2" 
                fontWeight={500}
                sx={{
                  textAlign: 'left', 
                  '@media screen and (max-width: 768px)': {
                    textAlign: 'center',
                    marginTop: 5, 
                  },
                }}
              > Why Lead Exists?</Typography>  
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

            <Box maxWidth={!isTablet ? 400 : 300} marginLeft={isMobile ? '' : 'auto'}>
              {typeof window !== 'undefined' && (
                <Lottie 
                  options={{
                    autoplay: true,
                    animationData: animationData2,
                    
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              )}
            </Box>
          </Box>
        </FadeInContent>

        <FadeInContent>
          <Box 
            color='#1C68F0' 
            mb={5} 
            p={5}
            minHeight={600} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            flexDirection={isTablet ? 'column-reverse' : 'row-reverse'}
          >
            <Box ml={isMobile ? '0' : 10}>
              <Typography 
                variant="h2" 
                fontWeight={500}
                sx={{
                  textAlign: 'left', 
                  '@media screen and (max-width: 768px)': {
                    textAlign: 'center',
                    marginTop: 5, 
                  },
                }}
              > Open Source </Typography>  
              <Box display="flex" alignItems="center" mt={4}>
                <RadioButtonChecked />
                <Typography ml={1.5} fontSize={22}> 
                  We add programs as frequent as possible but any user can add any opportunity they know of.
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={4}>
                <RadioButtonChecked />
                <Typography ml={1.5} fontSize={22}>
                  All programs are active, if you see any that aren&apos;t reach out and we&apos;ll remove it 
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={4}>
                <RadioButtonChecked />
                <Typography ml={1.5} fontSize={22}>It is completely free, and always will be!</Typography>
              </Box>
            </Box>

            <Box maxWidth={!isTablet ? 400 : 300} right='auto'>
              {typeof window !== 'undefined' && (
                <Lottie 
                  options={{
                    loop: true,
                    autoplay: true, 
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                />
              )}
            </Box>
          </Box>
        </FadeInContent>
      </Box>

      <VideoBackground src="/pexels-rodnae-productions-8419363.mp4" height='75vh'>
        <Box display="flex" p={isMobile ? 3 : 12}>
          <FadeInContent>
            <Typography 
              variant="h3" 
              color="white" 
              width="80%" 
              style={{ fontWeight: 300 }}
              sx={{
                fontSize: 48, 
                '@media screen and (max-width: 768px)': {
                  fontSize: 32,
                },
              }}
            >
              {`${quote.text} - `}
              <br />
              <span>
                {quote.author}
              </span>
            </Typography>
          </FadeInContent>
        </Box>
      </VideoBackground>
    </Box>
    </>
  )
}
