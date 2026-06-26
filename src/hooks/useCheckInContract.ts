import { useEffect, useState } from "react"
import { createPublicClient, http, parseAbiItem } from "viem"
import { useAccount, useWriteContract } from "wagmi"
import { arcTestnet } from "../lib/chains"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

const CONTRACT_ADDRESS =
  "0x4A37492539270A97c44F90DFc889EA742DF68497" as const

const CONTRACT_DEPLOY_BLOCK = 48700000n

const CHECK_IN_ABI = [
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
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "totalCheckIns", type: "uint256" },
      { name: "lastCheckInDay", type: "uint256" },
    ],
  },
] as const

export type LeaderboardRow = {
  rank: number
  wallet: string
  score: number
  streak: number
  checkIns: number
  isYou: boolean
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return "Unknown transaction error."
}

function getCurrentUtcDay() {
  return Math.floor(Date.now() / 1000 / 86400)
}

async function forceSwitchToArcTestnet() {
  if (!window.ethereum) throw new Error("Wallet provider not found.")

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4cef52" }],
    })
  } catch {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x4cef52",
          chainName: "Arc Testnet",
          nativeCurrency: {
            name: "USDC",
            symbol: "USDC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.testnet.arc.network"],
          blockExplorerUrls: ["https://testnet.arcscan.app"],
        },
      ],
    })
  }
}

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
})

export function useCheckInContract() {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const [loading, setLoading] = useState(false)
  const [onchainTotalCheckIns, setOnchainTotalCheckIns] = useState(0)
  const [onchainLastCheckInDay, setOnchainLastCheckInDay] = useState(0)
  const [hasCheckedInTodayOnchain, setHasCheckedInTodayOnchain] =
    useState(false)
  const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>([])

  async function refreshLeaderboard(currentTotal = 0) {
    const map = new Map<string, number>()

    try {
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: parseAbiItem(
          "event CheckedIn(address indexed user, uint256 indexed day, uint256 totalCheckIns)",
        ),
        fromBlock: CONTRACT_DEPLOY_BLOCK,
        toBlock: "latest",
      })

      for (const log of logs) {
        const user = String(log.args.user).toLowerCase()
        const total = Number(log.args.totalCheckIns ?? 0)
        map.set(user, Math.max(map.get(user) ?? 0, total))
      }
    } catch (error) {
      console.error("Failed to read leaderboard logs:", error)
    }

    if (address && currentTotal > 0) {
      const you = address.toLowerCase()
      map.set(you, Math.max(map.get(you) ?? 0, currentTotal))
    }

    const rows = Array.from(map.entries())
      .map(([wallet, checkIns]) => ({
        wallet,
        checkIns,
        score: checkIns * 15,
        streak: checkIns > 0 ? 1 : 0,
        isYou: address ? wallet === address.toLowerCase() : false,
      }))
      .sort((a, b) => b.score - a.score)
      .map((row, index) => ({
        rank: index + 1,
        ...row,
      }))

    setLeaderboardRows(rows)
  }

  async function refreshOnchainStats() {
    if (!address) {
      setOnchainTotalCheckIns(0)
      setOnchainLastCheckInDay(0)
      setHasCheckedInTodayOnchain(false)
      setLeaderboardRows([])
      return
    }

    try {
      const [totalCheckIns, lastCheckInDay] = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CHECK_IN_ABI,
        functionName: "getStats",
        args: [address],
      })

      const total = Number(totalCheckIns)
      const lastDay = Number(lastCheckInDay)
      const today = getCurrentUtcDay()

      setOnchainTotalCheckIns(total)
      setOnchainLastCheckInDay(lastDay)
      setHasCheckedInTodayOnchain(lastDay === today)

      await refreshLeaderboard(total)
    } catch (error) {
      console.error("Failed to read onchain stats:", error)
    }
  }

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
        abi: CHECK_IN_ABI,
        functionName: "checkIn",
        account: address,
        chainId: arcTestnet.id,
      })

      await publicClient.waitForTransactionReceipt({ hash })

      const walletKey = address.toLowerCase()
      localStorage.setItem(`arcQuest:${walletKey}:lastTxHash`, hash)

      await refreshOnchainStats()

      return hash
    } catch (error) {
      console.error("Onchain Check In failed:", error)
      alert(getErrorMessage(error))
      return ""
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshOnchainStats()
  }, [address])

  return {
    loading,
    checkIn,
    refreshOnchainStats,
    onchainTotalCheckIns,
    onchainLastCheckInDay,
    hasCheckedInTodayOnchain,
    leaderboardRows,
  }
}