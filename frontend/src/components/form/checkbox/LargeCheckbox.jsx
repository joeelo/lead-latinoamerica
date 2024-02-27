import Box from '@mui/material/Box'
import { useEffect, useRef,useState } from 'react'

export default function LargeCheckbox({
  isChecked, 
  onChange, 
  label, 
  style = {}, 
  ...props
}) {
  const [clickPosition, setClickPosition] = useState({x: null, y: null})
  // https://stackoverflow.com/questions/71499969/settimeout-and-cleartimeout-in-react
  const timerId = useRef(null)

  const clickPosFunc = () => {
    clearTimeout(timerId.current)
    timerId.current = null
    setClickPosition({
      x: null, 
      y: null,
    })
  }

  useEffect(() => {
    timerId.current = window.setTimeout(clickPosFunc, 800)

    return () => {
      clearTimeout(timerId.current)
    }
  }, [clickPosition.x])

  return (
    <Box 
      border='1px solid lightgrey' 
      onClick={(e) => {
        clearTimeout()

        const {
          x, 
          y, 
        } = e.target.getBoundingClientRect()

        let xPx = e.clientX - x
        let yPx = e.clientY - y

        setClickPosition({
          x: `${xPx}px`, 
          y: `${yPx}px`,
        })

        onChange()
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={2}
      sx={{
        fontSize: 36, 
        '@media screen and (max-width: 768px)': {
          fontSize: 24,
        },
      }}
      height={150}
      bgcolor={isChecked ? '#2196F3' : 'white'}
      color={isChecked ? 'white' : 'inherit'}
      style={{cursor: 'pointer', userSelect: 'none', overflow: 'hidden', position: 'relative', ...style}}
      {...props}
    >

      {!!clickPosition.x && (
        <span 
          className="ripples" 
          style={{ 
            left: clickPosition.x, 
            top: clickPosition.y, 
            zIndex: 10, 
            position: 'absolute' 
          }}
        />
      )}

      {label}
    </Box>
  )
}