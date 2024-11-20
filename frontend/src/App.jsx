import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import useAuth from "./hooks/use-auth"
import LandingPage from './pages/landing'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'

function App() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) {
      if (window.location.pathname === "/login" || window.location.pathname === "/register" || window.location.pathname === "/") {
        navigate("/dashboard")
      }
    } else {
      // if the user is not authenticated, redirect to the login page. only if the user is not on the login or register page or the landing page
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
        navigate("/login")
      }
    }
  }, [auth, navigate])

  // Routes for unauthenticated users
  if (!auth.token) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    )
  }

  // Routes for admin users
  if (auth.token.role === "admin") {
    return (
      <div className="h-screen bg-neutral-100 flex">
        <Routes>
          {/* Add other admin routes here */}
          <Route path="*" element={<div className="flex h-screen bg-neutral-100 w-full">404 Not Found</div>} />
        </Routes>
      </div>
    )
  }
  
  // Routes for regular authenticated users
  return (
    <div className="h-screen bg-neutral-100 flex">
      <Routes>
        {/* Add other user routes here */}
        <Route path="*" element={<div className="flex h-screen bg-neutral-100 w-full">404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App