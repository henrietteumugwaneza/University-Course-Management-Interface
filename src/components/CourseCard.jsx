import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CourseCard({ course, onDelete }) {
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate">{course.courseName}</h3>
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">{course.description || "No description provided."}</p>
          </div>
          <span className="shrink-0 text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            #{course.id?.slice(-5)}
          </span>
        </div>

        <div className="flex gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            View
          </button>
          <button
            onClick={() => navigate(`/edit/${course.id}`)}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-center font-bold text-slate-800 text-lg">Delete Course?</h3>
            <p className="text-center text-slate-500 text-sm mt-1 mb-5">
              <span className="font-medium text-slate-700">"{course.courseName}"</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { setConfirming(false); onDelete(course.id) }}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
