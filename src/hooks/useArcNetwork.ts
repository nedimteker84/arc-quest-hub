import { formatUnits } from "viem"
import { useAccount, useBalance, useBlockNumber, useChainId } from "wagmi"

export function useArcNetwork() {
  const { address } = useAccount()

  const chainId = useChainId()

  const { data: blockNumber } = useBlockNumber({
    watch: true,
  })

  const { data: balance } = useBalance({
    address,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  })

  const walletBalance = balance
    ? Number(formatUnits(balance.value, balance.decimals)).toFixed(4)
    : "0.0000"

  return {
    chainId,
    latestBlock: blockNumber ? Number(blockNumber) : 0,
    walletBalance,
    balanceSymbol: balance?.symbol ?? "USDC",
    walletAddress: address ?? "",
  }
}