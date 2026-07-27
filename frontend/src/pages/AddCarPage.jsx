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

  // Redirect non-admins
  if (!user || (user.role !== 'admin' && !user.isAdmin)) {
    return (
      <main className='max-w-7xl mx-auto px-4 py-10'>
        <div className='bg-red-50 border border-red-300 rounded-2xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-red-700 mb-2'>Access Denied</h2>
          <p className='text-red-600 text-sm'>Only Admin accounts can add cars to the fleet.</p>
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
      setError(err.response?.data?.error || err.response?.data?.errors?.map(e => e.msg).join(', ') || err.message || 'Failed to add car')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-10'>
      <h2 className='text-3xl font-bold text-brand-black mb-8'>Add New Car to Fleet</h2>

      <form onSubmit={handleSubmit} className='max-w-lg bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6'>
        {error && (
          <p className='text-sm text-red-600 border border-red-300 bg-red-50 p-3 rounded'>
            {error}
          </p>
        )}

        <div>
          <label htmlFor='model' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Car Model <span className='text-red-500'>*</span>
          </label>
          <input
            id='model'
            name='model'
            type='text'
            value={form.model}
            onChange={handleChange}
            placeholder='e.g. Toyota Corolla'
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          />
        </div>

        <div>
          <label htmlFor='plateNumber' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Plate Number <span className='text-red-500'>*</span>
          </label>
          <input
            id='plateNumber'
            name='plateNumber'
            type='text'
            value={form.plateNumber}
            onChange={handleChange}
            placeholder='e.g. XYZ-1234'
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          />
        </div>

        <div>
          <label htmlFor='type' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Vehicle Type <span className='text-red-500'>*</span>
          </label>
          <select
            id='type'
            name='type'
            value={form.type}
            onChange={handleChange}
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          >
            <option value='Sedan'>Sedan</option>
            <option value='SUV'>SUV</option>
            <option value='Hatchback'>Hatchback</option>
            <option value='Sports'>Sports</option>
            <option value='Electric'>Electric</option>
          </select>
        </div>

        <div>
          <label htmlFor='rate' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Daily Rate (Rs.) <span className='text-red-500'>*</span>
          </label>
          <input
            id='rate'
            name='rate'
            type='number'
            min='3000'
            step='100'
            value={form.rate}
            onChange={handleChange}
            placeholder='e.g. 5000'
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          />
        </div>

        <div>
          <label htmlFor='image' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Image URL (optional)
          </label>
          <input
            id='image'
            name='image'
            type='url'
            value={form.image}
            onChange={handleChange}
            placeholder='https://example.com/car.jpg'
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          />
        </div>

        <div>
          <label htmlFor='available' className='text-slate-900 font-medium text-[13px] inline-block mb-1'>
            Availability Status
          </label>
          <select
            id='available'
            name='available'
            value={String(form.available)}
            onChange={handleChange}
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-brand-premium outline-none'
          >
            <option value='true'>Available</option>
            <option value='false'>Rented</option>
          </select>
        </div>

        <div className='flex gap-4 pt-2'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='flex-1 py-2.5 bg-brand-black text-white text-sm font-semibold rounded-xl hover:bg-brand-charcoal transition cursor-pointer disabled:opacity-60'
          >
            {isSubmitting ? 'Adding...' : 'Add Car'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='flex-1 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 transition cursor-pointer'
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
