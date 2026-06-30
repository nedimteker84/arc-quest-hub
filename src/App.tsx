import { useEffect, useState } from "react"
import type { Quest } from "./data/quests"
import { quests } from "./data/quests"

import Header from "./components/Header"
import HeroBanner from "./components/HeroBanner"
import BuilderProfile from "./components/BuilderProfile"
import BuilderProgressSection from "./components/BuilderProgressSection"
import BuilderStatusSection from "./components/BuilderStatusSection"
import PublicBuilderProfile from "./components/PublicBuilderProfile"
import QuestSection from "./components/QuestSection"
import Footer from "./components/Footer"
import { ToastProvider } from "./components/ToastProvider"

import { useWallet } from "./hooks/useWallet"
import { useWalletVerification } from "./hooks/useWalletVerification"
import { useArcNetwork } from "./hooks/useArcNetwork"
import { useCheckInContract } from "./hooks/useCheckInContract"
import { usePassportNft } from "./hooks/usePassportNft"
import { usePublicBuilderProfile } from "./hooks/usePublicBuilderProfile"
import { calculateReputation } from "./lib/reputation"
import { getAchievements } from "./lib/achievements"

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

  const { passportMinted, passportTokenId, passportTokenUri } = usePassportNft()

  const {
    profile: publicProfile,
    loading: publicProfileLoading,
  } = usePublicBuilderProfile()

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

  const achievements = getAchievements({
    totalXp: onchainTotalXp,
    builderScore: onchainBuilderScore,
    reputation: reputation.score,
    currentStreak: onchainCurrentStreak,
    bestStreak: onchainBestStreak,
    totalCheckIns: onchainTotalCheckIns,
    isVerified: isWalletVerified,
    passportMinted,
  })

  return (
    <ToastProvider>
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

          <PublicBuilderProfile
            profile={publicProfile}
            loading={publicProfileLoading}
          />

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

          <BuilderProgressSection
            wallet={address ?? shortAddress}
            totalXp={onchainTotalXp}
            builderScore={onchainBuilderScore}
            currentStreak={onchainCurrentStreak}
            bestStreak={onchainBestStreak}
            totalCheckIns={onchainTotalCheckIns}
            reputation={reputation.score}
            hasCheckedInToday={hasCheckedInTodayOnchain}
            isConnected={isConnected}
            isVerified={isWalletVerified}
            passportMinted={passportMinted}
            completedCount={completedCount}
            openQuestCount={openQuestCount}
            achievements={achievements}
          />

          <BuilderStatusSection
            isConnected={isConnected}
            isArcNetwork={isArcNetwork}
            isWalletVerified={isWalletVerified}
            hasCheckedInToday={hasCheckedInTodayOnchain}
            passportMinted={passportMinted}
            passportTokenId={passportTokenId}
            passportTokenUri={passportTokenUri}
            currentStreak={onchainCurrentStreak}
            totalCheckIns={onchainTotalCheckIns}
            leaderboardRows={leaderboardRows}
            historyRecords={historyRecords}
            chainId={chainId ?? 0}
            latestBlock={latestBlock}
            walletBalance={walletBalance}
            balanceSymbol={balanceSymbol}
            txHash={txHash}
          />

          <Footer />
        </section>
      </main>
    </ToastProvider>
  )
}

export default App