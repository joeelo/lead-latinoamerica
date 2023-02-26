export default {
  getProgramStats,
}

async function getProgramStats() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs`)

  const json = await response.json()

  return json
}

async function getProgramStats() {
  const { queryKey } = queryContext
  if (!queryKey) return 
  const email = queryKey[1]
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs/${email}`)

  const json = await response.json()

  return json
}