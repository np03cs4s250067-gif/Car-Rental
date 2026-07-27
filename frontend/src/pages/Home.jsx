import { useEffect, useState } from 'react'
import { getCars } from '../api/carApi.js'
import CarGrid from '../components/CarGrid.jsx'

export default function Home({ cars: allCars, addBooking, isLoading: defaultLoading, errors: defaultErrors }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [filteredCars, setFilteredCars] = useState(null) // null = use allCars from props
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
    displayCars = displayCars.filter(car => car.type === selectedType)
  }

  const isLoading = dateLoading || defaultLoading
  const errors = [...(defaultErrors || []), ...dateErrors]

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Modern Floating Search Bar */}
      <div className='bg-white rounded-full p-3 mb-10 mx-auto max-w-4xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='flex items-center px-4 w-full md:w-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-premium mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5'>Vehicle Type</p>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='text-sm font-semibold text-slate-800 bg-transparent outline-none w-full md:w-auto cursor-pointer appearance-none'
            >
              <option value='All'>All Models</option>
              <option value='Sedan'>Sedan</option>
              <option value='SUV'>SUV</option>
              <option value='Hatchback'>Hatchback</option>
              <option value='Sports'>Sports</option>
              <option value='Electric'>Electric</option>
            </select>
          </div>
        </div>

        <div className='hidden md:block w-px h-10 bg-slate-200'></div>

        <div className='flex items-center px-4 w-full md:w-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-premium mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5'>Rental Date</p>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='text-sm font-semibold text-slate-800 bg-transparent outline-none w-full md:w-36 cursor-pointer'
            />
          </div>
        </div>

        <div className='flex items-center ml-auto pl-4'>
          {(selectedDate || selectedType !== 'All') ? (
            <button
              onClick={() => {
                setSelectedDate('')
                setSelectedType('All')
              }}
              className='px-6 py-3 text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full transition cursor-pointer w-full md:w-auto shadow-sm'
            >
              Clear Filters
            </button>
          ) : (
            <div className='px-6 py-3 text-sm font-bold bg-brand-premium text-white rounded-full shadow-md shadow-brand-premium/30'>
              Search Fleet
            </div>
          )}
        </div>
      </div>

      <CarGrid
        cars={displayCars}
        addBooking={addBooking}
        isLoading={isLoading}
        errors={errors}
      />
    </div>
  )
}
