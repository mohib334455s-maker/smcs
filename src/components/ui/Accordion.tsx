import { useEffect, useState } from 'react'
import { clsx } from '../../lib/utils'

export function Accordion({
  items,
  openAll = false,
}: {
  items: { title: string; content: React.ReactNode; defaultOpen?: boolean }[]
  /** وقتی true باشد همه آیتم‌ها باز می‌مانند (مناسب چاپ/PDF) */
  openAll?: boolean
}) {
  const [open, setOpen] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {}
    items.forEach((item, i) => {
      if (openAll || item.defaultOpen) init[i] = true
    })
    return init
  })

  useEffect(() => {
    if (!openAll) return
    const all: Record<number, boolean> = {}
    items.forEach((_, i) => {
      all[i] = true
    })
    setOpen(all)
  }, [openAll, items.length])

  return (
    <div className="space-y-2" data-accordion>
      {items.map((item, i) => {
        const isOpen = openAll || !!open[i]
        return (
          <div
            key={item.title}
            className={clsx(
              'acc-item overflow-hidden rounded-xl border transition-all duration-300',
              isOpen ? 'border-teal-300 bg-white' : 'border-[var(--border)] bg-white/70',
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-right"
              onClick={() => {
                if (openAll) return
                setOpen((s) => ({ ...s, [i]: !s[i] }))
              }}
              aria-expanded={isOpen}
            >
              <span className="text-[0.95rem] font-semibold text-[var(--color-navy)]">{item.title}</span>
              <span
                className={clsx(
                  'acc-icon inline-flex size-7 items-center justify-center rounded-full text-sm transition-transform duration-300',
                  isOpen ? 'bg-[var(--color-accent-soft)] text-[var(--color-teal)] rotate-45' : 'bg-slate-100 text-[var(--text-muted)]',
                )}
              >
                +
              </span>
            </button>
            <div
              className={clsx(
                'acc-body grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="acc-body-inner overflow-hidden">
                <div className="border-t border-[var(--border)] px-4 py-3 text-sm leading-8 text-[var(--text-muted)]">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
