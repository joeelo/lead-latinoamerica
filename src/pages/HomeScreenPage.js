import styled from 'styled-components';
import NavBar from '@/components/nav/NavBar';
import FullScreenBack from '@/components/background/FullScreenBack';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';


const HomeScreenPage = () => {
  return (
    <>
      <NavBar />
      <FullScreenBack src='/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg'>
        <PortalTitleContainer>
          <PortalTitle>Web Portal</PortalTitle>
          <PortalSubTitle>Powered by LEAD.Latinoamérica</PortalSubTitle>
        </PortalTitleContainer>
        <MainTitleContainer>
          <MainTitleFirstLine>Connecting students to</MainTitleFirstLine>
          <MainTitleSecondLine>opportunities in the community</MainTitleSecondLine>
        </MainTitleContainer>
        <CenterFlexContainer>

        </CenterFlexContainer>
      </FullScreenBack>
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
`

const PortalSubTitle = styled.h3`
  font-size: 26px; 
  position: relative; 
  top: -15px;
  left: 30px;
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
`

const MainTitleFirstLine = styled(MainTitle)`
  left: 0; 
`

const MainTitleSecondLine = styled(MainTitle)`
  left: 30px; 
  top: -20px;
`