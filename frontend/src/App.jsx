import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/useAuth.js'
import Welcome from './pages/Welcome.jsx'
// Keep using the starter's tracked login path, which is capitalized on disk.
import Login from './Pages/login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import SearchGroups from './pages/SearchGroups.jsx'
import CreateGroup from './pages/CreateGroup.jsx'
import GroupDetails from './pages/GroupDetails.jsx'
import AppLayout from './components/AppLayout.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <main className="page-loading">Loading...</main>
  return user ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <main className="page-loading">Loading...</main>
  return user ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/groups" element={<AppLayout><SearchGroups /></AppLayout>} />
      <Route path="/groups/new" element={<ProtectedRoute><AppLayout><CreateGroup /></AppLayout></ProtectedRoute>} />
      <Route path="/groups/:id" element={<AppLayout><GroupDetails /></AppLayout>} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
