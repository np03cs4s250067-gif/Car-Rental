import axios from 'axios'

const APIURL = import.meta.env.API_URL || 'https://car-rental-system-j5kc.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/bookings`,
  withCredentials: true,
})

export const getBookings = () => api.get('/')

export const addBooking = (bookingData) => api.post('/', bookingData)

export const cancelBooking = (bookingId) => api.put(`/${bookingId}/cancel`)
