import { Outlet } from 'react-router-dom'
import CarHeader from './CarHeader.jsx'

export default function Layout() {
  return (
    <div className='min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-white'>
      {/* Background Mesh Glows */}
      <div className='fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 animate-pulse-glow z-0' />
      <div className='fixed top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0' />
      <div className='fixed bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0' />

      <CarHeader />
      
      <div className='flex-1 relative z-10'>
        <Outlet />
      </div>

      <footer className='border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 relative z-10 bg-[#0B0F17]/80 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent'>
              HELLFIRE
            </span>
            <span>— Luxury Fleet & Instant Rentals</span>
          </div>
          <p>© {new Date().getFullYear()} HellFire Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
