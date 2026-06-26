import { getBuilderLevel } from "../lib/builderLevel"

type BuilderLevelCardProps = {
  builderScore: number
}

function BuilderLevelCard({
  builderScore,
}: BuilderLevelCardProps) {
  const level = getBuilderLevel(builderScore)

  return (
    <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-cyan-950/20 p-6 text-center">
      <div className="text-5xl">
        {level.emoji}
      </div>

      <h2 className="mt-3 text-2xl font-bold text-cyan-300">
        {level.label}
      </h2>

      <p className="mt-2 text-sm text-slate-300">
        {level.description}
      </p>

      <div className="mt-5 rounded-2xl bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Builder Score
        </p>

        <p className="mt-1 text-4xl font-bold text-white">
          {builderScore}
        </p>
      </div>
    </div>
  )
}

export default BuilderLevelCard