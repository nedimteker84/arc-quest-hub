type NetworkCardProps = {
  chainId: number
  latestBlock: number
  walletBalance: string
  balanceSymbol: string
}

function NetworkCard({
  chainId,
  latestBlock,
  walletBalance,
  balanceSymbol,
}: NetworkCardProps) {
  return (
    <div className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-950/20 p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="text-4xl">🌐</div>

        <div>
          <h2 className="text-2xl font-bold text-blue-300">
            Arc Network
          </h2>

          <p className="text-sm text-slate-400">
            Live Testnet Information
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Latest Block
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {latestBlock.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Wallet Balance
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {walletBalance} {balanceSymbol}
          </p>
        </div>

        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Chain ID
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {chainId}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NetworkCard