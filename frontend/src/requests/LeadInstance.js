import axios from 'axios'

export const LeadInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_LOCATION, 
})