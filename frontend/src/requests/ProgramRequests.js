/* eslint-disable import/no-anonymous-default-export */
import { LeadInstance } from './LeadInstance'

export default {
  getAll,
  getBySlug,
  create,
  update,
  approve,  
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

async function update(href, body) {
  const url = `/program/edit/${href}`

  const response = await LeadInstance.put(url, body)

  return response.data
}

async function approve(href, body) {
  const url = `/program/edit/${href}/${approve}`

  const response = await LeadInstance.put(url, body)

  return response.data
}