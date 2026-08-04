import { useState } from 'react'
import { getCarRecommendation } from '../api/aiApi.js'

export default function AIAssistant() {
  const [passengers, setPassengers] = useState('')
  const [budget, setBudget] = useState('')
  const [purpose, setPurpose] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!passengers || !budget || !purpose) {
      setError('Please fill in all fields so our AI can find the best match.')
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
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-1 shadow-2xl">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[1.4rem] p-6 md:p-8">
          
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Assisted - Find My Car</h2>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Passengers</label>
              <input
                type="number"
                min="1"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                placeholder="e.g. 4"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Max Budget (Rs)</label>
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
              />
            </div>

            <div className="flex-[2]">
              <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Trip Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Off-road camping trip"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-[46px]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <span>Get Recommendations</span>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          {recommendations && recommendations.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-4">Top AI Matches for You:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-indigo-300">{rec.model}</h4>
                      <span className="bg-indigo-500/20 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full">
                        Rs. {rec.rate} / day
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mt-3 border-l-2 border-indigo-500/50 pl-3">
                      "{rec.reason}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendations && recommendations.length === 0 && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-indigo-200 text-center">No exact matches found for your criteria. Try adjusting your budget or requirements!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}