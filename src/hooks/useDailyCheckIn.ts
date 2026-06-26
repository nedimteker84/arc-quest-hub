export function getUtcDateKey() {
  return new Date().toISOString().split("T")[0]
}

export function useDailyCheckIn(walletKey: string) {
  const todayKey = getUtcDateKey()
  const storageKey = `arcQuest:${walletKey}:dailyCheckInDate`
  const lastCheckInDate = localStorage.getItem(storageKey)

  const hasCheckedInToday = lastCheckInDate === todayKey

  function saveDailyCheckIn() {
    localStorage.setItem(storageKey, todayKey)
  }

  function clearDailyCheckIn() {
    localStorage.removeItem(storageKey)
  }

  return {
    todayKey,
    hasCheckedInToday,
    saveDailyCheckIn,
    clearDailyCheckIn,
  }
}