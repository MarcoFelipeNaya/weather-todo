import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const TAGS = ["any", "outdoor", "indoor"]

function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("")
  const [tag, setTag] = useState("any")

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, tag)
    setText("")
    setTag("any")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="flex gap-2">
        {TAGS.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors
              ${tag === t
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-500 border-gray-300 hover:border-blue-400"
              }`}
          >
            {t}
          </button>
        ))}
      </div>
    </form>
  )
}

export default AddTaskForm