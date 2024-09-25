import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

import Button from '@/components/buttons/Button'
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText'
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup'
import DateInput from '@/components/form/date-input/DateInput'
import InputErrorMessage from '@/components/form/errors/InputErrorMessage'
import StyledSectionHeading from '@/components/form/section/StyledSectionHeading'
import TextInput from '@/components/form/text-input/TextInput'
import WordSelectInput from '@/components/form/word-select/WordSelectInput'
import NavBar from '@/components/nav/NavBar'
import ProgramRequests from '@/requests/ProgramRequests'
import getToast from '@/utils/getToast'

const AddProgram = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wordList, setWordList] = useState([])
  const [apiError, setApiError] = useState(null)
  const router = useRouter()

  const {
    setValue,
    setError,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (Object.keys(errors).length) {
        setIsSubmitting(false)
      }

      Object.keys(data.programType).forEach((key) => {
        if (data.programType[key]) {
          data[`programType[${key}]`] = true
        }
      })

      data.helpsWith = wordList

      if (data.expirationDate) {
        function dateIsValid(date) {
          return date instanceof Date && !isNaN(date)
        }

        const expirationDate = new Date(data.expirationDate)
        const isDateValid = dateIsValid(expirationDate)

        if (!isDateValid) {
          setError('expirationDate', {
            type: 'manual',
            message: 'Please input a valid date',
          })

          setIsSubmitting(false)
          return
        }

        data.expirationDate = expirationDate.toISOString()
      }

      const response = await ProgramRequests.create

      if (response.errorMessage) {
        setApiError(response.errorMessage)
      }

      if (response.success) {
        router.push('/thanks-partner')
      } else {
        setIsSubmitting(false)
        getToast({
          message: 'Something went wrong, please try again later',
          variant: 'error',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar />

      <Box
        display="flex"
        flexDirection="column"
        width="90%"
        margin="0 auto"
        pt="40px"
        mb={5}
      >
        <ChangingBackgroundText
          fontSize="48px"
          initialColor="#1F2041"
          secondaryColor="#1F2041"
          text="Share a program!"
          fontColorInitial="#1F2041"
          fontColorSecondary="white"
          onlyRunOneTransition={true}
        />

        <Box display="flex">
          <Form
            style={{ maxWidth: '600px', margin: '40px auto 40px auto' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box>
              <StyledSectionHeading>
                Name of the scholarship, internship, or program
              </StyledSectionHeading>
              <TextInput
                register={register}
                name="name"
                rules={{
                  required: 'This field is required',
                  minLength: {
                    value: 3,
                    message: 'Must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 70,
                    message: 'Cannot be longer than 70 characters.',
                  },
                }}
              />
              {errors && errors.name && (
                <InputErrorMessage error={errors.name.message} />
              )}
            </Box>

            <Box>
              <StyledSectionHeading>
                A description about the opportunity
              </StyledSectionHeading>
              <TextInput
                register={register}
                name="bio"
                rules={{
                  maxLength: {
                    value: 750,
                    message: 'Cannot be longer than 750 characters.',
                  },
                  minLength: { value: 0, message: 'Field cannot be blank.' },
                }}
              />
              {errors && errors.bio && (
                <InputErrorMessage error={errors.bio.message} />
              )}
            </Box>

            <Box>
              <Box mt="30px">
                <StyledSectionHeading
                  style={{ display: 'inline', marginTop: 30 }}
                  data-tooltip-id="explanation"
                  data-tooltip-content="Example: “Latinx” “LGBTQ” “Black” “All”"
                  data-tooltip-variant="info"
                >
                  Who does this opportunity serve?
                </StyledSectionHeading>
                <Tooltip id="explanation" />
              </Box>
              <WordSelectInput
                setWordList={setWordList}
                wordList={wordList}
                placeHolder="Keywords - Use space or enter to create new label, use - for multi-worded labels"
              />
            </Box>

            <StyledSectionHeading>
              What type of opportunity is it?
            </StyledSectionHeading>
            <CheckboxGroup
              options={[
                { value: 'programType.summer', label: 'Summer' },
                { value: 'programType.internship', label: 'Internship' },
                { value: 'programType.program', label: 'Program' },
                { value: 'programType.scholarship', label: 'Scholarship' },
              ]}
              register={register}
            />

            <Box>
              <StyledSectionHeading>
                Is there a url to find the opportunity?
              </StyledSectionHeading>
              <TextInput
                register={register}
                name="partnerUrl"
                placeHolder="Eg: https://exampleLink.com "
              />
            </Box>

            <Box>
              <StyledSectionHeading>
                Does this opportunity have a deadline?
              </StyledSectionHeading>
              <DateInput
                register={register}
                setValue={setValue}
                name="expirationDate"
                placeHolder="mm/dd/yyyy"
                watch={watch}
                errors={errors}
                isRequired
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                label="Submit"
                isSubmitting={isSubmitting}
              />
            </Box>
          </Form>

          {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        </Box>
      </Box>
    </>
  )
}

export default AddProgram

const Form = styled.form`
  margin-left: 50px;
  margin-top: 50px;
  box-shadow: 5px 5px 15px -4px rgba(0, 0, 0, 0.5);
  min-width: 300px;
  width: 90vw;
  min-height: 600px;
  max-width: 800px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  background-color: white;
`
