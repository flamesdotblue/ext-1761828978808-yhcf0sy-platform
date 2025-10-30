import { Users, CheckCircle, Clock, DollarSign } from 'lucide-react'

export default function StatsOverview({ counts }) {
  const cards = [
    { title: 'Active Bookings', value: counts.activeBookings, icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700', ring: 'ring-emerald-200' },
    { title: 'Pending Requests', value: counts.pending, icon: Clock, color: 'bg-amber-100 text-amber-700', ring: 'ring-amber-200' },
    { title: 'Sitters', value: counts.sitterCount, icon: Users, color: 'bg-sky-100 text-sky-700', ring: 'ring-sky-200' },
    { title: 'Projected Revenue', value: `$${counts.revenue.toLocaleString()}`, icon: DollarSign, color: 'bg-indigo-100 text-indigo-700', ring: 'ring-indigo-200' },
  ]

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.title} className={`rounded-xl border bg-white p-4 ring-1 ${c.ring}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-500">{c.title}</div>
                <div className="mt-1 text-2xl font-semibold">{c.value}</div>
              </div>
              <div className={`h-10 w-10 rounded-lg grid place-items-center ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
