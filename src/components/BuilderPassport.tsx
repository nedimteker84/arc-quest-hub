import {
  createPassport,
  nextPassportGoal,
  passportCompletion,
} from "../lib/passport"

type BuilderPassportProps = {
  wallet: string
  totalXp: number
  builderScore: number
  reputation: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
}

function BuilderPassport({
  wallet,
  totalXp,
  builderScore,
  reputation,
  currentStreak,
  bestStreak,
  totalCheckIns,
}: BuilderPassportProps) {
  const passport = createPassport({
    wallet,
    xp: totalXp,
    builderScore,
    reputation,
    currentStreak,
    bestStreak,
    totalCheckIns,
  })

  const completion = passportCompletion(passport)
  const nextGoal = nextPassportGoal(passport)

  return (
    <section className="mt-8 rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/30 via-slate-900 to-cyan-950/20 p-7 shadow-2xl shadow-fuchsia-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-fuchsia-300">
            Builder Passport
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Arc Builder Passport
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            A portable builder identity card powered by your onchain activity,
            reputation, XP, streaks and badge progress.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Passport Completion</p>

          <p className="mt-1 text-4xl font-black text-fuchsia-300">
            {completion}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Passport Holder
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {passport.wallet || "Not connected"}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-center">
              <p className="text-xs text-slate-400">Level</p>
              <p className="mt-1 font-black text-cyan-300">
                {passport.level}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PassportMetric title="XP" value={passport.xp} />
            <PassportMetric title="Score" value={passport.builderScore} />
            <PassportMetric title="Reputation" value={`${passport.reputation}/100`} />
            <PassportMetric title="Check-ins" value={passport.totalCheckIns} />
            <PassportMetric title="Current Streak" value={passport.currentStreak} />
            <PassportMetric title="Best Streak" value={passport.bestStreak} />
          </div>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-emerald-400"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-fuchsia-300">
              Next goal: {nextGoal}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
            Passport Badges
          </p>

          {passport.badges.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
              No passport badges yet. Complete your first onchain check-in to
              unlock Genesis Builder.
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {passport.badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                >
                  <p className="font-black text-emerald-300">
                    🏅 {badge}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-bold text-white">Passport Actions</p>

            <div className="mt-4 grid gap-3">
              <button
                type="button"
                className="rounded-xl bg-fuchsia-600 px-4 py-3 font-bold text-white hover:bg-fuchsia-500"
                onClick={() => alert("PNG export will be added next.")}
              >
                Download Passport PNG
              </button>

              <button
                type="button"
                className="rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white hover:bg-cyan-500"
                onClick={() => alert("PDF export will be added next.")}
              >
                Download Passport PDF
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/10 px-4 py-3 font-bold text-slate-300 hover:bg-white/10"
                onClick={() => alert("Passport NFT mint will be added after export tools.")}
              >
                Passport NFT Coming Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PassportMetric({
  title,
  value,
}: {
  title: string
  value: number | string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  )
}

export default BuilderPassport