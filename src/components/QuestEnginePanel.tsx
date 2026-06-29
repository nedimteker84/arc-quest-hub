import { questEngine } from "../lib/questEngine"

type QuestEnginePanelProps = {
  isWalletVerified: boolean
  hasCheckedInToday: boolean
  passportMinted: boolean
  currentStreak: number
  reputation: number
}

function QuestEnginePanel({
  isWalletVerified,
  hasCheckedInToday,
  passportMinted,
  currentStreak,
  reputation,
}: QuestEnginePanelProps) {
  function getProgress(id: string) {
    if (id === "daily-checkin") return hasCheckedInToday ? 1 : 0
    if (id === "verify-wallet") return isWalletVerified ? 1 : 0
    if (id === "mint-passport") return passportMinted ? 1 : 0
    if (id === "week-streak") return Math.min(currentStreak, 7)
    if (id === "elite-reputation") return Math.min(reputation, 80)

    return 0
  }

  return (
    <section className="mt-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-slate-900 to-cyan-950/20 p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-purple-300">
            Quest Engine v2
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Builder Missions
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Multi-layer quests based on wallet verification, onchain activity,
            Passport NFT ownership, streaks and reputation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Available Quests</p>

          <p className="mt-1 text-4xl font-black text-purple-300">
            {questEngine.length}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {questEngine.map((quest) => {
          const progress = getProgress(quest.id)
          const completed = progress >= quest.target
          const percentage = Math.round((progress / quest.target) * 100)

          return (
            <div
              key={quest.id}
              className={
                completed
                  ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"
                  : "rounded-2xl border border-white/10 bg-slate-950 p-5"
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {quest.type}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white">
                    {quest.title}
                  </h3>
                </div>

                <div className="rounded-xl bg-black/30 px-3 py-2 text-sm font-black text-cyan-300">
                  +{quest.xp} XP
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {quest.description}
              </p>

              <div className="mt-5">
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={
                      completed
                        ? "h-full rounded-full bg-emerald-400"
                        : "h-full rounded-full bg-purple-400"
                    }
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {progress} / {quest.target}
                  </span>

                  <span>
                    {completed ? "Completed" : `${percentage}%`}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuestEnginePanel