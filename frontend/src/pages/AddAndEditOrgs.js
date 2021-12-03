import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import formFields from '@/data/formFields';
import Form from '@/components/form/Form';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';
import Box from '@/components/generic/Box';

const AddAndEditOrgs = () => {

	const [ formSubmitted, setFormSubmitted ] = useState(false); 
	const router = useRouter();

	useEffect(() => {
		if (formSubmitted) {
			router.push('/thanks-partner');
		}
	}, [ formSubmitted ])

	return (
		<>
			<NavBar />
			<CenterFlexContainer backgroundColor={ '#F8FAFA' } paddingTop={ true }>
			<ChangingBackgroundText 
				fontSize={ '48px' }
				initialColor={ '#1F2041' }
				secondaryColor={ '#1F2041' }
				text={ 'Lead With Us!' }
				fontColorInitial={ '#1F2041' }
				fontColorSecondary={ '#F8FAFA' }
				onlyRunOneTransition={ true }
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={40}>
					<TitleHeading>What year of school are you in</TitleHeading>
					<SelectInput 
						options={[
							{value: 'freshman', label: 'Freshman'},
							{value: 'sophomore', label: 'Sophomore'},
							{value: 'junior', label: 'Junior'},
							{value: 'senior', label: 'Senior'},
							{value: 'parent', label: 'I\'m a parent'},
						]}
						setValue={setValue}
						register={register}
						name='grade'
					/>
				</Box>

				<Box mb={30}>
					<TitleHeading>What is your preferred name?</TitleHeading>
					<TextInput 
						name='preferredName'
						register={register}
					/>
				</Box>

				<Box mb={30}>
					<TitleHeading>What are your preferred pronouns?</TitleHeading>
					<SelectInput 
						options={[
							{value: 'he', label: 'He/His'},
							{value: 'she', label: 'She/Her'},
							{value: 'they', label: 'They/Them'},
							{value: 'none', label: 'Doesn\'t matter'},
						]}
						setValue={setValue}
						register={register}
						name='pronouns'
					/>
				</Box>

				<Box mb={30}>
					<TitleHeading>What programs are you most interested in?</TitleHeading>
					<CheckboxGroup 
						options={[
							{value: 'programs.summer', label: 'Summer'}, 
							{value: 'programs.scholarships', label: 'Scholarships'}, 
							{value: 'programs.internships', label: 'Internships'}, 
							{value: 'programs.programs', label: 'Programs'},
						]}
						register={register}
					/> 
				</Box>

				<Box>
					<TitleHeading>What ethnicity are you? (check all that apply)</TitleHeading>
					<p style={{ marginTop: -10, marginBottom: 10}}>We ask because there are programs for specific groups and we'd like every possible opportunity to be available.</p>
					<CheckboxGroup
						options={[
							{value: 'ethnicity.caucasian', label: 'White or Caucasion'},
							{value: 'ethnicity.latino', label: 'Hispanic or Latino'},
							{value: 'ethnicity.african', label: 'African or African-American'},
							{value: 'ethnicity.asian', label: 'Asian or Asian-American'},
							{value: 'ethnicity.nativeAmerican', label: 'Native American'},
							{value: 'ethnicity.multiRacial', label: 'Multi-Racial'},
							{value: 'ethnicity.noAnswer', label: 'Don\'t care to answer'},
						]}
						register={register}
					/>
				</Box>
				<SubmitButton color='#1F2041' label='Submit'/>
			</form>

			</CenterFlexContainer>
			<Footer />
		</>
	)
}

export default AddAndEditOrgs;

const Container = styled.div`
`