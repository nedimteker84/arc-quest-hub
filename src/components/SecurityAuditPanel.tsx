type SecurityAuditPanelProps = {
  isConnected: boolean
  isArcNetwork: boolean
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
  passportTokenId: number
  passportTokenUri: string
}

function SecurityAuditPanel({
  isConnected,
  isArcNetwork,
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
  passportTokenId,
  passportTokenUri,
}: SecurityAuditPanelProps) {
  const explorerUrl =
    passportTokenId > 0
      ? `https://testnet.arcscan.app/token/0xD7c13571F3DC037B23F484005D407F59D7Ae49Be/instance/${passportTokenId}`
      : "https://testnet.arcscan.app/address/0xD7c13571F3DC037B23F484005D407F59D7Ae49Be"

  const gatewayUrl = passportTokenUri.startsWith("ipfs://")
    ? passportTokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
    : passportTokenUri

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
      title: "Passport NFT status",
      description: passportMinted
        ? `Passport NFT detected. Token ID ${passportTokenId}.`
        : "This wallet has not minted a Passport NFT yet.",
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
            eligibility, IPFS metadata flow and duplicate-mint protection.
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
              <span className="text-xl">{check.passed ? "✅" : "⚠️"}</span>

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

      {passportMinted && (
        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <p className="text-sm font-black text-cyan-300">
            Passport NFT Details
          </p>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <InfoBox title="Token ID" value={passportTokenId} />

            <InfoBox
              title="Metadata"
              value={passportTokenUri ? "IPFS metadata linked" : "Loading"}
            />

            <button
              type="button"
              className="rounded-xl border border-cyan-400/30 px-4 py-3 text-sm font-bold text-cyan-300 hover:bg-cyan-400/10"
              onClick={() => window.open(explorerUrl, "_blank")}
            >
              Open NFT Explorer
            </button>
          </div>

          {gatewayUrl && (
            <button
              type="button"
              className="mt-4 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10"
              onClick={() => window.open(gatewayUrl, "_blank")}
            >
              Open IPFS Metadata
            </button>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SecurityNote
          title="No private keys"
          text="The app never asks for private keys, seed phrases, wallet secrets or recovery phrases."
        />

        <SecurityNote
          title="Server-side IPFS"
          text="Pinata credentials stay on the server through Vercel Environment Variables."
        />

        <SecurityNote
          title="Explicit signatures"
          text="Users only approve visible wallet actions such as check-in and Passport NFT mint."
        />
      </div>
    </section>
  )
}

function InfoBox({
  title,
  value,
}: {
  title: string
  value: number | string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>

      <p className="mt-2 break-all text-sm font-black text-white">{value}</p>
    </div>
  )
}

function SecurityNote({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
      <p className="text-sm font-black text-white">{title}</p>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  )
}

export default SecurityAuditPanel