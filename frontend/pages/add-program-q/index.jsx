// Inspo, redbull form - https://elementor.com/blog/website-form-design-examples/

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ProgramRequests from '@/requests/ProgramRequests'
import getIsValidUrl from '@/utils/getIsValidUrl'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

export const textInputStyle = {
  '.MuiInputBase-input': {
    minHeight: {
      lg: '55px',
      md: '32px',
    },
    fontSize: {
      lg: 32,
      md: 24,
    },
    lineHeight: 1.1,
  },
}

export default function AddProgramSlides() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [step, setStep] = useState(0)

  const [errorText, setErrorText] = useState('')
  const [step1Value, setStep1Value] = useState('')
  const [step2Value, setStep2Value] = useState('')
  const [step3Value, setStep3Value] = useState('')
  const [step4Value, setStep4Value] = useState([])
  const [step5Value, setStep5Value] = useState('')

  const questionKeys = [
    { label: 'What is the name of the program?' },
    { label: 'A short description about the program' },
    {
      label: 'Labels to help identify the uses',
      infoText:
        'Use commas to create new label, ie: funding, scholarship, after-school, etc.',
    },
    { label: 'What type of program is it?', infoText: 'Choose all that apply' },
    { label: 'Link/URL for opportunity' },
  ]

  const currentQuestion = questionKeys[step]

  async function checkResponse(data) {
    const result = await ProgramRequests.create(data)

    console.log(result)

    return router.push('congrats')
  }

  if (!currentQuestion) {
    // After step 5
    const programType = {}

    step4Value.forEach((val) => (programType[val] = true))

    const data = {
      name: step1Value,
      bio: step2Value,
      helpsWith: step3Value.split(','),
      programType,
      partnerUrl: step5Value,
    }

    checkResponse(data)
  }

  const onNextClick = () => {
    let inputError = ''

    if (step === 0) {
      if (step1Value <= 3) {
        inputError = '3 character mininum'
      }
    }

    if (step === 1) {
      if (!step2Value) {
        inputError = 'Required'
      }
    }

    if (step === 3) {
      if (!step4Value.length) {
        inputError = 'Please select one'
      }
    }

    if (step === 4) {
      if (!getIsValidUrl(step5Value)) {
        inputError = 'Please enter a valid URL'
      }
    }

    if (inputError) {
      setErrorText(inputError)

      return
    }

    setStep((prevState) => prevState + 1)

    setErrorText('')
  }

  const onPrevClick = () => {
    setStep((prevState) => prevState - 1)
    setErrorText('')
  }

  if (!currentQuestion) {
    // This should never be hit
    return <>finished</>
  }

  return (
    <>
      <Box minHeight="80vh" display={!isMobile ? 'flex' : ''}>
        <Box
          width={!isMobile ? '50%' : '100%'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box p={4} mt={isMobile ? 8 : 1} textAlign={isMobile ? 'center' : ''}>
            <Typography mb={isMobile ? 2 : 0}>
              Question {step + 1} of {questionKeys.length}
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h2'} fontWeight={600}>
              {currentQuestion.label}
            </Typography>
          </Box>

          {step > 0 && !isMobile && (
            <Box position="absolute" bottom={50} right={32}>
              <button className="fade-button" onClick={onPrevClick}>
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
            {step === 0 && (
              <Step1
                errorText={errorText}
                value={step1Value}
                onChange={(event) => {
                  setStep1Value(event.target.value)

                  setErrorText('')
                }}
              />
            )}

            {step === 1 && (
              <Step2
                errorText={errorText}
                value={step2Value}
                onChange={(event) => {
                  setStep2Value(event.target.value)

                  setErrorText('')
                }}
              />
            )}

            {step === 2 && (
              <Step3
                errorText={errorText}
                value={step3Value}
                onChange={(event) => {
                  setStep3Value(event.target.value)
                }}
              />
            )}

            {step === 3 && (
              <Step4
                errorText={errorText}
                value={step4Value}
                onChange={(value) => {
                  if (step4Value.includes(value)) {
                    const newValues = step4Value.filter((v) => v !== value)

                    setStep4Value(newValues)
                  } else {
                    setStep4Value([...step4Value, value])
                  }
                }}
              />
            )}

            {step === 4 && (
              <Step5
                errorText={errorText}
                value={step5Value}
                onChange={(event) => {
                  setErrorText('')

                  setStep5Value(event.target.value)
                }}
              />
            )}

            {!!currentQuestion.infoText && (
              <Typography color="GrayText">
                {currentQuestion.infoText}
              </Typography>
            )}
          </Box>

          {!isMobile && (
            <Box position="absolute" bottom={50}>
              <button className="fade-button" onClick={onNextClick}>
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
              <button
                className="fade-button"
                onClick={onPrevClick}
                style={{ width: 260, padding: 0 }}
              >
                Previous question
              </button>
            </Box>
          )}

          <Box display="flex" justifyContent="center" mb={5}>
            <button className="fade-button" onClick={onNextClick}>
              {step === questionKeys.length - 1 ? 'Submit' : 'Next Question'}
            </button>
          </Box>
        </>
      )}
    </>
  )
}
