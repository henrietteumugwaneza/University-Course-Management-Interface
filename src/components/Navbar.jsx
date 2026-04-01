import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Course Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}