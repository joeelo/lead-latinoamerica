import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useQuery } from 'react-query'
import ProgramOverviewAndInfo from 'src/components/content/program/ProgramOverviewAndInfo'
import ProgramTitleAndPhoto from 'src/components/content/program/ProgramTitleAndPhoto'
import LoadingSpinner from 'src/components/generic/LoadingSpinner'
import ProgramRequests from 'src/requests/ProgramRequests'

const ResourcePage = () => {
  const router = useRouter()
  const { resourceSlug: name } = router.query || {}

  const [session, loading] = useSession()
  const isLoadingSession = loading

  const programQuery = useQuery({
    queryKey: QueryKeys.PROGRAM,
    queryFn: () => ProgramRequests.getBySlug(name),
  })

  const { isLoading } = programQuery

  const program = programQuery.data || {}

  const isCurrentlyLoading = !program || isLoadingSession || isLoading

  return (
    <>
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
    </>
  )
}

export default ResourcePage
