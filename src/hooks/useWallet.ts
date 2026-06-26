import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { arcTestnet } from "../lib/chains"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

async function forceArcInWallet() {
  if (!window.ethereum) return

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

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4cef52" }],
    })
  }
}

export function useWallet() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  const { connectAsync, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const injectedConnector =
    connectors.find((connector) => connector.id === "injected") ??
    connectors[0]

  async function connectWallet() {
    if (!injectedConnector) {
      alert("Wallet connector not found. Please refresh the page.")
      return
    }

    await forceArcInWallet()
    await connectAsync({ connector: injectedConnector })
    await forceArcInWallet()
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