export type DashboardStatsInput = {
  xp: number
  builderScore: number
  reputation: number
  totalCheckIns: number
  currentStreak: number
  passportMinted: boolean
  achievementsUnlocked: number
  achievementsTotal: number
}

export type DashboardCard = {
  title: string
  value: string
  subtitle: string
  color: string
}

export function createDashboardCards(
  data: DashboardStatsInput,
): DashboardCard[] {
  return [
    {
      title: "Builder XP",
      value: data.xp.toString(),
      subtitle: "Total earned XP",
      color: "purple",
    },
    {
      title: "Builder Score",
      value: data.builderScore.toString(),
      subtitle: "Overall builder rating",
      color: "cyan",
    },
    {
      title: "Reputation",
      value: `${data.reputation}/100`,
      subtitle: "Trust score",
      color: "emerald",
    },
    {
      title: "Current Streak",
      value: `${data.currentStreak}`,
      subtitle: "Consecutive days",
      color: "orange",
    },
    {
      title: "Check-ins",
      value: `${data.totalCheckIns}`,
      subtitle: "Onchain check-ins",
      color: "blue",
    },
    {
      title: "Passport",
      value: data.passportMinted ? "Minted" : "Not Minted",
      subtitle: "NFT status",
      color: "pink",
    },
    {
      title: "Achievements",
      value: `${data.achievementsUnlocked}/${data.achievementsTotal}`,
      subtitle: "Unlocked",
      color: "yellow",
    },
  ]
}