import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useQuery } from 'react-query'

import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo'
import ProgramTitleAndPhoto from '@/components/content/program/ProgramTitleAndPhoto'
import Footer from '@/components/footer/Footer'
import LoadingSpinner from '@/components/generic/LoadingSpinner'
import NavBar from '@/components/nav/NavBar'
import ProgramRequests from '@/fetch/program/ProgramRequests'

export default function ProgramPage() {
  const router = useRouter() 
  const { programSlug: name } = router.query  || {}

  const [session, loading] = useSession()
  const isLoadingSession = loading

  const programQuery = useQuery({
		queryKey: ['resourcePrograms', { name }], 
		queryFn: ProgramRequests.getProgram
	})

  const { isLoading } = programQuery

  const program = programQuery.data || {}

  const isCurrentlyLoading = !program || isLoadingSession || isLoading

  return (
    <>
      <NavBar />
      {isCurrentlyLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProgramTitleAndPhoto program={program} router={router}/>
          <ProgramOverviewAndInfo 
            program={program} 
            marginTop={true} 
            email={session?.user?.email}
          />
        </>
      )}

      <Box mb={15}/>
      <Footer />
    </>
  )
}
