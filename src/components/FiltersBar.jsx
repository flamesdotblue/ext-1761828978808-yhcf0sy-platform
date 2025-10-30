import { Filter, Search } from 'lucide-react'

const statuses = ['All', 'Pending', 'Approved', 'In Progress', 'Completed', 'Cancelled']

export default function FiltersBar({ query, onQueryChange, status, onStatusChange }) {
  return (
    <div className="rounded-xl border bg-white p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by owner, pet, sitter, or booking ID"
            className="w-full rounded-lg border bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-neutral-500 uppercase tracking-wide">Status</span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(s)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm flex items-center gap-1 ${
                  status === s ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white hover:bg-neutral-50'
                }`}
              >
                <Filter className="h-3.5 w-3.5" /> {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
