import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"

export default function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        {loading ? (
          <Loader text="Loading course details..." />
        ) : error || !course ? (
          <div className="text-center py-20">
            <p className="text-slate-600 font-medium">Course not found.</p>
            <button onClick={() => navigate("/dashboard")} className="mt-4 text-indigo-600 text-sm hover:underline">
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
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
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    Course ID: #{course.id?.slice(-6)}
                  </span>
                  <h1 className="text-2xl font-bold text-slate-800 mt-3">{course.courseName}</h1>
                </div>
                <button
                  onClick={() => navigate(`/edit/${course.id}`)}
                  className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
                >
                  Edit Course
                </button>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Description</p>
                  <p className="text-slate-700 leading-relaxed">{course.description || "No description provided."}</p>
                </div>
                {course.createdAt && (
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Created</p>
                    <p className="text-slate-700 text-sm">{new Date(course.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                )}
                {course.updatedAt && (
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Last Updated</p>
                    <p className="text-slate-700 text-sm">{new Date(course.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
