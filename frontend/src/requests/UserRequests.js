/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from "./LeadInstance"

export default {
  getUserPrograms,
  updateUserPrograms,
  deleteUserProgram
}

async function getUserPrograms(email) {
  const url = `/user/${email}/programs`

  const response = await LeadInstance.get(url)

  console.log(response)

  return response.data
}

async function updateUserPrograms(email, programId) {
  const url = `/user/programs/${email}/${programId}`

  const response = await LeadInstance.get(url)



  return response.data
}

async function deleteUserProgram(email, programId) {
  const url = `/user/programs/${email}/${programId}`

  const response = await LeadInstance.delete(url)

  return response.data
}