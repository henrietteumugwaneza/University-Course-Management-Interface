import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch {
      alert("Login failed")
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  )
}