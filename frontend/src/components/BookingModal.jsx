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
      className='fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)]'
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        tabIndex='-1'
        className='w-full max-w-lg bg-white border border-slate-100 shadow-lg rounded-lg relative max-h-[95vh] overflow-y-auto outline-none p-4 md:p-6 z-50'
      >
        <button
          type='button'
          aria-label='Close modal'
          onClick={closeModal}
          className='flex items-center absolute top-6 right-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='size-3 cursor-pointer fill-slate-500 hover:fill-red-600'
            aria-hidden='true'
            viewBox='0 0 329.269 329'
          >
            <path d='M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0' />
          </svg>
        </button>

        <h2 id='modal-title' className='text-xl font-bold mb-6 text-[#111111]'>
          Select Rental Dates
        </h2>

        <div className='flex items-start gap-4'>
          <div className='flex-1'>
            <label className='block text-xs font-semibold text-brand-charcoal mb-1'>Start Date</label>
            <input
              id='datepicker-range-start'
              name='start'
              type='date'
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className='block w-full px-3 py-2.5 border border-slate-300 text-sm rounded bg-white'
            />
          </div>
          <span className='mt-7 text-brand-charcoal'>to</span>
          <div className='flex-1'>
            <label className='block text-xs font-semibold text-brand-charcoal mb-1'>End Date</label>
            <input
              id='datepicker-range-end'
              name='end'
              type='date'
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className='block w-full px-3 py-2.5 border border-slate-300 text-sm rounded bg-white'
            />
          </div>
        </div>

        {days > 0 && (
          <div className='mt-6 text-center bg-brand-cream p-4 rounded-xl border border-brand-charcoal/10'>
            <p className='text-sm text-brand-charcoal'>
              {days} day{days > 1 ? 's' : ''} × Rs. {Number(price).toLocaleString('en-IN')}/day
            </p>
            <p className='text-2xl font-bold text-brand-black mt-1'>
              Total: Rs. {Number(total).toLocaleString('en-IN')}
            </p>
          </div>
        )}

        {error && (
          <p className='mt-4 text-sm text-red-600 border border-red-300 bg-red-50 p-3 rounded'>
            {error}
          </p>
        )}

        <button
          type='button'
          onClick={handleBook}
          disabled={!start || !end || days <= 0 || isSubmitting}
          className='mt-5 ml-auto flex px-5 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-brand-premium hover:bg-brand-black transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Booking...' : 'Confirm Rental'}
        </button>
      </div>
    </div>
  )
}