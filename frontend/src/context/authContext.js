import { createContext } from 'react'

// Shared auth state object, separate from the provider component for Fast Refresh.
const AuthContext = createContext(null)

export default AuthContext
