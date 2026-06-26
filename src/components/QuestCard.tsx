import type { Quest } from "../data/quests"

type QuestCardProps = {
  quest: Quest
  completed: boolean
  onComplete: (quest: Quest) => void
}

function getQuestIcon(id: string) {
  if (id === "gm") return "🌅"
  if (id === "gn") return "🌙"
  if (id === "daily-check-in") return "✅"
  return "⚡"
}

function QuestCard({ quest, completed, onComplete }: QuestCardProps) {
  return (
    <div
      className={`group rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-2xl ${
        completed
          ? "border-emerald-500/40 bg-emerald-950/20 shadow-emerald-500/10"
          : "border-white/10 bg-slate-900/80 hover:border-purple-400/40 hover:bg-slate-900"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
              completed ? "bg-emerald-500/20" : "bg-purple-600/20"
            }`}
          >
            {getQuestIcon(quest.id)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-white">{quest.title}</h3>

              {completed && (
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                  Completed
                </span>
              )}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {quest.description}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-purple-600/20 px-3 py-1 text-sm font-bold text-purple-300">
          +{quest.xp} XP
        </span>
      </div>

      <button
        onClick={() => onComplete(quest)}
        disabled={completed}
        className={`w-full rounded-2xl px-5 py-4 font-bold transition ${
          completed
            ? "cursor-not-allowed bg-emerald-700/40 text-emerald-300"
            : "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500"
        }`}
      >
        {completed ? "Completed Today" : "Complete Quest"}
      </button>
    </div>
  )
}

export default QuestCard