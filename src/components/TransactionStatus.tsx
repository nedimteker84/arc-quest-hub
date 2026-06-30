import { getExplorerTransactionUrl } from "../lib/config"

type TransactionStatusProps = {
  txHash: string
}

function TransactionStatus({ txHash }: TransactionStatusProps) {
  if (!txHash) return null

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/20 bg-slate-900 p-7">
      <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
        Latest Transaction
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-5">
        <p className="text-sm text-slate-400">
          Last successful onchain transaction
        </p>

        <p className="mt-3 break-all font-mono text-sm text-cyan-300">
          {txHash}
        </p>

        <a
          href={getExplorerTransactionUrl(txHash)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          View on ARC Explorer
        </a>
      </div>
    </section>
  )
}

export default TransactionStatus