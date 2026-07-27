import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function CarHeader() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <nav className='bg-brand-black border-b border-brand-charcoal text-brand-cream py-4 px-6 md:px-12 flex justify-between items-center shadow-md relative z-20'>
      <div className='flex items-center gap-8'>
        <Link to='/' className='text-2xl font-bold hover:text-brand-grey transition-colors'>
          AutoHire
        </Link>
        <ul className='hidden md:flex gap-6 text-sm font-semibold items-center'>
          <li>
            <Link to='/' className='hover:text-brand-grey transition-colors'>
              Browse Cars
            </Link>
          </li>
          {user && (
            <li>
              <Link to='/my-bookings' className='hover:text-brand-grey transition-colors'>
                My Bookings
              </Link>
            </li>
          )}
          {user && (user.role === 'admin' || user.role === 'staff' || user.isAdmin) && (
            <li>
              <Link to='/admin' className='hover:text-brand-grey transition-colors'>
                Admin
              </Link>
            </li>
          )}
          {user && (user.role === 'admin' || user.isAdmin) && (
            <li>
              <Link to='/add-car' className='hover:text-brand-grey transition-colors'>
                Add Car
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className='flex items-center gap-4'>
        {user ? (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <span className='text-sm font-bold'>{user.name}</span>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                user.role === 'admin'
                  ? 'bg-red-900 text-red-200 border border-red-700'
                  : user.role === 'staff'
                  ? 'bg-yellow-900 text-yellow-200 border border-yellow-700'
                  : 'bg-green-900 text-green-200 border border-green-700'
              }`}>
                {user.role || 'Customer'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className='py-2 px-4 text-xs font-semibold rounded-md border border-brand-cream bg-brand-cream text-brand-black hover:bg-brand-grey hover:text-white transition-all cursor-pointer'
            >
              Log out
            </button>
          </div>
        ) : (
          <div className='flex gap-3'>
            <button
              onClick={() => navigate('/login')}
              className='text-sm font-semibold hover:text-brand-grey transition-colors cursor-pointer'
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className='py-2 px-4 text-xs font-semibold rounded-md border border-brand-cream bg-brand-cream text-brand-black hover:bg-brand-grey hover:text-white transition-all cursor-pointer'
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
