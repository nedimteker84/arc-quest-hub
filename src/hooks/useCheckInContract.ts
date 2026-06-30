import { useCallback, useEffect, useState } from "react"
import { createPublicClient, http } from "viem"
import { useAccount, useWriteContract } from "wagmi"
import { arcTestnet } from "../lib/chains"
import { ARC_TESTNET, CONTRACTS } from "../lib/config"

const CONTRACT_ADDRESS = CONTRACTS.arcQuestHub
const ARC_CHAIN_HEX = `0x${ARC_TESTNET.id.toString(16)}`

type WalletProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

type BuilderStats = {
  totalCheckIns: number
  totalXp: number
  currentStreak: number
  bestStreak: number
  lastCheckInDay: number
  builderScore: number
  joinedAt: number
  registered: boolean
}

export type LeaderboardRow = {
  rank: number
  wallet: string
  score: number
  streak: number
  checkIns: number
  isYou?: boolean
}

export type CheckInHistoryRecord = {
  day: number
  timestamp: number
  blockNumber: number
  xpEarned: number
  totalXpAfter: number
  streakAfter: number
  builderScoreAfter: number
}

const ARC_QUEST_HUB_ABI = [
  {
    type: "function",
    name: "checkIn",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "getStats",
    stateMutability: "view",
    inputs: [{ name: "builder", type: "address" }],
    outputs: [
      { name: "totalCheckIns", type: "uint256" },
      { name: "totalXp", type: "uint256" },
      { name: "currentStreak", type: "uint256" },
      { name: "bestStreak", type: "uint256" },
      { name: "lastCheckInDay", type: "uint256" },
      { name: "builderScore", type: "uint256" },
      { name: "joinedAt", type: "uint256" },
      { name: "registered", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "hasCheckedInToday",
    stateMutability: "view",
    inputs: [{ name: "builder", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "getBuilderCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "getBuilderAt",
    stateMutability: "view",
    inputs: [{ name: "index", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "getHistoryLength",
    stateMutability: "view",
    inputs: [{ name: "builder", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "getHistoryRecord",
    stateMutability: "view",
    inputs: [
      { name: "builder", type: "address" },
      { name: "index", type: "uint256" },
    ],
    outputs: [
      { name: "day", type: "uint256" },
      { name: "timestamp", type: "uint256" },
      { name: "blockNumber", type: "uint256" },
      { name: "xpEarned", type: "uint256" },
      { name: "totalXpAfter", type: "uint256" },
      { name: "streakAfter", type: "uint256" },
      { name: "builderScoreAfter", type: "uint256" },
    ],
  },
] as const

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http(ARC_TESTNET.rpcUrl),
})

function getProvider() {
  return (window as unknown as { ethereum?: WalletProvider }).ethereum
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return "Unknown transaction error."
}

function shortWallet(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function toNumber(value: bigint) {
  return Number(value)
}

function emptyStats(): BuilderStats {
  return {
    totalCheckIns: 0,
    totalXp: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastCheckInDay: 0,
    builderScore: 0,
    joinedAt: 0,
    registered: false,
  }
}

async function forceSwitchToArcTestnet() {
  const provider = getProvider()

  if (!provider) {
    throw new Error("Wallet provider not found.")
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_HEX }],
    })
  } catch {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: ARC_CHAIN_HEX,
          chainName: ARC_TESTNET.name,
          nativeCurrency: {
            name: "USDC",
            symbol: "USDC",
            decimals: 18,
          },
          rpcUrls: [ARC_TESTNET.rpcUrl],
          blockExplorerUrls: [ARC_TESTNET.explorerUrl],
        },
      ],
    })

    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_HEX }],
    })
  }
}

export function useCheckInContract() {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<BuilderStats>(emptyStats())
  const [hasCheckedInTodayOnchain, setHasCheckedInTodayOnchain] =
    useState(false)
  const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>([])
  const [historyRecords, setHistoryRecords] = useState<CheckInHistoryRecord[]>(
    [],
  )

  const loadBuilderStats = useCallback(async () => {
    if (!address) {
      setStats(emptyStats())
      setHasCheckedInTodayOnchain(false)
      setHistoryRecords([])
      return
    }

    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ARC_QUEST_HUB_ABI,
        functionName: "getStats",
        args: [address],
      })

      setStats({
        totalCheckIns: toNumber(result[0]),
        totalXp: toNumber(result[1]),
        currentStreak: toNumber(result[2]),
        bestStreak: toNumber(result[3]),
        lastCheckInDay: toNumber(result[4]),
        builderScore: toNumber(result[5]),
        joinedAt: toNumber(result[6]),
        registered: result[7],
      })

      const checkedToday = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ARC_QUEST_HUB_ABI,
        functionName: "hasCheckedInToday",
        args: [address],
      })

      setHasCheckedInTodayOnchain(checkedToday)
    } catch (error) {
      console.error("Failed to load builder stats:", error)
      setStats(emptyStats())
      setHasCheckedInTodayOnchain(false)
    }
  }, [address])

  const loadHistory = useCallback(async () => {
    if (!address) {
      setHistoryRecords([])
      return
    }

    try {
      const length = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ARC_QUEST_HUB_ABI,
        functionName: "getHistoryLength",
        args: [address],
      })

      const totalRecords = Number(length)
      const maxRecords = 5
      const startIndex = Math.max(0, totalRecords - maxRecords)
      const records: CheckInHistoryRecord[] = []

      for (let index = totalRecords - 1; index >= startIndex; index -= 1) {
        const record = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ARC_QUEST_HUB_ABI,
          functionName: "getHistoryRecord",
          args: [address, BigInt(index)],
        })

        records.push({
          day: toNumber(record[0]),
          timestamp: toNumber(record[1]),
          blockNumber: toNumber(record[2]),
          xpEarned: toNumber(record[3]),
          totalXpAfter: toNumber(record[4]),
          streakAfter: toNumber(record[5]),
          builderScoreAfter: toNumber(record[6]),
        })
      }

      setHistoryRecords(records)
    } catch (error) {
      console.error("Failed to load builder history:", error)
      setHistoryRecords([])
    }
  }, [address])

  const loadLeaderboard = useCallback(async () => {
    try {
      const count = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ARC_QUEST_HUB_ABI,
        functionName: "getBuilderCount",
      })

      const builderCount = Math.min(Number(count), 20)
      const rows: LeaderboardRow[] = []

      for (let index = 0; index < builderCount; index += 1) {
        const builderAddress = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ARC_QUEST_HUB_ABI,
          functionName: "getBuilderAt",
          args: [BigInt(index)],
        })

        const builderStats = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ARC_QUEST_HUB_ABI,
          functionName: "getStats",
          args: [builderAddress],
        })

        rows.push({
          rank: 0,
          wallet: shortWallet(builderAddress),
          score: toNumber(builderStats[5]),
          streak: toNumber(builderStats[2]),
          checkIns: toNumber(builderStats[0]),
          isYou: address?.toLowerCase() === builderAddress.toLowerCase(),
        })
      }

      setLeaderboardRows(
        rows
          .sort((a, b) => b.score - a.score)
          .map((row, index) => ({
            ...row,
            rank: index + 1,
          })),
      )
    } catch (error) {
      console.error("Failed to load leaderboard:", error)
      setLeaderboardRows([])
    }
  }, [address])

  const refresh = useCallback(async () => {
    await loadBuilderStats()
    await loadHistory()
    await loadLeaderboard()
  }, [loadBuilderStats, loadHistory, loadLeaderboard])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function checkIn() {
    if (!address) {
      alert("Wallet not connected.")
      return ""
    }

    setLoading(true)

    try {
      await forceSwitchToArcTestnet()

      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ARC_QUEST_HUB_ABI,
        functionName: "checkIn",
        account: address,
        chainId: ARC_TESTNET.id,
      })

      await publicClient.waitForTransactionReceipt({ hash })

      await refresh()

      return hash
    } catch (error) {
      console.error("Onchain Check In failed:", error)
      alert(getErrorMessage(error))
      return ""
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    checkIn,
    refresh,

    hasCheckedInTodayOnchain,
    onchainTotalCheckIns: stats.totalCheckIns,
    onchainTotalXp: stats.totalXp,
    onchainCurrentStreak: stats.currentStreak,
    onchainBestStreak: stats.bestStreak,
    onchainBuilderScore: stats.builderScore,
    onchainLastCheckInDay: stats.lastCheckInDay,
    onchainJoinedAt: stats.joinedAt,
    onchainRegistered: stats.registered,

    leaderboardRows,
    historyRecords,
  }
}