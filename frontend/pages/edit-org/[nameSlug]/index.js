import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import TextInput from '@/components/form/text-input/TextInput';
import { useForm } from 'react-hook-form';
import Button from '@/components/buttons/Button';
import Box from '@/components/generic/Box';
import Form from '@/components/form/container/Form';
import StyledSectionHeading from '@/components/form/section/StyledSectionHeading';
import { findProgramAndUpdate } from '@/fetch/requests';
import WordSelectInput from '@/components/form/word-select/WordSelectInput';
import Tooltip from '@/components/tooltip/Tooltip';
import InputErrorMessage from '@/components/form/errors/InputErrorMessage'; 
import DateInput from '@/components/form/date-input/DateInput';
import { useQuery } from 'react-query';
import ProgramRequests from '@/fetch/program/ProgramRequests';
import { useCallback } from 'react';


const EditOrg = () => {
	const [ isSubmitting, setIsSubmitting ] = useState(false); 
	const [ wordList, setWordList ] = useState([]);
	const router = useRouter();

  const { data: programData } = useQuery({
    queryKey: ['program', { name: router.query.nameSlug }], 
    queryFn:  ProgramRequests.getProgram, 
  })

  const { 
		setValue, 
		setError, 
		register, 
		handleSubmit, 
		watch, 
		formState: { errors } 
	} = useForm(); 

  const setWordListOnLoad = useCallback(() => {
    if (!programData) {
      return
    }

    setWordList(programData.helpsWith)
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
  }, [programData])

	const onSubmit = async (data) => {
		setIsSubmitting(true);		

		if (Object.keys(errors).length) {
			setIsSubmitting(false);
		}

		data.helpsWith = wordList;

		if (data.expirationDate) {
			function dateIsValid(date) {
				return date instanceof Date && !isNaN(date);
			}
		
			const expirationDate = new Date(data.expirationDate)
			const isDateValid = dateIsValid(expirationDate)

			if (!isDateValid) {
				setError('expirationDate', {
					type: 'manual', 
					message: 'Please input a valid date'
				})

				setIsSubmitting(false); 
				return;
			}

			
			data.expirationDate = expirationDate.toISOString();
		}

		const response = await findProgramAndUpdate(data, `/program/edit/${programData.href}`); 
		if (response.message === 'success') {
      console.log(response.data)
			// router.push('/thanks-partner');
		} else {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<NavBar />

			<Box stackOnMobile display='flex' fd='column' width='al-fu' center pt='60px'>
        <Box display='flex' fd='column' width='al-fu' center justify='center' align='center'>
          <h1>Editing</h1>
          <p>{router.query.nameSlug}</p>
        </Box>

				<Box display="flex">

					<Form 
						style={{maxWidth: '600px', margin: '40px auto 40px auto'}} 
						onSubmit={handleSubmit(onSubmit)} 
					>
						<Box>
							<StyledSectionHeading>Name of the scholarship, internship, or program</StyledSectionHeading>
							<TextInput 
								register={register}
								name='name'
								rules={{
									required: 'This field is required', 
									minLength: {value: 3, message: 'Must be at least 3 characters long'}, 
									maxLength: {value: 70, message: 'Cannot be longer than 70 characters.'},
								}}
							/>
							{errors && errors.name && <InputErrorMessage error={errors.name.message}/>}
						</Box>

						<Box>
							<StyledSectionHeading>A description about the opportunity</StyledSectionHeading>
							<TextInput 
								register={register}
								name='bio'
								rules={{
									maxLength: {value: 750, message: 'Cannot be longer than 750 characters.'},
									minLength: {value: 0, message: 'Field cannot be blank.'}
								}}
							/>
							{errors && errors.bio && <InputErrorMessage error={errors.bio.message}/>}
						</Box>

						<Box>
							<Box mt='30px'>
								<StyledSectionHeading style={{display: 'inline', marginTop: 30}}>
									Who does this opportunity serve?
								</StyledSectionHeading>
								<Tooltip explanation='Example: “Latinx” “LGBTQ” “Black” “All”' style={{marginLeft: 10}}/>
							</Box>
							<WordSelectInput
								setWordList={setWordList}
								wordList={wordList}
								placeHolder='Keywords - Use space or enter to create new label, use - for multi-worded labels'
							/>
						</Box>

						<Box>
							<StyledSectionHeading>Is there a url to find the opportunity?</StyledSectionHeading>
							<TextInput 
								register={register}
								name='partnerUrl'
								placeHolder='Eg: https://exampleLink.com '
							/>
						</Box>

						<Box>
							<StyledSectionHeading>Does this opportunity have a deadline?</StyledSectionHeading>
							<DateInput 
								register={register}
								setValue={setValue}
								name="expirationDate"
								placeHolder="mm/dd/yyyy"
								watch={watch}
								errors={errors}
							/>
						</Box>

						<Box display='flex'>
							<Button label='Go Back' style={{ marginRight: 20 }}/>
							<Button label='Submit' isSubmitting={isSubmitting}/>
						</Box>
					</Form>
				</Box>
			</Box>			
			<Footer />
		</>
	)
}

export default EditOrg;
