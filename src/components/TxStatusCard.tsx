type TxStatusCardProps = {
  txHash: string
}

function TxStatusCard({ txHash }: TxStatusCardProps) {
  if (!txHash) return null

  return (
    <div className="mt-8 rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">✅</div>

        <div>
          <h2 className="text-2xl font-bold text-emerald-300">
            Onchain Check In Completed
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Your daily check-in was confirmed on Arc Testnet.
          </p>

          <p className="mt-4 break-all rounded-2xl bg-black/20 p-4 text-sm text-emerald-200">
            {txHash}
          </p>

          <a
            href={`https://testnet.arcscan.app/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
          >
            View Transaction
          </a>
        </div>
      </div>
    </div>
  )
}

export default TxStatusCard