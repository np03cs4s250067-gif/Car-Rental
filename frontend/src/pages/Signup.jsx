import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CarButton } from '../components/CarButton.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const user = await register(form)
      if (user.role === 'customer') {
        navigate('/')
      } else {
        navigate('/admin')
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Signup failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='max-w-7xl mx-auto px-4 py-10'>
      <h2 className='text-3xl font-bold text-brand-black mb-8'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='max-w-md space-y-6'>
        {error && (
          <p className='text-sm text-red-600 border border-red-300 bg-red-50 p-3 rounded'>
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor='name'
            className='text-slate-900 font-medium text-[13px] inline-block mb-1'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={form.name}
            onChange={handleChange}
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='text-slate-900 font-medium text-[13px] inline-block mb-1'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='text-slate-900 font-medium text-[13px] inline-block mb-1'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none'
          />
          <p className='text-xs text-brand-charcoal mt-1'>
            Minimum 8 characters
          </p>
        </div>

        <div>
          <label
            htmlFor='role'
            className='text-slate-900 font-medium text-[13px] inline-block mb-1'
          >
            Select Role
          </label>
          <select
            id='role'
            name='role'
            value={form.role}
            onChange={handleChange}
            required
            className='px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none'
          >
            <option value='customer'>Customer (Rent cars, view own bookings)</option>
            <option value='staff'>Staff (Manage all bookings, cancel bookings)</option>
            <option value='admin'>Admin (Add/remove cars, manage all bookings)</option>
          </select>
        </div>

        <CarButton
          data={isSubmitting ? 'Creating account...' : 'Sign Up'}
          type='submit'
        />

        <p className='text-sm text-brand-charcoal'>
          Already have an account?{' '}
          <Link to='/login' className='underline font-semibold'>
            Log in
          </Link>
        </p>
      </form>
    </main>
  )
}
