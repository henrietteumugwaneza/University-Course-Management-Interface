import axios from "axios"

const instance = axios.create({
  baseURL: "https://student-management-system-backend.up.railway.app/api"
})

instance.interceptors.request.use((config) => {
  // Don't attach token to auth endpoints
  if (config.url?.startsWith("/auth")) return config

  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If any request gets a 401, clear token and redirect to login
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && !err.config.url?.startsWith("/auth")) {
      localStorage.removeItem("token")
      window.location.href = "/"
    }
    return Promise.reject(err)
  }
)

export default instance
