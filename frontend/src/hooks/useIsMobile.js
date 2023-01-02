import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    updateSize()

    const debouncedResizer = debounce(updateSize, 250)

    window.addEventListener('resize', debouncedResizer)

    return () => window.removeEventListener('resize', debouncedResizer)
  }, [])

  return isMobile
}

export default useIsMobile