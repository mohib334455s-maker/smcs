import { useState } from 'react'
import { clsx } from '../../lib/utils'

export function Tabs({
  tabs,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[]
}) {
  const [active, setActive] = useState(tabs[0]?.id)

  return (
    <div>
      <div className="mb-5 inline-flex flex-wrap gap-1 rounded-full border border-[var(--border)] bg-white/80 p-1" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={clsx(
              'rounded-full px-3.5 py-1.5 text-sm transition',
              active === tab.id
                ? 'bg-[var(--color-navy)] font-medium text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--color-navy)]',
            )}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  )
}
