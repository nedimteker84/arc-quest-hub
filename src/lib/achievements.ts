export type AchievementInput = {
  totalXp: number
  builderScore: number
  reputation: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  isVerified: boolean
  passportMinted: boolean
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  target: number
}

function clampProgress(value: number, target: number) {
  return Math.min(value, target)
}

export function getAchievements({
  totalXp,
  builderScore,
  reputation,
  currentStreak,
  bestStreak,
  totalCheckIns,
  isVerified,
  passportMinted,
}: AchievementInput): Achievement[] {
  return [
    {
      id: "verified-builder",
      title: "Verified Builder",
      description: "Verify your wallet identity.",
      icon: "🛡️",
      unlocked: isVerified,
      progress: isVerified ? 1 : 0,
      target: 1,
    },
    {
      id: "genesis-builder",
      title: "Genesis Builder",
      description: "Complete your first onchain check-in.",
      icon: "🥉",
      unlocked: totalCheckIns >= 1,
      progress: clampProgress(totalCheckIns, 1),
      target: 1,
    },
    {
      id: "first-passport",
      title: "First Passport NFT",
      description: "Mint your first Arc Builder Passport NFT.",
      icon: "⭐",
      unlocked: passportMinted,
      progress: passportMinted ? 1 : 0,
      target: 1,
    },
    {
      id: "xp-100-club",
      title: "100 XP Club",
      description: "Reach 100 total XP.",
      icon: "🚀",
      unlocked: totalXp >= 100,
      progress: clampProgress(totalXp, 100),
      target: 100,
    },
    {
      id: "active-builder",
      title: "Active Builder",
      description: "Reach Builder Score 100.",
      icon: "⚡",
      unlocked: builderScore >= 100,
      progress: clampProgress(builderScore, 100),
      target: 100,
    },
    {
      id: "advanced-builder",
      title: "Advanced Builder",
      description: "Reach Builder Score 300.",
      icon: "💠",
      unlocked: builderScore >= 300,
      progress: clampProgress(builderScore, 300),
      target: 300,
    },
    {
      id: "elite-reputation",
      title: "Elite Reputation",
      description: "Reach 80 reputation.",
      icon: "💎",
      unlocked: reputation >= 80,
      progress: clampProgress(reputation, 80),
      target: 80,
    },
    {
      id: "week-streak",
      title: "7 Day Streak",
      description: "Build consistently for 7 days.",
      icon: "🔥",
      unlocked: currentStreak >= 7 || bestStreak >= 7,
      progress: clampProgress(Math.max(currentStreak, bestStreak), 7),
      target: 7,
    },
    {
      id: "month-streak",
      title: "30 Day Streak",
      description: "Build consistently for 30 days.",
      icon: "⚔️",
      unlocked: currentStreak >= 30 || bestStreak >= 30,
      progress: clampProgress(Math.max(currentStreak, bestStreak), 30),
      target: 30,
    },
    {
      id: "arc-legend",
      title: "Arc Legend",
      description: "Reach Builder Score 1500.",
      icon: "👑",
      unlocked: builderScore >= 1500,
      progress: clampProgress(builderScore, 1500),
      target: 1500,
    },
  ]
}

export function getUnlockedAchievementTitles(achievements: Achievement[]) {
  return achievements
    .filter((achievement) => achievement.unlocked)
    .map((achievement) => achievement.title)
}