import { useEffect, useState } from 'react'
import { getCars } from '../api/carApi.js'
import CarGrid from '../components/CarGrid.jsx'
import AIAssistant from '../components/AIAssistant.jsx'

export default function Home({ cars: allCars, addBooking, isLoading: defaultLoading, errors: defaultErrors }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [filteredCars, setFilteredCars] = useState(null)
  const [dateLoading, setDateLoading] = useState(false)
  const [dateErrors, setDateErrors] = useState([])

  useEffect(() => {
    if (!selectedDate) {
      setFilteredCars(null)
      return
    }
    async function fetchByDate() {
      setDateLoading(true)
      setDateErrors([])
      try {
        const response = await getCars(selectedDate)
        setFilteredCars(response.data)
      } catch (err) {
        setDateErrors([err])
      } finally {
        setDateLoading(false)
      }
    }
    fetchByDate()
  }, [selectedDate])

  let displayCars = filteredCars !== null ? filteredCars : allCars
  if (selectedType !== 'All') {
    displayCars = displayCars.filter((car) => car.type === selectedType)
  }

  const isLoading = dateLoading || defaultLoading
  const errors = [...(defaultErrors || []), ...dateErrors]
  const availableCount = (displayCars || []).filter((c) => c.available).length

  const categories = ['All', 'Sedan', 'SUV', 'Sports', 'Electric', 'Hatchback']

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10'>
      {/* Hero Banner */}
      <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#0b0f17] border border-slate-800/80 p-8 sm:p-12 shadow-2xl'>
        <div className='absolute -right-10 -bottom-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute -left-10 -top-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-3xl space-y-4'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white'>
            Rent Your <span className='bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent'>Dream Car</span> In Seconds.
          </h1>

          <p className='text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl'>
            Experience ultimate freedom on the road with top-tier luxury sedans, high-performance sports cars, rugged SUVs, and next-gen electric vehicles.
          </p>

          <div className='pt-2 flex flex-wrap items-center gap-6 text-slate-300 text-xs sm:text-sm font-semibold'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-emerald-400' />
              <span>{availableCount} Vehicles Available Now</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-cyan-400' />
              <span>24/7 Roadside Assistance</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-indigo-400' />
              <span>Zero Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Filter & Search Bar */}
      <div className='bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-800/90 shadow-2xl space-y-4'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          {/* Category Pills */}
          <div className='flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedType === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className='flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-2 px-4 shadow-inner min-w-[280px]'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-cyan-400 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            <div className='flex-1'>
              <p className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500'>Check Availability Date</p>
              <input
                type='date'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='text-xs font-bold text-slate-200 bg-transparent outline-none w-full cursor-pointer'
              />
            </div>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className='text-xs font-bold text-rose-400 hover:text-rose-300 transition cursor-pointer px-2 py-1 bg-rose-500/10 rounded-lg'
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <AIAssistant  />

      {/* Fleet Display */}
      <CarGrid
        cars={displayCars}
        addBooking={addBooking}
        isLoading={isLoading}
        errors={errors}
      />
    </div>
  )
}

