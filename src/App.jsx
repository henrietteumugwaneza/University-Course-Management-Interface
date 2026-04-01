import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CourseDetails from "./pages/CourseDetails"
import EditCourse from "./pages/EditCourse"
import ProtectedRoute from "./routes/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        } />

        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}