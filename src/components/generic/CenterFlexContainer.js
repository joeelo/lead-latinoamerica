import styled from 'styled-components';

const CenterFlexContainer = ({
  children, 
  backgroundColor, 
  padding, 
  maxWidth, 
  minHeight
}) => {
  return (
    <Container 
      backgroundColor={ backgroundColor }
      padding={ padding }
      maxWidth={ maxWidth }
      minHeight={ minHeight } 
    >
      { children }
    </Container>
  )
}

export default CenterFlexContainer; 

const Container = styled.div`
  width: 95%;
  margin: 0 auto; 
  position: relative; 
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  display: flex; 
  align-items: center; 
  justify-content: center; 
  max-width: ${ props => props.maxWidth ? props.maxWidth : '100vw' };
  min-height: ${ props => props.minHeight ? props.minHeight : 0 };
`