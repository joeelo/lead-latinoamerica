import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import useLocale from '@/hooks/useLocale'
import getDiff from '@/utils/getDiff'

const PhotoWithTextBox = ({
  program: { name = '', coverImage, bio, href, expirationDate, bioEs },
}) => {
  const router = useRouter()
  const isEnglish = useLocale() === 'en'
  
  const clickHandler = () => {
    router.push(`/resources/${href.toLowerCase()}`)
  }

  const now = new Date().toISOString()
  const diff = expirationDate && getDiff(expirationDate, now)

  const isInNextTwoWeeks = Math.abs(diff.days) < 14

  const bioInLang = isEnglish ? bio : bioEs

  const truncatedString = bio.length < 150 ? bio : `${bioInLang.slice(0, 150)}...`
  const imageSrc = coverImage || '/images/pexels-cottonbro-6209356.jpg'

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Container onClick={clickHandler}>
        <PhotoWithTextOverlay>
          <StyledImage src={imageSrc} />
          <Typography
            position="absolute"
            color="white"
            fontWeight={500}
            zIndex={10}
            textAlign="right"
            top={0}
            pt={2}
            right={0}
            pr={2}
            fontSize={28}
          >
            {name}
          </Typography>

          {isInNextTwoWeeks && (
            <StyledBellImage src="/images/bell-icon-white.png" />
          )}
        </PhotoWithTextOverlay>
        <Box
          height={215}
          p={1.5}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Typography fontSize={18} mb={4}>
            {' '}
            - {truncatedString}{' '}
          </Typography>
          <Typography fontSize={18}> explore {name} </Typography>
        </Box>
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
