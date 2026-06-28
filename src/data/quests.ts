export type Quest = {
  id: string
  title: string
  description: string
  xp: number
}

export const quests: Quest[] = [
  {
    id: "daily-check-in",
    title: "Daily Check In",
    description: "Complete your daily onchain check-in on Arc Testnet.",
    xp: 10,
  },
]