import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function CarHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className='sticky top-0 z-50 bg-[#0F172A]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all'>
      <nav className='max-w-7xl mx-auto py-3.5 px-4 md:px-8 flex justify-between items-center'>
        {/* Brand Logo */}
        <div className='flex items-center gap-10'>
          <Link to='/' className='flex items-center gap-2.5 group'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300'>
              <div className='w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center'>
                <svg className='w-5 h-5 text-cyan-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
            </div>
            <span className='text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-indigo-400 transition-all duration-300'>
              HELL<span className='text-cyan-400'>FIRE</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className='hidden md:flex items-center gap-1 text-sm font-semibold'>
            <li>
              <Link
                to='/'
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/60 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Browse Fleet
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to='/my-bookings'
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/my-bookings')
                      ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/60 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  My Bookings
                </Link>
              </li>
            )}
            {user && (user.role === 'admin' || user.role === 'staff' || user.isAdmin) && (
              <li>
                <Link
                  to='/admin'
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/admin')
                      ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/60 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {user && (user.role === 'admin' || user.isAdmin) && (
              <li>
                <Link
                  to='/add-car'
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/add-car')
                      ? 'bg-slate-800/80 text-cyan-400 border border-slate-700/60 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  + Add Vehicle
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* User Account Controls */}
        <div className='flex items-center gap-3'>
          {user ? (
            <div className='flex items-center gap-4 bg-slate-900/90 border border-slate-800/80 rounded-xl p-1.5 pl-3.5 shadow-inner'>
              <div className='flex flex-col items-end leading-tight'>
                <span className='text-xs font-bold text-slate-100'>{user.name}</span>
                <span
                  className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-0.5 ${
                    user.role === 'admin' || user.isAdmin
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : user.role === 'staff'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {user.role || 'Customer'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className='px-3.5 py-1.5 text-xs font-bold text-slate-300 bg-slate-800/90 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 border border-slate-700/60 rounded-lg transition-all cursor-pointer'
              >
                Log out
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-2.5'>
              <button
                onClick={() => navigate('/login')}
                className='px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl transition-all cursor-pointer'
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='px-4 py-2 text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-lg shadow-cyan-500/20 rounded-xl transition-all cursor-pointer'
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
