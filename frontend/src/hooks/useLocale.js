import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'

const useLocale = () => {
  const [lang, setLang] = useState('en')
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    if (locale === 'en') {
      setLang('en')
    } else {
      setLang('es')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale])

  return lang
}

export default useLocale
