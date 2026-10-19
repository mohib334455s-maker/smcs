export function TenantPortal() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="kpi-tile" data-reveal>
          <p className="text-xs text-[var(--text-muted)]">قرارداد فعال</p>
          <p className="mt-1 font-semibold ltr-code text-[var(--color-navy)]">L-2024-088</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">فعال</p>
        </div>
        <div className="kpi-tile" data-reveal>
          <p className="text-xs text-[var(--text-muted)]">صورت‌حساب جاری</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-navy)]">18,000</p>
          <p className="text-xs text-[var(--text-muted)]">افغانی — سررسید 1404/07/01</p>
        </div>
        <div className="kpi-tile" data-reveal>
          <p className="text-xs text-[var(--text-muted)]">بدهی</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-success)]">0</p>
          <p className="text-xs text-[var(--text-muted)]">وضعیت تسویه‌شده (نمونه)</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-semibold text-[var(--color-navy)]">اقدامات</h4>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-7 text-[var(--text-muted)]">
            <li>مشاهده تاریخچه پرداخت و دریافت رسید</li>
            <li>دانلود اسناد مجاز قرارداد</li>
            <li>ثبت درخواست ترمیم / شکایت / تمدید</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[var(--color-navy)]">اعلان‌های شخصی</h4>
          <ul className="mt-2 space-y-2 text-sm text-[var(--text-muted)]">
            <li className="border-b border-[var(--border)] pb-2">یادآوری کرایه ماه میزان — 3 روز مانده</li>
            <li className="border-b border-[var(--border)] pb-2">درخواست ترمیم #MR-19 در حال بررسی</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
