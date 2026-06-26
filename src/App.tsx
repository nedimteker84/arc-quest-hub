import { useEffect, useState } from "react"
import type { Quest } from "./data/quests"
import { quests } from "./data/quests"

import Header from "./components/Header"
import HeroBanner from "./components/HeroBanner"
import Dashboard from "./components/Dashboard"
import BuilderLevelCard from "./components/BuilderLevelCard"
import NetworkCard from "./components/NetworkCard"
import TxStatusCard from "./components/TxStatusCard"
import QuestSection from "./components/QuestSection"
import Leaderboard from "./components/Leaderboard"
import BadgePanel from "./components/BadgePanel"
import Footer from "./components/Footer"

import { useWallet } from "./hooks/useWallet"
import { useDailyCheckIn } from "./hooks/useDailyCheckIn"
import { useStreak } from "./hooks/useStreak"
import { useWalletVerification } from "./hooks/useWalletVerification"
import { useArcNetwork } from "./hooks/useArcNetwork"
import { useCheckInContract } from "./hooks/useCheckInContract"

function App() {
  const {
    address,
    shortAddress,
    chainId,
    isConnected,
    isPending,
    isArcNetwork,
    connectWallet,
    disconnectWallet,
    switchToArc,
  } = useWallet()

  const { latestBlock, walletBalance, balanceSymbol } = useArcNetwork()

  const {
    loading: isOnchainCheckInLoading,
    checkIn: onchainCheckIn,
    hasCheckedInTodayOnchain,
    onchainTotalCheckIns,
    leaderboardRows,
  } = useCheckInContract()

  const [xp, setXp] = useState(0)
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([])
  const [streak, setStreak] = useState(0)
  const [txHash, setTxHash] = useState("")

  const walletKey = address ? address.toLowerCase() : "guest"
  const xpStorageKey = `arcQuest:${walletKey}:xp`
  const questsStorageKey = `arcQuest:${walletKey}:completedQuestIds`
  const txStorageKey = `arcQuest:${walletKey}:lastTxHash`

  const { saveDailyCheckIn, clearDailyCheckIn } = useDailyCheckIn(walletKey)
  const { currentStreak, updateStreak, clearStreak } = useStreak(walletKey)

  const {
    isWalletVerified,
    isVerifyingWallet,
    verifyWallet,
    clearWalletVerification,
  } = useWalletVerification(walletKey)

  useEffect(() => {
    const savedXp = localStorage.getItem(xpStorageKey)
    const savedCompletedQuestIds = localStorage.getItem(questsStorageKey)
    const savedTxHash = localStorage.getItem(txStorageKey)

    setXp(savedXp ? Number(savedXp) : 0)
    setCompletedQuestIds(
      savedCompletedQuestIds ? JSON.parse(savedCompletedQuestIds) : [],
    )
    setStreak(currentStreak)
    setTxHash(savedTxHash ?? "")
  }, [xpStorageKey, questsStorageKey, txStorageKey, currentStreak])

  async function completeQuest(quest: Quest) {
    if (!isConnected) {
      alert("Please connect your wallet first.")
      return
    }

    if (!isArcNetwork) {
      alert("Please switch to Arc Testnet first.")
      return
    }

    if (!isWalletVerified) {
      alert("Please verify your wallet first.")
      return
    }

    if (isOnchainCheckInLoading) return

    if (quest.id === "daily-check-in" && hasCheckedInTodayOnchain) {
      alert("Daily Check In already completed onchain today.")
      return
    }

    if (quest.id !== "daily-check-in" && completedQuestIds.includes(quest.id)) {
      return
    }

    if (quest.id === "daily-check-in") {
      const hash = await onchainCheckIn()
      if (!hash) return

      setTxHash(hash)
      localStorage.setItem(txStorageKey, hash)

      saveDailyCheckIn()
      const newStreak = updateStreak()
      setStreak(newStreak)
    }

    const newXp = xp + quest.xp

    const newCompletedQuestIds =
      quest.id === "daily-check-in"
        ? completedQuestIds
        : [...completedQuestIds, quest.id]

    setXp(newXp)
    setCompletedQuestIds(newCompletedQuestIds)

    localStorage.setItem(xpStorageKey, String(newXp))
    localStorage.setItem(questsStorageKey, JSON.stringify(newCompletedQuestIds))
  }

  function resetProgress() {
    localStorage.removeItem(xpStorageKey)
    localStorage.removeItem(questsStorageKey)
    localStorage.removeItem(txStorageKey)

    clearDailyCheckIn()
    clearStreak()
    clearWalletVerification()

    setXp(0)
    setCompletedQuestIds([])
    setStreak(0)
    setTxHash("")
  }

  const displayCompletedQuestIds = hasCheckedInTodayOnchain
    ? [...completedQuestIds, "daily-check-in"]
    : completedQuestIds

  const completedCount = displayCompletedQuestIds.length
  const openQuestCount = quests.length - completedCount
  const builderScore =
    xp + completedCount * 10 + streak * 25 + onchainTotalCheckIns * 15

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-8 py-8">
        <Header
          shortAddress={shortAddress}
          chainId={chainId}
          isConnected={isConnected}
          isPending={isPending}
          isArcNetwork={isArcNetwork}
          isWalletVerified={isWalletVerified}
          isVerifyingWallet={isVerifyingWallet}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          onSwitchToArc={switchToArc}
          onVerifyWallet={verifyWallet}
          onReset={resetProgress}
        />

        <HeroBanner />

        <QuestSection
          title="Daily Quests"
          description={
            isOnchainCheckInLoading
              ? "Onchain check-in transaction is pending..."
              : `Start with GM, GN or your onchain daily check-in. Onchain check-ins: ${onchainTotalCheckIns}`
          }
          quests={quests}
          completedQuestIds={displayCompletedQuestIds}
          onComplete={completeQuest}
        />

        <Dashboard
          xp={xp}
          builderScore={builderScore}
          currentStreak={streak}
          completedCount={completedCount}
          openQuestCount={openQuestCount}
        />

        <BuilderLevelCard builderScore={builderScore} />

        <BadgePanel streak={streak} onchainCheckIns={onchainTotalCheckIns} />

        <Leaderboard rows={leaderboardRows} />

        <NetworkCard
          chainId={chainId}
          latestBlock={latestBlock}
          walletBalance={walletBalance}
          balanceSymbol={balanceSymbol}
        />

        <TxStatusCard txHash={txHash} />

        <Footer />
      </section>
    </main>
  )
}

export default App