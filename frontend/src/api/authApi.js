import axios from 'axios'

const APIURL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'https://car-rental-cja8.onrender.com'

const api = axios.create({
  baseURL: `${APIURL}/auth`,
  withCredentials: true,
})

export const registerUser = (user) => api.post('/register', user)

export const loginUser = (user) => api.post('/login', user)

export const logoutUser = () => api.post('/logout')

export const getMe = () => api.get('/me')


export const updateUser = (user) => api.put('/me', user)

export const deleteUser = () => api.delete('/me')
export const forgotPassword = (email) => api.post('/forgot-password', email)

export const resetPassword = (token, password) => api.post(`/reset-password/${token}`, password)  
export const verifyEmail = (token) => api.get(`/verify-email/${token}`)
export const resendVerificationEmail = (email) => api.post('/resend-verification-email', email)
export const getAdmin = () => api.get('/admin')
export const getAdmins = () => api.get('/admins')
export const getAdminById = (id) => api.get(`/admins/${id}`)
