export function ContractDetail() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { title: 'اطلاعات مستأجر', lines: ['نام: مریم کریمی', 'تماس: [جای‌خالی]', 'شناسه: T-045'] },
        { title: 'مشخصات واحد', lines: ['دکان S-201', 'بلاک B — طبقه 1', 'مساحت 60 متر'] },
        { title: 'مبالغ و تاریخ‌ها', lines: ['کرایه: 35,000 افغانی', 'تضمین: 70,000', 'شروع/ختم: 1403/08/01 — 1404/08/01'] },
        { title: 'وضعیت پرداخت و اسناد', lines: ['وضعیت پرداخت: منظم', 'اسناد: قرارداد.pdf (نسخه 2)', 'وضعیت: نزدیک به ختم'] },
      ].map((box) => (
        <div key={box.title} className="rounded-2xl border border-[var(--border)] bg-white/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md" data-reveal>
          <h4 className="mb-2 font-semibold text-[var(--color-navy)]">{box.title}</h4>
          <ul className="space-y-1 text-sm leading-7 text-[var(--text-muted)]">
            {box.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
