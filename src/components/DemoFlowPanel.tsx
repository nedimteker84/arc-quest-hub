type DemoFlowPanelProps = {
  isConnected: boolean
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
  txHash: string
}

function DemoFlowPanel({
  isConnected,
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
  txHash,
}: DemoFlowPanelProps) {
  const steps = [
    {
      title: "Connect Wallet",
      description: "User connects wallet and becomes identifiable on Arc Testnet.",
      done: isConnected,
    },
    {
      title: "Verify Builder Identity",
      description: "Wallet verification prepares the account for quests.",
      done: isWalletVerified,
    },
    {
      title: "Complete Onchain Check-in",
      description: "Daily activity is written to the Arc Quest Hub contract.",
      done: hasCheckedInToday,
    },
    {
      title: "Generate Builder Passport",
      description: "XP, score, reputation and streaks become a portable identity.",
      done: hasCheckedInToday,
    },
    {
      title: "Mint Passport NFT",
      description: "The builder identity is minted with IPFS metadata.",
      done: passportMinted,
    },
    {
      title: "Verify Transaction",
      description: "Latest onchain action can be opened in ARC Explorer.",
      done: Boolean(txHash),
    },
  ]

  const completed = steps.filter((step) => step.done).length

  return (
    <section className="mt-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-slate-900 to-cyan-950/20 p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-purple-300">
            ARC Demo Flow
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Presentation Readiness
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            A clear walkthrough for showing Arc Quest Hub to the ARC team from
            wallet connection to onchain proof and Passport NFT.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Demo Progress</p>

          <p className="mt-1 text-4xl font-black text-purple-300">
            {completed}/{steps.length}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={
              step.done
                ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"
                : "rounded-2xl border border-white/10 bg-slate-950 p-5"
            }
          >
            <div className="flex items-start gap-3">
              <div
                className={
                  step.done
                    ? "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 font-black text-black"
                    : "flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 font-black text-slate-400"
                }
              >
                {step.done ? "✓" : index + 1}
              </div>

              <div>
                <p className="font-black text-white">{step.title}</p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DemoFlowPanel