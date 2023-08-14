import { useEffect, useState } from 'react'

const useOnScreen = (ref = {}, rootMargin = '0px') => {
  const [intersecting, setIntersecting] = useState(false)
  const windowLoaded = typeof window !== 'undefined'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      { rootMargin }
    )

    const currentElement = ref?.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        //eslint-disable-next-line
        observer.unobserve(currentElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowLoaded])

  return intersecting
}

export default useOnScreen
