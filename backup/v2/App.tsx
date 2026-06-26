import { useEffect, useState } from "react"
import { Wallet } from "lucide-react"
import type { Quest } from "./data/quests"
import { quests } from "./data/quests"
import StatsCard from "./components/StatsCard"
import QuestSection from "./components/QuestSection"

function App() {
  const [xp, setXp] = useState(0)
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([])

  useEffect(() => {
    const savedXp = localStorage.getItem("arcQuestXp")
    const savedCompletedQuestIds = localStorage.getItem(
      "arcQuestCompletedQuestIds",
    )

    if (savedXp) {
      setXp(Number(savedXp))
    }

    if (savedCompletedQuestIds) {
      setCompletedQuestIds(JSON.parse(savedCompletedQuestIds))
    }
  }, [])

  function completeQuest(quest: Quest) {
    if (completedQuestIds.includes(quest.id)) {
      return
    }

    const newXp = xp + quest.xp
    const newCompletedQuestIds = [...completedQuestIds, quest.id]

    setXp(newXp)
    setCompletedQuestIds(newCompletedQuestIds)

    localStorage.setItem("arcQuestXp", String(newXp))
    localStorage.setItem(
      "arcQuestCompletedQuestIds",
      JSON.stringify(newCompletedQuestIds),
    )
  }

  function resetProgress() {
    localStorage.removeItem("arcQuestXp")
    localStorage.removeItem("arcQuestCompletedQuestIds")
    setXp(0)
    setCompletedQuestIds([])
  }

  const dailyQuests = quests.filter((quest) => quest.category === "daily")
  const onchainQuests = quests.filter((quest) => quest.category === "onchain")
  const builderQuests = quests.filter((quest) => quest.category === "builder")

  const completedCount = completedQuestIds.length
  const openQuestCount = quests.length - completedCount

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-4xl font-bold shadow-lg shadow-purple-600/40">
            A
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Arc Quest Hub
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Complete safe Arc activities. Earn XP. Track real builder activity.
          </p>

          <button className="mt-8 flex items-center gap-3 rounded-2xl bg-purple-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-600/30 hover:bg-purple-500">
            <Wallet size={22} />
            Connect Wallet
          </button>

          <button
            onClick={resetProgress}
            className="mt-4 rounded-xl border border-white/10 px-5 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Reset Progress
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <StatsCard
            icon="🏆"
            value={xp}
            title="Total XP"
            description="Your Arc activity progress."
            valueColor="text-purple-400"
          />

          <StatsCard
            icon="✅"
            value={completedCount}
            title="Completed Quests"
            description="Quests you have completed."
            valueColor="text-green-400"
          />

          <StatsCard
            icon="🔥"
            value={openQuestCount}
            title="Open Quests"
            description="Remaining quests to complete."
            valueColor="text-orange-400"
          />
        </div>

        <QuestSection
          title="Daily Quests"
          description="GM, GN and daily check-in actions."
          quests={dailyQuests}
          completedQuestIds={completedQuestIds}
          onComplete={completeQuest}
        />

        <QuestSection
          title="Onchain Quests"
          description="Safe Arc activity checks without swap or bridge risk."
          quests={onchainQuests}
          completedQuestIds={completedQuestIds}
          onComplete={completeQuest}
        />

        <QuestSection
          title="Builder Quests"
          description="Builder-focused milestones for real Arc projects."
          quests={builderQuests}
          completedQuestIds={completedQuestIds}
          onComplete={completeQuest}
        />
      </section>
    </main>
  )
}

export default App