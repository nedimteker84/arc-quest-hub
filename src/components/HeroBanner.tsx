function HeroBanner() {
  return (
    <section className="mt-10 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/40 p-8 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-300">
            Live on Arc Testnet
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
            Build your Arc identity
            <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              one check-in at a time.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Arc Quest Hub turns daily onchain activity into a verified builder
            profile with XP, streaks, score, badges, leaderboard position and
            activity history.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              ✅ Onchain Check-in
            </span>

            <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              ⚡ Builder Score
            </span>

            <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              🧬 Builder Identity
            </span>

            <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              🏆 Badges
            </span>

            <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white">
              📜 Activity History
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Current Mode
          </p>

          <p className="mt-3 text-4xl font-black text-cyan-300">
            V1.2 Live
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Wallet verified. Contract deployed. Builder history stored onchain.
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-sm font-bold text-emerald-300">
              Security First
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Non-custodial flow. No private keys. Arc Testnet network checks.
              Onchain source of truth.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner