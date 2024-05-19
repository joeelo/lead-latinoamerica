
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

import Button from '@/components/buttons/Button'
import TextInput from '@/components/form/text-input/TextInput'
import UserSavedPrograms from '@/components/programs/UserSavedPrograms'
import { editProfile, getProfile } from '@/fetch/profile/ProfileRequests'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import getFullName from '@/utils/getFullName'
import getToast from '@/utils/getToast'

// const UserProgramChartWrapper = dynamic(
//   () => import('@/components/charts/UserProgramChartWrapper'),
//   { ssr: false }
// ) // TODO: Put back when we have more data

export default function ProfilePage() {
  const [session] = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:768px)')

  const userName = getFullName(session)
  const email = session?.user?.email

  const { register, handleSubmit, setValue } = useForm()

  const { data } = useQuery({
    queryKey: ['userPrograms', session?.user?.email],
    queryFn: ProgramRequests.getAllPrograms,
    enabled: !!session,
  })

  const user = useQuery({
    queryKey: ['userData', session], 
    queryFn: getProfile, 
    enabled: !!session
  })

  const userData = user.data || {}

  const onSubmit = async (data) => {
    console.log(data)


    // const response = await editProfile(apiData, email)

    // if (response.success) {
    //   setIsEditing(false)
    //   getToast({ message: 'Successfully Updated!' })
    //   scrollTo({ top: 100 })
    //   setUserData(response.user)
    // }
  }

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleCancel = (event) => {
    event.preventDefault()

    setIsEditing(false)
    scrollTo({ top: 100 })
  }

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
  }

  return (
    <Box>
      <Box
        minHeight={300}
        minWidth="100vw"
        position="relative"
      >
        <Image
          src="/images/profile-images/david-marcu-unsplash-nature.jpg"
          alt="nature photo banner"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box width="100%"  position='relative' justifyContent="center">
        {userName.initials && (
          <Box
            sx={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '1px solid #888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: '-75px',
              backgroundColor: '#1f2041',
              color: 'white',
              fontSize: '36px',
              '@media screen and (max-width: 768px)': {
                height: '120px',
                width: '120px',
                fontSize: '30px',
                top: '-60px',
              },
            }}
          >
            {userName.initials}
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        pr={5}
        pl={isMobile ? 2 : 6}
        justify="space-between"
        maxWidth={1000}
      >
        <Box justifyContent="center" mt={15} mb={10}>
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
                uploaded! If you wish to opt-in and start receiving weekly emails when we start please click the edit button 
              </Typography>

              <Button label="Edit" onClick={handleClick} />
            </>
          ) : (
            <Box maxWidth={600} mr="40px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb="30px" display="flex" alignItems="center">
                  <Typography style={titleHeadingStyle}>Opt-in to weekly emails?</Typography>
                  <Checkbox checked={userData.optedIn} style={{ marginTop: 0 }}/>
                </Box>
                
                <Box mb="30px" maxWidth={400}>
                  <Typography style={titleHeadingStyle}>What is your preferred name?</Typography>
                  <TextInput
                    name="preferredName"
                    register={register}
                    initialVal={userData.preferredName}
                    setValue={setValue}
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

        <div>
          <UserSavedPrograms programs={data?.programs} />
        </div>
      </Box>
    </Box>
  )
}
