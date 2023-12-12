import { useQuery } from "react-query"

export default function useHttpQuery({
  key, 
  apiFn, 
  apiFnArgs, 
  ...config
}) {

  const query = useQuery({
    queryKey: [key, ...apiFnArgs], 
    queryFn: apiFn,
    ...config
  })

  return query
}