import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
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
import Button from '@/components/buttons/Button';
import { ToastContainer, toast } from 'react-toastify';
import { getAllPrograms } from '@/fetch/program/ProgramRequests';
import UserSavedPrograms from '@/components/programs/UserSavedPrograms';
import { useQuery } from 'react-query';

const ProfilePage = (props) => {

  const [ session ] = useSession(); 
  const [ userData, setUserData ] = useState({});
  const [ isEditing, setIsEditing ] = useState(false); 
  const [ userPrograms, setUserPrograms ] = useState([])

  const userName = getFullName(session)
  const email = session?.user?.email;
  const userInterestStr = userData.interests?.join(', ') || 'N/A';
  
  const { register, handleSubmit, setValue } = useForm(); 

  const { data } = useQuery(
    ['userPrograms', session?.user?.email],
    getAllPrograms, 
    {
      enabled: !!session?.user?.email
    }
  )

  const successNotification = () => toast('Successfully Updated!', {
    position: 'bottom-right',
    hideProgressBar: true,
    style: { background: '#43a23c', color: 'white' },
  });
  
  const onSubmit = async (data) => {
    const response = await editProfile(data, email); 

    if (response.success) {
      setIsEditing(false);
      successNotification();
      scrollTo({ top: 100 });
      setUserData(response.user);
    }
  }

  const setProfileInfo = async () => {
    const response = await getProfile(session); 
    if (response?.user?.name) {
      setUserData(response.user); 

      response.user.interests.forEach((program) => {
        setValue(`programs.${program}`, true);
      })

      response.user.nationality.forEach((ethnicity) => {
        setValue(`ethnicity.${ethnicity}`, true);
      })
    }
  }

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleCancel = (event) => {
    event.preventDefault(); 

    setIsEditing(false); 
    scrollTo({ top: 100 })
  }

  useEffect(() => {
    if (email) {
      setProfileInfo(); 
    }
  }, [email])

  useEffect(() => {

  }, [userPrograms?.length])

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
          {userName.initials && (
            <NameCircle>
              { userName.initials }
            </NameCircle>
          )}
        </Box>

        <Box display='flex' width='al-fu' center justify='space-between' mw="1000px">
          <Box width='al-fu' center mt={100} mb={100}>
            {!isEditing ? (
              <> 
                {userData.preferredName && (
                  <TitleHeading> Hey there {userData.preferredName}!</TitleHeading>
                )}

                <Span> We're bringing notifications to the profile page soon. So you can opt-in to get weekly emails on programs that have been uploaded, and specify what types of programs you're interested in by clicking the edit button below.</Span>

                {/* {userData?.grade === 'parent' ? (
                  <TitleHeading> Thank you for joining us! </TitleHeading>
                ) : (
                  <>
                    <TitleHeading>Grade</TitleHeading>
                    <FormDetail>{userData?.grade || 'N/A'}</FormDetail>
                  </>
                )}

                <TitleHeading>What are you interested in?</TitleHeading>
                <FormDetail>{userInterestStr}</FormDetail> */}

                <Button label='Edit' onClick={handleClick}/>

              </>
            ) : (
              <Box mw='600px' mr={40}>
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
                      initialVal={userData.grade}
                    />
                  </Box>

                  <Box mb={30} mw={'400px'}>
                    <TitleHeading>What is your preferred name?</TitleHeading>
                    <TextInput 
                      name='preferredName'
                      register={register}
                      initialVal={userData.preferredName}
                      setValue={setValue}
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
                      initialVal={userData.pronouns}
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

                  <Box display='flex'>
                    <Button  label='cancel' onClick={handleCancel} style={{marginRight: 40}}/>
                    <Button label='Submit'/>
                  </Box>
                </form>
              </Box>
            )}
          </Box>

          <Box mw="300px">
            <UserSavedPrograms programs={data?.programs}/>
          </Box>
        </Box>
      <Footer />
      <ToastContainer />
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
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-top: 20px;
`

const FormDetail = styled.p`
  font-size: 22px; 
  margin-bottom: 30px; 
`

const Span = styled.span`
  display: flex;
  max-width: 400px; 
  font-size: 18px; 
  margin-top: 20px;
`