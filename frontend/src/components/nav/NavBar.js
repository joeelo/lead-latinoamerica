import styled from 'styled-components';
import Hamburger from '@/components/nav/Hamburger';
import { useState } from 'react';
import SlidePanel from './SlidePanel';

const NavBar = () => {

  const [ navOpen, setNavOpen ] = useState(false);

  return (
    <>
      <PlaceHolderContainer></PlaceHolderContainer>
      <Container>
        <Hamburger { ...{ navOpen, setNavOpen } }/>
        <SlidePanel { ...{ navOpen } }/>
      </Container>
    </>
  )
}

export default NavBar;

const Container = styled.div`
  width: 100vw;
  background-color: white; 
  position: fixed;
  min-height: 70px;
  top: 0;
  z-index: 100000;
`

const PlaceHolderContainer = styled.div` // To take up the fixed height at the top of page and force content down
  height: 70px; 
  width: 100vw; 
  background-color: white; 
  z-index: 1000;
`