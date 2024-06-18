// TODO: Update this page with spanish text
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/client'
import React from 'react'
import { useQueryClient } from 'react-query'

import ProgramCardSimple from '@/components/content/program/ProgramCardSimple'
import getToast from '@/utils/getToast'

export default function UserSavedPrograms({ programs }) {
  const [session] = useSession()
  const { user } = session || {}
  const queryClient = useQueryClient()

  if (!programs) {
    return null
  }

  const handleRemoveSuccess = () => {
    queryClient.invalidateQueries('userPrograms')

    getToast({ message: 'succesfully removed opportunity' })
  }

  return (
    <Box display="flex" flexDirection="column" mb={2.5}>
      <Typography
        fontSize='28px'
        mb={2.5}
        fontWeight={500}
        sx={{
          '@media screen and (max-width: 768px)': {
            display: 'flex',
            justifyContent: 'center', 
            width: '100%'
          }
        }}
      >
        Your Saved Opportunities
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', marginBottom: 40 }}>
        {programs.length === 0 ? (
          <p>You haven&apos;t saved any opportunities yet!</p>
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
