import { useEffect, useState } from 'react'

const useOnScreen = (ref, rootMargin = '0px') => {
  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      { rootMargin }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      //eslint-disable-next-line
      observer.unobserve(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return intersecting
}

export default useOnScreen
