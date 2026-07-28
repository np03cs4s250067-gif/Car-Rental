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
      loadBookings()
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Failed to cancel booking')
    }
  }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-5'>
        <div>
          <h2 className='text-3xl font-black text-white tracking-tight'>
            {user?.role === 'customer' ? 'My Bookings' : 'All Rental Bookings'}
          </h2>
          <p className='text-xs text-slate-400 font-medium mt-1'>
            {user?.role === 'customer'
              ? 'Manage your active reservations and trip dates'
              : 'Staff overview of all customer car bookings'}
          </p>
        </div>
        <div className='flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl'>
          <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
          <span className='text-xs font-bold text-slate-300 capitalize'>
            {user?.role || 'Guest'} Mode
          </span>
        </div>
      </div>

      {isLoading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='bg-slate-900/40 rounded-2xl h-56 animate-pulse border border-slate-800/60' />
          ))}
        </div>
      )}

      {error && (
        <div className='text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 p-4 rounded-xl shadow-inner'>
          {error}
        </div>
      )}

      {!isLoading && bookings.length === 0 && (
        <div className='text-center py-16 bg-[#0F172A]/60 rounded-3xl border border-slate-800/80 space-y-3'>
          <div className='w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-2'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-white'>No Active Bookings</h3>
          <p className='text-xs text-slate-400 max-w-sm mx-auto'>
            You haven't reserved any vehicles yet. Explore our fleet to book your next trip!
          </p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {bookings.map((booking) => {
          const car = booking.carId
          const carName = car?.model || 'Rental Vehicle'
          const status = booking.status

          return (
            <div
              key={booking._id}
              className='bg-[#0F172A]/90 rounded-2xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition duration-300'
            >
              <div className='space-y-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-lg font-bold text-white group-hover:text-cyan-400 transition-colors'>
                      {carName}
                    </h3>
                    <p className='text-xs text-slate-400 font-semibold mt-0.5'>
                      {car?.type ? `${car.type} Class` : 'Vehicle Rental'}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border backdrop-blur-md ${
                      status === 'Booked'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className='bg-slate-900/90 rounded-xl p-3.5 border border-slate-800/80 space-y-2'>
                  <div className='flex items-center justify-between text-xs'>
                    <span className='text-slate-500 font-bold uppercase tracking-wider text-[10px]'>Start Date</span>
                    <span className='font-bold text-slate-200'>
                      {new Date(booking.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-xs pt-1 border-t border-slate-800/60'>
                    <span className='text-slate-500 font-bold uppercase tracking-wider text-[10px]'>End Date</span>
                    <span className='font-bold text-slate-200'>
                      {new Date(booking.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {user?.role !== 'customer' && (
                  <div className='bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-2 rounded-xl text-xs'>
                    <span className='text-slate-400 text-[10px] uppercase tracking-wider font-extrabold block'>Customer</span>
                    <span className='font-bold text-cyan-300'>{booking.customerName}</span>
                  </div>
                )}
              </div>

              <div className='mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between'>
                <div>
                  <span className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block mb-0.5'>
                    Total Paid
                  </span>
                  <span className='text-xl font-black text-white'>
                    Rs. {Number(booking.totalCost).toLocaleString('en-IN')}
                  </span>
                </div>
                {status !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className='px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition cursor-pointer'
                  >
                    Cancel Booking
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
