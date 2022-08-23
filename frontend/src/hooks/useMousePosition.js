import { debounce } from 'lodash'
import { useState, useEffect } from 'react'

function useMousePosition() {
  const [ mousePositionX, setMousePositionX ] = useState(null)
  const [ mousePositionY, setMousePositionY ] = useState(null)

  useEffect(() => {
    const getMousePosition = (event) => {
      setMousePositionX(event.clientX)
      setMousePositionY(event.clientY)
    }  

    window.addEventListener('mousemove', debounce(getMousePosition, 50))

    return () => window.removeEventListener('mousemove', getMousePosition)
  }, [])

  return {
    mouseX: mousePositionX, 
    mouseY: mousePositionY,
  }
}

export default useMousePosition