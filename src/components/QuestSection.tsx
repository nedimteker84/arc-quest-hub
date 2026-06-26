import type { Quest } from "../data/quests"
import QuestCard from "./QuestCard"

type QuestSectionProps = {
  title: string
  description: string
  quests: Quest[]
  completedQuestIds: string[]
  onComplete: (quest: Quest) => void
}

function QuestSection({
  title,
  description,
  quests,
  completedQuestIds,
  onComplete,
}: QuestSectionProps) {
  return (
    <div className="mt-8 rounded-3xl border border-purple-500/20 bg-purple-950/10 p-7 shadow-2xl shadow-purple-950/20">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-purple-300">
            Start here
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-slate-400">
            {description}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-bold text-slate-300">
          {completedQuestIds.length}/{quests.length} completed
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            completed={completedQuestIds.includes(quest.id)}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  )
}

export default QuestSection