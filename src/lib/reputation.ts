export type ReputationInput = {
  xp: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  verified: boolean
}

export function calculateReputation({
  xp,
  currentStreak,
  bestStreak,
  totalCheckIns,
  verified,
}: ReputationInput) {
  let score = 0

  score += Math.floor(xp / 2)
  score += currentStreak * 5
  score += bestStreak * 2
  score += totalCheckIns * 3

  if (verified) score += 15

  score = Math.min(score, 100)

  let level = "Getting Started"
  let color = "text-red-300"

  if (score >= 20) {
    level = "Building"
    color = "text-orange-300"
  }

  if (score >= 40) {
    level = "Consistent"
    color = "text-yellow-300"
  }

  if (score >= 60) {
    level = "Excellent"
    color = "text-cyan-300"
  }

  if (score >= 80) {
    level = "Elite"
    color = "text-emerald-300"
  }

  return {
    score,
    level,
    color,
  }
}