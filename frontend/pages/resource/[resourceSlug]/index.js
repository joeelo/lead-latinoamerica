import Footer from '@/components/footer/Footer'
import LoadingSpinner from '@/components/generic/LoadingSpinner'
import NavBar from '@/components/nav/NavBar'
import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo'
import ProgramRequests from '@/fetch/program/ProgramRequests'
import ProgramTitleAndPhoto from '@/components/content/program/ProgramTitleAndPhoto'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

const ResourcePage = () => {
  const router = useRouter()
  const { resourceSlug: name } = router.query || {}

  const [session, loading] = useSession()
  const isLoadingSession = loading

  const programQuery = useQuery({
    queryKey: ['resourcePrograms', { name }],
    queryFn: ProgramRequests.getProgram,
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
          <ProgramTitleAndPhoto program={program} router={router} />
          <ProgramOverviewAndInfo
            program={program}
            marginTop={true}
            email={session?.user?.email}
          />
        </>
      )}
      <Footer marginTop={true} />
    </>
  )
}

export default ResourcePage
