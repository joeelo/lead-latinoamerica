import { useState, useEffect } from 'react'

const useHostname = () => {
  const [hs, setHs] = useState(null)
  const w = typeof window === 'undefined'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHs(window.location.origin) // origin includes port hostname does not
    }
  }, [w])

  return hs
}

export default useHostname
