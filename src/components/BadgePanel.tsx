type BadgePanelProps = {
  streak: number
  onchainCheckIns: number
}

const badges = [
  {
    title: "7 Day Builder",
    requirement: 7,
    emoji: "🥉",
    description: "Complete 7 daily onchain check-ins.",
  },
  {
    title: "30 Day Builder",
    requirement: 30,
    emoji: "🥈",
    description: "Complete 30 daily onchain check-ins.",
  },
  {
    title: "100 Day Builder",
    requirement: 100,
    emoji: "🥇",
    description: "Complete 100 daily onchain check-ins.",
  },
]

function BadgePanel({ streak, onchainCheckIns }: BadgePanelProps) {
  const progressValue = Math.max(streak, onchainCheckIns)

  return (
    <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-950/10 p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-300">
          Builder Badges
        </h2>
        <p className="mt-2 text-slate-400">
          Badge progress based on your onchain check-in activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {badges.map((badge) => {
          const unlocked = progressValue >= badge.requirement
          const percent = Math.min(
            100,
            Math.round((progressValue / badge.requirement) * 100),
          )

          return (
            <div
              key={badge.title}
              className={`rounded-2xl border p-5 ${
                unlocked
                  ? "border-yellow-400/40 bg-yellow-500/10"
                  : "border-white/10 bg-slate-900"
              }`}
            >
              <div className="text-4xl">{badge.emoji}</div>

              <h3 className="mt-4 font-bold text-white">{badge.title}</h3>

              <p className="mt-2 text-sm text-slate-400">
                {badge.description}
              </p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-3 text-sm font-semibold">
                {unlocked
                  ? "Unlocked"
                  : `${progressValue}/${badge.requirement} progress`}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BadgePanel