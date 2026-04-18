const BAD_WEATHER_CODES = [
  "Rain", "Drizzle", "Thunderstorm", "Snow", "Squall", "Tornado"
]

const EXTREME_HEAT_THRESHOLD = 38
const EXTREME_COLD_THRESHOLD = 0

export function isBadWeatherForOutdoors(weather) {
  if (!weather) return false
  const condition = weather.weather[0].main
  const temp = weather.main.temp
  return (
    BAD_WEATHER_CODES.includes(condition) ||
    temp >= EXTREME_HEAT_THRESHOLD ||
    temp <= EXTREME_COLD_THRESHOLD
  )
}

export function getWeatherWarning(weather) {
  if (!weather) return null
  const condition = weather.weather[0].main
  const temp = weather.main.temp
  if (BAD_WEATHER_CODES.includes(condition)) return `${condition} expected`
  if (temp >= EXTREME_HEAT_THRESHOLD) return "Extreme heat"
  if (temp <= EXTREME_COLD_THRESHOLD) return "Freezing temperatures"
  return null
}