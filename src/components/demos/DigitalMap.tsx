import { useMemo, useState } from 'react'

type UnitStatus = 'اشغال' | 'خالی' | 'ترمیم' | 'بدهی'

const statusColor: Record<UnitStatus, string> = {
  اشغال: '#0F766E',
  خالی: '#94A3B8',
  ترمیم: '#C2410C',
  بدهی: '#BE123C',
}

const blocks = {
  A: [
    { id: 'A-101', status: 'اشغال' as UnitStatus },
    { id: 'A-102', status: 'بدهی' as UnitStatus },
    { id: 'A-103', status: 'خالی' as UnitStatus },
    { id: 'A-104', status: 'اشغال' as UnitStatus },
    { id: 'A-201', status: 'ترمیم' as UnitStatus },
    { id: 'A-202', status: 'اشغال' as UnitStatus },
    { id: 'A-203', status: 'اشغال' as UnitStatus },
    { id: 'A-204', status: 'خالی' as UnitStatus },
  ],
  B: [
    { id: 'B-101', status: 'اشغال' as UnitStatus },
    { id: 'B-102', status: 'اشغال' as UnitStatus },
    { id: 'B-103', status: 'بدهی' as UnitStatus },
    { id: 'B-104', status: 'خالی' as UnitStatus },
    { id: 'B-201', status: 'اشغال' as UnitStatus },
    { id: 'B-202', status: 'ترمیم' as UnitStatus },
    { id: 'B-203', status: 'اشغال' as UnitStatus },
    { id: 'B-204', status: 'اشغال' as UnitStatus },
  ],
  C: [
    { id: 'C-101', status: 'اشغال' as UnitStatus },
    { id: 'C-102', status: 'خالی' as UnitStatus },
    { id: 'C-103', status: 'اشغال' as UnitStatus },
    { id: 'C-104', status: 'اشغال' as UnitStatus },
    { id: 'C-201', status: 'اشغال' as UnitStatus },
    { id: 'C-202', status: 'بدهی' as UnitStatus },
    { id: 'C-203', status: 'خالی' as UnitStatus },
    { id: 'C-204', status: 'اشغال' as UnitStatus },
  ],
}

export function DigitalMap() {
  const [block, setBlock] = useState<'A' | 'B' | 'C'>('A')
  const [floor, setFloor] = useState<'1' | '2'>('1')
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<(typeof blocks.A)[0] | null>(null)

  const units = useMemo(() => {
    const list = blocks[block].filter((u) => u.id.includes(`-${floor}`))
    if (!q.trim()) return list
    return list.filter((u) => u.id.toLowerCase().includes(q.trim().toLowerCase()))
  }, [block, floor, q])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 border-b border-[var(--border)] pb-3 text-sm">
        {(['A', 'B', 'C'] as const).map((b) => (
          <button key={b} type="button" onClick={() => setBlock(b)} className={block === b ? 'font-semibold text-[var(--color-teal)]' : 'text-[var(--text-muted)]'}>
            بلاک {b}
          </button>
        ))}
        {(['1', '2'] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFloor(f)} className={floor === f ? 'font-semibold text-[var(--color-navy)]' : 'text-[var(--text-muted)]'}>
            طبقه {f}
          </button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جست‌وجوی واحد..." className="classic-input max-w-[180px]" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <svg viewBox="0 0 400 220" className="w-full rounded-2xl border border-[var(--border)] bg-white/70 lg:col-span-2">
          <text x="200" y="28" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="Vazirmatn">
            بلاک {block} — طبقه {floor}
          </text>
          {units.map((u, i) => {
            const col = i % 4
            const row = Math.floor(i / 4)
            const x = 30 + col * 90
            const y = 50 + row * 70
            return (
              <g key={u.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(u)}>
                <rect x={x} y={y} width="75" height="48" rx="10" fill="none" stroke={statusColor[u.status]} strokeWidth="2" className="map-unit" />
                <text x={x + 37} y={y + 29} textAnchor="middle" fill={statusColor[u.status]} fontSize="11" fontFamily="Vazirmatn" fontWeight="600">
                  {u.id}
                </text>
              </g>
            )
          })}
          {units.length === 0 ? (
            <text x="200" y="120" textAnchor="middle" fill="#94A3B8" fontSize="14" fontFamily="Vazirmatn">
              واحدی یافت نشد
            </text>
          ) : null}
        </svg>
        <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4">
          <h4 className="font-semibold text-[var(--color-navy)]">جزئیات واحد</h4>
          {selected ? (
            <div className="mt-3 space-y-2 text-sm animate-msg">
              <p>
                شناسه: <strong className="ltr-code">{selected.id}</strong>
              </p>
              <p>وضعیت: {selected.status}</p>
              <p className="text-[var(--text-muted)]">لینک نمونه به قرارداد در سیستم واقعی فعال می‌شود.</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[var(--text-muted)]">یک واحد را از نقشه انتخاب کنید.</p>
          )}
          <div className="mt-5 space-y-1 text-xs text-[var(--text-muted)]">
            {Object.entries(statusColor).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="inline-block size-2.5 rounded-full" style={{ background: v }} />
                {k}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
