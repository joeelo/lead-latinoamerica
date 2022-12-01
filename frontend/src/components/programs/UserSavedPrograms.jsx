import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '../generic/Box'
import ProgramCardSimple from '@/components/content/program/ProgramCardSimple'
import { useSession } from 'next-auth/client'
import { useQueryClient } from 'react-query'
import getToast from '@/utils/getToast'

const UserSavedPrograms = ({ programs }) => {
  const [session] = useSession()
  const { user } = session || {}
  const queryClient = useQueryClient()

  if (!programs) {
    return null
  }

  const handleRemoveSuccess = () => {
    queryClient.invalidateQueries('userPrograms')

    getToast({ message: 'succesfully removed!' })
  }

  return (
    <Box display="flex" fd="column" stackOnMobile mb="20px">
      <TitleHeading>Your Saved Opportunities</TitleHeading>
      <Box display="flex" wrap="wrap">
        {programs.length === 0 ? (
          <p>You haven't saved any opportunities yet!</p>
        ) : (
          <>
            {programs.map((program) => {
              return (
                <ProgramCardSimple
                  program={program}
                  user={user}
                  key={program._id}
                  onSuccess={handleRemoveSuccess}
                />
              )
            })}
          </>
        )}
      </Box>
    </Box>
  )
}

UserSavedPrograms.propTypes = {
  programs: PropTypes.array,
}

export default UserSavedPrograms

const TitleHeading = styled.p`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-top: 20px;
`
