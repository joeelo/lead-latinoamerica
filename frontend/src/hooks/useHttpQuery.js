import { useQuery } from "react-query"

export default function useHttpQuery({
  key, 
  apiFn, 
  apiFnArgs = [], 
  ...config
}) {

  const query = useQuery({
    queryKey: [key, ...apiFnArgs], 
    queryFn: apiFn,
    ...config
  })

  console.groupCollapsed('query')
  console.log('Params ', apiFnArgs)
  console.log('Query Data ', query.data)
  console.groupEnd()

  return query
}