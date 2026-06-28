import { calculateReputation } from "../lib/reputation"

type BuilderProfileProps = {
  shortAddress: string
  totalXp: number
  builderScore: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  isConnected: boolean
  isRegistered: boolean
  isVerified: boolean
}

function getBuilderLevel(score: number) {
  if (score >= 1500) return "Level 5 • Arc Legend"
  if (score >= 700) return "Level 4 • Core Builder"
  if (score >= 300) return "Level 3 • Advanced Builder"
  if (score >= 100) return "Level 2 • Active Builder"
  if (score >= 50) return "Level 1 • New Builder"
  return "Level 0 • Starter Builder"
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
  isVerified,
}: BuilderProfileProps) {
  if (!isConnected) return null

  const level = getBuilderLevel(builderScore)

  const reputation = calculateReputation({
    xp: totalXp,
    currentStreak,
    bestStreak,
    totalCheckIns,
    verified: isVerified,
  })

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
            Onchain identity profile for {shortAddress}. XP, streak, check-ins,
            score and activity history are read from Arc Quest Hub contracts.
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
          <p className={`mt-2 text-2xl font-black ${reputation.color}`}>
            {reputation.score}/100
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {reputation.level}
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
              isRegistered && isVerified
                ? "mt-2 text-lg font-black text-green-300"
                : "mt-2 text-lg font-black text-yellow-300"
            }
          >
            {isRegistered && isVerified ? "Active" : "Pending"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-white">
              Reputation Engine
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Reputation is calculated from XP, current streak, best streak,
              total check-ins and wallet verification.
            </p>
          </div>

          <div className="min-w-48">
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                style={{ width: `${reputation.score}%` }}
              />
            </div>

            <p className="mt-2 text-right text-xs text-slate-500">
              {reputation.level}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuilderProfile