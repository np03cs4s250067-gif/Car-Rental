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

  // Called by BookingModal — must return a promise so modal can show errors
  async function handleBooking(bookingInfo) {
    await addBooking({ car, ...bookingInfo })
    // Navigate only after the API call succeeds
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
      <div className='bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 transition duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full'>
        {/* Top Image Section */}
        <div 
          className='h-48 w-full relative bg-slate-200'
          style={
            imageUrl
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          {/* Top badges */}
          <div className='absolute top-3 left-3 right-3 flex justify-between items-start'>
            <span className='bg-white/90 backdrop-blur text-brand-black px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm'>
              {type}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm backdrop-blur ${
                available ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700'
              }`}
            >
              {available ? 'Available' : 'Rented'}
            </span>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className='p-5 flex flex-col flex-grow justify-between bg-white'>
          <div>
            <h3 className='text-lg font-bold text-slate-900 mb-1 leading-tight'>
              {name}
            </h3>
            <p className='text-xs text-slate-500 font-medium mb-4'>Instant Rental Available</p>
          </div>
          
          <div className='flex items-end justify-between mt-auto'>
            <div>
              <span className='text-2xl font-extrabold text-slate-900'>
                Rs. {Number(price).toLocaleString('en-IN')}
              </span>
              <span className='text-xs text-slate-500 font-medium ml-1'>/ day</span>
            </div>
            
            {available ? (
              <button
                onClick={openModal}
                className='px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-premium hover:bg-slate-800 transition shadow-md cursor-pointer'
              >
                Book Now
              </button>
            ) : (
              <span className='px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 select-none'>
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}