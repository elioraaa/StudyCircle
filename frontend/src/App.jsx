import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function ProtectedDashboard() {
  const { user, loading } = useAuth();
  if (loading) return <main className="simple-page" aria-live="polite">Loading...</main>;
  return user ? <Dashboard /> : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<ProtectedDashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
