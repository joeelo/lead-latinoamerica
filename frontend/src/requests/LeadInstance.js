import axios from 'axios'

export const LeadInstance = axios.create({
  url: process.env.NEXT_PUBLIC_DB_LOCATION, 
})