import { useState } from 'react'
import CarCard from './CarCard.jsx'

export default function CarGrid({
  cars,
  addBooking,
  isLoading = false,
  errors = [],
}) {
  const [filter, setFilter] = useState('All')

  const filteredCars = filter === 'All'
    ? cars
    : cars.filter((car) => car.type === filter)

  const availableCount = filteredCars?.filter((car) => car?.available).length ?? 0

  return (
    <section className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-4'>
        <div>
          <h2 className='text-2xl font-black text-white tracking-tight'>
            Available Vehicles
          </h2>
          <p className='text-xs font-semibold text-slate-400 mt-0.5'>
            Showing <span className='text-cyan-400 font-bold'>{filteredCars?.length ?? 0}</span> cars ({availableCount} ready for immediate booking)
          </p>
        </div>

        <div className='flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner'>
          <label htmlFor='grid-type-filter' className='text-[10px] font-extrabold uppercase tracking-widest text-slate-500'>
            Filter:
          </label>
          <select
            id='grid-type-filter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer pr-2'
          >
            <option value='All' className='bg-slate-900 text-slate-200'>All Categories</option>
            <option value='Sedan' className='bg-slate-900 text-slate-200'>Sedan</option>
            <option value='SUV' className='bg-slate-900 text-slate-200'>SUV</option>
            <option value='Hatchback' className='bg-slate-900 text-slate-200'>Hatchback</option>
            <option value='Sports' className='bg-slate-900 text-slate-200'>Sports</option>
            <option value='Electric' className='bg-slate-900 text-slate-200'>Electric</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='bg-slate-900/40 rounded-2xl h-80 animate-pulse border border-slate-800/60' />
          ))}
        </div>
      )}

      {errors.length > 0 && (
        <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300 shadow-lg'>
          <p className='font-bold'>Failed to fetch vehicles:</p>
          <ul className='list-disc pl-5 mt-1 text-xs space-y-1'>
            {errors.map((err, i) => (
              <li key={i}>{err.message || String(err)}</li>
            ))}
          </ul>
        </div>
      )}

      {filteredCars.length === 0 && !isLoading && (
        <div className='text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/80'>
          <div className='w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
          <p className='text-lg font-bold text-slate-300'>No cars matching the selected filter.</p>
          <p className='text-xs text-slate-500 mt-1'>Try changing the category or clearing search filters.</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredCars?.filter(Boolean).map((car) => (
          <CarCard
            key={car._id ?? car.id}
            car={car}
            addBooking={addBooking}
          />
        ))}
      </div>
    </section>
  )
}