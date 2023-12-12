import Box from '@mui/material/Box'

import ProgramRequests from '@/fetch/program/ProgramRequests'
import useHttpQuery from '@/hooks/useHttpQuery'

export default function AllResourcesPage() {
  const programsQuery = useHttpQuery({
    key: 'programs', 
    apiFnArgs: [{
      summer: true,
    }],
    apiFn: ProgramRequests.getAllProgramsTest
  })

  console.log(programsQuery)

  return (
    <Box>
      
    </Box>
  )
}