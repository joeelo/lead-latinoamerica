import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

import useLocale from '@/hooks/useLocale'

const LanguageButtons = () => {
  const router = useRouter()
  const t = useLocale()

  const handleClick = (lang) => {
    const { asPath } = router
    router.push(`/${lang}${asPath}`, `/${lang}${asPath}`, {
      locale: lang,
      shallow: true,
    })
  }

  return (
    <Box display="flex" alignItems="center" bgcolor="white">
      <Typography
        fontSize={30}
        style={{ cursor: 'pointer' }}
        color="black"
        fontWeight={t === 'en' ? 500 : 300}
        component="span"
        onClick={() => handleClick('en')}
      >
        {' '}
        EN{' '}
      </Typography>

      <div
        style={{
          minHeight: 30,
          width: 1,
          backgroundColor: 'black',
          margin: '0 10px',
        }}
      />

      <Typography
        fontSize={30}
        style={{ cursor: 'pointer' }}
        fontWeight={t === 'es' ? 500 : 300}
        component="span"
        color="black"
        onClick={() => handleClick('es')}
      >
        {' '}
        ES{' '}
      </Typography>
    </Box>
  )
}

export default LanguageButtons
