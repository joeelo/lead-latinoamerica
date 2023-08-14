import { useEffect } from 'react'

const useHandleClickOutside = (ref, callback) => {
  const handleClick = (event) => {
    if (!ref) return
    if (ref.current && !ref.current.contains(event?.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useHandleClickOutside
