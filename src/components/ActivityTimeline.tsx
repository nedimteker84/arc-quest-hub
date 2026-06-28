import type { CheckInHistoryRecord } from "../hooks/useCheckInContract"

type ActivityTimelineProps = {
  records: CheckInHistoryRecord[]
}

function formatDate(timestamp: number) {
  if (!timestamp) return "Unknown"

  return new Date(timestamp * 1000).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function ActivityTimeline({ records }: ActivityTimelineProps) {
  return (
    <section className="mt-8 rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-7 shadow-2xl shadow-emerald-950/20">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
          Onchain Activity
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          Builder Timeline
        </h2>

        <p className="mt-2 max-w-2xl text-slate-400">
          Recent check-in history from the ArcQuestHub V1.2 contract.
        </p>
      </div>

      {records.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-slate-400">
          No onchain activity yet. Complete your first daily check-in to create
          a builder history record.
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={`${record.day}-${record.blockNumber}`}
              className="rounded-2xl border border-white/10 bg-slate-950 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-black text-white">
                    ✅ Daily Check-in Completed
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {formatDate(record.timestamp)}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
                  +{record.xpEarned} XP
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-xs text-slate-500">Block</p>
                  <p className="mt-1 font-semibold text-slate-200">
                    {record.blockNumber}
                  </p>
                </div>

                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-xs text-slate-500">Total XP</p>
                  <p className="mt-1 font-semibold text-purple-300">
                    {record.totalXpAfter}
                  </p>
                </div>

                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-xs text-slate-500">Streak</p>
                  <p className="mt-1 font-semibold text-orange-300">
                    {record.streakAfter}
                  </p>
                </div>

                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-xs text-slate-500">Builder Score</p>
                  <p className="mt-1 font-semibold text-cyan-300">
                    {record.builderScoreAfter}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ActivityTimeline