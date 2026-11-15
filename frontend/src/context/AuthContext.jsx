import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth.js'
import AuthContext from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')))
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) return
    authApi.getMe()
      .then(setUser)
      .catch((error) => {
        if (error.response?.status === 401) localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  async function saveSession(request) {
    const result = await request
    localStorage.setItem('token', result.accessToken)
    setUser(result.user)
    return result.user
  }
  const value = {
    user, loading,
    login: (details) => saveSession(authApi.login(details)),
    register: (details) => saveSession(authApi.register(details)),
    logout: () => {
      localStorage.removeItem('token')
      setUser(null)
      navigate('/login')
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

