function HeroBanner() {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-purple-700/20 p-8 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-300">
            LIVE ON ARC TESTNET
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Build your Arc activity every day.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Complete onchain check-ins, earn XP, grow your Builder Score,
            maintain your streak and unlock builder badges.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-2xl bg-white/5 px-5 py-3 font-semibold">
              ✅ Onchain Check In
            </span>
            <span className="rounded-2xl bg-white/5 px-5 py-3 font-semibold">
              🏆 Builder Score
            </span>
            <span className="rounded-2xl bg-white/5 px-5 py-3 font-semibold">
              🔥 Daily Streak
            </span>
            <span className="rounded-2xl bg-white/5 px-5 py-3 font-semibold">
              🎖 Badges
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-center">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Current Mode
          </p>
          <p className="mt-3 text-4xl font-black text-cyan-300">
            MVP Live
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Wallet verified. Contract deployed. Check-in onchain.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner