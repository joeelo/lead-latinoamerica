import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PhotoWithTextBox = ({  
  program: {
    name, 
    photo, 
    bio, 
    href,
  } 
}) => {

  const router = useRouter();
  console.log('ROUTER: ', router);
  const formattedLink = name.replaceAll(' ', '-');

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

        <Bio> - { bio } </Bio>
        <Link href={`/resources/[resourceSlug]/[programSlug]`} as={`${router.asPath}/${formattedLink}`}>
          <StyledAnchor> explore { name } </StyledAnchor>
        </Link>
    </Container>
  )
}

export default PhotoWithTextBox;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  min-width: 300px; 
  min-height: 500px;
  max-width: 400px;
  width: 30%;
`

const PhotoWithTextOverlay = styled.div`
  position: relative; 
  width: 100%; 
  height: 300px;
  text-align: right; 
  margin-bottom: 20px;
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

const Bio = styled.p`
  font-size: 20px;
  line-height: 26px;
`

const StyledAnchor = styled.a`
  margin-top: auto; 
  display: block;
  cursor: pointer;
  font-size: 20px;
  color: inherit; 
  text-decoration: none;
`
