import { useEffect, useState } from "react"
import axios from "../api/axios"
import Navbar from "../components/Navbar"
import CourseCard from "../components/CourseCard"
import CourseForm from "../components/CourseForm"
import Loader from "../components/Loader"
import { useToast } from "../context/ToastContext"

export default function Dashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const toast = useToast()

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await axios.get("/courses")
      setCourses(res.data)
    } catch {
      toast("Failed to load courses.", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  const createCourse = async (data) => {
    try {
      await axios.post("/courses", data)
      toast("Course created successfully!")
      fetchCourses()
    } catch {
      toast("Failed to create course.", "error")
    }
  }

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`/courses/${id}`)
      toast("Course deleted.")
      fetchCourses()
    } catch {
      toast("Failed to delete course.", "error")
    }
  }

  const filtered = courses.filter(c =>
    c.courseName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Course Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your university course catalog</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Add Course Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-slate-800 mb-1">Add New Course</h2>
              <p className="text-slate-500 text-xs mb-5">Fill in the details to create a new course entry.</p>
              <CourseForm onSubmit={createCourse} submitLabel="Create Course" />
            </div>
          </div>

          {/* Course List Panel */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h2 className="font-semibold text-slate-800 shrink-0">
                All Courses
                {!loading && (
                  <span className="ml-2 text-xs font-medium bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                    {courses.length}
                  </span>
                )}
              </h2>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
              />
            </div>

            {loading ? (
              <Loader text="Fetching courses..." />
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium">No courses found</p>
                <p className="text-slate-400 text-sm mt-1">
                  {search ? "Try a different search term." : "Add your first course using the form."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(course => (
                  <CourseCard key={course.id} course={course} onDelete={deleteCourse} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
