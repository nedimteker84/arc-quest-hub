export function getUtcDateKey() {
  return new Date().toISOString().split("T")[0]
}

function getYesterdayUtcDateKey() {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - 1)
  return date.toISOString().split("T")[0]
}

export function useStreak(walletKey: string) {
  const streakStorageKey = `arcQuest:${walletKey}:streak`
  const lastCheckInStorageKey = `arcQuest:${walletKey}:lastStreakCheckInDate`
  const dailyCheckInStorageKey = `arcQuest:${walletKey}:dailyCheckInDate`

  const savedStreak = localStorage.getItem(streakStorageKey)
  const savedLastCheckInDate = localStorage.getItem(lastCheckInStorageKey)
  const savedDailyCheckInDate = localStorage.getItem(dailyCheckInStorageKey)

  const currentStreak = savedStreak ? Number(savedStreak) : 0

  function getDisplayStreak() {
    if (currentStreak > 0) return currentStreak

    const todayKey = getUtcDateKey()

    if (savedDailyCheckInDate === todayKey) {
      return 1
    }

    return 0
  }

  function updateStreak() {
    const todayKey = getUtcDateKey()
    const yesterdayKey = getYesterdayUtcDateKey()

    if (savedLastCheckInDate === todayKey) {
      return currentStreak > 0 ? currentStreak : 1
    }

    const newStreak =
      savedLastCheckInDate === yesterdayKey ? currentStreak + 1 : 1

    localStorage.setItem(streakStorageKey, String(newStreak))
    localStorage.setItem(lastCheckInStorageKey, todayKey)

    return newStreak
  }

  function clearStreak() {
    localStorage.removeItem(streakStorageKey)
    localStorage.removeItem(lastCheckInStorageKey)
  }

  return {
    currentStreak: getDisplayStreak(),
    updateStreak,
    clearStreak,
  }
}