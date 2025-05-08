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
import { QueryKeys } from '@/config/QueryKeys'
import UserRequests from '@/requests/UserRequests'
import getFullName from '@/utils/getFullName'

export default function ProfilePage() {
  const [session] = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:768px)')

  const userName = getFullName(session)
  const email = session?.user?.email

  const { register, handleSubmit, setValue } = useForm()

  const userProgramsQuery = useQuery({
    queryKey: QueryKeys.USER_PROGRAMS,
    queryFn: () => UserRequests.getUserPrograms(email),
    enabled: !!email,
  })

  const user = useQuery({
    queryKey: QueryKeys.USER_DETAILS,
    queryFn: () => UserRequests.getProfile(email, session),
    enabled: !!session,
  })

  const userPrograms = userProgramsQuery.data
    ? userProgramsQuery.data.programs
    : []

  const userData = user.data || {}

  const onSubmit = async () => {
    const response = await UserRequests.editProfile(apiData, email)
    if (response.success) {
      setIsEditing(false)
      getToast({ message: 'Successfully Updated!' })
      scrollTo({ top: 100 })
      setUserData(response.user)
    }
  }

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
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
      <Box minHeight={300} minWidth="100vw" position="relative">
        <Image
          src="/images/profile-images/david-marcu-unsplash-nature.jpg"
          alt="nature photo banner"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box width="100%" position="relative" justifyContent="center">
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
              left: '35px',
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
        maxWidth={1100}
      >
        <Box justifyContent="center" mt={15} mb={10}>
          {!isEditing ? (
            <>
              {userData.preferredName && (
                <Typography style={titleHeadingStyle}>
                  Hey there {userData.preferredName}!
                </Typography>
              )}

              <Typography style={{ ...titleHeadingStyle, fontSize: 18 }}>
                We&apos;re bringing notifications to the profile page soon. So
                you can opt-in to get weekly emails on programs that have been
                uploaded! If you wish to opt-in and start receiving weekly
                emails when we start please click the edit button
              </Typography>

              <Button maxWidth={165} label="Edit" onClick={handleClick} />
            </>
          ) : (
            <Box maxWidth={600} mr="40px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb="30px" display="flex" alignItems="center">
                  <Typography fontSize={22}>
                    Opt-in to weekly emails?
                  </Typography>
                  <Checkbox
                    checked={userData.optedIn}
                    style={{ marginLeft: 8 }}
                  />
                </Box>

                <Box mb="30px" maxWidth={400}>
                  <Typography fontSize={22}>
                    What is your preferred name?
                  </Typography>
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
          <UserSavedPrograms programs={userPrograms} />
        </div>
      </Box>
    </Box>
  )
}
