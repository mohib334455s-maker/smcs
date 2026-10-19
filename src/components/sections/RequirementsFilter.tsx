import { useMemo, useState } from 'react'
import { requirements } from '../../data/requirements'
import type { Priority } from '../../types'
import { DataTable } from '../ui/DataTable'

const priorities: Array<Priority | 'all'> = ['all', 'P0', 'P1', 'P2', 'P3']
const priorityLabel: Record<string, string> = {
  all: 'همه اولویت‌ها',
  P0: 'ضروری',
  P1: 'نسخه اصلی',
  P2: 'پیشرفته',
  P3: 'آینده',
}

export function RequirementsFilter() {
  const modules = useMemo(() => ['all', ...Array.from(new Set(requirements.map((r) => r.module)))], [])
  const [module, setModule] = useState('all')
  const [priority, setPriority] = useState<Priority | 'all'>('all')

  const rows = requirements
    .filter((r) => (module === 'all' || r.module === module) && (priority === 'all' || r.priority === priority))
    .map((r) => ({
      id: r.id,
      module: r.module,
      description: r.description,
      priority: priorityLabel[r.priority],
      acceptance: r.acceptance,
    }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <select value={module} onChange={(e) => setModule(e.target.value)} className="classic-select">
          {modules.map((m) => (
            <option key={m} value={m}>
              {m === 'all' ? 'همه ماژول‌ها' : m}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {priorities.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-sm transition ${priority === p ? 'font-semibold text-[var(--color-teal)]' : 'text-[var(--text-muted)]'}`}
            >
              {priorityLabel[p]}
            </button>
          ))}
        </div>
        <span className="text-xs text-[var(--text-muted)]">{rows.length} نیازمندی</span>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'شناسه' },
          { key: 'module', label: 'ماژول' },
          { key: 'description', label: 'شرح' },
          { key: 'priority', label: 'اولویت' },
          { key: 'acceptance', label: 'معیار پذیرش' },
        ]}
        rows={rows}
      />
    </div>
  )
}
