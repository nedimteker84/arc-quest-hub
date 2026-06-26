import StatsCard from "./StatsCard"

type DashboardProps = {
  xp: number
  builderScore: number
  completedCount: number
  openQuestCount: number
  currentStreak: number
}

function Dashboard({
  xp,
  builderScore,
  completedCount,
  openQuestCount,
  currentStreak,
}: DashboardProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-5">
      <StatsCard
        icon="🏆"
        value={xp}
        title="Total XP"
        description="Your daily Arc activity progress."
        valueColor="text-purple-400"
      />

      <StatsCard
        icon="⭐"
        value={builderScore}
        title="Builder Score"
        description="XP plus consistency bonus."
        valueColor="text-cyan-400"
      />

      <StatsCard
        icon="🔥"
        value={currentStreak}
        title="Streak"
        description="Consecutive daily check-ins."
        valueColor="text-orange-400"
      />

      <StatsCard
        icon="✅"
        value={completedCount}
        title="Completed"
        description="Daily quests completed."
        valueColor="text-green-400"
      />

      <StatsCard
        icon="📌"
        value={openQuestCount}
        title="Open Quests"
        description="Remaining daily quests."
        valueColor="text-yellow-400"
      />
    </div>
  )
}

export default Dashboard