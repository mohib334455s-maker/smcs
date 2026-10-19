import { useMemo, useState } from 'react'

type Row = Record<string, string | number>

export function DataTable({
  columns,
  rows,
  searchable = true,
  searchKeys,
  emptyText = 'داده‌ای برای نمایش وجود ندارد.',
}: {
  columns: { key: string; label: string }[]
  rows: Row[]
  searchable?: boolean
  searchKeys?: string[]
  emptyText?: string
}) {
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [asc, setAsc] = useState(true)

  const filtered = useMemo(() => {
    let data = rows
    if (q.trim()) {
      const keys = searchKeys ?? columns.map((c) => c.key)
      const needle = q.trim().toLowerCase()
      data = data.filter((row) => keys.some((k) => String(row[k] ?? '').toLowerCase().includes(needle)))
    }
    if (sortKey) {
      data = [...data].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (typeof av === 'number' && typeof bv === 'number') return asc ? av - bv : bv - av
        return asc ? String(av).localeCompare(String(bv), 'fa') : String(bv).localeCompare(String(av), 'fa')
      })
    }
    return data
  }, [rows, q, sortKey, asc, columns, searchKeys])

  const onSort = (key: string) => {
    if (sortKey === key) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <div>
      {searchable ? (
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جست‌وجو در جدول..."
          className="classic-input mb-4"
        />
      ) : null}
      <div className="classic-table-wrap">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-navy)] text-white">
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-3 text-right text-xs font-semibold tracking-wide">
                  <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort(col.key)}>
                    {col.label}
                    {sortKey === col.key ? <span className="text-[10px] opacity-80">{asc ? '↑' : '↓'}</span> : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-10 text-center text-[var(--text-muted)]">
                  {emptyText}
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i} className={i % 2 ? 'bg-slate-50/80' : 'bg-white/60'}>
                  {columns.map((col) => (
                    <td key={col.key} className="border-t border-[var(--border)] px-3 py-2.5">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">{filtered.length} ردیف</p>
    </div>
  )
}
