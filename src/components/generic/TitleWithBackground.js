import styled from 'styled-components';

const TitleWithBackground = ({ 
  text, 
  topOffset, 
  opacity, 
  color, 
  backgroundColor, 
}) => {
  return (
    <TitleContainer topOffset={topOffset}>
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
`

const Title = styled.h2`
  margin: 0 auto; 
  position: relative;
  padding: 20px; 
  width: 95%; 
  max-width: 800px; 
  font-size: 68px; 
  text-align: center;
  z-index: 2;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
`