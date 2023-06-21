
import { editProfile, getProfile } from '@/fetch/profile/ProfileRequests'
import React, { useEffect, useState } from 'react'
import Box from '@/components/generic/Box'
import Button from '@/components/buttons/Button'
import CheckboxGroup from '@/components/form/checkbox/CheckboxGroup'
import dynamic from 'next/dynamic'
import { Ethnicity } from './Ethnicity'
import Footer from '@/components/footer/Footer'
import getFullName from '@/utils/getFullName'
import getToast from '@/utils/getToast'
import Image from 'next/image'
import { Interests } from './Interests'
import NavBar from '@/components/nav/NavBar'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import SelectInput from '@/components/form/select/SelectInput'
import styled from 'styled-components'
import TextInput from '@/components/form/text-input/TextInput'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import UserSavedPrograms from '@/components/programs/UserSavedPrograms'
import { useSession } from 'next-auth/client'

const UserProgramChartWrapper = dynamic(
  () => import('@/components/charts/UserProgramChartWrapper'),
  { ssr: false }
)

const ProfilePage = () => {
  const [session] = useSession()
  const [userData, setUserData] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const userName = getFullName(session)
  const email = session?.user?.email

  const { register, handleSubmit, setValue } = useForm()

  const { data } = useQuery({
    queryKey: ['userPrograms', session?.user?.email],
    queryFn: ProgramRequests.getAllPrograms,
    enabled: !!session?.user?.email,
  })

  const onSubmit = async (data) => {
    const interestKeys = Object.values(Interests)
    const nationalityKeys = Object.values(Ethnicity)

    const interestData = []
    const nationalityData = []

    interestKeys.forEach((interest) => {
      if (!!data[interest]) {
        interestData.push(interest)
      }
    })

    nationalityKeys.forEach((nationality) => {
      if (!!data[nationality]) {
        nationalityData.push(nationality)
      }
    })

    const apiData = {
      interests: interestData,
      nationality: nationalityData,
    }

    const response = await editProfile(apiData, email)

    if (response.success) {
      setIsEditing(false)
      getToast({ message: 'Successfully Updated!' })
      scrollTo({ top: 100 })
      setUserData(response.user)
    }
  }

  const setProfileInfo = async () => {
    const response = await getProfile(session)

    if (response?.user) {
      setUserData(response.user)

      response.user.interests.forEach((program) => {
        setValue(`${program}`, `${program}`)
      })

      response.user.nationality.forEach((ethnicity) => {
        setValue(`${ethnicity}`, `${ethnicity}`)
      })
    }
  }

  const handleClick = () => {
    setIsEditing(true)

    userData.interests.forEach((program) => {
      setValue(`${program}`, true)
    })

    userData.nationality.forEach((ethnicity) => {
      setValue(`${ethnicity}`, true)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    if (!session) {
      router.push('sign-in')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const titleHeadingStyle = {
    fontSize: '28px',
    marginBottom: 10,
    fontWeight: 500,
    marginTop: 20, 
  }

  return (
    <>
      <NavBar />

      <PhotoContainer>
        <Image
          src="/images/profile-images/david-marcu-unsplash-nature.jpg"
          layout="fill"
          objectFit="cover"
          alt="nature photo banner"
        />
      </PhotoContainer>

      <Box width="al-fu" center style={{ position: 'relative' }}>
        {userName.initials && <NameCircle>{userName.initials}</NameCircle>}
      </Box>

      <Box
        display="flex"
        width="al-fu"
        fd="column"
        center
        justify="space-between"
        mw="1000px"
        stackOnMobile
      >
        <Box center mt="80px" mb="40px">
          {!isEditing ? (
            <>
              {userData.preferredName && (
                <Typography style={titleHeadingStyle}>
                  Hey there {userData.preferredName}!
                </Typography>
              )}

              <Typography style={{...titleHeadingStyle, fontSize: 18}}>
                We&apos;re bringing notifications to the profile page soon. So you
                can opt-in to get weekly emails on programs that have been
                uploaded, and specify what types of programs you&apos;re interested
                in by clicking the edit button below.
              </Typography>

              <Button label="Edit" onClick={handleClick} />
            </>
          ) : (
            <Box mw="600px" mr="40px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb="30px">
                  <Typography style={titleHeadingStyle}>What year of school are you in</Typography>
                  <SelectInput
                    options={[
                      { value: 'freshman', label: 'Freshman' },
                      { value: 'sophomore', label: 'Sophomore' },
                      { value: 'junior', label: 'Junior' },
                      { value: 'senior', label: 'Senior' },
                      { value: 'parent', label: "I'm a parent" },
                    ]}
                    setValue={setValue}
                    register={register}
                    name="grade"
                    initialVal={userData.grade}
                  />
                </Box>

                <Box mb="30px" mw="400px">
                  <Typography style={titleHeadingStyle}>What is your preferred name?</Typography>
                  <TextInput
                    name="preferredName"
                    register={register}
                    initialVal={userData.preferredName}
                    setValue={setValue}
                  />
                </Box>

                <Box mb="30px">
                  <Typography style={titleHeadingStyle}>What are your preferred pronouns?</Typography>
                  <SelectInput
                    options={[
                      { value: 'he', label: 'He/His' },
                      { value: 'she', label: 'She/Her' },
                      { value: 'they', label: 'They/Them' },
                      { value: 'none', label: "No preference" },
                    ]}
                    setValue={setValue}
                    register={register}
                    name="pronouns"
                    initialVal={userData.pronouns}
                  />
                </Box>

                <Box mb="30px">
                  <Typography style={titleHeadingStyle}>
                    What programs are you most interested in?
                  </Typography>
                  <CheckboxGroup
                    options={[
                      { value: Interests.Summer, label: 'Summer' },
                      { value: Interests.Scholarships, label: 'Scholarships' },
                      { value: Interests.Internships, label: 'Internships' },
                      { value: Interests.Programs, label: 'Programs' },
                    ]}
                    register={register}
                    checkedOnLoad={userData.interests || []}
                    name="program"
                  />
                </Box>

                <Box>
                  <Typography style={titleHeadingStyle}>
                    What ethnicity are you? (check all that apply)
                  </Typography>

                  <p style={{ marginTop: -10, marginBottom: 10 }}>
                    We ask because there are programs for specific groups and
                    we&apos;d like every possible opportunity to be available.
                  </p>

                  <CheckboxGroup
                    name="ethnicity"
                    options={[
                      {
                        value: Ethnicity.Caucasian,
                        label: 'White or Caucasion',
                      },
                      {
                        value: Ethnicity.Latino,
                        label: 'Hispanic or Latino',
                      },
                      {
                        value: Ethnicity.African,
                        label: 'African or African-American',
                      },
                      {
                        value: Ethnicity.Asian,
                        label: 'Asian or Asian-American',
                      },
                      {
                        value: Ethnicity.NativeAmerican,
                        label: 'Native American',
                      },
                      { 
                        value: Ethnicity.MultiRacial, 
                        label: 'Multi-Racial' 
                      },
                      {
                        value: Ethnicity.NoAnswer,
                        label: "Don't care to answer",
                      },
                    ]}
                    checkedOnLoad={userData.nationality}
                    register={register}
                  />
                </Box>

                <Box display="flex">
                  <Button
                    label="Cancel"
                    onClick={handleCancel}
                    style={{ marginRight: 40 }}
                  />
                  <Button label="Update" />
                </Box>
              </form>
            </Box>
          )}
        </Box>

        <Box>
          <UserSavedPrograms programs={data?.programs} />
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
  background-color: #1f2041;
  color: white;
  font-size: 36px;

  @media screen and (max-width: 768px) {
    height: 120px; 
    width: 120px; 
    font-size: 30; 
    top: -60px;
  }
`