import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'https://car-rental-cja8.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/bookings`,
  withCredentials: true,
})

export const getBookings = () => api.get('/')

export const addBooking = (bookingData) => api.post('/', bookingData)

export const cancelBooking = (bookingId) => api.put(`/${bookingId}/cancel`)
