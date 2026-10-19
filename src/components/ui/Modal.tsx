import { useEffect } from 'react'

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/30" aria-label="بستن" onClick={onClose} />
      <div className="relative z-10 max-h-[85vh] w-full max-w-md overflow-auto border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
          <h3 className="display-font text-lg font-semibold text-[var(--color-navy)]">{title}</h3>
          <button type="button" onClick={onClose} className="text-sm text-[var(--text-muted)]" aria-label="بستن">
            بستن
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
