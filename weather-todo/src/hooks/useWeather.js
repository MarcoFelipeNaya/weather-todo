import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE = "https://api.openweathermap.org/data/2.5"

function useWeather(city, coords) {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!city && !coords) return

    async function fetchAll() {
      setLoading(true)
      setError(null)
      try {
        const locationQuery = coords
          ? `lat=${coords.lat}&lon=${coords.lon}`
          : `q=${city}`

        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`${BASE}/weather?${locationQuery}&appid=${API_KEY}&units=metric`),
          fetch(`${BASE}/forecast?${locationQuery}&appid=${API_KEY}&units=metric`)
        ])

        if (!weatherRes.ok) throw new Error("City not found")

        const weatherData = await weatherRes.json()
        const forecastData = await forecastRes.json()

        // forecast returns 3hr intervals — grab one reading per day at midday
        const daily = forecastData.list.filter(item =>
          item.dt_txt.includes("12:00:00")
        ).slice(0, 5)

        setWeather(weatherData)
        setForecast(daily)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [city, coords])

  return { weather, forecast, loading, error }
}

export default useWeather