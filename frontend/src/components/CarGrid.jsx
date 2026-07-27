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
    <main className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-brand-charcoal/10 pb-4'>
        <h2 className='text-2xl font-bold text-brand-black'>
          Available Vehicles ({availableCount})
        </h2>
        <div className='flex items-center gap-2'>
          <label htmlFor='type-filter' className='text-xs font-semibold text-brand-charcoal uppercase tracking-wider'>
            Filter by Type:
          </label>
          <select
            id='type-filter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='px-3 py-2 bg-white border border-slate-300 text-sm rounded shadow-sm focus:outline-none focus:border-brand-premium'
          >
            <option value='All'>All Types</option>
            <option value='Sedan'>Sedan</option>
            <option value='SUV'>SUV</option>
            <option value='Hatchback'>Hatchback</option>
            <option value='Sports'>Sports</option>
            <option value='Electric'>Electric</option>
          </select>
        </div>
      </div>

      {isLoading && <p className='text-brand-grey mb-4 animate-pulse'>Loading fleet data...</p>}

      {errors.length > 0 && (
        <div className='mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700 shadow-sm'>
          <p className='font-semibold'>Failed to fetch vehicles:</p>
          <ul className='list-disc pl-5'>
            {errors.map((err, i) => (
              <li key={i}>{err.message || String(err)}</li>
            ))}
          </ul>
        </div>
      )}

      {filteredCars.length === 0 && !isLoading && (
        <div className='text-center py-12 bg-white rounded-2xl shadow border border-slate-200/50 mt-4'>
          <p className='text-xl text-gray-500 font-medium'>No cars matching the criteria.</p>
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
    </main>
  )
}