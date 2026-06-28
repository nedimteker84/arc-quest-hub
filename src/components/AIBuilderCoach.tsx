type AIBuilderCoachProps = {
  totalXp: number
  builderScore: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
  reputation: number
  hasCheckedInToday: boolean
  isConnected: boolean
  isVerified: boolean
}

function getNextLevelTarget(builderScore: number) {
  if (builderScore < 50) return 50
  if (builderScore < 100) return 100
  if (builderScore < 300) return 300
  if (builderScore < 700) return 700
  if (builderScore < 1500) return 1500
  return builderScore
}

function getCoachMessage({
  currentStreak,
  totalCheckIns,
  reputation,
  hasCheckedInToday,
  isConnected,
  isVerified,
}: AIBuilderCoachProps) {
  if (!isConnected) {
    return {
      title: "Connect your wallet",
      message:
        "Start by connecting your wallet to load your Arc builder identity.",
      action: "Connect wallet to begin.",
    }
  }

  if (!isVerified) {
    return {
      title: "Verify your builder wallet",
      message:
        "Your wallet is connected. Verify it before completing your daily onchain quest.",
      action: "Verify wallet, then complete Daily Check-in.",
    }
  }

  if (!hasCheckedInToday) {
    return {
      title: "Daily check-in is ready",
      message:
        "Your builder profile is active. Complete today’s onchain check-in to increase XP, streak and score.",
      action: "Complete Daily Check-in now.",
    }
  }

  if (currentStreak >= 7) {
    return {
      title: "Strong builder rhythm",
      message:
        "You are maintaining a serious streak. This is the kind of consistent onchain activity that makes a builder profile valuable.",
      action: "Keep your streak alive tomorrow.",
    }
  }

  if (reputation >= 70) {
    return {
      title: "Reputation is growing",
      message:
        "Your reputation score is trending well. Keep stacking consistent check-ins to strengthen your Arc builder identity.",
      action: "Aim for the next badge milestone.",
    }
  }

  if (totalCheckIns === 1) {
    return {
      title: "First onchain record created",
      message:
        "Your first Arc Quest Hub activity record is now onchain. The next goal is turning this into a consistent builder history.",
      action: "Come back tomorrow to continue the streak.",
    }
  }

  return {
    title: "Builder profile is active",
    message:
      "Your onchain builder identity is live. Keep completing daily activity to grow XP, reputation and leaderboard position.",
    action: "Build consistency over the next 7 days.",
  }
}

function AIBuilderCoach(props: AIBuilderCoachProps) {
  const nextTarget = getNextLevelTarget(props.builderScore)
  const remainingScore = Math.max(0, nextTarget - props.builderScore)
  const coach = getCoachMessage(props)

  return (
    <section className="mt-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-slate-900 to-cyan-950/20 p-7 shadow-2xl shadow-purple-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
            AI Builder Coach
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {coach.title}
          </h2>

          <p className="mt-3 max-w-3xl text-slate-300">
            {coach.message}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Next Level Gap</p>

          <p className="mt-1 text-4xl font-black text-purple-300">
            {remainingScore}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            score needed
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Suggested Action
          </p>

          <p className="mt-2 font-bold text-cyan-300">
            {coach.action}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Current Signal
          </p>

          <p className="mt-2 font-bold text-emerald-300">
            {props.hasCheckedInToday ? "Today completed" : "Action pending"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Profile Strength
          </p>

          <p className="mt-2 font-bold text-purple-300">
            {props.reputation}/100 reputation
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-5">
        <p className="text-sm font-bold text-white">
          Coach Context
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          This first version uses your onchain XP, streak, check-ins,
          reputation and daily completion status. Later versions will connect
          this coach to Arc docs, MCP workflows and richer wallet analysis.
        </p>
      </div>
    </section>
  )
}

export default AIBuilderCoach