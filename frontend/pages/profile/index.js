import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import styled from 'styled-components';
import Image from 'next/image'; 
import Box from '@/components/generic/Box';
import getFullName from '@/utils/getFullName';
import SelectInput from '@/components/form/select/SelectInput';
import TextInput from '@/components/form/text-input/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup';
import { editProfile, getProfile } from '@/fetch/profile/ProfileRequests';
import SubmitButton from '@/components/buttons/SubmitButton';


const ProfilePage = (props) => {

  const [ session, loading ] = useSession(); 
  const [ profileInfo, setProfileInfo ] = useState(null); 

  const userName = getFullName(session); 
  const email = session?.user?.email;
  
  const { register, handleSubmit, setValue } = useForm(); 
  
  const onSubmit = async (data) => {

    const response = await editProfile(data, email); 
    console.log('data: ', response);
  }

  const getProfileInfo = async () => {
    const profile = await getProfile(session); 
    console.log('PRFOILE: ', profile);
  }

  

  useEffect(() => {
    if (email) {
      getProfileInfo(); 
    }
  }, [email])


  return (
    <>
      <NavBar/>
        <PhotoContainer>
          <Image src='/images/profile-images/david-marcu-unsplash-nature.jpg'
            layout='fill'
            objectFit='cover'
          />
        </PhotoContainer>
        <Box width='al-fu' center style={{position: 'relative'}}>
          <NameCircle>
            { userName.initials }
          </NameCircle>
        </Box>
        <Box width='al-fu' center mt={100} mb={100}>
          <Box mw='700px'>
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

          </Box>
        </Box>
      <Footer />
    </>
  )
}

ProfilePage.propTypes = {

}

export default ProfilePage; 

const PhotoContainer = styled.div`
  min-height: 400px; 
  min-width: 100vw; 
  position: relative; 
`

const NameCircle = styled.div`
  position: absolute; 
  width: 150px; 
  height: 150px; 
  border-radius: 50%; 
  border: 1px solid #888; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  top: -75px; 
  background-color: #1F2041; 
  color: white;
  font-size: 36px;
`

const TitleHeading = styled.p`
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: 300;
  margin-top: 20px;
`