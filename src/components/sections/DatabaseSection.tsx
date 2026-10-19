import { useState } from 'react'
import { tableGroups } from '../../data/database'
import { Accordion } from '../ui/Accordion'

export function DatabaseSection() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-semibold text-[var(--color-navy)]">نمودار روابط داده (مفهومی)</h3>
            <p className="text-sm text-[var(--text-muted)]">پایگاه داده پیشنهادی: پستگرس — قابل بزرگ‌نمایی</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button type="button" className="classic-btn-ghost" onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}>
              −
            </button>
            <span className="text-sm text-[var(--text-muted)]">{Math.round(zoom * 100)}٪</span>
            <button type="button" className="classic-btn-ghost" onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}>
              +
            </button>
          </div>
        </div>
        <div className="overflow-auto border border-[var(--border)] p-4">
          <svg viewBox="0 0 860 420" style={{ width: `${860 * zoom}px`, maxWidth: 'none' }}>
            {erdNodes.map((n) => (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={n.w} height={42} fill="none" stroke="#1C2B3A" />
                <text x={n.x + n.w / 2} y={n.y + 26} textAnchor="middle" fill="#1C2B3A" fontSize="11" fontFamily="ui-monospace, monospace">
                  {n.id}
                </text>
              </g>
            ))}
            {erdEdges.map((e, i) => (
              <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#A8A29E" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
      </div>

      {tableGroups.map((group) => (
        <div key={group.id}>
          <h3 className="text-base font-semibold text-[var(--color-navy)]">{group.title}</h3>
          <p className="mb-3 text-sm text-[var(--text-muted)]">{group.purpose}</p>
          <Accordion
            items={group.tables.map((t) => ({
              title: t.name,
              content: (
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>هدف:</strong> {t.purpose}
                  </p>
                  <p>
                    <strong>کلید اصلی:</strong> <span className="ltr-code">{t.primaryKey}</span>
                  </p>
                  <p>
                    <strong>فیلدهای مهم:</strong> <span className="ltr-code">{t.fields.join(', ')}</span>
                  </p>
                  <p>
                    <strong>روابط:</strong> {t.relations.join(' | ')}
                  </p>
                  <p>
                    <strong>محدودیت‌ها:</strong> {t.constraints.join(' | ') || '—'}
                  </p>
                  <p>
                    <strong>ایندکس‌ها:</strong> <span className="ltr-code">{t.indexes.join(', ')}</span>
                  </p>
                  <p>
                    <strong>سیاست آرشیف:</strong> {t.archive}
                  </p>
                </div>
              ),
            }))}
          />
        </div>
      ))}
    </div>
  )
}

const erdNodes = [
  { id: 'organizations', x: 20, y: 20, w: 140 },
  { id: 'branches', x: 200, y: 20, w: 120 },
  { id: 'buildings', x: 360, y: 20, w: 120 },
  { id: 'units', x: 520, y: 20, w: 100 },
  { id: 'tenants', x: 680, y: 20, w: 120 },
  { id: 'leases', x: 420, y: 120, w: 120 },
  { id: 'rent_invoices', x: 260, y: 220, w: 140 },
  { id: 'payments', x: 460, y: 220, w: 120 },
  { id: 'journal_entries', x: 640, y: 220, w: 150 },
  { id: 'users', x: 20, y: 120, w: 100 },
  { id: 'roles', x: 20, y: 220, w: 100 },
  { id: 'parking_sessions', x: 20, y: 320, w: 150 },
  { id: 'orders', x: 220, y: 320, w: 100 },
  { id: 'inventory_items', x: 380, y: 320, w: 140 },
  { id: 'employees', x: 560, y: 320, w: 120 },
  { id: 'audit_logs', x: 720, y: 320, w: 120 },
]

const erdEdges = [
  { x1: 160, y1: 41, x2: 200, y2: 41 },
  { x1: 320, y1: 41, x2: 360, y2: 41 },
  { x1: 480, y1: 41, x2: 520, y2: 41 },
  { x1: 570, y1: 62, x2: 480, y2: 120 },
  { x1: 740, y1: 62, x2: 540, y2: 120 },
  { x1: 460, y1: 162, x2: 330, y2: 220 },
  { x1: 480, y1: 162, x2: 520, y2: 220 },
  { x1: 580, y1: 241, x2: 640, y2: 241 },
  { x1: 70, y1: 162, x2: 70, y2: 220 },
  { x1: 120, y1: 141, x2: 420, y2: 141 },
]
