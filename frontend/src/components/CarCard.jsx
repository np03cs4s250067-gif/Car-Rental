import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingModal from './BookingModal.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function CarCard({ car, addBooking }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!car) return null

  const name = car.model || car.name
  const type = car.type
  const price = car.rate || car.price
  const available = car.available
  const imageUrl = car.image || car.imageUrl
  const plateNumber = car.plateNumber

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  const openModal = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  async function handleBooking(bookingInfo) {
    await addBooking({ car, ...bookingInfo })
    navigate('/my-bookings')
  }

  return (
    <>
      {isModalOpen && (
        <BookingModal
          price={price}
          closeModal={closeModal}
          onBooking={handleBooking}
        />
      )}
      
      <div className='group bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col h-full relative'>
        {/* Image Container with Dark Gradient Overlay */}
        <div className='h-52 w-full relative bg-slate-900 overflow-hidden'>
          {imageUrl ? (
            <>
              <div
                className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out'
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30' />
            </>
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-600 space-y-1'>
              <svg className='w-8 h-8 opacity-40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <span className='text-[10px] font-extrabold uppercase tracking-wider'>No Image</span>
            </div>
          )}

          {/* Top Floating Badges (Left Aligned) */}
          <div className='absolute top-3 left-3 flex items-center gap-2 z-10'>
            <span className='bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md'>
              {type}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md backdrop-blur-md border ${
                available
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {available ? 'Available' : 'Rented'}
            </span>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className='p-5 flex flex-col flex-grow justify-between bg-[#0F172A] space-y-4'>
          <div className='space-y-2'>
            <h3 className='text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug'>
              {name}
            </h3>

            <div className='flex items-center gap-2 text-xs text-slate-400 font-medium'>
              <span className='w-1.5 h-1.5 rounded-full bg-cyan-400' />
              <span>{plateNumber ? `Plate: ${plateNumber}` : 'Digital Rental'}</span>
            </div>
          </div>

          {/* Pricing & Booking Action */}
          <div className='pt-4 border-t border-slate-800/90 flex items-end justify-between gap-3'>
            <div>
              <span className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block mb-0.5'>Daily Rate</span>
              <div className='flex items-baseline gap-1'>
                <span className='text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors'>
                  Rs. {Number(price).toLocaleString('en-IN')}
                </span>
                <span className='text-[11px] text-slate-400 font-semibold'>/ day</span>
              </div>
            </div>

            {available ? (
              <button
                onClick={openModal}
                className='px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap'
              >
                Book Now
              </button>
            ) : (
              <span className='px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-800/40 border border-slate-800 select-none'>
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}