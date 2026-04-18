import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
  faLocationDot,
  faSpinner,
  faWind,
  faDroplet,
  faTemperatureHalf
} from "@fortawesome/free-solid-svg-icons"
import useWeather from "../hooks/useWeather"

function WeatherWidget({ onWeatherChange, onForecastChange }) {
  const [input, setInput] = useState("")
  const [city, setCity] = useState("")
  const [coords, setCoords] = useState(null)
  const [locating, setLocating] = useState(false)
  const { weather, forecast, loading, error } = useWeather(city, coords)

  useEffect(() => {
    if (weather) onWeatherChange(weather)
  }, [weather])

  useEffect(() => {
    if (forecast) onForecastChange(forecast)
  }, [forecast])

  function handleSearch(e) {
    e.preventDefault()
    if (!input.trim()) return
    setCoords(null)
    setCity(input.trim())
  }

  function handleGeolocate() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCity("")
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        setLocating(false)
      }
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a city..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button
          type="button"
          onClick={handleGeolocate}
          className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium"
          title="Use my location"
        >
          <FontAwesomeIcon icon={locating ? faSpinner : faLocationDot} spin={locating} />
        </button>
      </form>

      {loading && (
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {weather && !loading && (
  <div className="flex items-center gap-4">
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      className="w-16 h-16"
    />
    <div>
      <p className="text-xl font-bold text-gray-800">
        {weather.name}, {weather.sys.country}
      </p>
      <p className="text-gray-500 capitalize">{weather.weather[0].description}</p>
      <p className="text-2xl font-semibold text-blue-500">{Math.round(weather.main.temp)}°C</p>
    </div>
  </div>
)}

{weather && !loading && (
  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
    <div className="flex flex-col items-center gap-1">
      <FontAwesomeIcon icon={faTemperatureHalf} className="text-orange-400" />
      <p className="text-xs text-gray-400">Feels like</p>
      <p className="text-sm font-semibold text-gray-700">
        {Math.round(weather.main.feels_like)}°C
      </p>
    </div>
    <div className="flex flex-col items-center gap-1">
      <FontAwesomeIcon icon={faDroplet} className="text-blue-400" />
      <p className="text-xs text-gray-400">Humidity</p>
      <p className="text-sm font-semibold text-gray-700">
        {weather.main.humidity}%
      </p>
    </div>
    <div className="flex flex-col items-center gap-1">
      <FontAwesomeIcon icon={faWind} className="text-teal-400" />
      <p className="text-xs text-gray-400">Wind</p>
      <p className="text-sm font-semibold text-gray-700">
        {Math.round(weather.wind.speed * 3.6)} km/h
      </p>
    </div>
  </div>
)}
    </div>
    
  )
}

export default WeatherWidget