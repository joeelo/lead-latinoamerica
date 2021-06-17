import styled from 'styled-components';
import Link from 'next/link';

const BlueLinkButton = ({ 
  text, 
  hrefFormatted, 
  hrefAs, 
  marginLeft, 
  marginTop 
}) => {


  return (
    <Container>
      <Link href={ hrefFormatted } as={`${ hrefAs }`}>
        <Span> { text } </Span>
      </Link>
    </Container>
  )
}

export default BlueLinkButton;

const Container = styled.div`
  height: 60px; 
  width: 250px; 
  font-size: 26px; 
  color: white; 
  background-color: #0077B6;
  display: flex; 
  align-items: center; 
  text-align: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
  transition: .2s ease-in-out;

  :hover {
    background-color: #07004D; 
  }
`

const Span = styled.span`
  color: white; 
`