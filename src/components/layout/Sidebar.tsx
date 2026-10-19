import { ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { navGroups } from '../../data/nav'
import { clsx, scrollToId } from '../../lib/utils'

export function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
  activeId,
}: {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
  activeId: string
}) {
  return (
    <>
      <div
        className={clsx('no-print fixed inset-0 z-40 bg-navy-950/40 lg:hidden', open ? 'block' : 'hidden')}
        onClick={onClose}
      />
      <aside
        className={clsx(
          'no-print fixed inset-y-0 start-0 z-40 flex w-[280px] flex-col border-e border-[var(--border)] bg-[var(--bg-sidebar)] text-slate-100 transition-transform lg:sticky lg:top-[61px] lg:z-30 lg:h-[calc(100vh-61px)] lg:translate-x-0 lg:self-start',
          collapsed ? 'lg:w-[72px]' : 'lg:w-[280px]',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-3">
          {!collapsed ? <span className="text-sm font-semibold text-white/90">فهرست مستندات</span> : <span />}
          <button type="button" className="hidden rounded-lg p-1.5 hover:bg-white/10 lg:inline-flex" onClick={onToggleCollapse} aria-label="جمع/باز کردن منو">
            {collapsed ? <PanelRightOpen className="size-4" /> : <PanelRightClose className="size-4" />}
          </button>
        </div>
        <nav className="flex-1 space-y-4 overflow-y-auto p-3">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!collapsed ? <p className="mb-2 px-2 text-[11px] font-bold tracking-wide text-slate-400">{group.title}</p> : null}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = activeId === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        title={item.label}
                        onClick={() => {
                          scrollToId(item.id)
                          onClose()
                        }}
                        className={clsx(
                          'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition',
                          active ? 'bg-accent text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                          collapsed && 'justify-center',
                        )}
                      >
                        {collapsed ? <span className="text-[10px] font-bold">{item.label.slice(0, 1)}</span> : (
                          <>
                            <ChevronRight className={clsx('size-3.5 shrink-0 opacity-60', active && 'opacity-100')} />
                            <span className="truncate text-right">{item.label}</span>
                          </>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
