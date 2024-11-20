import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import useAuth from "./hooks/use-auth"
import LandingPage from './pages/landing'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import UserSidebar from './components/user/sidebar'
import TutorSidebar from './components/tutor/sidebar'
import CreateCourse from './pages/tutors/create'
import Courses from './pages/tutors/courses'
import TutorAssignments from './pages/tutors/assignments'
import TutorProfile from './pages/tutors/profile'
import CreateAssignment from './pages/tutors/create-task'
import CoursesPage from './pages/students/courses'
import AssignmentPage from './pages/students/assignments'
import MentorsPage from './pages/students/mentors'
import LearningPath from './pages/students/learning-path'
import TaskPage from './pages/students/task'
import Leaderboard from './pages/leaderboard'
import CoursePage from './pages/students/CoursePage'

function App() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const { user } = auth;

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
  if (user.role === "inst") {
    return (
      <div className="h-screen bg-neutral-100 flex">
        <TutorSidebar />
        <Routes>
          <Route path='/dashboard' element={<Leaderboard />} />
          <Route path='/dashboard/community' element={<div className="h-screen w-full flex flex-col text-xl font-semibold items-center justify-center">Under Development 🧑‍💻</div>} />
          <Route path='/dashboard/assignments' element={<TutorAssignments />} />
          <Route path='/dashboard/courses' element={<Courses />} />
          <Route path='/dashboard/create-course' element={<CreateCourse />} />
          <Route path='/dashboard/profile' element={<TutorProfile />} />
          <Route path="/dashboard/create-task" element={<CreateAssignment />} />
          <Route path="*" element={<div className="flex h-screen bg-neutral-100 w-[calc(100%-18rem)] justify-center items-center">404 Not Found</div>} />
          </Routes>
      </div>
    )
  }
  
  return (
    <div className="h-screen flex">
      <UserSidebar />
      <div className='ml-[18rem] w-full'>
      <Routes>
        {/* Add other user routes here */}
        <Route path="/dashboard" element={<Leaderboard />} />
        <Route path='/dashboard/profile' element={<TutorProfile />} />
        <Route path='/dashboard/courses' element={<CoursesPage />} />
        <Route path='/dashboard/courses/:id' element={<CoursePage />} />
        <Route path="/dashboard/assignments" element={<AssignmentPage />} />
        <Route path="/dashboard/assignments/:taskId" element={<TaskPage />} />
        <Route path="/dashboard/mentors" element={<MentorsPage />} />
        <Route path='/dashboard/learning-path' element={<LearningPath />} />
        <Route path='/dashboard/community' element={<div className="h-screen w-full flex flex-col text-xl font-semibold items-center justify-center">Under Development 🧑‍💻</div>} />
        <Route path="*" element={<div className="flex h-screen bg-neutral-100 w-[calc(100%-18rem)] justify-center items-center">404 Not Found</div>} />
      </Routes>
      </div>
    </div>
  )
}

export default App