import AIBuilderCoach from "./AIBuilderCoach"
import WeeklyAnalytics from "./WeeklyAnalytics"
import BuilderPassport from "./BuilderPassport"
import AchievementPanel from "./AchievementPanel"
import QuestEnginePanel from "./QuestEnginePanel"
import Dashboard from "./Dashboard"
import type { Achievement } from "../lib/achievements"

type BuilderProgressSectionProps = {
  wallet: string
  totalXp: number
  builderScore: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  reputation: number
  hasCheckedInToday: boolean
  isConnected: boolean
  isVerified: boolean
  passportMinted: boolean
  completedCount: number
  openQuestCount: number
  achievements: Achievement[]
}

function BuilderProgressSection({
  wallet,
  totalXp,
  builderScore,
  currentStreak,
  bestStreak,
  totalCheckIns,
  reputation,
  hasCheckedInToday,
  isConnected,
  isVerified,
  passportMinted,
  completedCount,
  openQuestCount,
  achievements,
}: BuilderProgressSectionProps) {
  const achievementsUnlocked = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length

  return (
    <>
      <AIBuilderCoach
        totalXp={totalXp}
        builderScore={builderScore}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        totalCheckIns={totalCheckIns}
        reputation={reputation}
        hasCheckedInToday={hasCheckedInToday}
        isConnected={isConnected}
        isVerified={isVerified}
      />

      <WeeklyAnalytics
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        totalCheckIns={totalCheckIns}
        totalXp={totalXp}
        builderScore={builderScore}
        reputation={reputation}
      />

      <BuilderPassport
        wallet={wallet}
        totalXp={totalXp}
        builderScore={builderScore}
        reputation={reputation}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        totalCheckIns={totalCheckIns}
      />

      <AchievementPanel achievements={achievements} />

      <QuestEnginePanel
        isWalletVerified={isVerified}
        hasCheckedInToday={hasCheckedInToday}
        passportMinted={passportMinted}
        currentStreak={currentStreak}
        reputation={reputation}
      />

      <Dashboard
        xp={totalXp}
        builderScore={builderScore}
        currentStreak={currentStreak}
        completedCount={completedCount}
        openQuestCount={openQuestCount}
        reputation={reputation}
        totalCheckIns={totalCheckIns}
        passportMinted={passportMinted}
        achievementsUnlocked={achievementsUnlocked}
        achievementsTotal={achievements.length}
      />
    </>
  )
}

export default BuilderProgressSection