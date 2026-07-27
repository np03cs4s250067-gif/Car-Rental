import { useEffect, useState } from 'react'
import { getBookings, cancelBooking } from '../api/bookingApi.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function MyBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadBookings() {
    setIsLoading(true)
    setError('')
    try {
      const response = await getBookings()
      setBookings(response.data)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load bookings')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  async function handleCancel(bookingId) {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      await cancelBooking(bookingId)
      loadBookings() // Reload list
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Failed to cancel booking')
    }
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-10'>
      <div className='flex justify-between items-center mb-8 border-b border-slate-200 pb-4'>
        <h2 className='text-2xl font-bold text-slate-900'>
          {user?.role === 'customer' ? 'My Bookings' : 'All Rental Bookings'}
        </h2>
        <span className='bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-200'>
          Session: {user?.role || 'Guest'}
        </span>
      </div>

      {isLoading && <p className='text-slate-400 animate-pulse'>Loading bookings...</p>}
      {error && <p className='text-red-600 mb-4 bg-red-50 border border-red-200 p-3 rounded-lg text-sm'>{error}</p>}

      {!isLoading && bookings.length === 0 && (
        <div className='text-center py-12 bg-white rounded-xl border border-slate-200 mt-4'>
          <p className='text-lg text-slate-500 font-medium'>No active bookings found.</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {bookings.map((booking) => {
          const car = booking.carId
          const carName = car?.model || 'Unknown Model'
          const status = booking.status

          return (
            <div
              key={booking._id}
              className='bg-white text-slate-900 rounded-xl p-6 flex flex-col justify-between border border-slate-200 hover:shadow-md transition-shadow'
            >
              <div>
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='text-lg font-bold'>{carName}</h3>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                    status === 'Booked' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {status}
                  </span>
                </div>
                <p className='text-slate-500 text-sm'>
                  {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
                </p>
                {user?.role !== 'customer' && (
                  <div className='mt-3 bg-slate-50 px-3 py-2 rounded-md border border-slate-100'>
                    <p className='text-xs text-slate-500'>
                      Renter: <span className='font-semibold text-slate-700'>{booking.customerName}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className='mt-6 border-t border-slate-100 pt-4 flex items-center justify-between'>
                <div>
                  <span className='text-xs text-slate-500 block mb-0.5'>Total Cost</span>
                  <span className='text-xl font-bold'>
                    Rs. {Number(booking.totalCost).toLocaleString('en-IN')}
                  </span>
                </div>
                {status !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className='px-4 py-2 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer'
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
