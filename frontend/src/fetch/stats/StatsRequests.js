/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from 'src/requests/LeadInstance'

export default {
  getProgramStats,
  getAppProgramStats,
}

async function getProgramStats(email) {
  const url = `/stats/programs/${email}`

  const { data } = await LeadInstance.get(url)

  return data
}


async function getAppProgramStats() {
  const url = `/stats/programs`

  const { data } = await LeadInstance.get(url)

  return data
}

