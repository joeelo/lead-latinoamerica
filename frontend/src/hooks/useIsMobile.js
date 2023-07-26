import debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const debouncedFunc = useCallback(() => {
    return setIsMobile(window.innerWidth < 768)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  useEffect(() => {
    debouncedFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
