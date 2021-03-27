import styled from 'styled-components';
import Hamburger from '@/components/nav/Hamburger';

const NavBar = () => {
  return (
    <Container>
      <Hamburger />
    </Container>
  )
}

export default NavBar;

const Container = styled.div`
  width: 100vw;
  background-color: white; 
  position: relative;
  min-height: 70px;
`