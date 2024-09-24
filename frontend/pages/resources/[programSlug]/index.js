import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useQuery } from 'react-query'

import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo'
import ProgramTitleAndPhoto from '@/components/content/program/ProgramTitleAndPhoto'
import LoadingSpinner from '@/components/generic/LoadingSpinner'
import { QueryKeys } from '@/config/QueryKeys'
import ProgramRequests from '@/requests/ProgramRequests'

export default function ProgramPage() {
  const router = useRouter() 
  const { programSlug: name } = router.query  || {}

  const [session, loading] = useSession()
  const isLoadingSession = loading

  const programQuery = useQuery({
		queryKey: [QueryKeys.PROGRAM], 
		queryFn: () => ProgramRequests.getBySlug(name)
	})

  const { isLoading } = programQuery

  const program = programQuery.data || {}

  const isCurrentlyLoading = !program || isLoadingSession || isLoading

  console.log(programQuery)

  return (
    <>
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
    </>
  )
}
