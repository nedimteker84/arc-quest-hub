import { useEffect, useState } from "react"
import { createPublicClient, http, isAddress } from "viem"
import { arcTestnet } from "../lib/chains"

const ARC_QUEST_HUB_ADDRESS =
  "0x9c4A47D7Ea291905393Fef8878E2322138968bDE" as const

const ABI = [
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
] as const

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
})

export type PublicBuilderProfile = {
  wallet: string
  totalCheckIns: number
  totalXp: number
  currentStreak: number
  bestStreak: number
  builderScore: number
  joinedAt: number
  registered: boolean
}

export function usePublicBuilderProfile() {
  const [profile, setProfile] = useState<PublicBuilderProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const params = new URLSearchParams(window.location.search)
      const builder = params.get("builder")

      if (!builder || !isAddress(builder)) {
        setProfile(null)
        return
      }

      setLoading(true)

      try {
        const result = await publicClient.readContract({
          address: ARC_QUEST_HUB_ADDRESS,
          abi: ABI,
          functionName: "getStats",
          args: [builder],
        })

        setProfile({
          wallet: builder,
          totalCheckIns: Number(result[0]),
          totalXp: Number(result[1]),
          currentStreak: Number(result[2]),
          bestStreak: Number(result[3]),
          builderScore: Number(result[5]),
          joinedAt: Number(result[6]),
          registered: result[7],
        })
      } catch {
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  return {
    profile,
    loading,
  }
}