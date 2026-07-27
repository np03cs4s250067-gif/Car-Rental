import { createContext, useContext, useEffect, useState } from 'react'
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from '../api/authApi.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await getMe()
        setUser(response.data.data)
      } catch {
        setUser(null)
      } finally {
        setIsAuthLoading(false)
      }
    }
    loadUser()
  }, [])

  async function login(credentials) {
    const response = await loginUser(credentials)
    setUser(response.data.data)
    return response.data.data
  }

  async function register(details) {
    const response = await registerUser(details)
    setUser(response.data.data)
    return response.data.data
  }

  async function logout() {
    try {
      await logoutUser()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
