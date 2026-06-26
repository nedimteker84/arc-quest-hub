export type QuestType = "button" | "tx" | "address" | "url" | "domain"

export type QuestVerificationMode = "instant" | "review"

export type Quest = {
  id: string
  title: string
  description: string
  xp: number
  category: "daily" | "onchain" | "builder"
  type: QuestType
  verificationMode: QuestVerificationMode
  placeholder?: string
}

export const quests: Quest[] = [
  {
    id: "gm",
    title: "GM",
    description: "Start the day with a GM.",
    xp: 2,
    category: "daily",
    type: "button",
    verificationMode: "instant",
  },
  {
    id: "gn",
    title: "GN",
    description: "End the day with a GN.",
    xp: 2,
    category: "daily",
    type: "button",
    verificationMode: "instant",
  },
  {
    id: "daily-check-in",
    title: "Daily Check In",
    description: "Daily activity check.",
    xp: 10,
    category: "daily",
    type: "button",
    verificationMode: "instant",
  },
  {
    id: "submit-transfer",
    title: "Submit Transfer TX",
    description: "Submit a safe Arc transfer transaction hash for review.",
    xp: 50,
    category: "onchain",
    type: "tx",
    verificationMode: "review",
    placeholder: "0x transaction hash",
  },
  {
    id: "deploy-contract",
    title: "Submit Deploy Address",
    description: "Submit a deployed contract address on Arc for review.",
    xp: 250,
    category: "onchain",
    type: "address",
    verificationMode: "review",
    placeholder: "0x contract address",
  },
  {
    id: "mini-app",
    title: "Mini App Published",
    description: "Submit your published Arc mini app URL for review.",
    xp: 500,
    category: "builder",
    type: "url",
    verificationMode: "review",
    placeholder: "https://your-mini-app-url.com",
  },
  {
    id: "ai-agent",
    title: "Create AI Agent",
    description: "Submit your Arc AI agent project URL for review.",
    xp: 750,
    category: "builder",
    type: "url",
    verificationMode: "review",
    placeholder: "https://your-agent-project.com",
  },
  {
    id: "register-domain",
    title: "Register Domain",
    description: "Submit your project domain for review.",
    xp: 150,
    category: "builder",
    type: "domain",
    verificationMode: "review",
    placeholder: "yourproject.com",
  },
]