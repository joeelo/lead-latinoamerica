/* eslint-disable @next/next/no-img-element */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { signIn, useSession } from 'next-auth/client'

import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'
import useLocale from '@/hooks/useLocale'
import en from '@/language/locales/en/signIn.json'
import es from '@/language/locales/es/signIn.json'

export default function Signup() {
  const theme = useTheme()
  const t = useLocale() === 'en' ? en : es
  const isEnglish = useLocale() === 'en'

  //session comes back with google info - https://github.com/nextauthjs/next-auth
  const [session] = useSession()

  return (
    <Box>
      <Box
        display="flex"
        maxWidth="100%"
        minHeight="67vh"        
        sx={{
          '@media screen and (max-width: 1000px)': {
              flexDirection: 'column',
            },
        }}
      >
        <Box
          sx={{
            width: '60%',
            minHeight: '700px',
            backgroundImage: 'url(/images/library-unsplash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            '@media screen and (max-width: 1000px)': {
              width: '100%',
            },
          }}
        >
          <Typography
            fontSize={64}
            fontWeight={800}
            color="white"
            textAlign="center"
            marginTop="150px"
            variant="h2"
          >
            {t.signIn} <br />
            {t.lead}
          </Typography>
        </Box>

        <Box
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '150px',
            width: '40%',
            display: 'flex',
            '@media screen and (max-width: 1000px)': {
              width: '100%',
              paddingTop: '60px',
              marginBottom: '60px',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <ChangingBackgroundText
            initialColor={theme.colors.cultured}
            secondaryColor={theme.colors.darkBlue}
            text={isEnglish ? 'Sign in' : 'Iniciar sesión'}
            fontColorInitial={theme.colors.darkBlue}
            fontColorSecondary={theme.colors.cultured}
            maxWidth="400px"
            onlyRunOneTransition
          />
          {!session ? (
            <>
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#222',
                  width: '400px',
                  border: '1px solid #999',
                  boxShadow: '3px 8px 9px 0px rgba(184, 177, 184, 1)',
                  height: '80px',
                  fontSize: 22,
                  fontWeight: 600,
                  marginTop: 5,
                  position: 'relative',
                  maxWidth: '90%',
                  '&:hover': {
                    boxShadow: '3px 5px 6px -2px rgba(184, 177, 184, 1)',
                  },
                }}
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/profile',
                  })
                }
              >
                <img
                  alt="google logo"
                  style={{
                    maxWidth: 30,
                    maxHeight: 30,
                    position: 'absolute',
                    left: 25,
                    top: 25,
                  }}
                  src="/images/google-logo.png"
                />
                {t.googleSignIn}
              </Button>
            </>
          ) : (
            <span style={{ marginTop: 20, fontSize: 24 }}>
              You&apos;re signed in!
            </span>
          )}
        </Box>
      </Box>
    </Box>
  )
}
