import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import NavBar from '@/components/nav/NavBar';
import FullScreenBack from '@/components/background/FullScreenBack';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import TitleWithBackground from '@/components/generic/TitleWithBackground';
import FlexContentBox from '@/components/content/FlexContentBox';
import Footer from '@/components/footer/Footer';


const HomeScreenPage = () => {

  const theme = useContext(ThemeContext);
  console.log('CULTURED: ', theme.colors);

  const opportunityInfo = [
    { 
      title: 'Scholarships', 
      text:'Find scholarships to help fund your educational journey.', 
      footer: 'See our Scholarship Opportunities',
      svg: '/images/svg/scholarship-svgrepo-com.svg'
    }, 
    {
      title: 'Summer', 
      text:'Find a summer opportunity that allows you to connect with peers while building on your educational and professional experience.', 
      footer: 'See our Summer Opportunities',
      svg: '/images/svg/summer-svgrepo-com.svg'
    }, 
    {
      title: 'Internships',
      text:'Browse through internship opportunities that will allow you to build on your professional experience.', 
      footer: 'See our Internship Opportunities',
      svg: '/images/svg/learning-svgrepo-com.svg'
    }, 
    {
      title: 'Programs',
      text:'Select from a broad range of programs in your community that will help you thrive.', 
      footer: 'See our Program Opportunities',
      svg: '/images/svg/online-class-svgrepo-com.svg'
    }, 
  ]

  const recentlyPosted = [
    { 
      title: 'Opportunity 1 ', 
      text:'Check out this opportunity ', 
      footer: 'See our Scholarship Opportunities'
    }, 
    {
      title: 'Opportunity 2', 
      text:'This is another one. This information is not necessary right now.', 
      footer: 'See our Summer Opportunities'
    }, 
    {
      title: 'Opportunity 3 ',
      text:'This is the last one, ', 
      footer: 'See our Internship Opportunities'
    },  
  ]

  return (
    <>
      <NavBar />
      <FullScreenBack 
        src='/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg'
        // titleInfo={{
        //   text: 'Opportunities', 
        //   show: true,
        // }}
      >
        <PortalTitleContainer>
          <PortalTitle>Web Portal</PortalTitle>
          <PortalSubTitle>Powered by LEAD.Latinoamérica</PortalSubTitle>
        </PortalTitleContainer>

        <MainTitleContainer>
          <MainTitleFirstLine>Connecting students to</MainTitleFirstLine>
          <MainTitleSecondLine>opportunities in the community</MainTitleSecondLine>
        </MainTitleContainer>
        
      </FullScreenBack>

      <CenterFlexContainer backgroundColor={ theme.colors.cultured } padding={'padTop'}>
        {
          opportunityInfo.map(info => <FlexContentBox 
            key={ info.title } 
            size={ 'halves' } 
            content={ info } 
            color={ theme.white }
            backgroundColor={ theme.white }
          />)
        }
      </CenterFlexContainer>

      <FullScreenBack src={ '/images/hari-nandakumar-fbJr86YN574-unsplash.jpg' }>
        <TitleWithBackground text={ 'Recently Posted' } topOffset={ 100 } marginBottom={ true }/>
        <CenterFlexContainer padding={ 100 } backgroundColor={ 'rgba(0, 0, 0, 0)' }>
          {
            recentlyPosted.map(info => (
              <FlexContentBox 
                key={ info.title } 
                size={ 'thirds' } 
                content={ info } 
                minHeight={ 400 }
              />
            ))
          }
        </CenterFlexContainer>
      </FullScreenBack>
      <Footer />
    </>
  )
}

export default HomeScreenPage;

const PortalTitleContainer = styled.div`
  position: relative; 
  left: 20px; 
  top: 20px;
  max-width: 90vw;
`

const PortalTitle = styled.h2`
  font-size: 68px;
  
  @media screen and (max-width: 768px) {
    font-size: 34px;
  }
`

const PortalSubTitle = styled.h3`
  font-size: 26px; 
  position: relative; 
  top: -15px;
  left: 30px;

  @media screen and (max-width: 768px) {
    font-size: 22px; 
    top: 0px;
    left: 0;
    line-height: 20px; 
  }
`

const MainTitleContainer = styled.div`
  position: relative; 
  top: 100px;
  left: 20px;
  max-width: 90vw;
`

const MainTitle = styled.h1`
  color: white; 
  font-size: 68px;
  position: relative; 

  @media screen and (max-width: 768px) {
    font-size: 34px; 
  }
`

const MainTitleFirstLine = styled(MainTitle)`
  left: 0; 
`

const MainTitleSecondLine = styled(MainTitle)`
  top: -20px;

  @media screen and (max-width: 768px) {
    top: 0;
  }
`
