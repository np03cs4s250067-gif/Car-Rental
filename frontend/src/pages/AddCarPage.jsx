import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewCar } from '../api/carApi.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AddCarPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    model: '',
    type: 'Sedan',
    rate: '',
    available: true,
    image: '',
    plateNumber: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user || (user.role !== 'admin' && !user.isAdmin)) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <div className='max-w-md mx-auto bg-[#0F172A] border border-rose-500/30 bg-rose-500/10 rounded-3xl p-8 shadow-2xl space-y-4'>
          <div className='w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' />
            </svg>
          </div>
          <h2 className='text-2xl font-black text-rose-300'>Access Denied</h2>
          <p className='text-xs text-rose-300/80'>Only Admin accounts can add cars to the fleet.</p>
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

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'available' ? value === 'true' : value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.model || !form.type || !form.rate || !form.plateNumber) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setIsSubmitting(true)

    try {
      await addNewCar({
        model: form.model,
        type: form.type,
        rate: Number(form.rate),
        available: form.available,
        plateNumber: form.plateNumber,
        image: form.image || undefined,
      })
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.errors?.map((e) => e.msg).join(', ') ||
          err.message ||
          'Failed to add car'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-140px)]'>
      <div className='w-full max-w-lg bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden'>
        <div className='text-center space-y-2 relative z-10'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 p-0.5 mx-auto shadow-lg shadow-cyan-500/20'>
            <div className='w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center text-cyan-400'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
            </div>
          </div>
          <h2 className='text-2xl font-black tracking-tight text-white'>Add Vehicle To Fleet</h2>
          <p className='text-xs text-slate-400 font-medium'>Enter specifications for the new rental car</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 relative z-10'>
          {error && (
            <div className='text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 p-3.5 rounded-xl shadow-inner flex items-center gap-2'>
              <svg className='w-4 h-4 text-rose-400 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label htmlFor='model' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
                Car Model <span className='text-rose-400'>*</span>
              </label>
              <input
                id='model'
                name='model'
                type='text'
                value={form.model}
                onChange={handleChange}
                placeholder='e.g. Porsche 911 GT3'
                required
                className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition placeholder:text-slate-600'
              />
            </div>

            <div className='space-y-1.5'>
              <label htmlFor='plateNumber' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
                Plate Number <span className='text-rose-400'>*</span>
              </label>
              <input
                id='plateNumber'
                name='plateNumber'
                type='text'
                value={form.plateNumber}
                onChange={handleChange}
                placeholder='e.g. XYZ-9090'
                required
                className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition placeholder:text-slate-600'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label htmlFor='type' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
                Vehicle Type <span className='text-rose-400'>*</span>
              </label>
              <select
                id='type'
                name='type'
                value={form.type}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition cursor-pointer'
              >
                <option value='Sedan' className='bg-slate-900 text-slate-100'>Sedan</option>
                <option value='SUV' className='bg-slate-900 text-slate-100'>SUV</option>
                <option value='Hatchback' className='bg-slate-900 text-slate-100'>Hatchback</option>
                <option value='Sports' className='bg-slate-900 text-slate-100'>Sports</option>
                <option value='Electric' className='bg-slate-900 text-slate-100'>Electric</option>
              </select>
            </div>

            <div className='space-y-1.5'>
              <label htmlFor='rate' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
                Daily Rate (Rs.) <span className='text-rose-400'>*</span>
              </label>
              <input
                id='rate'
                name='rate'
                type='number'
                min='3000'
                step='100'
                value={form.rate}
                onChange={handleChange}
                placeholder='e.g. 12000'
                required
                className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition placeholder:text-slate-600'
              />
            </div>
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='image' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Image URL (Optional)
            </label>
            <input
              id='image'
              name='image'
              type='url'
              value={form.image}
              onChange={handleChange}
              placeholder='https://images.unsplash.com/...'
              className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition placeholder:text-slate-600'
            />
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='available' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Initial Availability
            </label>
            <select
              id='available'
              name='available'
              value={String(form.available)}
              onChange={handleChange}
              className='w-full px-4 py-3 text-xs font-semibold text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition cursor-pointer'
            >
              <option value='true' className='bg-slate-900 text-slate-100'>Available</option>
              <option value='false' className='bg-slate-900 text-slate-100'>Rented</option>
            </select>
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='flex-1 py-3.5 text-xs font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-lg shadow-cyan-500/20 rounded-xl transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Adding...' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
