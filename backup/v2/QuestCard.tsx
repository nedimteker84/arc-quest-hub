import { useState } from "react"
import type { Quest } from "../data/quests"

type QuestCardProps = {
  quest: Quest
  completed: boolean
  onComplete: (quest: Quest) => void
}

function QuestCard({
  quest,
  completed,
  onComplete,
}: QuestCardProps) {
  const [value, setValue] = useState("")

  const requiresInput =
    quest.type === "tx" ||
    quest.type === "address" ||
    quest.type === "url" ||
    quest.type === "domain"

  function handleSubmit() {
    if (completed) return

    if (requiresInput && value.trim() === "") {
      alert("Please enter a value first.")
      return
    }

    onComplete(quest)
  }

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        completed
          ? "border-green-500/40 bg-green-950/20"
          : "border-white/10 bg-slate-900"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {quest.title}
            </h3>

            {completed && (
              <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-300">
                Completed
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-400">
            {quest.description}
          </p>
        </div>

        <span className="rounded-full bg-purple-600/20 px-3 py-1 text-sm font-semibold text-purple-300">
          +{quest.xp} XP
        </span>
      </div>

      {requiresInput && !completed && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={quest.placeholder}
          className="mb-3 w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={completed}
        className={`w-full rounded-xl px-4 py-3 font-semibold transition ${
          completed
            ? "cursor-not-allowed bg-green-700/40 text-green-300"
            : "bg-purple-600 hover:bg-purple-500"
        }`}
      >
        {completed
          ? "Completed"
          : requiresInput
          ? "Submit"
          : "Complete Quest"}
      </button>
    </div>
  )
}

export default QuestCard