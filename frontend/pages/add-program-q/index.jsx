import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import LargeCheckbox from '@/components/form/checkbox/LargeCheckbox'
import NavBar from '@/components/nav/NavBar'
import getInputValidationError from '@/utils/getInputValidationError'
import getIsValidUrl from '@/utils/getIsValidUrl'

export default function AddProgramSlides() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState([])
  const [errorText, setErrorText] = useState('')
  const [answers, setAnswers] = useState({
    name: {
      label: 'What is the name of the program?', 
      type: 'text', 
      value: '', 
      validation: { min: 3 }, 
      validationMet: false
    }, 
    description: {
      label: 'A short description about the program', 
      type: 'text', 
      value: '', 
      multiline: true,
    }, 
    keywords: {
      label: 'Labels to help identify the uses', 
      infoText: 'Use commas to create new label, ie: funding, scholarship, after-school, etc.',
      type: 'text', 
      value: ''
    }, 
    programType: {
      label: 'What type of program is it?',
      infoText: 'Choose all that apply', 
      type: 'checkbox', 
      options: [
        {label: 'Summer', value: 'summer'}, 
        {label: 'Program', value: 'program',}, 
        {label: 'Internship', value: 'internship',}, 
        {label: 'Scholarship', value: 'scholarship',}
      ],
      value: [],
      validationMet: false,
      validation: { min: 1 }
    },  
    partnerUrl: {
      label: 'Does this opportunity have a url?', 
      type: 'text', 
      value: '', 
      validation: (value) => {
        return getIsValidUrl(value)
      }
    }
  })

  const questionKeys = ['name', 'description', 'keywords', 'programType', 'partnerUrl']

  const currentKey = answers[questionKeys[step]]

  if (!currentKey) {
    return router.push('congrats')
  }

  return (
    <>
      <NavBar />

      <Box display="flex" minHeight='90vh'>
        <Box width="50%" display="flex" justifyContent="center" alignItems="center" position="relative">
          <Box p={4}>
            <Typography>
              Question {step + 1} out of {questionKeys.length}
            </Typography>
            <Typography variant='h1' fontWeight={600}>
              {currentKey.label}
            </Typography>
          </Box>

          {step > 0 && (
            <Box position="absolute" bottom={50} right={32}>
              <button className='fade-button' onClick={() => {
                setStep((prevState) => prevState - 1 )
                setErrorText('')
              }}>Previous question</button>
            </Box>
          )}
        </Box>

        <Box width="50%" display="flex" position="relative" bgcolor='rgb(245, 245, 245)'  alignItems="center" p={4}>
          <Box width="100%">
            {currentKey.type === 'checkbox' && (
              <>
                <Box display="flex" flexWrap="wrap">
                  {currentKey.options.map((option) => {
                    return (
                      <LargeCheckbox 
                        key={option.value}
                        isChecked={checkboxValues.includes(option.value)}
                        onChange={() => {
                          if (!checkboxValues.includes(option.value)) {
                            setCheckboxValues([...checkboxValues, option.value])
                          } else {
                            const newValues = checkboxValues.filter((val) => val !== option.value)
                            setCheckboxValues(newValues)
                          }
                        }}
                        label={option.label}
                        style={{ width: '45%', marginBottom: 16, marginRight: 16, }}
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
            )}

            {currentKey.type === 'text' && (
              <TextField
                error={!!errorText}
                helperText={errorText}
                value={inputValue}
                fullWidth
                multiline={currentKey.multiline}
                rows={currentKey.multiline ? 5 : ''}
                sx={{
                  '.MuiInputBase-input': {
                    minHeight: '75px', 
                    fontSize: 36, 
                    lineHeight: 1.1,
                  }
                }}
                onChange={(event) => {
                  setInputValue(event.target.value)
                  setErrorText('')
                }}
              />
            )}

            

            {!!currentKey.infoText && (
              <Typography color="GrayText">
                {currentKey.infoText}
              </Typography>
            )}
          </Box>

          <Box position="absolute" bottom={50}>
            <button 
              className='fade-button' 
              onClick={() => {
                
                let value = inputValue 

                if (currentKey.type === 'checkbox') {
                  value = checkboxValues
                }

                const err = getInputValidationError(value, currentKey.validation)

                
                if (err) {
                  setErrorText(err)

                  return 
                }

                const objKey = questionKeys[step]
                const currObj = {...currentKey, value, validationMet: true}

                setAnswers({
                  ...answers, 
                  [objKey]: {...currObj}
                })
                setStep((prevState) => prevState + 1)
                setInputValue('')
                setErrorText('')
                setCheckboxValues([])
              }}
            >
              {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </Box>
        </Box>
      </Box>
    </>
  )
}