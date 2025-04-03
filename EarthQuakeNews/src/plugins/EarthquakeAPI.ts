import axios from 'axios'

export const EarthquakeAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})
  