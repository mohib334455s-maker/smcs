import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { kpiCards, monthlyRevenue, sectorRevenue } from '../../data/sample'
import { formatNumber } from '../../lib/utils'
import { Modal } from '../ui/Modal'

const COLORS = ['#0E1B2A', '#0F766E', '#D97706', '#94A3B8']
const sectorTotal = sectorRevenue.reduce((s, i) => s + i.value, 0)

export function InteractiveDashboard() {
  const [detail, setDetail] = useState<(typeof kpiCards)[0] | null>(null)

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => (
          <button key={card.id} type="button" onClick={() => setDetail(card)} className="kpi-tile text-right">
            <p className="text-xs text-[var(--text-muted)]">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-navy)]" lang="en" dir="ltr">
              {card.value}
            </p>
            {card.unit ? <p className="text-xs text-[var(--text-muted)]">{card.unit}</p> : null}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
          <h4 className="mb-3 text-sm font-semibold text-[var(--color-navy)]">روند عایدات ماهانه</h4>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip formatter={(v) => formatNumber(Number(v))} />
                <Area type="monotone" dataKey="revenue" name="عایدات" stroke="#0F766E" fill="url(#g1)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
          <h4 className="mb-3 text-sm font-semibold text-[var(--color-navy)]">تفکیک عایدات بخش‌ها</h4>
          <div className="grid items-center gap-3 sm:grid-cols-2">
            <div className="relative mx-auto h-44 w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sectorRevenue} dataKey="value" nameKey="name" innerRadius={50} outerRadius={72} paddingAngle={3} stroke="#fff" strokeWidth={2}>
                    {sectorRevenue.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatNumber(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-[var(--text-muted)]">مجموع</span>
                <span className="text-sm font-bold text-[var(--color-navy)]">{formatNumber(sectorTotal)}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {sectorRevenue.map((item, i) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    {item.name}
                  </span>
                  <span className="text-[var(--text-muted)]" lang="en" dir="ltr">
                    {Math.round((item.value / sectorTotal) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal open={!!detail} title={detail?.label ?? ''} onClose={() => setDetail(null)}>
        <p className="text-3xl font-semibold text-[var(--color-navy)]">
          {detail?.value} {detail?.unit}
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">داده آزمایشی برای نمایش به کارفرما</p>
      </Modal>
    </div>
  )
}
