import Image from 'next/image';
import styled from 'styled-components';

const PhotoWithTextBox = ({  
  program: {
    name, 
    photo, 
    bio, 
    href,
  } 
}) => {

  return (
    <Container>
        <PhotoWithTextOverlay>
          <Image 
            src={ photo }
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            style={{ zIndex: -1, position: 'absolute' }}
          />
          <RightAlignedText> { name } </RightAlignedText>
        </PhotoWithTextOverlay> 

      <BioAndLinkContainer>
        <div> { bio } </div>
      </BioAndLinkContainer>
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
  width: 30%;
`

const PhotoWithTextOverlay = styled.div`
  position: relative; 
  width: 100%; 
  height: 300px;
  text-align: right; 
  margin-bottom: 40px;
`

const RightAlignedText = styled.p`
  width: 100px; 
  color: white; 
  font-size: 34px; 
  line-height: 34px; 
  z-index: 10; 
  color: white;
  position: relative;
  text-align: right;
  width: 100%;
  padding-right: 15px;
  padding-top: 15px;
  font-weight: 300;
`

const BioAndLinkContainer = styled.div`
  
`
