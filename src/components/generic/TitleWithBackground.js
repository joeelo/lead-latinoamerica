import styled from 'styled-components';

const TitleWithBackground = ({ 
  text, 
  topOffset, 
  opacity, 
  color
}) => {
  return (
    <Title>
      { text }
    </Title>
  )
}

export default TitleWithBackground; 

const Title = styled.h2`
  margin: 0 auto; 
  top: ${ props => props.topOffset ? props.topOffset : 'auto' };
  padding: 20px; 
  width: 95%; 
  max-width: 800px; 
  background-color: 
`