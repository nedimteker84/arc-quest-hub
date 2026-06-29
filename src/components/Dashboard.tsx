import { createDashboardCards } from "../lib/dashboardStats"

type DashboardProps = {
  xp: number
  builderScore: number
  currentStreak: number
  completedCount: number
  openQuestCount: number
  reputation?: number
  totalCheckIns?: number
  passportMinted?: boolean
  achievementsUnlocked?: number
  achievementsTotal?: number
}

function Dashboard({
  xp,
  builderScore,
  currentStreak,
  completedCount,
  openQuestCount,
  reputation = 0,
  totalCheckIns = completedCount,
  passportMinted = false,
  achievementsUnlocked = completedCount,
  achievementsTotal = completedCount + openQuestCount,
}: DashboardProps) {
  const cards = createDashboardCards({
    xp,
    builderScore,
    reputation,
    totalCheckIns,
    currentStreak,
    passportMinted,
    achievementsUnlocked,
    achievementsTotal,
  })

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/20 p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
            Builder Dashboard v2
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Command Center
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            A unified overview of XP, score, reputation, streak, onchain
            activity, Passport NFT status and achievement progress.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Open Quests</p>

          <p className="mt-1 text-4xl font-black text-cyan-300">
            {openQuestCount}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-xl shadow-black/20"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              {card.value}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard