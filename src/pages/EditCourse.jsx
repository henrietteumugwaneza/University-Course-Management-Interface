import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"
import CourseForm from "../components/CourseForm"
import Navbar from "../components/Navbar"

export default function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`/courses/${id}`)
      setCourse(res.data)
    }
    fetchCourse()
  }, [id])

  const updateCourse = async (data) => {
    await axios.put(`/courses/${id}`, data)
    navigate("/dashboard")
  }

  if (!course) return <p>Loading...</p>

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="font-bold mb-3">Edit Course</h2>
        <CourseForm onSubmit={updateCourse} initialData={course} />
      </div>
    </div>
  )
}