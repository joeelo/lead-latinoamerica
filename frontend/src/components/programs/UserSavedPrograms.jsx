import Box from '@mui/material/Box'
import { useSession } from 'next-auth/client'
import PropTypes from 'prop-types'
import React from 'react'
import { useQueryClient } from 'react-query'
import styled from 'styled-components'

import ProgramCardSimple from '@/components/content/program/ProgramCardSimple'
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
    <Box display="flex" flexDirection="column" mb={2.5}>
      <TitleHeading>Your Saved Opportunities</TitleHeading>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {programs.length === 0 ? (
          <p>You haven`t saved any opportunities yet!</p>
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
      </div>
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

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
