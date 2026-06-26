type AdminPanelProps = {
  contractAddress: string
  chainId: number
  onchainCheckIns: number
  latestBlock: number
}

function AdminPanel({
  contractAddress,
  chainId,
  onchainCheckIns,
  latestBlock,
}: AdminPanelProps) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-500/20 bg-slate-900/60 p-7">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase text-slate-400">Contract</p>
          <p className="mt-2 break-all text-sm text-white">{contractAddress}</p>
        </div>

        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase text-slate-400">Chain ID</p>
          <p className="mt-2 text-xl font-bold text-white">{chainId}</p>
        </div>

        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase text-slate-400">Latest Block</p>
          <p className="mt-2 text-xl font-bold text-white">
            {latestBlock.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase text-slate-400">Onchain Check-ins</p>
          <p className="mt-2 text-xl font-bold text-emerald-300">
            {onchainCheckIns}
          </p>
        </div>
      </div>

      <a
        href={`https://testnet.arcscan.app/address/${contractAddress}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-600"
      >
        View Contract
      </a>
    </div>
  )
}

export default AdminPanel