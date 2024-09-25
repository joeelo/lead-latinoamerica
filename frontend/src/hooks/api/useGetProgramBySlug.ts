import { QueryKeys } from '@/config/QueryKeys'
import ProgramRequests from '@/requests/ProgramRequests'
import { useQuery } from 'react-query'

export function useGetProgramBySlug({ slug, ...options }) {
  return useQuery({
    queryKey: QueryKeys.PROGRAM,
    queryFn: () => ProgramRequests.getBySlug(slug),
    ...options,
  })
}
