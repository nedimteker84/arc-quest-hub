export type PassportData = {
  wallet: string
  xp: number
  builderScore: number
  reputation: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  level: string
  badges: string[]
  joinedAt: string
}

export function getBuilderLevel(score: number): string {
  if (score >= 1500) return "Arc Legend"
  if (score >= 700) return "Core Builder"
  if (score >= 300) return "Advanced Builder"
  if (score >= 100) return "Active Builder"
  if (score >= 50) return "New Builder"
  return "Starter Builder"
}

export function getBuilderBadges(
  currentStreak: number,
  totalCheckIns: number,
  reputation: number,
): string[] {
  const badges: string[] = []

  if (totalCheckIns >= 1)
    badges.push("Genesis Builder")

  if (currentStreak >= 7)
    badges.push("7 Day Streak")

  if (currentStreak >= 30)
    badges.push("30 Day Streak")

  if (currentStreak >= 100)
    badges.push("100 Day Legend")

  if (reputation >= 80)
    badges.push("Elite Reputation")

  return badges
}

export function createPassport(data: {
  wallet: string
  xp: number
  builderScore: number
  reputation: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
}): PassportData {
  return {
    wallet: data.wallet,
    xp: data.xp,
    builderScore: data.builderScore,
    reputation: data.reputation,
    currentStreak: data.currentStreak,
    bestStreak: data.bestStreak,
    totalCheckIns: data.totalCheckIns,
    level: getBuilderLevel(data.builderScore),
    badges: getBuilderBadges(
      data.currentStreak,
      data.totalCheckIns,
      data.reputation,
    ),
    joinedAt: new Date().toISOString(),
  }
}

export function passportCompletion(passport: PassportData): number {
  let score = 0

  if (passport.wallet) score += 15

  if (passport.xp > 0) score += 15

  if (passport.builderScore > 0) score += 15

  if (passport.reputation > 0) score += 15

  if (passport.totalCheckIns > 0) score += 20

  if (passport.badges.length > 0) score += 20

  return Math.min(score, 100)
}

export function nextPassportGoal(
  passport: PassportData,
): string {
  if (passport.totalCheckIns === 0)
    return "Complete your first onchain check-in."

  if (passport.currentStreak < 7)
    return `Reach a ${7 - passport.currentStreak} day streak.`

  if (passport.reputation < 80)
    return `Increase reputation to 80.`

  if (passport.builderScore < 300)
    return `Reach Builder Score 300.`

  return "Passport is progressing well."
}