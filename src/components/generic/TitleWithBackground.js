import styled from 'styled-components';

const TitleWithBackground = ({ 
  text, 
  topOffset, 
  opacity, 
  color, 
  backgroundColor, 
}) => {
  return (
    <Title 
      backgroundColor={ backgroundColor }
      topOffset={topOffset}
    >
      { text }
    </Title>
  )
}

export default TitleWithBackground; 

const Title = styled.h2`
  margin: 0 auto; 
  position: relative;
  top: ${ props => props.topOffset ? props.topOffset : 'auto' };
  padding: 20px; 
  width: 95%; 
  max-width: 800px; 
  font-size: 68px; 
  text-align: center;
  background-color: ${ props => props.backgroundColor ? propss.backgroundColor : 'white' };
`