import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Tooltip } from 'react-tooltip'

import Button from '@/components/buttons/Button'
import DateInput from '@/components/form/date-input/DateInput'
import InputErrorMessage from '@/components/form/errors/InputErrorMessage'
import StyledSectionHeading from '@/components/form/section/StyledSectionHeading'
import TextInput from '@/components/form/text-input/TextInput'
import WordSelectInput from '@/components/form/word-select/WordSelectInput'
import LoadingSpinner from '@/components/generic/LoadingSpinner'
import { QueryKeys } from '@/config/QueryKeys'
import { findProgramAndUpdate } from '@/fetch/requests'
import ProgramRequests from '@/requests/ProgramRequests'
import getToast from '@/utils/getToast'

export default function EditOrg() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wordList, setWordList] = useState([])
  const router = useRouter()

  const { data: programData, isLoading } = useQuery({
    queryKey: QueryKeys.PROGRAM,
    queryFn: () => ProgramRequests.getBySlug(router.query.nameSlug),
  })

  const {
    setValue,
    setError,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const setWordListOnLoad = useCallback(() => {
    if (!programData) {
      return
    }

    setWordList(programData.helpsWith)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!programData) {
      return
    }

    setValue('name', programData.name)
    setValue('bio', programData.bio)
    setValue('partnerUrl', programData.partnerUrl)
    setValue('expirationDate', programData.expirationDate)
    setWordListOnLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programData])

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    if (Object.keys(errors).length) {
      setIsSubmitting(false)
    }

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

    const response = await findProgramAndUpdate(
      data,
      `/program/edit/${programData.href}`
    )
    if (response.success) {
      getToast({ message: 'Successfully Updated!' })
      router.push(`/edit-org/${response.data.href}`)
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
    }
  }

  if (!programData) {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Box
            style={{ height: 200 }}
            ml="20px"
            display="flex"
            fd="column"
            justify="center"
          >
            <h2>There are no programs with that name.</h2>
            <p style={{ marginTop: 20 }}>
              Please try another program name or check the spelling.
            </p>
          </Box>
        )}
      </>
    )
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={10}
        p={3}
        sx={{ boxShadow: 6 }}
        mb={6}
        borderRadius={3}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Editing</h1>
          <p>{router.query.nameSlug}</p>
        </Box>

        <Box display="flex">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                rows={5}
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

              <Box style={{ marginTop: 10 }}>
                <DateInput
                  register={register}
                  setValue={setValue}
                  name="expirationDate"
                  placeHolder="mm/dd/yyyy"
                  watch={watch}
                  errors={errors}
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button label="Submit" isSubmitting={isSubmitting} />
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
