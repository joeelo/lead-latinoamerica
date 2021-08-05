import styled from 'styled-components';

const CenterFlexContainer = ({
  children, 
  backgroundColor, 
  padding, 
  maxWidth, 
  minHeight, 
  paddingTop,
  align
}) => {

  return (
    <FullScreenContainerForBackground
      backgroundColor={ backgroundColor }
      paddingTop={ paddingTop }
    >
      <Container 
        padding={ padding }
        maxWidth={ maxWidth }
        minHeight={ minHeight } 
        paddingTop={ paddingTop }
        align={ align }
      >
        { children }
      </Container>
    </FullScreenContainerForBackground>
  )
}

export default CenterFlexContainer; 

const FullScreenContainerForBackground = styled.div`
  display: flex; 
  min-width: 100vw; 
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'white' };
  margin: 0 auto; 
  padding: ${ props => props.paddingTop ? '100px 0 0 0' : '0' }; 
`

const Container = styled.div`
  width: 95%;
  position: relative; 
  margin: 0 auto;
  display: flex; 
  align-items: ${ props => {
    if (props.align === 'center') return 'center'; 
    return 'baseline';
  }};
  padding-top: ${ props => {
    if (props.padding === 'padTop') return `100px`;
    if (props.padding === 'extraPad') return `140px`;
    if (props.padding) return `${props.padding}px`;
    return 0;
  }};
  padding-bottom: ${ props => props.padding ? `${props.padding}px` : '0'};
  justify-content: space-around; 
  max-width: ${ props => props.maxWidth ? props.maxWidth : '1200px' };
  min-height: ${ props => props.minHeight ? props.minHeight : '400px' };
  flex-wrap: wrap; 
`
