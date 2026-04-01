import { useEffect, useState } from "react"
import axios from "../api/axios"

export default function Dashboard() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const res = await axios.get("/courses")
    setCourses(res.data)
  }

  const deleteCourse = async (id) => {
    if (!confirm("Are you sure?")) return

    await axios.delete(`/courses/${id}`)
    fetchCourses()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {courses.map(course => (
        <div key={course.id} className="border p-4 mb-3 rounded">
          <h2 className="font-bold">{course.name}</h2>

          <button className="text-red-500"
            onClick={()=>deleteCourse(course.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}