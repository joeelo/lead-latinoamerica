import styled from 'styled-components';
import Link from 'next/link';

const BlueLinkButton = ({ text, hrefLocation }) => {
  return (
    <Container>
      {/* <Link> */}
        { text }
      {/* </Link> */}
    </Container>
  )
}

export default BlueLinkButton;

const Container = styled.div`
  height: 50px; 
  width: 200px; 
  font-size: 26px; 
  color: white; 
  background-color: #0077B6;
  display: flex; 
  align-items: center; 
  text-align: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px; 
`