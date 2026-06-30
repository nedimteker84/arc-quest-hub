type LaunchChecklistPanelProps = {
  isConnected: boolean
  isArcNetwork: boolean
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
  txHash: string
}

function LaunchChecklistPanel({
  isConnected,
  isArcNetwork,
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
  txHash,
}: LaunchChecklistPanelProps) {
  const items = [
    ["Wallet Connect", isConnected],
    ["Arc Testnet", isArcNetwork],
    ["Wallet Verify", isWalletVerified],
    ["Onchain Check-in", hasCheckedInToday],
    ["Passport NFT", passportMinted],
    ["Explorer Transaction", Boolean(txHash)],
  ]

  const completed = items.filter((item) => item[1]).length

  return (
    <section className="mt-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
            Launch Checklist
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            ARC Presentation Readiness
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Final live checklist before presenting Arc Quest Hub as an onchain
            builder identity and quest product for Arc Testnet.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Ready</p>
          <p className="mt-1 text-4xl font-black text-emerald-300">
            {completed}/{items.length}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([label, done]) => (
          <div
            key={String(label)}
            className={
              done
                ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"
                : "rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5"
            }
          >
            <p
              className={
                done
                  ? "font-black text-emerald-300"
                  : "font-black text-yellow-300"
              }
            >
              {done ? "✅" : "⚠️"} {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LaunchChecklistPanel