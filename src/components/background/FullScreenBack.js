import styled from 'styled-components';
import Image from 'next/image';

const FullScreenBack = ({src, children}) => {
  return (
    <Container>
      <Image 
        src={src}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        style={{zIndex: -1, position: 'absolute'}}
      />
      <div style={{zIndex: 10, position: 'relative'}}>
        { children }
      </div>
    </Container>
  )
}

export default FullScreenBack;

const Container = styled.div`
  position: relative; 
  min-width: 100vw; 
  min-height: 90vh;
  background-color: azure; 
`