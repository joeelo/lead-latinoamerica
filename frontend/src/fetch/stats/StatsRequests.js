export default {
  getProgramStats,
}

async function getProgramStats() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_LOCATION}/stats/programs`)

  const json = await response.json()

  return json
}