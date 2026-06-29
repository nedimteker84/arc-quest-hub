import { useEffect, useState } from "react"
import type { Quest } from "./data/quests"
import { quests } from "./data/quests"

import Header from "./components/Header"
import HeroBanner from "./components/HeroBanner"
import Dashboard from "./components/Dashboard"
import BuilderLevelCard from "./components/BuilderLevelCard"
import BuilderProfile from "./components/BuilderProfile"
import AIBuilderCoach from "./components/AIBuilderCoach"
import WeeklyAnalytics from "./components/WeeklyAnalytics"
import BuilderPassport from "./components/BuilderPassport"
import SecurityAuditPanel from "./components/SecurityAuditPanel"
import NetworkCard from "./components/NetworkCard"
import TxStatusCard from "./components/TxStatusCard"
import QuestSection from "./components/QuestSection"
import Leaderboard from "./components/Leaderboard"
import BadgePanel from "./components/BadgePanel"
import ActivityTimeline from "./components/ActivityTimeline"
import ProjectOwnership from "./components/ProjectOwnership"
import Footer from "./components/Footer"

import { useWallet } from "./hooks/useWallet"
import { useWalletVerification } from "./hooks/useWalletVerification"
import { useArcNetwork } from "./hooks/useArcNetwork"
import { useCheckInContract } from "./hooks/useCheckInContract"
import { usePassportNft } from "./hooks/usePassportNft"
import { calculateReputation } from "./lib/reputation"

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
    onchainTotalXp,
    onchainCurrentStreak,
    onchainBestStreak,
    onchainBuilderScore,
    onchainRegistered,
    leaderboardRows,
    historyRecords,
  } = useCheckInContract()

  const { passportMinted } = usePassportNft()

  const [txHash, setTxHash] = useState("")

  const walletKey = address ? address.toLowerCase() : "guest"
  const txStorageKey = `arcQuest:${walletKey}:lastTxHash`

  const {
    isWalletVerified,
    isVerifyingWallet,
    verifyWallet,
    clearWalletVerification,
  } = useWalletVerification(walletKey)

  useEffect(() => {
    const savedTxHash = localStorage.getItem(txStorageKey)
    setTxHash(savedTxHash ?? "")
  }, [txStorageKey])

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

    if (quest.id === "daily-check-in") {
      const hash = await onchainCheckIn()
      if (!hash) return

      setTxHash(hash)
      localStorage.setItem(txStorageKey, hash)
    }
  }

  function resetProgress() {
    localStorage.removeItem(txStorageKey)
    clearWalletVerification()
    setTxHash("")
  }

  const displayCompletedQuestIds = hasCheckedInTodayOnchain
    ? ["daily-check-in"]
    : []

  const completedCount = displayCompletedQuestIds.length
  const openQuestCount = quests.length - completedCount

  const reputation = calculateReputation({
    xp: onchainTotalXp,
    currentStreak: onchainCurrentStreak,
    bestStreak: onchainBestStreak,
    totalCheckIns: onchainTotalCheckIns,
    verified: isWalletVerified,
  })

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
          title="Daily Quest"
          description={
            isOnchainCheckInLoading
              ? "Onchain check-in transaction is pending..."
              : `Complete your verified onchain daily check-in. Onchain check-ins: ${onchainTotalCheckIns}`
          }
          quests={quests}
          completedQuestIds={displayCompletedQuestIds}
          onComplete={completeQuest}
        />

        <BuilderProfile
          shortAddress={shortAddress}
          totalXp={onchainTotalXp}
          builderScore={onchainBuilderScore}
          currentStreak={onchainCurrentStreak}
          bestStreak={onchainBestStreak}
          totalCheckIns={onchainTotalCheckIns}
          isConnected={isConnected}
          isRegistered={onchainRegistered}
          isVerified={isWalletVerified}
        />

        <AIBuilderCoach
          totalXp={onchainTotalXp}
          builderScore={onchainBuilderScore}
          currentStreak={onchainCurrentStreak}
          bestStreak={onchainBestStreak}
          totalCheckIns={onchainTotalCheckIns}
          reputation={reputation.score}
          hasCheckedInToday={hasCheckedInTodayOnchain}
          isConnected={isConnected}
          isVerified={isWalletVerified}
        />

        <WeeklyAnalytics
          currentStreak={onchainCurrentStreak}
          bestStreak={onchainBestStreak}
          totalCheckIns={onchainTotalCheckIns}
          totalXp={onchainTotalXp}
          builderScore={onchainBuilderScore}
          reputation={reputation.score}
        />

        <BuilderPassport
          wallet={shortAddress}
          totalXp={onchainTotalXp}
          builderScore={onchainBuilderScore}
          reputation={reputation.score}
          currentStreak={onchainCurrentStreak}
          bestStreak={onchainBestStreak}
          totalCheckIns={onchainTotalCheckIns}
        />

        <SecurityAuditPanel
          isConnected={isConnected}
          isArcNetwork={isArcNetwork}
          isWalletVerified={isWalletVerified}
          hasCheckedInToday={hasCheckedInTodayOnchain}
          passportMinted={passportMinted}
        />

        <Dashboard
          xp={onchainTotalXp}
          builderScore={onchainBuilderScore}
          currentStreak={onchainCurrentStreak}
          completedCount={completedCount}
          openQuestCount={openQuestCount}
        />

        <BuilderLevelCard builderScore={onchainBuilderScore} />

        <BadgePanel
          streak={onchainCurrentStreak}
          onchainCheckIns={onchainTotalCheckIns}
        />

        <ActivityTimeline records={historyRecords} />

        <Leaderboard rows={leaderboardRows} />

        <NetworkCard
          chainId={chainId}
          latestBlock={latestBlock}
          walletBalance={walletBalance}
          balanceSymbol={balanceSymbol}
        />

        <TxStatusCard txHash={txHash} />

        <ProjectOwnership />

        <Footer />
      </section>
    </main>
  )
}

export default App