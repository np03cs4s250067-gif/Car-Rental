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
      <div className='group bg-[#0F172A]/90 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 flex flex-col h-full relative'>
        {/* Top Image Container */}
        <div className='h-52 w-full relative bg-slate-900 overflow-hidden'>
          {imageUrl ? (
            <div
              className='w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out'
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-600 space-y-1'>
              <svg className='w-8 h-8 opacity-40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <span className='text-[10px] font-extrabold uppercase tracking-wider'>No Image</span>
            </div>
          )}

          {/* Top Overlay Badges */}
          <div className='absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none'>
            <span className='bg-[#0B0F17]/80 backdrop-blur-md border border-slate-700/60 text-slate-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md'>
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

        {/* Details Section */}
        <div className='p-5 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#0F172A] to-[#0B0F17]'>
          <div className='space-y-1.5'>
            <div className='flex justify-between items-start'>
              <h3 className='text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight'>
                {name}
              </h3>
            </div>
            <p className='text-xs text-slate-400 font-medium flex items-center gap-1.5'>
              <span className='w-1.5 h-1.5 rounded-full bg-cyan-400' />
              {plateNumber ? `Plate: ${plateNumber}` : 'Instant Digital Rental'}
            </p>
          </div>

          <div className='pt-5 mt-4 border-t border-slate-800/80 flex items-end justify-between'>
            <div>
              <span className='text-xs font-extrabold uppercase tracking-widest text-slate-500 block mb-0.5'>Daily Rate</span>
              <div className='flex items-baseline gap-1'>
                <span className='text-2xl font-black text-white group-hover:text-cyan-300 transition-colors'>
                  Rs. {Number(price).toLocaleString('en-IN')}
                </span>
                <span className='text-xs text-slate-400 font-semibold'>/ day</span>
              </div>
            </div>

            {available ? (
              <button
                onClick={openModal}
                className='px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer active:scale-95'
              >
                Book Now
              </button>
            ) : (
              <span className='px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-800/50 border border-slate-800 select-none'>
                Rented
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}