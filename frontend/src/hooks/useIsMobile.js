import { useEffect, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const debouncedFunc = useCallback(() => {
    return setIsMobile(window.innerWidth < 768)
  }, [isMobile])

  useEffect(() => {
    debouncedFunc()
  }, [])

  useEffect(() => {
    const debouncedCb = debounce(debouncedFunc, 250)
    
    window.addEventListener('resize', debouncedCb)

    return () => {
      debouncedCb.cancel()
      window.removeEventListener('resize', debouncedCb)
    }
  }, [isMobile, debouncedFunc])

  return isMobile
}

export default useIsMobile