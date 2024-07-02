import axios from 'axios'

// https://axios-http.com/docs/instance
export const LeadInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_LOCATION, 
})

// https://axios-http.com/docs/interceptors
LeadInstance.interceptors.request.use(function(response) {
  return response
}, function(error) {
  console.error('API ERROR: ', error)

  return Promise.reject(error)
})