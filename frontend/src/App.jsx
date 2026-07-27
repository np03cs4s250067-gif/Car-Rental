import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { addBooking as apiAddBooking } from './api/bookingApi.js'
import { getCars } from './api/carApi.js'
import { AuthProvider } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import AddCarPage from './pages/AddCarPage.jsx'
import Admin from './pages/Admin.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  const [cars, setCars] = useState([])
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await getCars()
        const data = response.data
        setCars(Array.isArray(data) ? data.filter(Boolean) : [])
      } catch (error) {
        setErrors((prev) => [...prev, error])
      } finally {
        setIsLoading(false)
      }
    }
    loadCars()
  }, [])

  // Update document title with available car count
  const availableCars = cars.filter((car) => car?.available).length
  useEffect(() => {
    document.title = `AutoHire | ${availableCars} cars available`
  }, [availableCars])

  async function addBooking(bookingInfo) {
    const { car, start, end, total } = bookingInfo
    const carId = car._id ?? car.id
    try {
      await apiAddBooking({
        carId,
        startDate: start,
        endDate: end,
      })
      // Optimistically mark car as rented in local state
      setCars((prev) =>
        prev.map((c) => (c._id ?? c.id) === carId ? { ...c, available: false } : c)
      )
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Booking failed. Please log in first.')
      throw err
    }
  }

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Home
                cars={cars}
                addBooking={addBooking}
                isLoading={isLoading}
                errors={errors}
              />
            }
          />
          <Route path='add-car' element={<AddCarPage />} />
          <Route path='my-bookings' element={<MyBookings />} />
          <Route path='admin' element={<Admin />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}