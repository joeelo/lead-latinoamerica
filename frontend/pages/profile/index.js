import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/footer/Footer'
import styled from 'styled-components'
import Image from 'next/image' 
import Box from '@/components/generic/Box'
import getFullName from '@/utils/getFullName'
import SelectInput from '@/components/form/select/SelectInput'
import TextInput from '@/components/form/text-input/TextInput'
import { useForm } from 'react-hook-form'
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup'
import { editProfile, getProfile } from '@/fetch/profile/ProfileRequests'
import Button from '@/components/buttons/Button'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import UserSavedPrograms from '@/components/programs/UserSavedPrograms'
import { useQuery } from 'react-query'
import getToast from '@/utils/getToast'
import { useRouter } from 'next/router'
import UserProgramChartWrapper from '@/components/charts/UserProgramChartWrapper'

const ProfilePage = () => {
  const [ session ] = useSession()
  const [ userData, setUserData ] = useState({})
  const [ isEditing, setIsEditing ] = useState(false)
  const router = useRouter()

  const userName = getFullName(session)
  const email = session?.user?.email;
  
  const { register, handleSubmit, setValue } = useForm()

  const { data } = useQuery({
    queryKey: ['userPrograms', session?.user?.email], 
    queryFn: ProgramRequests.getAllPrograms, 
    enabled: !!session?.user?.email
  })
  
  const onSubmit = async (data) => {
    const response = await editProfile(data, email)

    if (response.success) {
      setIsEditing(false);
      getToast({ message: 'Successfully Updated!'})
      scrollTo({ top: 100 });
      setUserData(response.user);
    }
  }

  const setProfileInfo = async () => {
    const response = await getProfile(session)
    if (response?.user?.name) {
      setUserData(response.user)

      response.user.interests.forEach((program) => {
        setValue(`programs.${program}`, `programs.${program}`);
      })

      response.user.nationality.forEach((ethnicity) => {
        setValue(`ethnicity.${ethnicity}`, `ethnicity.${ethnicity}`);
      })
    }
  }

  const handleClick = () => {
    setIsEditing(true)

    userData.interests.forEach((program) => {
      setValue(`programs.${program}`, true);
    })

    userData.nationality.forEach((ethnicity) => {
      setValue(`ethnicity.${ethnicity}`, true);
    })
  }

  const handleCancel = (event) => {
    event.preventDefault()

    setIsEditing(false)
    scrollTo({ top: 100 })
  }

  useEffect(() => {
    if (email) {
      setProfileInfo()
    }
  }, [email])

  useEffect(() => {
    if (!session) {
      router.push('sign-in')
    }
  }, [session])

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
              {userName.initials}
            </NameCircle>
          )}
        </Box>

        <Box display='flex' width='al-fu' fd="column" center justify='space-between' mw="1000px" stackOnMobile>
          <Box center mt='100px' mb='40px'>
            {!isEditing ? (
              <> 
                <div style={{ marginTop: 40 }}>
                  {userData.preferredName && (
                    <TitleHeading> Hey there {userData.preferredName}!</TitleHeading>
                  )}
                </div>

                <Span> 
                  We're bringing notifications to the profile page soon. So you can opt-in to get weekly emails on programs that have been uploaded, and specify what types of programs you're interested in by clicking the edit button below.
                </Span>

                <Button label='Edit' onClick={handleClick}/>

              </>
            ) : (
              <Box mw='600px' mr='40px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box mb='30px'>
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

                  <Box mb='30px' mw='400px'>
                    <TitleHeading>What is your preferred name?</TitleHeading>
                    <TextInput 
                      name='preferredName'
                      register={register}
                      initialVal={userData.preferredName}
                      setValue={setValue}
                    />
                  </Box>

                  <Box mb='30px'>
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

                  <Box mb='30px'>
                    <TitleHeading>What programs are you most interested in?</TitleHeading>
                    <CheckboxGroup 
                      options={[
                        {value: 'programs.summer', label: 'Summer'}, 
                        {value: 'programs.scholarships', label: 'Scholarships'}, 
                        {value: 'programs.internships', label: 'Internships'}, 
                        {value: 'programs.programs', label: 'Programs'},
                      ]}
                      register={register}
                      checkedOnLoad={userData.interests}
                      name="program"
                    /> 
                  </Box>

                  <Box>
                    <TitleHeading>What ethnicity are you? (check all that apply)</TitleHeading>

                    <p style={{ marginTop: -10, marginBottom: 10}}>
                      We ask because there are programs for specific groups and we'd like every possible opportunity to be available.
                    </p>

                    <CheckboxGroup
                      name="ethnicity"
                      options={[
                        {value: 'ethnicity.caucasian', label: 'White or Caucasion'},
                        {value: 'ethnicity.latino', label: 'Hispanic or Latino'},
                        {value: 'ethnicity.african', label: 'African or African-American'},
                        {value: 'ethnicity.asian', label: 'Asian or Asian-American'},
                        {value: 'ethnicity.nativeAmerican', label: 'Native American'},
                        {value: 'ethnicity.multiRacial', label: 'Multi-Racial'},
                        {value: 'ethnicity.noAnswer', label: 'Don\'t care to answer'},
                      ]}
                      checkedOnLoad={userData.nationality}
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

          <Box>
            <UserSavedPrograms programs={data?.programs}/>
          </Box>

          <UserProgramChartWrapper />

        </Box>
      <Footer />
    </>
  )
}

export default ProfilePage

const PhotoContainer = styled.div`
  min-height: 300px; 
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

const Span = styled.span`
  display: flex;
  max-width: 900px; 
  font-size: 18px; 
  margin-top: 20px;
`