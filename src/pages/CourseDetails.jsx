import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"
import Navbar from "../components/Navbar"

export default function CourseDetails() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`/courses/${id}`)
      setCourse(res.data)
    }
    fetchCourse()
  }, [id])

  if (!course) return <p>Loading...</p>

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">{course.name}</h1>
        <p>{course.description}</p>
      </div>
    </div>
  )
}