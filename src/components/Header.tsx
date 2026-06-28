type HeaderProps = {
  shortAddress: string
  chainId: number
  isConnected: boolean
  isPending: boolean
  isArcNetwork: boolean

  isWalletVerified: boolean
  isVerifyingWallet: boolean

  onConnect: () => void
  onDisconnect: () => void
  onSwitchToArc: () => void
  onVerifyWallet: () => void
  onReset: () => void
}

function Header({
  shortAddress,
  chainId,
  isConnected,
  isPending,
  isArcNetwork,
  isWalletVerified,
  isVerifyingWallet,
  onConnect,
  onDisconnect,
  onSwitchToArc,
  onVerifyWallet,
}: HeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-4xl font-bold shadow-lg shadow-purple-600/40">
        A
      </div>

      <h1 className="text-5xl font-bold tracking-tight">Arc Quest Hub</h1>

      <p className="mt-4 max-w-2xl text-lg text-slate-300">
        A safe daily activity hub for Arc builders.
      </p>

      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={isPending}
          className="mt-8 flex items-center gap-3 rounded-2xl bg-purple-600 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-600/30 hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          👛 {isPending ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="mt-8 w-full max-w-sm rounded-3xl border border-green-500/20 bg-green-950/20 p-5">
          <p className="text-sm font-semibold text-green-300">
            Wallet Connected
          </p>

          <p className="mt-2 text-lg font-bold text-white">{shortAddress}</p>

          <p className="mt-1 text-sm text-slate-400">Chain ID: {chainId}</p>

          <p
            className={
              isArcNetwork
                ? "text-sm text-green-400"
                : "text-sm text-yellow-400"
            }
          >
            Network: {isArcNetwork ? "Arc Testnet" : "Not Arc"}
          </p>

          {isWalletVerified ? (
            <div className="mt-4 rounded-xl bg-emerald-600/20 py-2 text-sm font-semibold text-emerald-300">
              ✅ Wallet Verified
            </div>
          ) : (
            <button
              onClick={onVerifyWallet}
              disabled={isVerifyingWallet}
              className="mt-4 w-full rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white hover:bg-cyan-500 disabled:bg-slate-700"
            >
              {isVerifyingWallet ? "Verifying..." : "Verify Wallet"}
            </button>
          )}

          <button
            onClick={onDisconnect}
            className="mt-3 w-full rounded-xl border border-white/10 px-5 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Disconnect
          </button>
        </div>
      )}

      {isConnected && !isArcNetwork && (
        <div className="mt-6 max-w-xl rounded-3xl border border-yellow-500/30 bg-yellow-950/20 p-5">
          <p className="text-lg font-bold text-yellow-300">Wrong Network</p>

          <p className="mt-2 text-sm text-slate-300">
            Please switch to Arc Testnet before completing quests.
          </p>

          <button
            onClick={onSwitchToArc}
            className="mt-4 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-slate-950 hover:bg-yellow-400"
          >
            Switch to Arc Testnet
          </button>
        </div>
      )}

      {isConnected && isArcNetwork && (
        <div className="mt-6 max-w-xl rounded-3xl border border-purple-500/20 bg-purple-950/20 p-5">
          <p className="text-lg font-bold text-purple-300">
            Arc Testnet Ready
          </p>

          <p className="mt-2 text-sm text-slate-300">
            You can complete daily quests safely on Arc Testnet.
          </p>
        </div>
      )}
    </div>
  )
}

export default Header