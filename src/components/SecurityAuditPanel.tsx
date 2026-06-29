type SecurityAuditPanelProps = {
  isConnected: boolean
  isArcNetwork: boolean
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
}

function SecurityAuditPanel({
  isConnected,
  isArcNetwork,
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
}: SecurityAuditPanelProps) {
  const checks = [
    {
      title: "Wallet connection",
      description: "User identity is read from the connected wallet only.",
      passed: isConnected,
    },
    {
      title: "Arc Testnet guard",
      description: "Quest and mint flows require the Arc Testnet network.",
      passed: isArcNetwork,
    },
    {
      title: "Wallet verification",
      description: "Daily activity requires local wallet verification.",
      passed: isWalletVerified,
    },
    {
      title: "Onchain activity gate",
      description: "Passport NFT mint unlocks only after verified onchain activity.",
      passed: hasCheckedInToday,
    },
    {
      title: "One-passport mint rule",
      description: "The NFT contract prevents the same wallet from minting twice.",
      passed: passportMinted,
    },
  ]

  const passedCount = checks.filter((check) => check.passed).length
  const score = Math.round((passedCount / checks.length) * 100)

  return (
    <section className="mt-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-cyan-950/20 p-7 shadow-2xl shadow-emerald-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
            Security Audit
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Builder Safety Layer
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            A live checklist for wallet safety, network validation, onchain
            eligibility and duplicate-mint protection.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Safety Score</p>

          <p className="mt-1 text-4xl font-black text-emerald-300">
            {score}%
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {checks.map((check) => (
          <div
            key={check.title}
            className={
              check.passed
                ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"
                : "rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5"
            }
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">
                {check.passed ? "✅" : "⚠️"}
              </span>

              <div>
                <p
                  className={
                    check.passed
                      ? "font-black text-emerald-300"
                      : "font-black text-yellow-300"
                  }
                >
                  {check.title}
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {check.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-5">
        <p className="text-sm font-bold text-white">
          Wallet Safety Notes
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Arc Quest Hub never asks for private keys, seed phrases or wallet
          secrets. All sensitive metadata upload credentials stay server-side.
          Users only sign explicit wallet actions.
        </p>
      </div>
    </section>
  )
}

export default SecurityAuditPanel