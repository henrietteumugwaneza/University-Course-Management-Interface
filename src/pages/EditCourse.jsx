import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"
import CourseForm from "../components/CourseForm"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
import { useToast } from "../context/ToastContext"

export default function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => toast("Failed to load course.", "error"))
      .finally(() => setLoading(false))
  }, [id])

  const updateCourse = async (data) => {
    try {
      await axios.put(`/courses/${id}`, data)
      toast("Course updated successfully!")
      navigate("/dashboard")
    } catch {
      toast("Failed to update course.", "error")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Edit Course</h2>
          <p className="text-slate-500 text-sm mb-6">Update the course details below.</p>

          {loading ? (
            <Loader text="Loading course..." />
          ) : course ? (
            <CourseForm onSubmit={updateCourse} initialData={course} submitLabel="Update Course" />
          ) : (
            <p className="text-slate-500 text-sm">Course not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
