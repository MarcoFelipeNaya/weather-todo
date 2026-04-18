import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSun, faCloud, faCloudRain, faCloudBolt,
  faSnowflake, faSmog, faCloudSun
} from "@fortawesome/free-solid-svg-icons"

const CONDITION_ICONS = {
  Clear: faSun,
  Clouds: faCloud,
  Rain: faCloudRain,
  Drizzle: faCloudRain,
  Thunderstorm: faCloudBolt,
  Snow: faSnowflake,
  Mist: faSmog,
  Fog: faSmog,
  Haze: faSmog,
}

const CONDITION_COLORS = {
  Clear: "text-yellow-400",
  Clouds: "text-gray-400",
  Rain: "text-blue-400",
  Drizzle: "text-blue-300",
  Thunderstorm: "text-purple-500",
  Snow: "text-blue-200",
  Mist: "text-gray-300",
  Fog: "text-gray-300",
  Haze: "text-gray-300",
}

function ForecastBar({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        5-Day Forecast
      </p>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day) => {
          const condition = day.weather[0].main
          const icon = CONDITION_ICONS[condition] || faCloud
          const color = CONDITION_COLORS[condition] || "text-gray-400"
          const date = new Date(day.dt * 1000)
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" })

          return (
            <div key={day.dt} className="flex flex-col items-center gap-1">
              <p className="text-xs font-medium text-gray-400">{dayName}</p>
              <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
              <p className="text-sm font-semibold text-gray-700">
                {Math.round(day.main.temp_max)}°
              </p>
              <p className="text-xs text-gray-400">
                {Math.round(day.main.temp_min)}°
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastBar