import { calculateReputation } from "../lib/reputation"
import { getBuilderLevel } from "../lib/passport"
import type { PublicBuilderProfile as PublicBuilderProfileData } from "../hooks/usePublicBuilderProfile"

type PublicBuilderProfileProps = {
  profile: PublicBuilderProfileData | null
  loading: boolean
}

function formatDate(timestamp: number) {
  if (!timestamp) return "Unknown"

  return new Date(timestamp * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function PublicBuilderProfile({
  profile,
  loading,
}: PublicBuilderProfileProps) {
  if (loading) {
    return (
      <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-cyan-950/10 p-7">
        <p className="text-cyan-300 font-bold">Loading public builder profile...</p>
      </section>
    )
  }

  if (!profile) return null

  const reputation = calculateReputation({
    xp: profile.totalXp,
    currentStreak: profile.currentStreak,
    bestStreak: profile.bestStreak,
    totalCheckIns: profile.totalCheckIns,
    verified: profile.registered,
  })

  const level = getBuilderLevel(profile.builderScore)

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-purple-950/20 p-7 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
            Public Builder Profile
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            {shortAddress(profile.wallet)}
          </h2>

          <p className="mt-3 max-w-3xl break-all text-slate-400">
            Public onchain builder identity loaded from Arc Quest Hub contract.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Builder Score</p>

          <p className="mt-1 text-4xl font-black text-cyan-300">
            {profile.builderScore}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProfileMetric title="Level" value={level} />
        <ProfileMetric title="XP" value={profile.totalXp} />
        <ProfileMetric title="Reputation" value={`${reputation.score}/100`} />
        <ProfileMetric title="Check-ins" value={profile.totalCheckIns} />
        <ProfileMetric title="Current Streak" value={profile.currentStreak} />
        <ProfileMetric title="Best Streak" value={profile.bestStreak} />
        <ProfileMetric title="Joined" value={formatDate(profile.joinedAt)} />
        <ProfileMetric
          title="Status"
          value={profile.registered ? "Active Builder" : "Not registered"}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950 p-5">
        <p className="text-sm font-bold text-white">
          Public Profile Link
        </p>

        <p className="mt-2 break-all text-sm text-slate-400">
          {window.location.href}
        </p>
      </div>
    </section>
  )
}

function ProfileMetric({
  title,
  value,
}: {
  title: string
  value: number | string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 break-words text-xl font-black text-white">
        {value}
      </p>
    </div>
  )
}

export default PublicBuilderProfile