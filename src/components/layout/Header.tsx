import { Building2, LayoutDashboard, Menu, Moon, Network, Search, Sun, X } from 'lucide-react'
import { scrollToId } from '../../lib/utils'

export function Header({
  dark,
  onToggleTheme,
  onOpenSidebar,
  search,
  onSearch,
  searchOpen,
  onToggleSearch,
}: {
  dark: boolean
  onToggleTheme: () => void
  onOpenSidebar: () => void
  search: string
  onSearch: (v: string) => void
  searchOpen: boolean
  onToggleSearch: () => void
}) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-header)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-3 py-3 md:px-5">
        <button type="button" className="rounded-lg p-2 hover:bg-black/5 lg:hidden dark:hover:bg-white/5" onClick={onOpenSidebar} aria-label="منو">
          <Menu className="size-5" />
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-white">
            <Building2 className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold tracking-wide text-navy-900 dark:text-white">SCMS</span>
              <span className="hidden text-xs text-[var(--text-muted)] sm:inline">سیستم هوشمند مدیریت مارکیت تجارتی</span>
            </div>
            <p className="truncate text-xs text-[var(--text-muted)]">سند طراحی سیستم</p>
          </div>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="جست‌وجوی سراسری مستندات..."
              className="w-64 rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2 pe-3 ps-9 text-sm outline-none focus:border-accent lg:w-80"
            />
          </div>
          <button type="button" className="rounded-lg p-2 hover:bg-black/5 md:hidden dark:hover:bg-white/5" onClick={onToggleSearch} aria-label="جست‌وجو">
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </button>
          <button type="button" onClick={() => scrollToId('dashboard')} className="hidden items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white sm:inline-flex">
            <LayoutDashboard className="size-3.5" /> داشبورد نمونه
          </button>
          <button type="button" onClick={() => scrollToId('architecture')} className="hidden items-center gap-1.5 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold lg:inline-flex">
            <Network className="size-3.5" /> معماری
          </button>
          <button type="button" onClick={() => scrollToId('mod-general')} className="hidden items-center gap-1.5 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold xl:inline-flex">
            فهرست ماژول‌ها
          </button>
          <button type="button" onClick={onToggleTheme} className="rounded-xl border border-[var(--border)] p-2" aria-label="تغییر حالت روشن/تاریک">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="border-t border-[var(--border)] px-3 py-2 md:hidden">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="جست‌وجو..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none"
            autoFocus
          />
        </div>
      ) : null}
    </header>
  )
}
