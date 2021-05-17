import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SkewedTitleAndPhoto = ({ program, router }) => {
  
  let programCategory = ''; 
  if (router.query) {
    programCategory = router.query.resourceSlug; 
  }
  
  if ( !program ) return <></>
  return (
    <Container>
      <TextContainer>
        <UnderlinedProgram> { programCategory } </UnderlinedProgram>
        <Heading> { program.name } </Heading>
        <Bio> { program.bio } </Bio>
      </TextContainer>
      <ImageContainer>
        <Image 
          src='/images/airfocus-K_VeavYEfdA-unsplash.jpg'
          layout='fill'
          objectFit='cover'
          objectPosition='center' 
          quality='100'
        />
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
    top: -50%; 
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

const Bio = styled.p`
  font-size: 26px; 
  line-height: 34px; 
`

const CategoriesContainer = styled.div`
  
`