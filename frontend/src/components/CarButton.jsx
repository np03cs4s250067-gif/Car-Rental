export function CarButton({ data, type = 'button', onClick = () => {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className='px-3.5 py-2 mb-4 text-white text-sm font-semibold rounded-xl cursor-pointer bg-brand-charcoal hover:bg-brand-black border border-brand-grey transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-grey'
    >
      {data}
    </button>
  )
}
