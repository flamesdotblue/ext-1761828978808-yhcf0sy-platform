import { useMemo, useState } from 'react'
import Header from './components/Header'
import StatsOverview from './components/StatsOverview'
import FiltersBar from './components/FiltersBar'
import BookingTable from './components/BookingTable'

function daysBetween(a, b) {
  const d1 = new Date(a)
  const d2 = new Date(b)
  const ms = Math.abs(d2 - d1)
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

const initialBookings = [
  {
    id: 'BKG-1024',
    ownerName: 'Emma Johnson',
    petName: 'Bailey',
    petType: 'Dog',
    sitterName: 'Alex Rivera',
    startDate: '2025-11-01',
    endDate: '2025-11-03',
    status: 'Pending',
    ratePerDay: 45,
  },
  {
    id: 'BKG-1025',
    ownerName: 'Liam Smith',
    petName: 'Milo',
    petType: 'Dog',
    sitterName: 'Sam Patel',
    startDate: '2025-11-02',
    endDate: '2025-11-05',
    status: 'Approved',
    ratePerDay: 55,
  },
  {
    id: 'BKG-1026',
    ownerName: 'Olivia Brown',
    petName: 'Luna',
    petType: 'Dog',
    sitterName: 'Taylor Chen',
    startDate: '2025-10-28',
    endDate: '2025-10-31',
    status: 'In Progress',
    ratePerDay: 50,
  },
  {
    id: 'BKG-1027',
    ownerName: 'Noah Davis',
    petName: 'Rocky',
    petType: 'Dog',
    sitterName: 'Alex Rivera',
    startDate: '2025-10-10',
    endDate: '2025-10-12',
    status: 'Completed',
    ratePerDay: 45,
  },
  {
    id: 'BKG-1028',
    ownerName: 'Sophia Wilson',
    petName: 'Coco',
    petType: 'Dog',
    sitterName: 'Jordan Lee',
    startDate: '2025-11-04',
    endDate: '2025-11-07',
    status: 'Pending',
    ratePerDay: 60,
  },
]

const sitters = [
  { name: 'Alex Rivera', rating: 4.9, active: true },
  { name: 'Sam Patel', rating: 4.7, active: true },
  { name: 'Taylor Chen', rating: 4.8, active: false },
  { name: 'Jordan Lee', rating: 4.6, active: true },
]

export default function App() {
  const [bookings, setBookings] = useState(initialBookings)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const computedBookings = useMemo(() => {
    return bookings.map((b) => ({
      ...b,
      days: daysBetween(b.startDate, b.endDate),
      total: daysBetween(b.startDate, b.endDate) * b.ratePerDay,
    }))
  }, [bookings])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return computedBookings.filter((b) => {
      const matchesQuery = !q || [b.ownerName, b.petName, b.sitterName, b.id].some((x) => x.toLowerCase().includes(q))
      const matchesStatus = status === 'All' || b.status === status
      return matchesQuery && matchesStatus
    })
  }, [computedBookings, query, status])

  const counts = useMemo(() => {
    const activeStatuses = ['Approved', 'In Progress']
    const activeBookings = computedBookings.filter((b) => activeStatuses.includes(b.status)).length
    const pending = computedBookings.filter((b) => b.status === 'Pending').length
    const sitterCount = sitters.length
    const revenue = computedBookings
      .filter((b) => ['Approved', 'In Progress', 'Completed'].includes(b.status))
      .reduce((sum, b) => sum + b.total, 0)
    return { activeBookings, pending, sitterCount, revenue }
  }, [computedBookings])

  function updateStatus(id, next) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: next } : b)))
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsOverview counts={counts} />
        <div className="mt-6">
          <FiltersBar query={query} onQueryChange={setQuery} status={status} onStatusChange={setStatus} />
        </div>
        <div className="mt-4">
          <BookingTable bookings={filtered} onUpdateStatus={updateStatus} />
        </div>
      </main>
    </div>
  )
}
