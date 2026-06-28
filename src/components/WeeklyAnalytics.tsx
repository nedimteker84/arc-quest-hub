type WeeklyAnalyticsProps = {
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  totalXp: number
  builderScore: number
  reputation: number
}

function WeeklyAnalytics({
  currentStreak,
  bestStreak,
  totalCheckIns,
  totalXp,
  builderScore,
  reputation,
}: WeeklyAnalyticsProps) {
  const activityRate = Math.min(
    100,
    Math.round((currentStreak / 7) * 100),
  )

  let summary =
    "Start building your onchain history."

  if (activityRate >= 40)
    summary =
      "You're building consistent activity."

  if (activityRate >= 70)
    summary =
      "Excellent consistency over the last week."

  if (activityRate >= 90)
    summary =
      "Outstanding builder discipline."

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-cyan-950/30 p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            Weekly Analytics
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Builder Performance
          </h2>

          <p className="mt-2 text-slate-400">
            Your recent onchain activity.
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-500/10 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">
            Activity Rate
          </p>

          <p className="mt-1 text-4xl font-black text-cyan-300">
            {activityRate}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">

        <Metric
          title="Check-ins"
          value={totalCheckIns}
        />

        <Metric
          title="Current"
          value={currentStreak}
        />

        <Metric
          title="Best"
          value={bestStreak}
        />

        <Metric
          title="XP"
          value={totalXp}
        />

        <Metric
          title="Score"
          value={builderScore}
        />

        <Metric
          title="Reputation"
          value={reputation}
        />

      </div>

      <div className="mt-8">
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400"
            style={{
              width: `${activityRate}%`,
            }}
          />

        </div>

        <p className="mt-4 text-sm text-cyan-300 font-semibold">
          {summary}
        </p>
      </div>
    </section>
  )
}

function Metric({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  )
}

export default WeeklyAnalytics