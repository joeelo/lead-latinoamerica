import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

function useMousePosition() {
  const [mousePositionX, setMousePositionX] = useState(null)
  const [mousePositionY, setMousePositionY] = useState(null)

  const getMousePosition = (event) => {
    setMousePositionX(event.clientX)
    setMousePositionY(event.clientY)
  }

  const debouncedFn = debounce((event) => getMousePosition(event), 50)

  useEffect(() => {
    window.addEventListener('mousemove', debouncedFn)

    return () => {
      window.removeEventListener('mousemove', debouncedFn)
      debouncedFn.cancel()
    }
  }, [debouncedFn])

  return {
    mouseX: mousePositionX,
    mouseY: mousePositionY,
  }
}

export default useMousePosition
