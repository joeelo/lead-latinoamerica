import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '../generic/Box'
import ProgramCardSimple from '@/components/content/program/ProgramCardSimple'
import { useSession } from 'next-auth/client'

const UserSavedPrograms = ({ programs, showExpiringPrograms = false }) => {
  const [session] = useSession()
  const { user } = session

  if (!programs) {
    return null
  }

  const programsWithExpirationDates = programs.filter(
    (program) => program.expirationDate
  )

  const hasExpiringPrograms = programsWithExpirationDates.length > 0

  return (
    <Box display="flex" fd="column" stackOnMobile>
      {showExpiringPrograms && hasExpiringPrograms && (
        <>
          <TitleHeading>Expiring Opportunities</TitleHeading>
          <Box display="flex" wrap="wrap">
            {programsWithExpirationDates.map((program) => {
              return (
                <ProgramCardSimple
                  program={program}
                  user={user}
                  key={program._id}
                />
              )
            })}
          </Box>
        </>
      )}

      <TitleHeading>Your Saved Opportunities</TitleHeading>
      <Box display="flex" wrap="wrap">
        {programs.map((program) => {
          if (program.expirationDate && showExpiringPrograms) {
            return null
          }

          return (
            <ProgramCardSimple
              program={program}
              user={user}
              key={program._id}
            />
          )
        })}
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
