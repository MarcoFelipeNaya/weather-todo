import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import TaskItem from "./TaskItem"

function TaskList({ tasks, onComplete, onDelete, onClearCompleted, weatherWarning }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-12">
        <FontAwesomeIcon icon={faClipboardList} className="text-gray-300 text-5xl mb-3" />
        <p className="text-gray-400 font-medium">No tasks yet — add one above!</p>
      </div>
    )
  }

  const sorted = [
    ...tasks.filter(t => !t.completed),
    ...tasks.filter(t => t.completed)
  ]

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-400">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-green-500">
            {completedCount} completed
          </p>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faTrashCan} />
              Clear completed
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {sorted.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            weatherWarning={weatherWarning}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList