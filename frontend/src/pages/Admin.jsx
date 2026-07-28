import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCars, getDashboard, deleteCar } from '../api/carApi.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const isStaffOrAdmin = user && (user.role === 'admin' || user.role === 'staff' || user.isAdmin)

  useEffect(() => {
    if (!isStaffOrAdmin) return
    async function loadData() {
      setIsLoading(true)
      try {
        const [carsRes, dashRes] = await Promise.all([getCars(), getDashboard()])
        setCars(carsRes.data)
        setStats(dashRes.data)
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [isStaffOrAdmin])

  async function handleDelete(carId) {
    if (!window.confirm('Are you sure you want to remove this car from the fleet?')) return
    try {
      await deleteCar(carId)
      setCars((prev) => prev.filter((c) => (c._id ?? c.id) !== carId))
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Failed to delete car')
    }
  }

  if (!user) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <div className='max-w-md mx-auto bg-[#0F172A] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4'>
          <div className='w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
            </svg>
          </div>
          <h2 className='text-2xl font-black text-white'>Login Required</h2>
          <p className='text-xs text-slate-400'>Please log in to access the staff/admin dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className='px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition cursor-pointer'
          >
            Log In Now
          </button>
        </div>
      </main>
    )
  }

  if (!isStaffOrAdmin) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <div className='max-w-md mx-auto bg-[#0F172A] border border-rose-500/30 bg-rose-500/10 rounded-3xl p-8 shadow-2xl space-y-4'>
          <div className='w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' />
            </svg>
          </div>
          <h2 className='text-2xl font-black text-rose-300'>Access Denied</h2>
          <p className='text-xs text-rose-300/80'>Only Staff and Admin accounts can access the fleet dashboard.</p>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-700 transition cursor-pointer'
          >
            Return to Fleet
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-5'>
        <div>
          <h2 className='text-3xl font-black text-white tracking-tight'>Fleet Management</h2>
          <p className='text-xs text-slate-400 font-medium mt-1'>
            Overview of total inventory, active rentals, and monthly revenue
          </p>
        </div>
        {(user.role === 'admin' || user.isAdmin) && (
          <button
            onClick={() => navigate('/add-car')}
            className='px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-900 text-xs font-extrabold uppercase tracking-wider rounded-xl hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer'
          >
            + Add New Car
          </button>
        )}
      </div>

      {isLoading && <p className='text-slate-400 animate-pulse text-xs font-bold'>Loading dashboard metrics...</p>}
      {error && <p className='text-rose-400 text-xs bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl'>{error}</p>}

      {/* Stats Cards */}
      {stats && (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <div className='bg-[#0F172A]/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden'>
            <div className='absolute right-4 top-4 opacity-20 text-slate-400'>
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
              </svg>
            </div>
            <span className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block'>
              Total Fleet
            </span>
            <span className='text-3xl font-black text-white'>{stats.totalCars}</span>
            <p className='text-[11px] text-slate-400 font-medium'>Vehicles in system</p>
          </div>

          <div className='bg-[#0F172A]/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden'>
            <div className='absolute right-4 top-4 opacity-20 text-cyan-400'>
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
              </svg>
            </div>
            <span className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block'>
              Active Rentals
            </span>
            <span className='text-3xl font-black text-cyan-400'>{stats.rentedCount}</span>
            <p className='text-[11px] text-slate-400 font-medium'>Currently checked out</p>
          </div>

          <div className='bg-[#0F172A]/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden'>
            <div className='absolute right-4 top-4 opacity-20 text-emerald-400'>
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <span className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block'>
              Monthly Revenue
            </span>
            <span className='text-3xl font-black text-emerald-400'>
              Rs. {Number(stats.revenueThisMonth).toLocaleString('en-IN')}
            </span>
            <p className='text-[11px] text-slate-400 font-medium'>Booked income this month</p>
          </div>
        </div>
      )}

      {/* Fleet Table */}
      <div className='space-y-4'>
        <h3 className='text-lg font-bold text-white'>Vehicle Inventory</h3>
        <div className='overflow-x-auto rounded-2xl border border-slate-800 bg-[#0F172A]/90 shadow-xl'>
          <table className='w-full text-xs text-left'>
            <thead className='bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-extrabold text-[10px]'>
              <tr>
                <th className='px-6 py-4'>Model</th>
                <th className='px-6 py-4'>Type</th>
                <th className='px-6 py-4'>Daily Rate</th>
                <th className='px-6 py-4'>Status</th>
                {(user.role === 'admin' || user.isAdmin) && (
                  <th className='px-6 py-4 text-right'>Action</th>
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-800/60 font-semibold'>
              {cars.map((car) => (
                <tr key={car._id ?? car.id} className='hover:bg-slate-900/60 transition'>
                  <td className='px-6 py-4 font-bold text-white'>{car.model}</td>
                  <td className='px-6 py-4 text-slate-400'>{car.type}</td>
                  <td className='px-6 py-4 text-slate-200'>
                    Rs. {Number(car.rate).toLocaleString('en-IN')}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        car.available
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {car.available ? 'Available' : 'Rented'}
                    </span>
                  </td>
                  {(user.role === 'admin' || user.isAdmin) && (
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={() => handleDelete(car._id ?? car.id)}
                        className='text-rose-400 hover:text-rose-300 font-bold text-xs bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-lg transition cursor-pointer'
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {cars.length === 0 && !isLoading && (
                <tr>
                  <td colSpan='5' className='px-6 py-8 text-center text-slate-500'>
                    No vehicles found in fleet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
