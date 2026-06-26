import type { LeaderboardRow } from "../hooks/useCheckInContract"

type LeaderboardProps = {
  rows: LeaderboardRow[]
}

function shortWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
}

function Leaderboard({ rows }: LeaderboardProps) {
  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Onchain Leaderboard</h2>
        <p className="mt-2 text-slate-400">
          Real ranking from CheckIn contract events on Arc Testnet.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Streak</th>
              <th className="px-4 py-3">Check-ins</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-slate-400" colSpan={5}>
                  No onchain check-ins yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.wallet}
                  className={
                    row.isYou
                      ? "border-t border-white/10 bg-purple-600/10"
                      : "border-t border-white/10"
                  }
                >
                  <td className="px-4 py-4 font-bold">#{row.rank}</td>
                  <td className="px-4 py-4 font-semibold text-white">
                    {shortWallet(row.wallet)}
                    {row.isYou && (
                      <span className="ml-2 rounded-full bg-purple-600/30 px-2 py-1 text-xs text-purple-200">
                        You
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-cyan-300">{row.score}</td>
                  <td className="px-4 py-4 text-orange-300">{row.streak}</td>
                  <td className="px-4 py-4 text-emerald-300">
                    {row.checkIns}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard