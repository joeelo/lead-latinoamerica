/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from './LeadInstance'

export default {
  createProfile,
  editProfile,
  getPrograms,
  updatePrograms,
  deleteProgram,
}

async function createProfile(session) {
  const url = `/profile/create`

  const response = await LeadInstance.post(url, session)

  return response.data
}

async function editProfile(email, data) {
  const url = `/user/profile/${email}/edit`

  const response = await LeadInstance.put(url, data)

  return response.data
}

async function getPrograms(email) {
  const url = `/user/${email}/programs`

  const response = await LeadInstance.get(url)

  console.log(response)

  return response.data
}

async function updatePrograms(email, programId) {
  const url = `/user/programs/${email}/${programId}`

  const response = await LeadInstance.get(url)

  return response.data
}

async function deleteProgram(email, programId) {
  const url = `/user/programs/${email}/${programId}`

  const response = await LeadInstance.delete(url)

  return response.data
}
