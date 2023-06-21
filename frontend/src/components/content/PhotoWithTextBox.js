import Box from '@/components/generic/Box'
import getDiff from '@/utils/getDiff'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const PhotoWithTextBox = ({
  program: { name = '', coverImage, bio, href, expirationDate },
}) => {
  const router = useRouter()
  const clickHandler = () => {
    router.push(`${router.asPath}/${href.toLowerCase()}`)
  }

  const now = new Date().toISOString()
  const diff = expirationDate && getDiff(expirationDate, now)

  const isInNextTwoWeeks = Math.abs(diff.days) < 14

  const truncatedString = bio.length < 150 ? bio : `${bio.slice(0, 150)}...`
  const imageSrc = coverImage || '/images/pexels-cottonbro-6209356.jpg'

  return (
    <Box display="flex" align="center" justify="center">
      <Container onClick={clickHandler}>
        <PhotoWithTextOverlay>
          <StyledImage src={imageSrc} />
          <RightAlignedText>{name}</RightAlignedText>

          {isInNextTwoWeeks && (
            <StyledBellImage src="/images/bell-icon-white.png" />
          )}
        </PhotoWithTextOverlay>
        <Bio> - {truncatedString} </Bio>
        <Link
          href={`/resources/[resourceSlug]/[programSlug]`}
          as={`${router.asPath}/${href}`}
        >
          <StyledAnchor> explore {name} </StyledAnchor>
        </Link>
      </Container>
    </Box>
  )
}

export default PhotoWithTextBox

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 550px;
  max-width: 400px;
  width: 30%;
  box-shadow: 1px 2px 15px 0px rgba(184, 177, 184, 0.5);
  border-radius: 4px;
  padding-bottom: 15px;
  margin-bottom: 40px;
  transition: 0.2s ease-in-out all;
  max-height: 550px;
  margin: 20px;

  :hover {
    cursor: pointer;
    box-shadow: 4px 5px 17px 5px rgba(184, 177, 184, 0.7);
  }

  @media screen and (max-width: 768px) {
    min-height: 550px;
    min-width: 100%;
  }
`

const PhotoWithTextOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  text-align: right;
  margin-bottom: 20px;
  min-height: 300px;
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
  padding: 20px;
  padding-top: 5px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`

const StyledAnchor = styled.a`
  margin-top: auto;
  display: block;
  cursor: pointer;
  font-size: 20px;
  color: inherit;
  text-decoration: none;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`

const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 4px 4px 0 0;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const StyledBellImage = styled.img`
  bottom: 10px;
  right: 10px;
  width: 40px;
  position: absolute;
`
