import { useEffect, useMemo, useState } from 'react'
import { images } from '../../data/images'
import { menuItems, needsAssessment, shops } from '../../data/sample'
import {
  accountingNote,
  advancedModules,
  coreDepartments,
  dbGroups,
  extras,
  financeConcepts,
  messageChannels,
  messagingFlow,
  platforms,
  roadmapPhases,
  roleAccess,
  sampleRentMessage,
  securityFeatures,
  systemPillars,
} from '../../data/structure'
import { formatNumber } from '../../lib/utils'
import { ArchitectureDiagram } from '../demos/ArchitectureDiagram'
import { InteractiveDashboard } from '../demos/InteractiveDashboard'
import { Accordion } from '../ui/Accordion'
import { DataTable } from '../ui/DataTable'
import { Section } from '../ui/Section'

const gallery = [
  { src: images.shops, title: 'دکان‌ها' },
  { src: images.parking, title: 'پارکینگ' },
  { src: images.restaurant, title: 'رستورانت' },
  { src: images.residential, title: 'رهایشی' },
]

export function MainContent({ pdfMode = false }: { pdfMode?: boolean }) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const cartTotal = useMemo(
    () => menuItems.reduce((s, item) => s + item.price * (cart[item.id] ?? 0), 0),
    [cart],
  )

  useEffect(() => {
    const openForPrint = () => {
      document.documentElement.setAttribute('data-pdf', '1')
      document.querySelectorAll('details').forEach((el) => el.setAttribute('open', ''))
    }
    window.addEventListener('beforeprint', openForPrint)
    return () => window.removeEventListener('beforeprint', openForPrint)
  }, [])

  return (
    <div>
      <header id="intro" className="section-anchor hero">
        <div className="hero-orb hero-orb-a" aria-hidden />
        <div className="relative z-10 grid gap-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="hero-brand !text-[3rem] md:!text-[3.8rem]">SCMS</p>
            <p className="mt-2 text-sm text-teal-100/90">سیستم هوشمند مدیریت مارکیت تجارتی</p>
            <h1 className="display-font mt-4 text-[1.7rem] font-semibold leading-[1.5] text-white md:text-[2.1rem]">
              سه سامانه یکپارچه: مدیریت مارکیت، رستورانت و پارکینگ
            </h1>
            <p className="mt-3 text-sm leading-8 text-slate-200">
              هر بخش عملیات و حسابداری مستقل دارد؛ گزارش مالی کل برای مالک در یک داشبورد مرکزی جمع می‌شود.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-navy)]"
              >
                دانلود / چاپ PDF
              </button>
            </div>
          </div>
          <img src={images.hero} alt="مارکیت تجارتی" className="h-48 w-full rounded-2xl object-cover md:h-60" />
        </div>
      </header>

      <Section
        id="summary"
        index="01"
        title="خلاصه برای کارفرما"
        subtitle="یک پلتفرم واحد برای مدیریت حرفه‌ای مارکیت تجارتی، عملیات رستورانت و کنترل پارکینگ — با شفافیت مالی و نقش‌بندی دقیق."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g) => (
            <figure key={g.title} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <img src={g.src} alt={g.title} className="h-32 w-full object-cover" loading="lazy" />
              <figcaption className="px-3 py-2 text-sm font-medium text-[var(--color-navy)]">{g.title}</figcaption>
            </figure>
          ))}
        </div>
        <ul className="mt-5 grid gap-2 text-sm leading-8 text-[var(--text-muted)] sm:grid-cols-2">
          <li>• کاهش ثبت تکراری و پراکندگی فایل‌ها</li>
          <li>• پیگیری بهتر کرایه و مطالبات</li>
          <li>• گزارش سریع برای مالک و مدیریت</li>
          <li>• کنترل دسترسی کاربران بر اساس نقش</li>
        </ul>
      </Section>

      <Section id="needs" index="02" title="نیازسنجی" subtitle="سؤال و جواب برای روشن شدن نیاز کارفرما و محدوده سیستم.">
        <div className="space-y-3">
          {needsAssessment.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--border)] bg-white open:border-teal-300"
              open={pdfMode || i === 0}
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-[var(--color-navy)]">
                <span className="me-2 text-[var(--color-teal)]" lang="en">
                  Q{i + 1}.
                </span>
                {item.q}
              </summary>
              <div className="border-t border-[var(--border)] px-4 py-3 text-sm leading-8 text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--color-navy)]">جواب: </span>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section
        id="structure"
        index="03"
        title="ساختار اصلی سیستم"
        subtitle="SCMS سه سامانه عملیاتی را زیر یک چتر مدیریتی یکپارچه می‌کند: مارکیت، رستورانت و پارکینگ."
      >
        <div className="mb-5 space-y-4">
          {systemPillars.map((p, i) => (
            <article key={p.id} className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-none">
              <p className="text-xs font-bold text-[var(--color-teal)]" lang="en">
                0{i + 1} · {p.en}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[var(--color-navy)]">{p.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[var(--text-muted)]">{p.summary}</p>
              <ol className="mt-4 grid gap-4 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
                {p.modules.map((m, mi) => (
                  <li key={m.title} className="print-keep overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="h-28 w-full object-cover sm:h-32"
                      loading={pdfMode ? 'eager' : 'lazy'}
                    />
                    <div className="p-3 text-sm">
                      <p className="font-semibold text-[var(--color-navy)]">
                        <span className="me-1.5 text-[var(--color-teal)]" lang="en">
                          {mi + 1}.
                        </span>
                        {m.title}
                      </p>
                      <p className="mt-1 leading-7 text-[var(--text-muted)]">{m.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <p className="mb-4 rounded-2xl border border-teal-200 bg-teal-50/70 px-4 py-3 text-sm leading-8 text-[var(--color-navy)]">
          {accountingNote}
        </p>

        <h4 className="mb-3 text-sm font-semibold text-[var(--color-navy)]">جزئیات ماژول‌های هر سامانه</h4>
        <Accordion
          openAll={pdfMode}
          items={coreDepartments.map((d, i) => ({
            title: `${i + 1}. ${d.title}`,
            defaultOpen: pdfMode || i === 0,
            content: (
              <div className="space-y-3">
                {d.image ? (
                  <img
                    src={d.image}
                    alt={d.title}
                    className="h-36 w-full rounded-xl object-cover"
                    loading={pdfMode ? 'eager' : 'lazy'}
                  />
                ) : null}
                <p className="text-xs font-semibold text-[var(--color-teal)]">
                  سامانه: {d.pillar} · {d.note}
                </p>
                <p className="text-sm leading-7 text-[var(--text-muted)]">{d.summary}</p>
                <ul className="list-disc space-y-1 ps-5 text-sm leading-8">
                  {d.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
      </Section>

      <Section
        id="messaging"
        index="04"
        title="سیستم هوشمند کرایه و پیام‌رسانی"
        subtitle="یادآوری خودکار برای صدها دکان و واحد رهایشی — قابل تنظیم از نظر زمان، تعداد و متن پیام."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {messagingFlow.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <p className="text-xs font-bold text-[var(--color-teal)]" lang="en">
                {i + 1}
              </p>
              <h4 className="mt-1 font-semibold text-[var(--color-navy)]">{step.title}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4">
          <h4 className="font-semibold text-[var(--color-navy)]">نمونه پیام خودکار به مستأجر</h4>
          <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-[var(--bg)] p-4 text-sm leading-8 text-[var(--text-muted)]" lang="en" dir="rtl">
            {sampleRentMessage}
          </pre>
          <p className="mt-2 text-xs leading-7 text-[var(--text-muted)]">
            این پیام نمونه است؛ سیستم اطلاعات واقعی هر مستأجر را از قرارداد و حساب او می‌گیرد. پرداخت نقدی فقط پس از ثبت و تأیید شخص مجاز به پیام تأیید می‌رسد.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-none">
          <h4 className="font-semibold text-[var(--color-navy)]">روش‌های ارسال پیام</h4>
          <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">
            زبان پیام، زمان یادآوری، تعداد یادآوری‌ها و متن پیام از پنل مدیریت قابل تنظیم است.
          </p>
          <ol className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
            {messageChannels.map((c, i) => (
              <li key={c.title} className="text-sm">
                <p className="font-semibold text-[var(--color-navy)]">
                  <span className="me-1.5 text-[var(--color-teal)]" lang="en">
                    {i + 1}.
                  </span>
                  {c.title}
                </p>
                <p className="mt-1 leading-7 text-[var(--text-muted)]">{c.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        id="dashboard"
        index="05"
        title="داشبورد مرکزی کارفرما"
        subtitle="ارقام نمونه فرضی برای نمایش شکل داشبورد — در نسخه واقعی دوره گزارش، کلیک روی بخش و خروجی Excel/PDF فعال است."
      >
        <InteractiveDashboard />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {financeConcepts.map((c) => (
            <div key={c.term} className="rounded-2xl border border-[var(--border)] bg-white p-3">
              <h4 className="text-sm font-semibold text-[var(--color-navy)]">{c.term}</h4>
              <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">{c.def}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="demos" index="06" title="نمونه‌های تعاملی" subtitle="نمونه دکان‌ها و نقطه فروش رستورانت برای درک شکل کار روزانه.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
            <h4 className="mb-3 font-semibold text-[var(--color-navy)]">نمونه دکان‌ها</h4>
            <DataTable
              searchable={false}
              columns={[
                { key: 'id', label: 'شماره' },
                { key: 'activity', label: 'فعالیت' },
                { key: 'rent', label: 'کرایه' },
                { key: 'status', label: 'وضعیت' },
              ]}
              rows={shops}
            />
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
            <h4 className="mb-3 font-semibold text-[var(--color-navy)]">نمونه نقطه فروش رستورانت</h4>
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="rounded-xl border border-[var(--border)] p-3 text-right text-sm hover:border-teal-300"
                  onClick={() => setCart((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + 1 }))}
                >
                  <p className="font-medium text-[var(--color-navy)]">{item.name}</p>
                  <p className="text-[var(--text-muted)]" lang="en" dir="ltr">
                    {formatNumber(item.price)}
                  </p>
                  {cart[item.id] ? (
                    <p className="mt-1 text-xs text-[var(--color-teal)]" lang="en">
                      تعداد: {cart[item.id]}
                    </p>
                  ) : null}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-[var(--color-navy)]">
              جمع سبد:{' '}
              <span lang="en" dir="ltr">
                {formatNumber(cartTotal)}
              </span>{' '}
              افغانی
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="advanced"
        index="07"
        title="بخش‌های پیشرفته"
        subtitle="از نرم‌افزار ساده کرایه تا سیستم کامل مدیریت دارایی و عملیات تجارتی."
      >
        <Accordion
          openAll={pdfMode}
          items={advancedModules.map((m) => ({
            title: m.title,
            defaultOpen: pdfMode,
            content: (
              <ul className="list-disc space-y-1 ps-5 text-sm leading-8">
                {m.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          }))}
        />
        <p className="mt-4 text-sm leading-8 text-[var(--text-muted)]">
          پیشنهاد مهم: هر معامله به حسابداری متصل باشد تا ارقام گزارش از تراکنش واقعی محاسبه شوند، نه از ورود دستی غیرقابل‌پیگیری.
        </p>
      </Section>

      <Section
        id="roles"
        index="08"
        title="کاربران، نقش‌ها و سطح دسترسی"
        subtitle="سیستم RBAC — نقش‌ها قابل تغییر؛ مدیر سیستم می‌تواند نقش جدید بسازد و مجوز هر کاربر را جداگانه تنظیم کند."
      >
        <div className="space-y-2">
          {roleAccess.map((r) => (
            <div key={r.role} className="print-keep rounded-xl border border-[var(--border)] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-navy)]">{r.role}</p>
              <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">{r.access}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm leading-8 text-[var(--text-muted)]">
          مثال: صندوقدار پارکینگ عایدات شیفت خودش را ثبت می‌کند، اما عایدات ماهانه رستورانت، حذف پرداخت بدون مجوز، یا گزارش محرمانه مالک را نمی‌بیند.
        </p>
      </Section>

      <Section
        id="platforms"
        index="09"
        title="نسخه موبایل و کمپیوتر"
        subtitle="از ابتدا برای هر دو محیط طراحی می‌شود — وب واکنش‌گرا (PWA)؛ اپ اختصاصی Android/iOS در صورت نیاز بعدی."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <h4 className="font-semibold text-[var(--color-navy)]">نسخه کمپیوتر</h4>
            <p className="mt-1 text-xs text-[var(--text-muted)]">مناسب کارفرما، مدیران و حسابداران</p>
            <ul className="mt-3 list-disc space-y-1 ps-5 text-sm leading-8 text-[var(--text-muted)]">
              {platforms.desktop.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <h4 className="font-semibold text-[var(--color-navy)]">نسخه موبایل</h4>
            <p className="mt-1 text-xs text-[var(--text-muted)]">مناسب مدیران، صندوقداران و مستأجران</p>
            <ul className="mt-3 list-disc space-y-1 ps-5 text-sm leading-8 text-[var(--text-muted)]">
              {platforms.mobile.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-none">
          <h4 className="font-semibold text-[var(--color-navy)]">قابلیت‌های ضروری نسخه موبایل</h4>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
            {platforms.mobileExtras.map((p, i) => (
              <li key={p}>
                <span className="font-semibold text-[var(--color-teal)]" lang="en">
                  {i + 1}.
                </span>{' '}
                {p}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="security" index="10" title="امنیت و جلوگیری از تقلب" subtitle="در مجموعه‌ای با پول نقد، کرایه و فروش روزانه، امنیت از ابتدا در طراحی است.">
        <div className="space-y-2">
          {securityFeatures.map((s) => (
            <div key={s.feature} className="print-keep rounded-xl border border-[var(--border)] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-navy)]">{s.feature}</p>
              <p className="mt-1 text-sm leading-7 text-[var(--text-muted)]">{s.use}</p>
            </div>
          ))}
        </div>
        <div className="print-keep mt-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm leading-8 text-[var(--text-muted)]">
          مثال: اگر صندوقدار پارکینگ 15,000 افغانی عایدات ثبت کند، سیستم مبلغ مورد انتظار، پول واقعی صندوق و تفاوت را در پایان شیفت مقایسه می‌کند؛ هر تفاوت باید دلیل داشته باشد.
        </div>
      </Section>

      <Section id="infra" index="11" title="ساختار فنی و دیتابیس" subtitle="دیتابیس ماژولار؛ بخش‌ها تفکیک‌شده اما از طریق شناسه‌ها و تراکنش مالی مرتبط.">
        <ArchitectureDiagram />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dbGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <h4 className="font-semibold text-[var(--color-navy)]">{g.title}</h4>
              <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]" lang="en" dir="ltr">
                {g.items}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-8 text-[var(--text-muted)]">
          پیشنهاد: PostgreSQL + Backend امن با کنترل مجوز سمت سرور. هر جدول مالی شناسه سازمان و در صورت نیاز شناسه بخش دارد؛ مبالغ با نوع عددی مناسب مالی ذخیره می‌شوند.
        </p>
      </Section>

      <Section id="extras" index="12" title="امکانات ممتاز پیشنهادی">
        <div className="grid gap-3 sm:grid-cols-2">
          {extras.map((e) => (
            <div key={e.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <h4 className="font-semibold text-[var(--color-navy)]">{e.title}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{e.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="roadmap" index="13" title="ترتیب حرفه‌ای توسعه" subtitle="ساختار نهایی از ابتدا طراحی می‌شود؛ پیاده‌سازی مرحله‌به‌مرحله — بدون اعلام هزینه یا زمان قطعی.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roadmapPhases.map((p) => (
            <div key={p.n} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
              <p className="text-xs font-bold text-[var(--color-teal)]" lang="en">
                مرحله {p.n}
              </p>
              <h4 className="mt-1 font-semibold text-[var(--color-navy)]">{p.title}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="conclusion" index="14" title="جمع‌بندی">
        <p className="text-[0.95rem] leading-8 text-[var(--text-muted)]">
          SCMS سه سامانه حرفه‌ای را یکجا ارائه می‌دهد: مدیریت مارکیت (املاک، قرارداد و کرایه)، مدیریت رستورانت (فروش، صندوق و گدام) و مدیریت پارکینگ (ورود/خروج، تعرفه و شیفت). هر سامانه حسابداری مستقل دارد و گزارش تجمیعی برای مالک در داشبورد مرکزی نمایش داده می‌شود. جزئیات قرارداد فنی در مرحله بعد تکمیل می‌شود.
        </p>
      </Section>
    </div>
  )
}
