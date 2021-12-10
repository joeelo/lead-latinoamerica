import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import formFields from '@/data/formFields';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import SelectInput from '@/components/form/select/SelectInput';
import TextInput from '@/components/form/text-input/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup';
import Button from '@/components/generic/Button';
import Box from '@/components/generic/Box';
import Form from '@/components/form/container/Form';
import StyledSectionHeading from '@/components/form/section/StyledSectionHeading';
import Dropzone from '@/components/drag-n-drop/Dropzone'

const AddAndEditOrgs = () => {

	const [ formSubmitted, setFormSubmitted ] = useState(false); 
	const router = useRouter();

  const { register, handleSubmit, setValue } = useForm(); 

	useEffect(() => {
		if (formSubmitted) {
			router.push('/thanks-partner');
		}
	}, [ formSubmitted ])

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

				<Form style={{maxWidth: '600px'}}>
					<Box>
						<StyledSectionHeading>Name of your organization</StyledSectionHeading>
						<TextInput 
							register={register}
							name='organization'
							placeHolder='name:  '
						/>
					</Box>

					<Box>
						<StyledSectionHeading>A brief description about your org</StyledSectionHeading>
						<TextInput 
							register={register}
							name='bio'
							placeHolder='some keywords to describe how you can help'
						/>
					</Box>

					<Box>
						<StyledSectionHeading>How you can help</StyledSectionHeading>
						<TextInput 
							register={register}
							name='helpsWith'
							placeHolder='some keywords to describe how you can help'
						/>
					</Box>

					<Box>
						<StyledSectionHeading>Your org logo</StyledSectionHeading>
						<Dropzone />
					</Box>

					<Button>Submit</Button>
				</Form>
			</Box>
			
			<Footer />
		</>
	)
}

export default AddAndEditOrgs;

const Container = styled.div`
`