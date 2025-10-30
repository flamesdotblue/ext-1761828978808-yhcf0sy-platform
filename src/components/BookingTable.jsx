import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react'

function StatusBadge({ status }) {
  const map = {
    Pending: 'bg-amber-100 text-amber-800 ring-amber-200',
    Approved: 'bg-sky-100 text-sky-800 ring-sky-200',
    'In Progress': 'bg-indigo-100 text-indigo-800 ring-indigo-200',
    Completed: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
    Cancelled: 'bg-rose-100 text-rose-800 ring-rose-200',
  }
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${map[status]}`}>{status}</span>
}

function formatDate(d) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function BookingTable({ bookings, onUpdateStatus }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600">Booking</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600">Pet / Owner</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600">Sitter</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600">Dates</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600">Total</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {bookings.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-neutral-500">
                No bookings found.
              </td>
            </tr>
          )}
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-neutral-50/60">
              <td className="px-4 py-3 align-top">
                <div className="text-sm font-medium text-neutral-900">{b.id}</div>
                <div className="text-xs text-neutral-500">${b.ratePerDay}/day • {b.days} day{b.days > 1 ? 's' : ''}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="text-sm font-medium">{b.petName} <span className="text-neutral-400">•</span> <span className="text-neutral-600">{b.petType}</span></div>
                <div className="text-xs text-neutral-500">Owner: {b.ownerName}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="text-sm">{b.sitterName}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="flex items-center gap-1 text-sm text-neutral-700">
                  <Calendar className="h-4 w-4 text-neutral-400" /> {formatDate(b.startDate)} – {formatDate(b.endDate)}
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <StatusBadge status={b.status} />
              </td>
              <td className="px-4 py-3 align-top text-right">
                <div className="text-sm font-semibold">${b.total.toLocaleString()}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="flex justify-end gap-2">
                  {b.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(b.id, 'Approved')}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm bg-white hover:bg-neutral-50"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600" /> Approve
                      </button>
                      <button
                        onClick={() => onUpdateStatus(b.id, 'Cancelled')}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm bg-white hover:bg-neutral-50"
                        title="Decline"
                      >
                        <XCircle className="h-4 w-4 text-rose-600" /> Decline
                      </button>
                    </>
                  )}
                  {b.status === 'Approved' && (
                    <button
                      onClick={() => onUpdateStatus(b.id, 'In Progress')}
                      className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm bg-white hover:bg-neutral-50"
                      title="Start"
                    >
                      <Clock className="h-4 w-4 text-indigo-600" /> Start
                    </button>
                  )}
                  {b.status === 'In Progress' && (
                    <button
                      onClick={() => onUpdateStatus(b.id, 'Completed')}
                      className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm bg-white hover:bg-neutral-50"
                      title="Complete"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600" /> Complete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
