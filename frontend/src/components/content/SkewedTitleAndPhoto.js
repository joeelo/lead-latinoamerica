import styled from 'styled-components';
import fakeData from '@/data/fakeData';
import Image from 'next/image';

const SkewedTitleAndPhoto = () => {
  return (
    <Container>
      <TextContainer></TextContainer>
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
  align-items: center;
  position: relative;

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
`

const ImageContainer = styled.div`
  width: 60%; 
  position: relative; 
`

const Header = styled.h2`
  font-size: 68px; 
`