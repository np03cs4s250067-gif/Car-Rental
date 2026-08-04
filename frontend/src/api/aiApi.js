import axios from 'axios'

const APIURL = import.meta.env.API_URL || 'https://car-rental-system-j5kc.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/ai`,
  withCredentials: true,
})

export const getCarRecommendation = (details) => api.post('/recommend', details)