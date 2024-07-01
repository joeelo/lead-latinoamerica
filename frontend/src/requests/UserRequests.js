/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from "./LeadInstance"

export default {
  getUserPrograms,
  updateUserPrograms,
  deleteUserProgram
}

function getUserPrograms(email) {
  const url = `/users/${email}/programs`

  const response = LeadInstance.get(url)

  return response.data
}

function updateUserPrograms() {
  const url = `/users/programs/${email}/${programId}`

  const response = LeadInstance.get(url)

  return response.data
}

function deleteUserProgram(email, programId) {
  const url = `/users/programs/${email}/${programId}`

  const response = LeadInstance.delete(url)

  return response.data
}