export type QuestType =
  | "daily"
  | "weekly"
  | "social"
  | "builder"
  | "achievement"

export type Quest = {
  id: string
  title: string
  description: string
  type: QuestType
  xp: number
  target: number
}

export const questEngine: Quest[] = [
  {
    id: "daily-checkin",
    title: "Daily Check-in",
    description: "Complete today's onchain check-in.",
    type: "daily",
    xp: 20,
    target: 1,
  },
  {
    id: "verify-wallet",
    title: "Verify Wallet",
    description: "Verify your builder identity.",
    type: "builder",
    xp: 30,
    target: 1,
  },
  {
    id: "mint-passport",
    title: "Mint Passport",
    description: "Mint your Builder Passport NFT.",
    type: "builder",
    xp: 75,
    target: 1,
  },
  {
    id: "week-streak",
    title: "7 Day Streak",
    description: "Maintain a 7 day streak.",
    type: "achievement",
    xp: 100,
    target: 7,
  },
  {
    id: "elite-reputation",
    title: "Elite Reputation",
    description: "Reach Reputation 80.",
    type: "achievement",
    xp: 150,
    target: 80,
  },
]