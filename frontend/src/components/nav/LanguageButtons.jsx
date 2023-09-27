import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

import useIsMobile from '@/hooks/useIsMobile'
import useLocale from '@/hooks/useLocale'

const LanguageButtons = () => {
  const router = useRouter()
  const t = useLocale()
  const isMobile = useIsMobile()

  const handleClick = (lang) => {
    const { asPath } = router
    router.push(`/${lang}${asPath}`, `/${lang}${asPath}`, {
      locale: lang,
      shallow: true,
    })
  }

  return (
    <Box display="flex" alignItems="center" marginBottom={isMobile ? 20 : 0}>
      <Box 
        fontSize={30}
        style={{ cursor: 'pointer' }}
        fontWeight={t === 'en' ? 500 : 300}
        component="span" 
        onClick={() => handleClick('en')}
      > EN </Box>

      <div style={{
          minHeight: 30,
          width: 1,
          backgroundColor: 'black',
          margin: '0 10px',
        }}
      />

      <Box 
        fontSize={30}
        style={{ cursor: 'pointer' }}
        fontWeight={t === 'es' ? 500 : 300}
        component="span" 
        onClick={() => handleClick('es')}
      > ES </Box>
    </Box>
  )
}

export default LanguageButtons
