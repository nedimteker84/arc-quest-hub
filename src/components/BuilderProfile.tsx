type BuilderProfileProps = {
  shortAddress: string
  totalXp: number
  builderScore: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  isConnected: boolean
  isRegistered: boolean
}

function getBuilderLevel(score: number) {
  if (score >= 1000) return "Level 5 • Legend Builder"
  if (score >= 500) return "Level 4 • Elite Builder"
  if (score >= 250) return "Level 3 • Core Builder"
  if (score >= 100) return "Level 2 • Active Builder"
  if (score >= 50) return "Level 1 • New Builder"
  return "Level 0 • Starter Builder"
}

function getReputation(score: number, checkIns: number) {
  return Math.min(100, score + checkIns * 5)
}

function BuilderProfile({
  shortAddress,
  totalXp,
  builderScore,
  currentStreak,
  bestStreak,
  totalCheckIns,
  isConnected,
  isRegistered,
}: BuilderProfileProps) {
  if (!isConnected) return null

  const level = getBuilderLevel(builderScore)
  const reputation = getReputation(builderScore, totalCheckIns)

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-purple-950/20 p-7 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
            Builder Identity
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Verified Builder
          </h2>

          <p className="mt-2 max-w-2xl text-slate-400">
            Onchain identity profile for {shortAddress}. XP, streak, check-ins
            and score are read from the Arc Quest Hub V1.1 contract.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-7 py-5 text-center">
          <p className="text-sm text-slate-400">Builder Score</p>
          <p className="mt-1 text-5xl font-black text-cyan-300">
            {builderScore}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Wallet</p>
          <p className="mt-2 font-black text-white">{shortAddress}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Level</p>
          <p className="mt-2 font-black text-purple-300">{level}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Total XP</p>
          <p className="mt-2 text-2xl font-black text-purple-300">
            {totalXp}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Reputation</p>
          <p className="mt-2 text-2xl font-black text-emerald-300">
            {reputation}/100
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Current Streak</p>
          <p className="mt-2 text-2xl font-black text-orange-300">
            {currentStreak}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Best Streak</p>
          <p className="mt-2 text-2xl font-black text-yellow-300">
            {bestStreak}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Onchain Check-ins</p>
          <p className="mt-2 text-2xl font-black text-cyan-300">
            {totalCheckIns}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Identity Status</p>
          <p
            className={
              isRegistered
                ? "mt-2 text-lg font-black text-green-300"
                : "mt-2 text-lg font-black text-yellow-300"
            }
          >
            {isRegistered ? "Active" : "Pending Check-in"}
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuilderProfile