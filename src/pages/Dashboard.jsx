import { useEffect, useState } from "react"
import axios from "../api/axios"
import Navbar from "../components/Navbar"
import CourseCard from "../components/CourseCard"
import CourseForm from "../components/CourseForm"
import Loader from "../components/Loader"

export default function Dashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCourses = async () => {
    setLoading(true)
    const res = await axios.get("/courses")
    setCourses(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const createCourse = async (data) => {
    await axios.post("/courses", data)
    fetchCourses()
  }

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return
    await axios.delete(`/courses/${id}`)
    fetchCourses()
  }

  return (
    <div>
      <Navbar />

      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold mb-2">Add Course</h2>
          <CourseForm onSubmit={createCourse} />
        </div>

        <div>
          <h2 className="font-bold mb-2">All Courses</h2>

          {loading ? <Loader /> : (
            courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={deleteCourse}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}