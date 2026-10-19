export function WorkflowSteps({ steps, active = 0 }: { steps: string[]; active?: number }) {
  return (
    <ol className="flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
              i === active
                ? 'bg-[var(--color-navy)] text-white'
                : i < active
                  ? 'bg-[var(--color-accent-soft)] text-[var(--color-teal)]'
                  : 'bg-white text-[var(--text-muted)] border border-[var(--border)]'
            }`}
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-black/10 text-[10px]">{i + 1}</span>
            {step}
          </span>
          {i < steps.length - 1 ? <span className="text-[var(--text-muted)]">←</span> : null}
        </li>
      ))}
    </ol>
  )
}
