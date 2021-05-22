import styled from 'styled-components';

const SlidePanel = ({ navOpen }) => {

  console.log(navOpen);

  return (
    <Container navOpen={ navOpen }>
          open;
    </Container>
  )
}

export default SlidePanel;

const Container = styled.nav`
  z-index: 10000; 
  background-color: white; 
  width: 400px; 
  height: 100vh;
  position: absolute; 
  left: ${ props => props.navOpen === false ? '-400px' : '0'}; 
  padding: 10px;
  transition: .4s ease-in-out;

`