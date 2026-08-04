import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'https://car-rental-cja8.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/cars`,
  withCredentials: true,
})

export const getCars = (date) => api.get('/', { params: date ? { date } : {} })

export const addNewCar = (newCar) => api.post('/', newCar)

export const updateCar = (carId, carDetails) => api.put(`/${carId}`, carDetails)

export const deleteCar = (carId) => api.delete(`/${carId}`)

export const getDashboard = () => api.get('/dashboard')
