import Box from '@mui/material/Box'

import { findProgramAndUpdate } from '@/fetch/requests'

export default function FixedButton({
  approve = false,
  text,
  bgColor,
  bgColorHover,
  href,
  onSuccess,
}) {
  const handleClick = async () => {
    if (approve) {
      try {
        const result = await findProgramAndUpdate(
          {},
          `/program/edit/${href}/${approve}`
        )
        if (result.message === 'success') {
          onSuccess(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Box
      onClick={handleClick}
      top={approve ? '100px' : '160px'}
      right="100px"
      width="200px"
      position="fixed"
      bgcolor={bgColor}
      zIndex={10000}
      color="white"
      borderRadius={2}
      textAlign="center"
      padding={1}
      sx={{
        cursor: 'pointer',
        transition: '0.4s ease-in-out all',
        ':hover': {
          bgcolor: bgColorHover,
        },
      }}
    >
      {text}
    </Box>
  )
}
