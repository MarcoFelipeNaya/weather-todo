import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import AddTaskForm from "./components/AddTaskForm"
import TaskList from "./components/TaskList"
import WeatherWidget from "./components/WeatherWidget"
import ForecastBar from "./components/ForecastBar"
import { isBadWeatherForOutdoors, getWeatherWarning } from "./utils/weatherHelpers"

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const isBadWeather = isBadWeatherForOutdoors(currentWeather)
  const weatherWarning = getWeatherWarning(currentWeather)
  const pendingOutdoorCount = tasks.filter(t => t.tag === "outdoor" && !t.completed).length

  function handleAdd(text, tag) {
    const newTask = { id: Date.now(), text, tag, completed: false }
    setTasks([...tasks, newTask])
  }

  function handleComplete(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }
  function handleClearCompleted() {
    setTasks(tasks.filter(t => !t.completed))
  }

  return (
    <div className="p-8">
      {isBadWeather && pendingOutdoorCount > 0 && (
        <div className="bg-orange-400 text-white text-center py-3 px-4 rounded-xl mb-6 max-w-xl mx-auto font-medium shadow-sm">
          <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
          {weatherWarning} — you have {pendingOutdoorCount} outdoor task{pendingOutdoorCount > 1 ? "s" : ""} pending
        </div>
      )}
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Weather Todo</h1>
          <p className="text-gray-400 mt-1">Your tasks, aware of the weather</p>
        </div>
        <WeatherWidget
          onWeatherChange={setCurrentWeather}
          onForecastChange={setForecast}
        />
        <ForecastBar forecast={forecast} />
        <AddTaskForm onAdd={handleAdd} />
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onClearCompleted={handleClearCompleted}
          weatherWarning={isBadWeather ? weatherWarning : null}
        />
      </div>
    </div>
  )
}

export default App