import styled from 'styled-components'

const ProgramTitleAndPhoto = ({ program }) => {
  const coverImage =
    program.coverImage || '/images/pexels-cottonbro-6209356.jpg'
  return (
    <Container>
      <TextContainer>
        <Heading> {program.name} </Heading>
        <MissionStatement> {program.missionStatement} </MissionStatement>
      </TextContainer>
      
      <ImageContainer>
        <StyledImage
          src={`${coverImage}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </ImageContainer>
    </Container>
  )
}

export default ProgramTitleAndPhoto

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`

const TextContainer = styled.div`
  width: 40%;
  min-height: 100%;
  background-color: #07004d;
  color: white;
  display: flex;
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and min(width: 1000px) {
    &:after {
      width: 100%;
      background-color: #07004d;
      position: absolute;
      content: '';
      transform: rotate(-20deg);
      transform-origin: bottom right;
      right: -65%;
      top: -65%;
      height: 200%;
      z-index: 10;
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
  }

  @media screen and (max-width: 768px) {
    padding-top: 20px;
  }

  h2,
  p,
  span {
    z-index: 100;
  }
`

const ImageContainer = styled.div`
  width: 60%;
  position: relative;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`

const Heading = styled.h2`
  font-size: 58px;
  line-height: 60px;
  margin-bottom: 5px;
  width: 80%;

  @media screen and (max-width: 768px) {
    font-size: 48px;
  }
`

const MissionStatement = styled.p`
  font-size: 26px;
  line-height: 34px;
  max-width: 90%;

  @media screen and (max-width: 1000px) {
    margin-top: 20px;
  }
`

const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 4px;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;

  @media screen and (max-width: 1000px) {
    object-fit: cover;
    position: relative;
    height: 400px;
    margin-bottom: -10px;
  }
`
