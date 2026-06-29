import type { Achievement } from "../lib/achievements"

type Props = {
  achievements: Achievement[]
}

function AchievementPanel({ achievements }: Props) {
  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-cyan-300 text-sm font-bold uppercase tracking-widest">
            Achievements
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Builder Progress
          </h2>
        </div>

        <div className="text-right">
          <p className="text-slate-400 text-sm">
            Unlocked
          </p>

          <p className="text-3xl font-black text-cyan-300">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-2xl border p-5 transition ${
              achievement.unlocked
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-white/10 bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">
                {achievement.icon}
              </span>

              {achievement.unlocked && (
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-black">
                  UNLOCKED
                </span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              {achievement.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {achievement.description}
            </p>

            <div className="mt-5">
              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-cyan-400"
                  style={{
                    width: `${(achievement.progress / achievement.target) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {achievement.progress} / {achievement.target}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AchievementPanel