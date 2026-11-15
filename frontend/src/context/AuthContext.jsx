import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, login as loginRequest, register as registerRequest } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    getMe().then(setUser).catch((error) => {
      // Only discard the session when the server says the token is invalid.
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }).finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const result = await loginRequest(credentials);
    localStorage.setItem("token", result.accessToken);
    setUser(result.user);
    return result.user;
  }

  async function register(details) {
    const result = await registerRequest(details);
    localStorage.setItem("token", result.accessToken);
    setUser(result.user);
    return result.user;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
