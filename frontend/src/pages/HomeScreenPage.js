import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import FullScreenBack from '@/components/background/FullScreenBack'
import VideoBackground from '@/components/background/VideoBackground'
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'
import ContentWithSideImage from '@/components/content/ContentWithSideImage'
import TitleAndPhotoLinkBox from '@/components/content/TitleAndPhotoLinkBox'
import Footer from '@/components/footer/Footer'
import CenterFlexContainer from '@/components/generic/CenterFlexContainer'
import FadeInText from '@/components/generic/FadeInText'
import NavBar from '@/components/nav/NavBar'
import useGetRandomQuote from '@/hooks/useGetRandomQuote'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/common.json'
import es from '@/language/locales/es/common.json'

const HomeScreenPage = () => {
  const theme = useContext(ThemeContext)
  const quote = useGetRandomQuote()
  const t = useLocale() === 'en' ? en : es

  const opportunityInfo = [
    {
      title: t.scholarships.headline,
      text: t.scholarships.bio,
      footer: t.scholarships.link,
      svg: '/images/svg/scholarship-svgrepo-com.svg',
      link: 'scholarships',
    },
    {
      title: t.summer.headline,
      text: t.summer.bio,
      footer: t.summer.link,
      svg: '/images/svg/summer-svgrepo-com.svg',
      link: 'summer',
    },
    {
      title: t.internships.headline,
      text: t.internships.bio,
      footer: t.internships.link,
      svg: '/images/svg/learning-svgrepo-com.svg',
      link: 'internships',
    },
    {
      title: t.programs.headline,
      text: t.programs.bio,
      footer: t.programs.link,
      svg: '/images/svg/online-class-svgrepo-com.svg',
      link: 'program',
    },
  ]

  return (
    <>
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

      <CenterFlexContainer
        backgroundColor={theme.colors.cultured}
        minHeight="auto"
        padding={60}
      >
        <ChangingBackgroundText
          initialColor={theme.colors.cultured}
          secondaryColor={theme.colors.darkBlue}
          text={t.missionDistrict}
          fontColorInitial={theme.colors.darkBlue}
          fontColorSecondary={theme.colors.cultured}
        />
      </CenterFlexContainer>

      <CenterFlexContainer backgroundColor={theme.colors.cultured}>
        {opportunityInfo.map((info) => (
          <TitleAndPhotoLinkBox
            key={info.title}
            size="halves"
            content={info}
            color={theme.colors.darkText}
            backgroundColor={theme.white}
            minHeight={420}
          />
        ))}
      </CenterFlexContainer>

      <CenterFlexContainer
        backgroundColor={theme.colors.darkBlue}
        padding="padTop"
      >
        <ChangingBackgroundText secondaryColor="white" text={t.purpose} />
        <ContentWithSideImage
          backgroundColor={theme.colors.darkBlue}
          imageSrc={'/images/tony-luginsland-yXnnR9smke0-unsplash.jpg'}
          text={[
            t.purposeArray.sentence1,
            t.purposeArray.sentence2,
            t.purposeArray.sentence3,
          ]}
        />
      </CenterFlexContainer>

      <VideoBackground src="/pexels-rodnae-productions-8419363.mp4">
        <CenterFlexContainer justify="start" align="start" paddingTop>
          <FadeInText
            onlyRunOneTransition={true}
            textArray={[quote?.text, `- ${quote?.author}`]}
            maxWidth="800"
            fontSize={48}
            mobileFontSize={36}
          />
        </CenterFlexContainer>
      </VideoBackground>

      <Footer showQuote={false} />
    </>
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

  @media screen and (max-width: 768px) {
    font-size: 14px;
    top: 0px;
    left: 0;
    line-height: 20px;
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
