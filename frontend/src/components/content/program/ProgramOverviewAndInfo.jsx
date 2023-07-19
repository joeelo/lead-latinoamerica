import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Button from '@/components/buttons/Button'
import ExternalLink from '@/components/generic/ExternalLink'
import { UpdateUsersSavedPrograms } from '@/fetch/user/UserRequests'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/overview.json'
import es from '@/language/locales/es/overview.json'
import getToast from '@/utils/getToast'

import Tiles from './Tiles'

const ProgramOverviewAndInfo = ({ 
  program, 
  email, 
  preview 
}) => {
  const t = useLocale() === 'en' ? en : es
  const isEnglish = useLocale() === 'en'
  
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleClick = async () => {
    const response = await UpdateUsersSavedPrograms(email, program._id)
    if (response.success) {
      getToast({ message: 'Successfully saved to profile!' })
    } else {
      getToast({
        message: 'Something went wrong, check the logs!',
        variant: 'error',
      })
    }
  }

  const getProgramBioInLocale = () => {
    if (!program.bioEs) {
      return program.bio
    }

    if (!isEnglish && program.bioEs) {
      return program.bioEs
    }

    return program.bio
  }

  new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const expDate = new Date(program.expirationDate).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
      <Box
        display='flex'
        width='95%'
        maxWidth={1200}
        padding='40px 20px'
        margin='0 auto'
        justifyContent='space-between'
        flexDirection={isMobile ? 'column-reverse' : 'inherit'}
      >
        <Box width={isMobile ? '90%' : '50%'}>
          <Typography
            fontWeight={600}
            fontSize={isMobile ? 48 : 72}
            mt={isMobile ? 2.5 : 0}
          > 
            {t.overview} 
          </Typography>

          <Typography fontSize={20}> {getProgramBioInLocale()} </Typography>

          {!preview ? (
            <Box display={!isMobile ? 'flex' : 'inherit'}>
              {program.partnerUrl && (
                <ExternalLink href={program.partnerUrl} bgColor="#0055B6">
                  {t.signUp}
                </ExternalLink>
              )}

              <Button
                label={t.saveToProfile}
                color="#0055B6"
                onClick={handleClick}
                style={{ marginTop: 40}}
              />
            </Box>
          ) : (
            <Button label={t.signUp}></Button>
          )}
        </Box>

        <Box width="40%">
          <Typography 
            variant="h3" 
            mt={2.5} 
            style={{ 
              textDecoration: 'underline', 
              fontWeight: 300 
            }}
          > 
              {t.categories} 
          </Typography>
          <Tiles adjectives={program.helpsWith} />

          {program.expirationDate && (
            <>
              <Typography 
                variant="h3" 
                mt={2.5} 
                style={{ 
                  textDecoration: 'underline', 
                  fontWeight: 300 
                }}  
              > 
                {t.deadline} 
              </Typography>
              <Typography>{expDate}</Typography>
            </>
          )}
        </Box>
      </Box>
  )
}

export default ProgramOverviewAndInfo

