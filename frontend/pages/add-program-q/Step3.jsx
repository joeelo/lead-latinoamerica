import TextField from '@mui/material/TextField'

import { textInputStyle } from './index'

export default function Step3({
  value, 
  onChange
}) {
  return (
    <TextField
      value={value}
      fullWidth
      sx={textInputStyle}
      onChange={onChange}
    />
  )
}