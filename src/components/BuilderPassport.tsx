import { useEffect, useRef, useState } from "react"
import jsPDF from "jspdf"
import * as QRCode from "qrcode"
import { useAccount, useWriteContract } from "wagmi"
import { createPublicClient, http } from "viem"
import {
  createPassport,
  nextPassportGoal,
  passportCompletion,
} from "../lib/passport"
import { arcTestnet } from "../lib/chains"

const PASSPORT_NFT_ADDRESS =
  "0xD7c13571F3DC037B23F484005D407F59D7Ae49Be" as const

const PASSPORT_NFT_ABI = [
  {
    type: "function",
    name: "mintPassport",
    stateMutability: "nonpayable",
    inputs: [{ name: "tokenUri", type: "string" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "hasMinted",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "tokenIdOf",
    stateMutability: "view",
    inputs: [{ name: "builder", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const

type BuilderPassportProps = {
  wallet: string
  totalXp: number
  builderScore: number
  reputation: number
  currentStreak: number
  bestStreak: number
  totalCheckIns: number
}

const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
})

function BuilderPassport({
  wallet,
  totalXp,
  builderScore,
  reputation,
  currentStreak,
  bestStreak,
  totalCheckIns,
}: BuilderPassportProps) {
  const passportRef = useRef<HTMLDivElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [minted, setMinted] = useState(false)
  const [tokenId, setTokenId] = useState(0)
  const [minting, setMinting] = useState(false)

  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const passport = createPassport({
    wallet,
    xp: totalXp,
    builderScore,
    reputation,
    currentStreak,
    bestStreak,
    totalCheckIns,
  })

  const completion = passportCompletion(passport)
  const nextGoal = nextPassportGoal(passport)
  const passportUrl = `https://arc-quest-hub.vercel.app/?builder=${passport.wallet}`
  const canMintPassport = totalCheckIns > 0 && builderScore > 0 && reputation > 0

  useEffect(() => {
    async function createQrCode() {
      try {
        const qr = await QRCode.toDataURL(passportUrl, {
          margin: 1,
          width: 220,
          color: {
            dark: "#ffffff",
            light: "#020617",
          },
        })

        setQrDataUrl(qr)
      } catch (error) {
        console.error("Failed to generate passport QR:", error)
        setQrDataUrl("")
      }
    }

    createQrCode()
  }, [passportUrl])

  useEffect(() => {
    async function loadMintStatus() {
      if (!address) {
        setMinted(false)
        setTokenId(0)
        return
      }

      try {
        const hasMinted = await publicClient.readContract({
          address: PASSPORT_NFT_ADDRESS,
          abi: PASSPORT_NFT_ABI,
          functionName: "hasMinted",
          args: [address],
        })

        setMinted(hasMinted)

        if (hasMinted) {
          const currentTokenId = await publicClient.readContract({
            address: PASSPORT_NFT_ADDRESS,
            abi: PASSPORT_NFT_ABI,
            functionName: "tokenIdOf",
            args: [address],
          })

          setTokenId(Number(currentTokenId))
        } else {
          setTokenId(0)
        }
      } catch (error) {
        console.error("Failed to load passport NFT status:", error)
        setMinted(false)
        setTokenId(0)
      }
    }

    loadMintStatus()
  }, [address])

  async function getPassportCanvas() {
    const element = passportRef.current

    if (!element) {
      alert("Passport card not ready.")
      return null
    }

    const html2canvas = await import("html2canvas")

    return html2canvas.default(element, {
      backgroundColor: "#020617",
      scale: 2,
      useCORS: true,
    })
  }

  async function downloadPassportPng() {
    const canvas = await getPassportCanvas()
    if (!canvas) return

    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")

    link.href = image
    link.download = "arc-builder-passport.png"
    link.click()
  }

  async function downloadPassportPdf() {
    const canvas = await getPassportCanvas()
    if (!canvas) return

    const image = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    })

    pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height)
    pdf.save("arc-builder-passport.pdf")
  }

  async function mintPassportNft() {
    if (!address) {
      alert("Connect wallet first.")
      return
    }

    if (!canMintPassport) {
      alert("Complete at least one onchain check-in before minting Passport NFT.")
      return
    }

    if (minted) {
      alert(`Passport NFT already minted. Token ID: ${tokenId}`)
      return
    }

    setMinting(true)

    try {
      const metadata = {
        name: "Arc Builder Passport",
        description:
          "A builder identity passport generated by Arc Quest Hub using onchain activity, XP, reputation, streaks and check-ins.",
        external_url: passportUrl,
        attributes: [
          { trait_type: "Wallet", value: passport.wallet },
          { trait_type: "Level", value: passport.level },
          { trait_type: "XP", value: passport.xp },
          { trait_type: "Builder Score", value: passport.builderScore },
          { trait_type: "Reputation", value: passport.reputation },
          { trait_type: "Current Streak", value: passport.currentStreak },
          { trait_type: "Best Streak", value: passport.bestStreak },
          { trait_type: "Check-ins", value: passport.totalCheckIns },
          { trait_type: "Badges", value: passport.badges.join(", ") || "None" },
        ],
      }

      const tokenUri = `data:application/json,${encodeURIComponent(
        JSON.stringify(metadata),
      )}`

      const hash = await writeContractAsync({
        address: PASSPORT_NFT_ADDRESS,
        abi: PASSPORT_NFT_ABI,
        functionName: "mintPassport",
        args: [tokenUri],
        account: address,
        chainId: arcTestnet.id,
      })

      await publicClient.waitForTransactionReceipt({ hash })

      const currentTokenId = await publicClient.readContract({
        address: PASSPORT_NFT_ADDRESS,
        abi: PASSPORT_NFT_ABI,
        functionName: "tokenIdOf",
        args: [address],
      })

      setMinted(true)
      setTokenId(Number(currentTokenId))

      alert(`Passport NFT minted. Token ID: ${Number(currentTokenId)}`)
    } catch (error) {
      console.error("Passport NFT mint failed:", error)
      alert("Passport NFT mint failed.")
    } finally {
      setMinting(false)
    }
  }

  async function copyPassportLink() {
    try {
      await navigator.clipboard.writeText(passportUrl)
      alert("Passport link copied.")
    } catch {
      alert(passportUrl)
    }
  }

  function sharePassportOnX() {
    const text = encodeURIComponent(
      `I just generated my Arc Builder Passport.\n\nXP: ${passport.xp}\nBuilder Score: ${passport.builderScore}\nReputation: ${passport.reputation}/100\nLevel: ${passport.level}\n\n${passportUrl}`,
    )

    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank")
  }

  return (
    <section className="mt-8 rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/30 via-slate-900 to-cyan-950/20 p-7 shadow-2xl shadow-fuchsia-950/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-fuchsia-300">
            Builder Passport
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Arc Builder Passport
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            A portable builder identity card powered by your onchain activity,
            reputation, XP, streaks and badge progress.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5 text-center">
          <p className="text-xs text-slate-400">Passport Completion</p>

          <p className="mt-1 text-4xl font-black text-fuchsia-300">
            {completion}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          ref={passportRef}
          className="rounded-[2rem] border border-white/10 bg-slate-950 p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Passport Holder
              </p>

              <p className="mt-2 break-all text-2xl font-black text-white">
                {passport.wallet || "Not connected"}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-center">
              <p className="text-xs text-slate-400">Level</p>
              <p className="mt-1 font-black text-cyan-300">
                {passport.level}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PassportMetric title="XP" value={passport.xp} />
            <PassportMetric title="Score" value={passport.builderScore} />
            <PassportMetric
              title="Reputation"
              value={`${passport.reputation}/100`}
            />
            <PassportMetric title="Check-ins" value={passport.totalCheckIns} />
            <PassportMetric
              title="Current Streak"
              value={passport.currentStreak}
            />
            <PassportMetric title="Best Streak" value={passport.bestStreak} />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-emerald-400"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-fuchsia-300">
                Next goal: {nextGoal}
              </p>
            </div>

            {qrDataUrl && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <img
                  src={qrDataUrl}
                  alt="Arc Builder Passport QR"
                  className="h-28 w-28 rounded-xl"
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
            Passport Badges
          </p>

          {passport.badges.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
              No passport badges yet. Complete your first onchain check-in to
              unlock Genesis Builder.
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {passport.badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                >
                  <p className="font-black text-emerald-300">🏅 {badge}</p>
                </div>
              ))}
            </div>
          )}

          {!canMintPassport && (
            <div className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold text-yellow-300">
              Passport NFT unlocks after your first verified onchain check-in.
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-bold text-white">Passport Actions</p>

            {minted && (
              <div className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm font-bold text-emerald-300">
                Passport NFT minted. Token ID: {tokenId}
              </div>
            )}

            <div className="mt-4 grid gap-3">
              <button
                type="button"
                className="rounded-xl bg-fuchsia-600 px-4 py-3 font-bold text-white hover:bg-fuchsia-500"
                onClick={downloadPassportPng}
              >
                Download Passport PNG
              </button>

              <button
                type="button"
                className="rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white hover:bg-cyan-500"
                onClick={downloadPassportPdf}
              >
                Download Passport PDF
              </button>

              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-500"
                onClick={sharePassportOnX}
              >
                Share Passport on X
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/10 px-4 py-3 font-bold text-slate-300 hover:bg-white/10"
                onClick={copyPassportLink}
              >
                Copy Passport Link
              </button>

              <button
                type="button"
                disabled={minted || minting || !canMintPassport}
                className="rounded-xl border border-fuchsia-400/40 px-4 py-3 font-bold text-fuchsia-300 hover:bg-fuchsia-500/10 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-500"
                onClick={mintPassportNft}
              >
                {minting
                  ? "Minting Passport NFT..."
                  : minted
                    ? "Passport NFT Minted"
                    : "Mint Passport NFT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PassportMetric({
  title,
  value,
}: {
  title: string
  value: number | string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  )
}

export default BuilderPassport