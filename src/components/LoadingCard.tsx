type LoadingCardProps = {
  title?: string
  lines?: number
}

function LoadingCard({ title = "Loading", lines = 3 }: LoadingCardProps) {
  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-7">
      <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
        {title}
      </p>

      <div className="mt-6 space-y-4">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-5 animate-pulse rounded-full bg-slate-800"
            style={{ width: `${95 - index * 15}%` }}
          />
        ))}
      </div>
    </section>
  )
}

export default LoadingCard