import { clsx } from '../../lib/utils'

const tones = {
  accent: 'bg-[var(--color-accent-soft)] text-[var(--color-teal)]',
  success: 'bg-green-50 text-[var(--color-success)]',
  warning: 'bg-orange-50 text-[var(--color-warning)]',
  danger: 'bg-rose-50 text-[var(--color-danger)]',
  neutral: 'bg-slate-100 text-slate-600',
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
}) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone])}>
      {children}
    </span>
  )
}
