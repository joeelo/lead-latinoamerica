import styled from 'styled-components';
import Hamburger from '@/components/nav/Hamburger';

const NavBar = () => {
  return (
    <>
      <Hamburger />
    </>
  )
}

export default NavBar;

const Container = styled.div`
  width: 100vw;
  height: 100px; 
  background-color: white; 
`