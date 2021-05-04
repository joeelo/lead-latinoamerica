import styled from 'styled-components';

const TitleWithBackground = ({ 
  text, 
  topOffset, 
  opacity, 
  color, 
  backgroundColor, 
  marginBottom
}) => {
  return (
    <TitleContainer topOffset={ topOffset } marginBottom={ marginBottom }>
      <Title backgroundColor={ backgroundColor }>
        { text }
      </Title>
    </TitleContainer>
  )
}

export default TitleWithBackground; 

const TitleContainer = styled.div`
  top: ${ props => props.topOffset ? `${props.topOffset}px` : 'auto' };
  background-color: rgba(0, 0, 0, 0);
  display: flex; 
  position: relative;
  justify-content: center;
  width: 100vw; 
  margin-bottom: ${props => props.marginBottom ? '80px' : 0};

`

const Title = styled.h2`
  margin: 0 auto; 
  position: relative;
  padding: 20px; 
  width: 90vw; 
  max-width: 800px; 
  font-size: 68px; 
  text-align: center;
  z-index: 2;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    font-size: 34px;
  }

`