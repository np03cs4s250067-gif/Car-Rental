import { useState } from 'react'

export default function BookingModal({ price, closeModal, onBooking }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const startDate = new Date(start)
  const endDate = new Date(end)
  const days =
    start && end
      ? Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)))
      : 0
  const total = price * days

  async function handleBook() {
    if (!start || !end || days <= 0) return
    setError('')
    setIsSubmitting(true)
    try {
      await onBooking({ start, end, days, total })
      closeModal()
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Booking failed. Please make sure you are logged in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id='modalOverlay'
      onClick={(e) => e.target.id === 'modalOverlay' && closeModal()}
      className='fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] bg-black/70 backdrop-blur-md transition-all animate-fadeIn'
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        className='w-full max-w-lg bg-[#0F172A] border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto z-50 text-slate-100 space-y-6'
      >
        <button
          type='button'
          aria-label='Close modal'
          onClick={closeModal}
          className='absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        <div>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase tracking-widest mb-2'>
            Reserve Vehicle
          </div>
          <h2 id='modal-title' className='text-2xl font-black text-white'>
            Select Rental Dates
          </h2>
          <p className='text-xs text-slate-400 font-medium mt-1'>
            Choose your start and end dates to calculate the total price.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-1.5'>
            <label className='block text-xs font-extrabold uppercase tracking-widest text-slate-400'>
              Start Date
            </label>
            <input
              type='date'
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className='w-full px-3.5 py-3 border border-slate-800 rounded-xl bg-slate-900 text-xs font-bold text-slate-200 outline-none focus:border-cyan-400 transition cursor-pointer'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='block text-xs font-extrabold uppercase tracking-widest text-slate-400'>
              End Date
            </label>
            <input
              type='date'
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className='w-full px-3.5 py-3 border border-slate-800 rounded-xl bg-slate-900 text-xs font-bold text-slate-200 outline-none focus:border-cyan-400 transition cursor-pointer'
            />
          </div>
        </div>

        {days > 0 && (
          <div className='bg-gradient-to-r from-slate-900 to-[#0B0F17] p-5 rounded-2xl border border-cyan-500/30 text-center space-y-1 shadow-inner'>
            <p className='text-xs font-semibold text-slate-400'>
              {days} day{days > 1 ? 's' : ''} × Rs. {Number(price).toLocaleString('en-IN')}/day
            </p>
            <p className='text-3xl font-black text-cyan-300'>
              Rs. {Number(total).toLocaleString('en-IN')}
            </p>
          </div>
        )}

        {error && (
          <div className='text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 p-3.5 rounded-xl'>
            {error}
          </div>
        )}

        <div className='flex gap-3 pt-2'>
          <button
            type='button'
            onClick={closeModal}
            className='flex-1 py-3 text-xs font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition cursor-pointer'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleBook}
            disabled={!start || !end || days <= 0 || isSubmitting}
            className='flex-1 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 shadow-lg shadow-cyan-500/20 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Rental'}
          </button>
        </div>
      </div>
    </div>
  )
}