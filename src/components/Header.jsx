import { Dog, Calendar, Settings } from 'lucide-react'

export default function Header() {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white grid place-items-center shadow">
            <Dog className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">Pawsome Care • Manager</div>
            <div className="text-xs text-neutral-500 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{today}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-lg border bg-white hover:bg-neutral-50">Invite Sitter</button>
          <button className="px-3 py-2 text-sm rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 flex items-center gap-2">
            <Settings className="h-4 w-4" />Settings
          </button>
        </div>
      </div>
    </header>
  )
}
