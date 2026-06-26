export type Quest = {
  id: string
  title: string
  description: string
  xp: number
  category: "daily"
}

export const quests: Quest[] = [
  {
    id: "gm",
    title: "GM",
    description: "Start the day with a GM.",
    xp: 2,
    category: "daily",
  },
  {
    id: "gn",
    title: "GN",
    description: "End the day with a GN.",
    xp: 2,
    category: "daily",
  },
  {
    id: "daily-check-in",
    title: "Daily Check In",
    description: "Daily activity check.",
    xp: 10,
    category: "daily",
  },
]