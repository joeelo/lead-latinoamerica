import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import LargeCheckbox from '@/components/form/checkbox/LargeCheckbox'

export default function Step4({ onChange, value, errorText }) {
  const options = [
    { label: 'Summer', value: 'summer' },
    { label: 'Program', value: 'program' },
    { label: 'Internship', value: 'internship' },
    { label: 'Scholarship', value: 'scholarship' },
  ]

  return (
    <>
      <Box display="flex" flexWrap="wrap">
        {options.map((option) => {
          return (
            <LargeCheckbox
              key={option.value}
              isChecked={value.includes(option.value)}
              onChange={() => {
                // if (!checkboxValues.includes(option.value)) {
                //   setCheckboxValues([...checkboxValues, option.value])
                // } else {
                //   const newValues = checkboxValues.filter((val) => val !== option.value)
                //   setCheckboxValues(newValues)
                // }
                onChange(option.value)
              }}
              label={option.label}
              style={{ width: '45%', marginBottom: 16, marginRight: 16 }}
            />
          )
        })}
      </Box>

      {errorText && (
        <Typography color="#d32f2f" fontSize="0.75rem">
          {errorText}
        </Typography>
      )}
    </>
  )
}
