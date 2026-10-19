export function ArchitectureDiagram() {
  const layers = [
    { title: 'رابط کاربری', desc: 'صفحه وب و موبایل برای کاربران' },
    { title: 'خدمت‌دهنده', desc: 'قواعد کسب‌وکار و امنیت' },
    { title: 'پایگاه داده', desc: 'ذخیره امن اطلاعات' },
  ]

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {layers.map((layer, i) => (
        <div key={layer.title} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4 text-center">
          <p className="text-xs text-[var(--color-teal)]">{String(i + 1).padStart(2, '0')}</p>
          <h4 className="mt-1 font-semibold text-[var(--color-navy)]">{layer.title}</h4>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{layer.desc}</p>
        </div>
      ))}
    </div>
  )
}
