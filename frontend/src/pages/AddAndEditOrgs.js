import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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
import Dropzone from '@/components/drag-n-drop/Dropzone';
import Textarea from '@/components/form/text-input/TextArea';
import { postToDatabase } from '@/fetch/requests';
import WordSelectInput from '@/components/form/word-select/WordSelectInput';
import ExternalLink from '@/components/generic/ExternalLink';
import useHostname from '@/hooks/useHostname';

const AddAndEditOrgs = () => {

	const [ isSubmitting, setIsSubmitting ] = useState(false); 
	const [ wordList, setWordList ] = useState([]);
	const router = useRouter();

	const setPreviewData = (data) => {
		localStorage.setItem('organization', data.organization);
		localStorage.setItem('bio', data.bio);
		localStorage.setItem('missionStatement', data.missionStatement);
		localStorage.setItem('helpsWith', JSON.stringify(wordList));
	}

  const { register, handleSubmit, setValue } = useForm(); 

	const onSubmit = async (data, preview) => {

		if (preview === true) {
			setPreviewData(data);
			return;
		}
		
		setIsSubmitting(true);
		
		const formData = new FormData(); 
		formData.append('file', data.file); 
		formData.append('bio', data.bio); 
		formData.append('missionStatement', data.missionStatement); 
		formData.append('email', data.email);
		formData.append('organization', data.organization);
		formData.append('helpsWith', JSON.stringify(wordList)); 
		formData.append('partnerUrl', data.partnerUrl);
		
		Object.keys(data.programType).forEach((key) => {
			if (data.programType[key])
			formData.append(`programType[${key}]`, data.programType[key])
		})
		
		const response = await postToDatabase(formData, '/programs/add'); 
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
					text='Share a program!'
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
							<StyledSectionHeading>Name of your organization</StyledSectionHeading>
							<TextInput 
								register={register}
								name='organization'
								placeHolder='name:'
							/>
						</Box>

						<Box>
							<StyledSectionHeading>A brief description about your org</StyledSectionHeading>
							<TextInput 
								register={register}
								name='bio'
								placeHolder='Tell us about you! '
							/>
						</Box>

						<Box>
							<StyledSectionHeading>How you can help</StyledSectionHeading>
							<WordSelectInput
								setWordList={setWordList}
								wordList={wordList}
								placeHolder='Use space or enter to create new label, use - for multi-worded labels'
							/>
						</Box>

						{/* DROPZONE FILE UPLOAD COMPONENT*/}
						<Box>
							<StyledSectionHeading>Your org logo</StyledSectionHeading>
							<Dropzone 
								onChange={handleChange}
							/>
						</Box>

						<StyledSectionHeading>What type of services are offered?</StyledSectionHeading>
						<CheckboxGroup options={[
								{value: 'programType.summer', label: 'Summer'},
								{value: 'programType.internship', label: 'Internship'},
								{value: 'programType.program', label: 'Programs'},
								{value: 'programType.scholarship', label: 'Scholarship'},
							]}
							register={register}
						/>

						<Box>
							<StyledSectionHeading>Mission Statement</StyledSectionHeading>
							<Textarea 
								register={register}
								name='missionStatement'
								placeHolder='Do you have a mission statement?'
							/>
						</Box>

						<Box>
							<StyledSectionHeading>Do you have a website?</StyledSectionHeading>
							<TextInput 
								register={register}
								name='partnerUrl'
								placeHolder='website url: '
							/>
						</Box>

						<Box>
							<StyledSectionHeading>Best email to reach you at?</StyledSectionHeading>
							<TextInput 
								register={register}
								name='email'
								placeHolder='Email:'
							/>
						</Box>

						<Box display='flex'>
							<Button label='Go Back' style={{ marginRight: 20 }}/>
							<Button label='Submit' isSubmitting={isSubmitting}/>
						</Box>
					</Form>

					<Box 
						display="flex" 
						fd="column" 
						width="30%" 
						mobileWidth="30%" 
						mb={40} 
						mt={40}
						ml={20} 
						p='20px'
						style={{
							position: 'sticky', 
							top: 80,	
							boxShadow: '3px 0px 35px -4px rgba(156,156,156,1)', 
						}}
					>
						Want to see what your form will look like?
						<ExternalLink 
							bgColor='#07004d'
							href={externalLink} 
							onClick={() => {
								handleSubmit(onSubmit)(true);
							}}>
							Preview
						</ExternalLink>
					</Box>
				</Box>
			</Box>			
			<Footer />
		</>
	)
}

export default AddAndEditOrgs;

const Container = styled.div`

`