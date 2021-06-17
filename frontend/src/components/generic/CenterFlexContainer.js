import styled from 'styled-components';

const CenterFlexContainer = ({
  children, 
  backgroundColor, 
  padding, 
  maxWidth, 
  minHeight, 
  marginTop,
  align
}) => {

  return (
    <FullScreenContainerForBackground
      backgroundColor={ backgroundColor }
    >
      <Container 
        padding={ padding }
        maxWidth={ maxWidth }
        minHeight={ minHeight } 
        marginTop={ marginTop }
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
`

const Container = styled.div`
  width: 95%;
  margin: ${ props => props.marginTop ? '100px auto 0 auto' : '0 auto' }; 
  position: relative; 
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
  max-width: ${ props => props.maxWidth ? props.maxWidth : '1400px' };
  min-height: ${ props => props.minHeight ? props.minHeight : '400px' };
  flex-wrap: wrap; 
`
