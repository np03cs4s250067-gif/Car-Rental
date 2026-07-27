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
      <main className='max-w-7xl mx-auto px-4 py-10'>
        <div className='bg-yellow-50 border border-yellow-300 rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-yellow-800 mb-2'>Login Required</h2>
          <p className='text-yellow-700 text-sm mb-4'>Please log in to access the dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className='px-4 py-2 bg-brand-black text-white text-sm rounded-lg hover:bg-brand-charcoal transition cursor-pointer'
          >
            Log In
          </button>
        </div>
      </main>
    )
  }

  if (!isStaffOrAdmin) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-10'>
        <div className='bg-red-50 border border-red-300 rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-red-700 mb-2'>Access Denied</h2>
          <p className='text-red-600 text-sm'>Only Staff and Admin accounts can access the dashboard.</p>
          <button
            onClick={() => navigate('/')}
            className='mt-4 px-4 py-2 bg-brand-black text-white text-sm rounded-lg hover:bg-brand-charcoal transition cursor-pointer'
          >
            Go Back Home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-10'>
      <div className='flex justify-between items-center mb-8 border-b border-slate-200 pb-4'>
        <h2 className='text-2xl font-bold text-slate-900'>Fleet Dashboard</h2>
        {(user.role === 'admin' || user.isAdmin) && (
          <button
            onClick={() => navigate('/add-car')}
            className='px-4 py-2 bg-brand-premium text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition cursor-pointer'
          >
            Add New Car
          </button>
        )}
      </div>

      {isLoading && <p className='text-slate-400 animate-pulse mb-6'>Loading dashboard...</p>}
      {error && <p className='text-red-600 mb-6 bg-red-50 border border-red-200 p-3 rounded-lg text-sm'>{error}</p>}

      {/* Stats cards */}
      {stats && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <div className='bg-white rounded-xl p-6 border border-slate-200 flex flex-col gap-1'>
            <span className='text-sm font-medium text-slate-500'>Total Cars in Fleet</span>
            <span className='text-3xl font-bold text-slate-900'>{stats.totalCars}</span>
          </div>
          <div className='bg-white rounded-xl p-6 border border-slate-200 flex flex-col gap-1'>
            <span className='text-sm font-medium text-slate-500'>Active Rentals</span>
            <span className='text-3xl font-bold text-slate-900'>{stats.rentedCount}</span>
          </div>
          <div className='bg-white rounded-xl p-6 border border-slate-200 flex flex-col gap-1'>
            <span className='text-sm font-medium text-slate-500'>Revenue This Month</span>
            <span className='text-3xl font-bold text-slate-900'>
              Rs. {Number(stats.revenueThisMonth).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Fleet table */}
      <h3 className='text-lg font-semibold text-slate-900 mb-4'>Fleet Management</h3>
      <div className='overflow-x-auto rounded-xl border border-slate-200 bg-white'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-slate-50 text-slate-600 border-b border-slate-200'>
            <tr>
              <th className='px-6 py-3 font-medium'>Model</th>
              <th className='px-6 py-3 font-medium'>Type</th>
              <th className='px-6 py-3 font-medium'>Daily Rate</th>
              <th className='px-6 py-3 font-medium'>Status</th>
              {(user.role === 'admin' || user.isAdmin) && (
                <th className='px-6 py-3 font-medium text-right'>Actions</th>
              )}
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {cars.map((car) => (
              <tr key={car._id ?? car.id} className='hover:bg-slate-50/50 transition'>
                <td className='px-6 py-4 font-medium text-slate-900'>{car.model}</td>
                <td className='px-6 py-4 text-slate-600'>{car.type}</td>
                <td className='px-6 py-4 text-slate-900'>
                  Rs. {Number(car.rate).toLocaleString('en-IN')}
                </td>
                <td className='px-6 py-4'>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    car.available
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {car.available ? 'Available' : 'Rented'}
                  </span>
                </td>
                {(user.role === 'admin' || user.isAdmin) && (
                  <td className='px-6 py-4 text-right'>
                    <button
                      onClick={() => handleDelete(car._id ?? car.id)}
                      className='text-red-600 hover:text-red-800 font-medium text-sm transition cursor-pointer'
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {cars.length === 0 && !isLoading && (
              <tr>
                <td colSpan='5' className='px-6 py-8 text-center text-slate-500'>
                  No cars in the fleet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
