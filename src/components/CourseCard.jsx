import { useNavigate } from "react-router-dom"

export default function CourseCard({ course, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="border p-4 rounded shadow mb-3">
      <h2 className="font-bold text-lg">{course.name}</h2>
      <p>{course.description}</p>

      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white px-2"
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          View
        </button>

        <button
          className="bg-yellow-500 text-white px-2"
          onClick={() => navigate(`/edit/${course.id}`)}
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-2"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}