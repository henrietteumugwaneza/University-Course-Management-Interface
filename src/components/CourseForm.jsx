import { useState, useEffect } from "react"

export default function CourseForm({ onSubmit, initialData }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setDescription(initialData.description)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, description })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <input
        type="text"
        placeholder="Course Name"
        className="w-full border p-2 mb-3"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 mb-3"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Save
      </button>
    </form>
  )
}