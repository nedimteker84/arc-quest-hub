import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { arcTestnet } from "../lib/chains"

export function useWallet() {
  const { address, isConnected } = useAccount()

  const chainId = useChainId()

  const { connect, connectors, isPending } = useConnect()

  const { disconnect } = useDisconnect()

  const { switchChain } = useSwitchChain()

  const injectedConnector = connectors[0]

  function connectWallet() {
    if (!injectedConnector) return
    connect({ connector: injectedConnector })
  }

  function disconnectWallet() {
    disconnect()
  }

  function switchToArc() {
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