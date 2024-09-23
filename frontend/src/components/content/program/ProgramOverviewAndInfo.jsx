import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import Button from '@/components/buttons/Button'
import ExternalLink from '@/components/generic/ExternalLink'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/overview.json'
import es from '@/language/locales/es/overview.json'
import UserRequests from '@/requests/UserRequests'
import getToast from '@/utils/getToast'

import Tiles from './Tiles'

export default function ProgramOverviewAndInfo({ 
  program, 
  email, 
  preview 
}) {
  const t = useLocale() === 'en' ? en : es
  const isEnglish = useLocale() === 'en'
  const isMobile = useMediaQuery('(max-width:600px)')
  const [session] = useSession()
  const router = useRouter()

  const handleClick = async () => {
    const response = await UserRequests.updatePrograms(email, program._id)

    if (response) {
      getToast({ message: 'Successfully saved to profile!' })
    } else {
      getToast({
        message: 'Something went wrong, please try again later.',
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
        padding='80px 20px'
        margin='0 auto'
        justifyContent='space-between'
        flexDirection={isMobile ? 'column-reverse' : 'inherit'}
      >
        <Box width={isMobile ? '90%' : '50%'}>
          <Typography
            fontWeight={600}
            fontSize={isMobile ? 48 : 72}
            mt={isMobile ? 2.5 : 0}
            mb={4}
            lineHeight={1}
          > 
            {t.overview} 
          </Typography>

          <Typography fontSize={20}> {getProgramBioInLocale()} </Typography>

          {(!preview && !!session) ? (
            <Box display={!isMobile ? 'flex' : 'inherit'}>
              {program.partnerUrl && (
                <ExternalLink 
                  bgColor="#5783db"
                  hoverColor="#55c2da"
                  href={program.partnerUrl} 
                  label={t.seeDetails} 
                />
              )}

              <Button
                label={t.saveToProfile}
                color="#5783db"
                onClick={handleClick}
                style={{ marginLeft: isMobile ? 0 : 20 }}
              />
            </Box>
          ) : (
            <Button onClick={() => router.push('/sign-in')} label={t.signUp}></Button>
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

