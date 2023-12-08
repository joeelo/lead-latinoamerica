// Inspo, redbull form - https://elementor.com/blog/website-form-design-examples/

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import LargeCheckbox from '@/components/form/checkbox/LargeCheckbox'
import NavBar from '@/components/nav/NavBar'
import getInputValidationError from '@/utils/getInputValidationError'
import getIsValidUrl from '@/utils/getIsValidUrl'

export default function AddProgramSlides() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:600px)')
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

  const onNextClick = () => {
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
  }

  const onPrevClick = () => {
    setStep((prevState) => prevState - 1)
    setErrorText('')
  }

  return (
    <>
      <NavBar />

      <Box minHeight={!isMobile ? '90vh' : ''}>
        <Box 
          width={!isMobile ? '50%' : '100%'} 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          position="relative"
        >
          <Box p={4} mt={isMobile ? 8 : 0} textAlign={isMobile ? 'center' : ''}>
            <Typography mb={isMobile ? 2 : 0}>
              Question {step + 1} of {questionKeys.length}
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h1'} fontWeight={600}>
              {currentKey.label}
            </Typography>
          </Box>

          {(step > 0 && !isMobile) && (
            <Box position="absolute" bottom={50} right={32}>
              <button className='fade-button' onClick={onPrevClick}>
                Previous question
              </button>
            </Box>
          )}
        </Box>

        <Box 
          width={!isMobile ? '50%' : '100%'} 
          display="flex" 
          position="relative" 
          bgcolor={!isMobile ? 'rgb(245, 245, 245)' : ''}  
          alignItems="center" 
          p={4}
        >
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
                    minHeight: {
                      lg: '75px', 
                      md: '32px'
                    }, 
                    fontSize: {
                      lg: 36, 
                      md: 24
                    }, 
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

          {!isMobile && (
            <Box position="absolute" bottom={50}>
              <button 
                className='fade-button' 
                onClick={onNextClick}
              >
                {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
              </button>
            </Box>
          )}
        </Box>
      </Box>

      {isMobile && (
        <>

          {step > 0 && (
            <Box display="flex" justifyContent="center" mb={3}>
              <button className='fade-button' onClick={onPrevClick} style={{ width: 260, padding: 0  }}>
                Previous question
              </button>
            </Box>
          )}

          <Box display="flex" justifyContent="center">
            <button 
              className='fade-button' 
              onClick={onNextClick}
            >
              {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </Box>
        </>

      )}
    </>
  )
}