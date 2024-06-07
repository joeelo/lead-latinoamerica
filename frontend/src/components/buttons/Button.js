import Box from '@mui/material/Box'
import Image from 'next/image'
import React from 'react'

export default function Button({
  label,
  color = '#1F2041',
  hoverColor = '#3a3970', 
  onClick,
  marginTop = '30px',
  isSubmitting = false,
  noBoxShadow = false,
  ...props
}) {
  return (
    <Box 
      minWidth={160}
      height={60}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={color}
      fontSize={18}
      borderRadius={2}
      mt={marginTop}
      sx={{
        border: 0,
        color: 'white', 
        cursor: 'pointer',
        outline: '1px solid rgba(0, 0, 0, 0.2)',
        transition: '0.4s ease all', 

        ':hover': {
          bgcolor: hoverColor,
          boxShadow: noBoxShadow ? '' : '2px 3px 12px 3px rgba(184,177,184, .6)',
        }
      }}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }} 
      {...props}
    >
      <span>
        {isSubmitting ? (
          <Image
            alt=""
            style={{
              border: 0,
              outline: 0,
              maxWidth: 35,
            }}
            src="/loaders/spinning-loader.svg"
          />
        ) : (
          label
        )}
      </span>
    </Box>
  )
}
