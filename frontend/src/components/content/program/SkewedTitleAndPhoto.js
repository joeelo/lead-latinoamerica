import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';

const SkewedTitleAndPhoto = ({ program }) => {

  const coverImage = program.coverImage || '';
  return (
    <Container>
      <TextContainer>
        <Heading> { program.name } </Heading>
        <MissionStatement> { program.missionStatement } </MissionStatement>
      </TextContainer>
      <ImageContainer>
        { program.coverImage && 
          <Image 
            src={ `${ coverImage }` }
            layout='fill'
            objectFit='cover'
            objectPosition='center' 
            quality={100}
            loading='eager'
          />
        }
      </ImageContainer>
    </Container>
  )
}

export default SkewedTitleAndPhoto;

const Container = styled.div`
  width: 100%; 
  min-height: 600px; 
  display: flex; 
  overflow: hidden;
`

const TextContainer = styled.div`
  width: 40%; 
  min-height: 100%; 
  background-color: #07004D;
  color: white;
  display: flex; 
  position: relative;
  z-index: 100;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  padding-left: 100px; 
  padding-top: 60px;

  &:after {
    width: 100%;
    background-color: #07004D;
    position: absolute;
    content: "";
    transform: rotate(-20deg);
    transform-origin: bottom right;
    right: -65%; 
    top: -65%; 
    height: 200%; 
    z-index: 10;
  }

  h2, p, span {
    z-index: 100;
  }
`

const ImageContainer = styled.div`
  width: 60%; 
  position: relative; 
`

const UnderlinedProgram = styled.p`
  font-size: 20px; 
  text-decoration: underline; 
`

const Heading = styled.h2`
  font-size: 68px; 
`

const MissionStatement = styled.p`
  font-size: 26px; 
  line-height: 34px; 
`

const CategoriesContainer = styled.div`
  
`