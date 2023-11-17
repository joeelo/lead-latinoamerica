import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import NavBar from '@/components/nav/NavBar'
import getInputValidationError from '@/utils/getInputValidationError'

export default function AddProgramSlides() {
  const [step, setStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
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
      value: ''
    }, 
    keywords: {
      label: 'Labels to help identify the uses', 
      subText: 'Use commas to create new label, ie: funding, scholarship, after-school, etc.',
      type: 'text', 
      value: ''
    }, 
    programType: {
      label: 'What type of program is it?',
      subText: 'Choose all that apply', 
      type: 'checkbox', 
      value: [],
      validationMet: false,
      validation: { min: 1 }
    },  
    partnerUrl: {
      label: 'Does this opportunity have a url?', 
      type: 'text', 
      value: ''
    }, 
    expirationDate: {
      label: 'Does this program have an expiration date?', 
      type: 'date', 
      value: ''
    }, 
  })

  const questionKeys = ['name', 'description', 'keywords', 'programType', 'partnerUrl', 'expirationDate']

  const currentKey = answers[questionKeys[step]]

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
              }}>Previous question</button>
            </Box>
          )}
        </Box>

        <Box width="50%" display="flex" position="relative" bgcolor='rgb(245, 245, 245)'  alignItems="center" p={4}>
          <TextField
            error={!!errorText}
            helperText={errorText}
            value={inputValue}
            sx={{
              '.MuiInputBase-input': {
                minHeight: '75px', 
                fontSize: 48, 
              }
            }}
            onChange={(event) => {
              setInputValue(event.target.value)
              setErrorText('')
            }}
          />

          <Box position="absolute" bottom={50}>
            <button className='fade-button' onClick={() => {
              const err = getInputValidationError(inputValue, currentKey.validation)

              if (err) {
                setErrorText(err)

                return 
              }

              const objKey = questionKeys[step]
              const currObj = {...currentKey, value: inputValue, validationMet: true}

              setAnswers({
                ...answers, 
                [objKey]: {...currObj}
              })
              setStep((prevState) => prevState + 1)
              setInputValue('')
            }}>Next question</button>
          </Box>
        </Box>
      </Box>
    </>
  )
}