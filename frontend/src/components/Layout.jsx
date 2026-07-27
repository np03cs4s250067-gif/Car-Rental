import { Outlet } from 'react-router-dom'
import CarHeader from './CarHeader.jsx'

export default function Layout() {
  return (
    <div className='min-h-screen bg-brand-cream text-[#111111]'>
      <CarHeader />
      <Outlet />
    </div>
  )
}
