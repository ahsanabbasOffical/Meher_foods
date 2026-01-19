'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api, User } from './api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: { username: string; email: string; password: string; password2: string; first_name?: string; last_name?: string }) => Promise<void>
  updateProfile: (data: { first_name?: string; last_name?: string; phone?: string; address?: string }) => Promise<User>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = api.getToken()
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const userData = await api.getProfile()
      setUser(userData)
    } catch (error) {
      // Token might be invalid, clear it
      api.clearToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const data = await api.login({ email, password })
    api.setToken(data.token)
    setUser(data.user)
  }

  const logout = () => {
    api.clearToken()
    setUser(null)
  }

  const register = async (data: { username: string; email: string; password: string; password2: string; first_name?: string; last_name?: string }) => {
    const result = await api.register(data)
    api.setToken(result.token)
    setUser(result.user)
  }

  const updateProfile = async (data: { first_name?: string; last_name?: string; phone?: string; address?: string }) => {
    const updatedUser = await api.updateProfile(data)
    setUser(updatedUser)
    return updatedUser
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
