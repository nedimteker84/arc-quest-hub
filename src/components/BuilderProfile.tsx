type BuilderProfileProps = {
  shortAddress: string
  totalXp: number
  builderScore: number
  currentStreak: number
  totalCheckIns: number
  isConnected: boolean
}

function getBuilderLevel(score: number) {
  if (score >= 1000) return "Legend Builder"
  if (score >= 500) return "Elite Builder"
  if (score >= 250) return "Core Builder"
  if (score >= 100) return "Active Builder"
  if (score >= 50) return "New Builder"
  return "Starter Builder"
}

function BuilderProfile({
  shortAddress,
  totalXp,
  builderScore,
  currentStreak,
  totalCheckIns,
  isConnected,
}: BuilderProfileProps) {
  if (!isConnected) return null

  const level = getBuilderLevel(builderScore)

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-cyan-950/10 p-7 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
            Builder Identity
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {level}
          </h2>

          <p className="mt-2 text-slate-400">
            Verified onchain builder profile for {shortAddress}.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-6 py-4 text-center">
          <p className="text-sm text-slate-400">Builder Score</p>
          <p className="mt-1 text-4xl font-black text-cyan-300">
            {builderScore}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Total XP</p>
          <p className="mt-2 text-2xl font-black text-purple-300">
            {totalXp}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Current Streak</p>
          <p className="mt-2 text-2xl font-black text-orange-300">
            {currentStreak}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Onchain Check-ins</p>
          <p className="mt-2 text-2xl font-black text-emerald-300">
            {totalCheckIns}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Identity Status</p>
          <p className="mt-2 text-lg font-black text-green-300">
            Verified
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuilderProfile