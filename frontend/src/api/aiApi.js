import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'https://car-rental-cja8.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/ai`,
  withCredentials: true,
})

export const getCarRecommendation = (details) => api.post('/recommend', details)