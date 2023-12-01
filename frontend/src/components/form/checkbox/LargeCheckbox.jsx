import Box from '@mui/material/Box'
import { useState } from 'react'

export default function LargeCheckbox({
  isChecked, 
  onChange, 
  label, 
  style = {}, 
  ...props
}) {
  const [clickPosition, setClickPosition] = useState({x: null, y: null})

  return (
    <Box 
      border='1px solid lightgrey' 
      onClick={(e) => {
        console.log(e.target.getBoundingClientRect())

        console.log(e.clientX, e.target.offsetLeft)

        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop

        setClickPosition({
          x: `${x}px`, 
          y: `${y}px`,
        })

        setTimeout(() => {
          setClickPosition({
            x: null, 
            y: null
          })
        }, 1000)

        onChange()
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={2}
      fontSize={36}
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
            left: 0, 
            top: 0, 
            zIndex: 10, 
            position: 'absolute' 
          }}
        />
      )}

      {label}
    </Box>
  )
}