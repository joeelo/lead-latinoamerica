import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import TextInput from '@/components/form/text-input/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup';
import Button from '@/components/buttons/Button';
import Box from '@/components/generic/Box';
import Form from '@/components/form/container/Form';
import StyledSectionHeading from '@/components/form/section/StyledSectionHeading';
import { postToDatabase } from '@/fetch/requests';
import WordSelectInput from '@/components/form/word-select/WordSelectInput';
import useHostname from '@/hooks/useHostname';
import Tooltip from '@/components/tooltip/Tooltip';

const AddAndEditOrgs = () => {

	const [ isSubmitting, setIsSubmitting ] = useState(false); 
	const [ wordList, setWordList ] = useState([]);
	const router = useRouter();

	const setPreviewData = (data) => {
		localStorage.setItem('organization', data.organization);
		localStorage.setItem('bio', data.bio);
		localStorage.setItem('helpsWith', JSON.stringify(wordList));
	}

  const { register, handleSubmit, setValue } = useForm(); 

	const onSubmit = async (data) => {
		
		setIsSubmitting(true);
		
		const formData = new FormData(); 
		formData.append('file', data.file); 
		formData.append('bio', data.bio); 
		formData.append('email', data.email);
		formData.append('organization', data.organization);
		formData.append('helpsWith', JSON.stringify(wordList)); 
		formData.append('partnerUrl', data.partnerUrl);
		
		Object.keys(data.programType).forEach((key) => {
			if (data.programType[key])
			formData.append(`programType[${key}]`, data.programType[key])
		})
		
		const response = await postToDatabase(formData, 'programs/add'); 
		if (response.message === 'success') {
			router.push('/thanks-partner');
		} else {
			setIsSubmitting(false);
		}
	}

	const handleChange = (file) => {
		setValue('file', file); 
	}

	const isDev = process.env.NEXT_PUBLIC_ENV === 'dev'
	const hostname = useHostname();

	const externalLink = `${hostname}/preview`

	return (
		<>
			<NavBar />

			<Box display='flex' fd='column' width='al-fu' center pt={60}>
				<ChangingBackgroundText 
					fontSize='48px'
					initialColor='#1F2041'
					secondaryColor='#1F2041'
					text='Lead With Us!'
					fontColorInitial='#1F2041'
					fontColorSecondary='white'
					onlyRunOneTransition={ true }
				/>

				<Box display="flex">

					<Form 
						style={{maxWidth: '600px', margin: '40px auto 40px auto'}} 
						onSubmit={handleSubmit(onSubmit)} 
						enctype="multipart/form-data"
					>
						<Box>
							<StyledSectionHeading>Name of the scholarship, internship, or program</StyledSectionHeading>
							<TextInput 
								register={register}
								name='organization'
								placeHolder='name:'
							/>
						</Box>

						<Box>
							<StyledSectionHeading>A brief description about the opportunity</StyledSectionHeading>
							<TextInput 
								register={register}
								name='bio'
								placeHolder='Tell us about you! '
							/>
						</Box>

						<Box>
								<Box mt={30}>
									<StyledSectionHeading style={{display: 'inline', marginTop: 30}}>Who does this scholarship, internship, or program serve?</StyledSectionHeading>
									<Tooltip explanation='Example: “Latinx” “LGBTQ” “Black” “All”' style={{marginLeft: 10}}/>
								</Box>
							<WordSelectInput
								setWordList={setWordList}
								wordList={wordList}
								placeHolder='Keywords - Use space or enter to create new label, use - for multi-worded labels'
							/>
						</Box>

						<StyledSectionHeading>What type of program is it?</StyledSectionHeading>
						<CheckboxGroup options={[
								{value: 'programType.summer', label: 'Summer'},
								{value: 'programType.internship', label: 'Internship'},
								{value: 'programType.program', label: 'Programs'},
								{value: 'programType.scholarship', label: 'Scholarship'},
							]}
							register={register}
						/>

						<Box>
							<StyledSectionHeading>Is there a url to find the program?</StyledSectionHeading>
							<TextInput 
								register={register}
								name='partnerUrl'
								placeHolder='website url: '
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

export default AddAndEditOrgs;
