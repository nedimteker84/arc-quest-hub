type StatsCardProps = {
  icon: string
  value: number
  title: string
  description: string
  valueColor: string
}

function StatsCard({
  icon,
  value,
  title,
  description,
  valueColor,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
      <div className="mb-4 w-fit rounded-xl bg-purple-600/20 p-3">
        {icon}
      </div>

      <p className={`text-5xl font-bold ${valueColor}`}>
        {value}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {title}
      </p>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  )
}

export default StatsCard