import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const TAG_STYLES = {
  outdoor: "bg-green-100 text-green-700",
  indoor: "bg-purple-100 text-purple-700",
  any: "bg-gray-100 text-gray-500",
}

function TaskItem({ task, onComplete, onDelete, weatherWarning }) {
  const showWarning = task.tag === "outdoor" && weatherWarning && !task.completed

  return (
    <div className={`flex flex-col p-4 bg-white rounded-xl shadow-sm gap-2 
      transition-all duration-200 hover:shadow-md
      ${showWarning ? "border-l-4 border-orange-400" : "border-l-4 border-transparent"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task.id)}
            className="w-5 h-5 cursor-pointer accent-blue-500"
          />
          <span className={`text-gray-800 transition-all duration-200
            ${task.completed ? "line-through text-gray-300" : ""}`}
          >
            {task.text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {task.tag && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${TAG_STYLES[task.tag]}`}>
              {task.tag}
            </span>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-300 hover:text-red-400 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {showWarning && (
        <p className="text-xs text-orange-500 font-medium">
          <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1" />
          Bad conditions for outdoor tasks — {weatherWarning}
        </p>
      )}
    </div>
  )
}

export default TaskItem