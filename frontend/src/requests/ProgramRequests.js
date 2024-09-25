/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from './LeadInstance'

export default {
  getAll,
  getBySlug,
  create,
}

async function getAll() {
  const url = `/programs`

  const response = await LeadInstance.get(url)

  return response.data
}

async function getBySlug(slug) {
  const url = `/programs/${slug}`

  const response = await LeadInstance.get(url)

  return response.data
}

async function create(body) {
  const url = `/programs`

  const response = await LeadInstance.post(url, body)

  return response.data
}
