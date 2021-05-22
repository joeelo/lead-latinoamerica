import styled from 'styled-components';
import Hamburger from '@/components/nav/Hamburger';
import { useState, useEffect } from 'react';
import SlidePanel from './SlidePanel';

const NavBar = () => {

  const [ navOpen, setNavOpen ] = useState(false);

  return (
    <Container>
      <Hamburger { ...{ navOpen, setNavOpen } }/>
      <SlidePanel { ...{ navOpen } }/>
    </Container>
  )
}

export default NavBar;

const Container = styled.div`
  width: 100vw;
  background-color: white; 
  position: relative;
  min-height: 70px;
  top: 0;
  z-index: 10000;
`