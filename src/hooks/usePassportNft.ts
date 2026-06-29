import { useEffect, useState } from "react"
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
] as const

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
})

export function usePassportNft() {
  const { address } = useAccount()

  const [passportMinted, setPassportMinted] = useState(false)
  const [passportTokenId, setPassportTokenId] = useState(0)
  const [passportLoading, setPassportLoading] = useState(false)

  useEffect(() => {
    async function loadPassportNft() {
      if (!address) {
        setPassportMinted(false)
        setPassportTokenId(0)
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

        if (hasMinted) {
          const tokenId = await publicClient.readContract({
            address: PASSPORT_NFT_ADDRESS,
            abi: PASSPORT_NFT_ABI,
            functionName: "tokenIdOf",
            args: [address],
          })

          setPassportTokenId(Number(tokenId))
        } else {
          setPassportTokenId(0)
        }
      } catch (error) {
        console.error("Failed to load Passport NFT:", error)
        setPassportMinted(false)
        setPassportTokenId(0)
      } finally {
        setPassportLoading(false)
      }
    }

    loadPassportNft()
  }, [address])

  return {
    passportMinted,
    passportTokenId,
    passportLoading,
  }
}