import { useState } from 'react'
import { getCarRecommendation } from '../api/aiApi.js'

export default function AIAssistant() {
  const [passengers, setPassengers] = useState('')
  const [budget, setBudget] = useState('')
  const [purpose, setPurpose] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)
  const [error, setError] = useState('')

  const presets = [
    { label: '🏕️ Off-road Camping', purpose: 'Off-road mountain camping trip', passengers: '4', budget: '8000' },
    { label: '🏙️ City Commute', purpose: 'Daily city commuting & business meetings', passengers: '2', budget: '4000' },
    { label: '🏔️ Family Road Trip', purpose: 'Long distance scenic highway family vacation', passengers: '5', budget: '6500' },
    { label: '✨ Special Event', purpose: 'Luxury arrival for wedding or formal event', passengers: '2', budget: '10000' },
  ]

  const handlePresetSelect = (preset) => {
    setPurpose(preset.purpose)
    if (!passengers) setPassengers(preset.passengers)
    if (!budget) setBudget(preset.budget)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!passengers || !budget || !purpose) {
      setError('Please specify passengers, budget, and trip purpose so our AI can curate matches.')
      return
    }

    setIsLoading(true)
    setError('')
    setRecommendations(null)

    try {
      const response = await getCarRecommendation({
        passengers: parseInt(passengers, 10),
        budget: parseInt(budget, 10),
        purpose
      })
      
      setRecommendations(response.data.data.recommendations)
    } catch (err) {
      setError(err.response?.data?.details || err.response?.data?.error || 'An error occurred while fetching AI recommendations.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl p-6 sm:p-8 transition-all duration-300">
      {/* Background ambient glow accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">AI Vehicle Matchmaker</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Live AI
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Tell us your plans and budget — our AI calculates the optimal vehicle match.</p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Quick Ideas & Presets:</p>
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Passengers */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Passengers
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  placeholder="e.g. 4 people"
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>
            
            {/* Budget */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Max Daily Budget (Rs)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Trip Purpose
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Mountain road trip"
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Fleet with AI...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Find Best Recommendations</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs sm:text-sm font-medium flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>{error}</div>
          </div>
        )}

        {/* Recommendations list */}
        {recommendations && recommendations.length > 0 && (
          <div className="pt-6 border-t border-slate-800/80 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Top AI Match Recommendations</span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  {recommendations.length} {recommendations.length === 1 ? 'Match' : 'Matches'}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <div 
                  key={idx} 
                  className="relative group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">Match #{idx + 1}</span>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{rec.model}</h4>
                      </div>
                      <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-xl whitespace-nowrap">
                        Rs. {rec.rate} <span className="text-[10px] text-slate-400 font-normal">/ day</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-cyan-500/40 pl-3 py-1 bg-cyan-500/[0.02] rounded-r-xl">
                      "{rec.reason}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {recommendations && recommendations.length === 0 && (
          <div className="pt-6 border-t border-slate-800/80 text-center py-6">
            <p className="text-sm text-slate-400 font-medium">No exact matches found for your criteria. Try adjusting your budget or trip details!</p>
          </div>
        )}
      </div>
    </div>
  )
}