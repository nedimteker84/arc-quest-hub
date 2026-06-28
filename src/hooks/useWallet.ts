import { useEffect, useState } from "react"
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { arcTestnet } from "../lib/chains"

const ARC_CHAIN_HEX = "0x4cef52"

type WalletProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on?: (event: string, callback: (...args: unknown[]) => void) => void
  removeListener?: (
    event: string,
    callback: (...args: unknown[]) => void,
  ) => void
}

function getProvider() {
  return (window as unknown as { ethereum?: WalletProvider }).ethereum
}

async function getWalletChainId() {
  const provider = getProvider()
  if (!provider) return 0

  const chainId = await provider.request({
    method: "eth_chainId",
  })

  return Number(chainId)
}

async function forceArcInWallet() {
  const provider = getProvider()
  if (!provider) return

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

    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_HEX }],
    })
  }
}

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const [chainId, setChainId] = useState(0)

  const injectedConnector =
    connectors.find((connector) => connector.id === "injected") ??
    connectors[0]

  useEffect(() => {
    async function syncChain() {
      const currentChainId = await getWalletChainId()
      setChainId(currentChainId)
    }

    syncChain()

    function handleChainChanged(nextChainId: unknown) {
      setChainId(Number(nextChainId))
    }

    const provider = getProvider()
    provider?.on?.("chainChanged", handleChainChanged)

    return () => {
      provider?.removeListener?.("chainChanged", handleChainChanged)
    }
  }, [])

  async function connectWallet() {
    if (!injectedConnector) {
      alert("Wallet connector not found. Please refresh the page.")
      return
    }

    await forceArcInWallet()
    await connectAsync({ connector: injectedConnector })

    const currentChainId = await getWalletChainId()
    setChainId(currentChainId)
  }

  function disconnectWallet() {
    disconnect()

    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  async function switchToArc() {
    await forceArcInWallet()

    switchChain({
      chainId: arcTestnet.id,
    })

    const currentChainId = await getWalletChainId()
    setChainId(currentChainId)
  }

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ""

  const isArcNetwork = chainId === arcTestnet.id

  return {
    address,
    shortAddress,
    chainId,
    isConnected,
    isPending,
    isArcNetwork,
    connectWallet,
    disconnectWallet,
    switchToArc,
  }
}