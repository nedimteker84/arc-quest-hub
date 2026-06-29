export type QuestType =
  | "daily"
  | "weekly"
  | "social"
  | "builder"
  | "achievement"
  | "passport"
  | "security"

export type QuestDifficulty = "easy" | "medium" | "hard" | "legendary"

export type Quest = {
  id: string
  title: string
  description: string
  type: QuestType
  difficulty: QuestDifficulty
  xp: number
  target: number
}

export const questEngine: Quest[] = [
  {
    id: "daily-checkin",
    title: "Daily Check-in",
    description: "Complete today's verified onchain check-in.",
    type: "daily",
    difficulty: "easy",
    xp: 20,
    target: 1,
  },
  {
    id: "verify-wallet",
    title: "Verify Wallet",
    description: "Verify your builder identity before completing quests.",
    type: "builder",
    difficulty: "easy",
    xp: 30,
    target: 1,
  },
  {
    id: "mint-passport",
    title: "Mint Passport",
    description: "Mint your Arc Builder Passport NFT.",
    type: "passport",
    difficulty: "medium",
    xp: 75,
    target: 1,
  },
  {
    id: "share-passport",
    title: "Share Passport",
    description: "Share your Arc Builder Passport with the community.",
    type: "social",
    difficulty: "easy",
    xp: 25,
    target: 1,
  },
  {
    id: "copy-public-profile",
    title: "Copy Public Profile",
    description: "Copy your public builder profile link.",
    type: "social",
    difficulty: "easy",
    xp: 20,
    target: 1,
  },
  {
    id: "week-streak",
    title: "7 Day Streak",
    description: "Maintain a 7 day builder streak.",
    type: "achievement",
    difficulty: "medium",
    xp: 100,
    target: 7,
  },
  {
    id: "month-streak",
    title: "30 Day Streak",
    description: "Maintain a 30 day builder streak.",
    type: "achievement",
    difficulty: "hard",
    xp: 300,
    target: 30,
  },
  {
    id: "elite-reputation",
    title: "Elite Reputation",
    description: "Reach 80 reputation.",
    type: "achievement",
    difficulty: "hard",
    xp: 150,
    target: 80,
  },
  {
    id: "score-300",
    title: "Advanced Builder",
    description: "Reach Builder Score 300.",
    type: "builder",
    difficulty: "hard",
    xp: 250,
    target: 300,
  },
  {
    id: "score-1500",
    title: "Arc Legend",
    description: "Reach Builder Score 1500.",
    type: "achievement",
    difficulty: "legendary",
    xp: 1000,
    target: 1500,
  },
  {
    id: "security-ready",
    title: "Security Ready",
    description: "Connect wallet, verify identity and stay on Arc Testnet.",
    type: "security",
    difficulty: "medium",
    xp: 60,
    target: 3,
  },
]