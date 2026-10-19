import { clsx } from '../../lib/utils'

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  index,
}: {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  index?: string
}) {
  return (
    <section id={id} data-reveal className={clsx('section-anchor section-block', className)}>
      <header className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          {index ? <span className="section-index">{index}</span> : null}
          <span className="h-px flex-1 origin-right scale-x-100 bg-gradient-to-l from-transparent via-[var(--border)] to-transparent transition-transform duration-700" />
        </div>
        <h2 className="display-font text-[1.7rem] font-semibold leading-snug text-[var(--color-navy)] md:text-[2rem]">
          {title}
        </h2>
        {subtitle ? <p className="prose-muted mt-3 max-w-2xl text-[0.95rem] leading-8">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('space-y-3', className)}>{children}</div>
}
