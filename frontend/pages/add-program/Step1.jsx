import TextField from '@mui/material/TextField'

import { textInputStyle } from './index'

export default function Step1({ errorText, value, onChange }) {
  return (
    <TextField
      error={!!errorText}
      helperText={errorText}
      value={value}
      fullWidth
      sx={textInputStyle}
      onChange={onChange}
    />
  )
}
