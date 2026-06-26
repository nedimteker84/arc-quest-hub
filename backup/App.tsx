import { useEffect, useState } from "react"
import { Wallet, Flame, CalendarDays } from "lucide-react"

function App() {
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [checkedInToday, setCheckedInToday] = useState(false)

  useEffect(() => {
    const savedXp = localStorage.getItem("arcQuestXp")
    const savedStreak = localStorage.getItem("arcQuestStreak")
    const savedCheckInDate = localStorage.getItem("arcQuestCheckInDate")

    const today = new Date().toISOString().split("T")[0]

    if (savedXp) {
      setXp(Number(savedXp))
    }

    if (savedStreak) {
      setStreak(Number(savedStreak))
    }

    if (savedCheckInDate === today) {
      setCheckedInToday(true)
    }
  }, [])

  function handleCheckIn() {
    if (checkedInToday) {
      return
    }

    const today = new Date().toISOString().split("T")[0]
    const newXp = xp + 10
    const newStreak = streak + 1

    setXp(newXp)
    setStreak(newStreak)
    setCheckedInToday(true)

    localStorage.setItem("arcQuestXp", String(newXp))
    localStorage.setItem("arcQuestStreak", String(newStreak))
    localStorage.setItem("arcQuestCheckInDate", today)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 py-12">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-4xl font-bold shadow-lg shadow-purple-600/40">
          A
        </div>

        <h1 className="text-center text-5xl font-bold tracking-tight">
          Arc Quest Hub
        </h1>

        <p className="mt-4 text-center text-lg text-slate-300">
          Complete quests. Earn XP. Build your streak.
        </p>

        <button className="mt-8 flex items-center gap-3 rounded-2xl bg-purple-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-600/30 hover:bg-purple-500">
          <Wallet size={22} />
          Connect Wallet
        </button>

        <div className="mt-10 grid w-full gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-4 w-fit rounded-xl bg-purple-600/20 p-3">
              🏆
            </div>

            <p className="text-5xl font-bold text-purple-400">{xp}</p>
            <p className="mt-2 text-xl font-semibold">Total XP</p>
            <p className="mt-2 text-slate-400">Complete quests to earn XP.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-4 w-fit rounded-xl bg-orange-600/20 p-3">
              <Flame className="text-orange-400" />
            </div>

            <p className="text-5xl font-bold text-orange-400">{streak}</p>
            <p className="mt-2 text-xl font-semibold">Current Streak</p>
            <p className="mt-2 text-slate-400">Keep your streak alive.</p>
          </div>
        </div>

        <div className="mt-6 w-full rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-purple-600/20 p-3">
              <CalendarDays className="text-purple-400" />
            </div>

            <h2 className="text-xl font-semibold">Daily Check In</h2>
          </div>

          <p className="text-slate-400">
            Check in daily to earn XP and grow your streak.
          </p>

          <button
            onClick={handleCheckIn}
            disabled={checkedInToday}
            className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold ${
              checkedInToday
                ? "cursor-not-allowed bg-slate-700 text-slate-300"
                : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            <CalendarDays size={20} />
            {checkedInToday ? "Already Checked In Today" : "Check In Now"}
          </button>

          {checkedInToday && (
            <p className="mt-4 text-center text-sm text-green-400">
              Great job. Come back tomorrow for your next check-in.
            </p>
          )}
        </div>

        <div className="mt-6 w-full rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-6 text-2xl font-bold">How It Works</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-3 text-3xl">👛</div>
              <h3 className="font-semibold">Connect Wallet</h3>
              <p className="mt-2 text-sm text-slate-400">
                Connect your wallet to start your journey.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-3 text-3xl">🏆</div>
              <h3 className="font-semibold">Complete Quests</h3>
              <p className="mt-2 text-sm text-slate-400">
                Earn XP by participating in activities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-3 text-3xl">🔥</div>
              <h3 className="font-semibold">Build Streak</h3>
              <p className="mt-2 text-sm text-slate-400">
                Check in every day and climb the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App