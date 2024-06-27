import { LeadInstance } from "./LeadInstance"

export {
  getUserPrograms,
  deleteUserProgram
}

function getUserPrograms(email) {
  const url = `/user/${email}/programs`

  const response = LeadInstance.get(url)

  return response.data
}

function deleteUserProgram(email, programId) {
  const url = `/user/programs/${email}/${programId}`

  const response = LeadInstance.delete(url)

  return response.data
}