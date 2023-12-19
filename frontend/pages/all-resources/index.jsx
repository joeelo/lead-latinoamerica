import Box from '@mui/material/Box'

import Footer from '@/components/footer/Footer'
import NavBar from '@/components/nav/NavBar'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import useHttpQuery from '@/hooks/useHttpQuery'

export default function AllResourcesPage() {
  const programsQuery = useHttpQuery({
    key: 'all-programs', 
    apiFnArgs: [{
      summer: true,
    }],
    apiFn: ProgramRequests.getAllPrograms
  })

  return (
    <>
      <NavBar />
        <Box>
          
        </Box>
      <Footer />
    </>
  )
}