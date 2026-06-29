import { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { createPublicClient, http } from "viem"
import { arcTestnet } from "../lib/chains"

export const PASSPORT_NFT_ADDRESS =
  "0xD7c13571F3DC037B23F484005D407F59D7Ae49Be" as const

export const PASSPORT_NFT_ABI = [
  {
    type: "function",
    name: "hasMinted",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "tokenIdOf",
    stateMutability: "view",
    inputs: [{ name: "builder", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
})

export function usePassportNft() {
  const { address } = useAccount()

  const [passportMinted, setPassportMinted] = useState(false)
  const [passportTokenId, setPassportTokenId] = useState(0)
  const [passportTokenUri, setPassportTokenUri] = useState("")
  const [passportLoading, setPassportLoading] = useState(false)

  const refreshPassportNft = useCallback(async () => {
    if (!address) {
      setPassportMinted(false)
      setPassportTokenId(0)
      setPassportTokenUri("")
      setPassportLoading(false)
      return
    }

    setPassportLoading(true)

    try {
      const hasMinted = await publicClient.readContract({
        address: PASSPORT_NFT_ADDRESS,
        abi: PASSPORT_NFT_ABI,
        functionName: "hasMinted",
        args: [address],
      })

      setPassportMinted(hasMinted)

      if (!hasMinted) {
        setPassportTokenId(0)
        setPassportTokenUri("")
        return
      }

      const tokenId = await publicClient.readContract({
        address: PASSPORT_NFT_ADDRESS,
        abi: PASSPORT_NFT_ABI,
        functionName: "tokenIdOf",
        args: [address],
      })

      const numericTokenId = Number(tokenId)

      setPassportTokenId(numericTokenId)

      const tokenUri = await publicClient.readContract({
        address: PASSPORT_NFT_ADDRESS,
        abi: PASSPORT_NFT_ABI,
        functionName: "tokenURI",
        args: [BigInt(numericTokenId)],
      })

      setPassportTokenUri(tokenUri)
    } catch (error) {
      console.error("Failed to load Passport NFT:", error)
      setPassportMinted(false)
      setPassportTokenId(0)
      setPassportTokenUri("")
    } finally {
      setPassportLoading(false)
    }
  }, [address])

  useEffect(() => {
    refreshPassportNft()
  }, [refreshPassportNft])

  return {
    passportMinted,
    passportTokenId,
    passportTokenUri,
    passportLoading,
    refreshPassportNft,
  }
}