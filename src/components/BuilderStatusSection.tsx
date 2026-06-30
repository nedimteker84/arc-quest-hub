import SecurityAuditPanel from "./SecurityAuditPanel"
import BadgePanel from "./BadgePanel"
import ActivityTimeline from "./ActivityTimeline"
import Leaderboard from "./Leaderboard"
import NetworkCard from "./NetworkCard"
import TransactionStatus from "./TransactionStatus"
import DemoFlowPanel from "./DemoFlowPanel"
import ProjectOwnership from "./ProjectOwnership"
import type {
  CheckInHistoryRecord,
  LeaderboardRow,
} from "../hooks/useCheckInContract"

type BuilderStatusSectionProps = {
  isConnected: boolean
  isArcNetwork: boolean
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
  passportTokenId: number
  passportTokenUri: string
  currentStreak: number
  totalCheckIns: number
  leaderboardRows: LeaderboardRow[]
  historyRecords: CheckInHistoryRecord[]
  chainId: number
  latestBlock: number
  walletBalance: string
  balanceSymbol: string
  txHash: string
}

function BuilderStatusSection({
  isConnected,
  isArcNetwork,
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
  passportTokenId,
  passportTokenUri,
  currentStreak,
  totalCheckIns,
  leaderboardRows,
  historyRecords,
  chainId,
  latestBlock,
  walletBalance,
  balanceSymbol,
  txHash,
}: BuilderStatusSectionProps) {
  return (
    <>
      <SecurityAuditPanel
        isConnected={isConnected}
        isArcNetwork={isArcNetwork}
        isWalletVerified={isWalletVerified}
        hasCheckedInToday={hasCheckedInToday}
        passportMinted={passportMinted}
        passportTokenId={passportTokenId}
        passportTokenUri={passportTokenUri}
      />

      <DemoFlowPanel
        isConnected={isConnected}
        isWalletVerified={isWalletVerified}
        hasCheckedInToday={hasCheckedInToday}
        passportMinted={passportMinted}
        txHash={txHash}
      />

      <BadgePanel
        streak={currentStreak}
        onchainCheckIns={totalCheckIns}
      />

      <ActivityTimeline records={historyRecords} />

      <Leaderboard rows={leaderboardRows} />

      <NetworkCard
        chainId={chainId}
        latestBlock={latestBlock}
        walletBalance={walletBalance}
        balanceSymbol={balanceSymbol}
      />

      <TransactionStatus txHash={txHash} />

      <ProjectOwnership />
    </>
  )
}

export default BuilderStatusSection