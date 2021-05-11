import Image from 'next/image';
import styled from 'styled-components';

const PhotoWithTextBox = ({ src = '/'}) => {

  return (
    <Container>
      <PhotoWithTextOverlay>
        <Image 
          src={src}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          style={{zIndex: -1, position: 'absolute'}}
        />
        <RightAlignedText> Working </RightAlignedText>

      </PhotoWithTextOverlay>
      <div>working</div>
    </Container>
  )
}

export default PhotoWithTextBox;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  min-width: 300px; 
  min-height: 400px;
  max-width: 400px;
  position: relative;
`

const PhotoWithTextOverlay = styled.div`
  position: relatve; 
  width: 100%; 
  min-height: 200px;
  text-align: right; 
`

const RightAlignedText = styled.p`
  width: 100px; 
  color: white; 
  font-size: 26px; 
  line-height: 34px; 
`
