import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function validateField(name, value) {
    if (name === 'name') {
      if (!value.trim()) return 'Name is required'
    }
    if (name === 'email') {
      if (!value) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
    }
    if (name === 'password') {
      if (!value) return 'Password is required'
      if (value.length < 8) return 'Password must be at least 8 characters'
    }
    return ''
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
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
    <main className='max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-140px)]'>
      <div className='w-full max-w-md bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden'>
        {/* Background glow accent */}
        <div className='absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none' />

        <div className='text-center space-y-2 relative z-10'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 p-0.5 mx-auto shadow-lg shadow-cyan-500/20'>
            <div className='w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center text-cyan-400'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </div>
          </div>
          <h2 className='text-2xl font-black tracking-tight text-white'>Create Account</h2>
          <p className='text-xs text-slate-400 font-medium'>Join HellFire to instantly reserve premium vehicles</p>
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

          <div className='space-y-1.5'>
            <label htmlFor='name' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Full Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={form.name}
              onChange={handleChange}
              placeholder='e.g. Sijan Kunwar'
              required
              className={`w-full px-4 py-3 text-sm text-slate-100 bg-slate-900/90 border rounded-xl outline-none transition duration-200 placeholder:text-slate-600 ${
                fieldErrors.name
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
              }`}
            />
            {fieldErrors.name && <p className='text-xs text-rose-400 mt-1'>{fieldErrors.name}</p>}
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='email' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              placeholder='e.g. customer@hellfire.com'
              required
              className={`w-full px-4 py-3 text-sm text-slate-100 bg-slate-900/90 border rounded-xl outline-none transition duration-200 placeholder:text-slate-600 ${
                fieldErrors.email
                  ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
              }`}
            />
            {fieldErrors.email && <p className='text-xs text-rose-400 mt-1'>{fieldErrors.email}</p>}
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='password' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder='Minimum 8 characters'
                minLength={8}
                required
                className={`w-full px-4 py-3 pr-10 text-sm text-slate-100 bg-slate-900/90 border rounded-xl outline-none transition duration-200 placeholder:text-slate-600 ${
                  fieldErrors.password
                    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldErrors.password && <p className='text-xs text-rose-400 mt-1'>{fieldErrors.password}</p>}
          </div>

          <div className='space-y-1.5'>
            <label htmlFor='role' className='text-xs font-extrabold uppercase tracking-widest text-slate-400 block'>
              Account Type
            </label>
            <select
              id='role'
              name='role'
              value={form.role}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 text-sm text-slate-100 bg-slate-900/90 border border-slate-800 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition cursor-pointer'
            >
              <option value='customer' className='bg-slate-900 text-slate-100'>Customer (Book & View rentals)</option>
              <option value='staff' className='bg-slate-900 text-slate-100'>Staff (Manage bookings)</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-3.5 px-4 text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-lg shadow-cyan-500/20 rounded-xl transition duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2'
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>

          <p className='text-center text-xs text-slate-400 font-medium pt-2'>
            Already have an account?{' '}
            <Link to='/login' className='text-cyan-400 font-bold hover:underline'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}