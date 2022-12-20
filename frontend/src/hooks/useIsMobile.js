import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    updateSize()
    window.addEventListener('resize', debounce(updateSize, 250))

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return isMobile
}

export default useIsMobile