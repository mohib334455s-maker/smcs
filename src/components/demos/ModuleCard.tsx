import type { ModuleDoc } from '../../types'
import { moduleImages } from '../../data/images'
import { Accordion } from '../ui/Accordion'
import { Figure } from '../ui/Figure'

const priorityLabel = {
  P0: 'ضروری',
  P1: 'نسخه اصلی',
  P2: 'پیشرفته',
  P3: 'آینده',
} as const

export function ModuleCard({ mod, children }: { mod: ModuleDoc; children?: React.ReactNode }) {
  const image = moduleImages[mod.id]

  return (
    <div className="space-y-5">
      {image ? <Figure src={image} alt={mod.title} caption={`نمای مفهومی بخش «${mod.title}» برای درک بهتر کارفرما`} /> : null}

      <p className="max-w-2xl text-[0.95rem] leading-8 text-[var(--text-muted)]">{mod.intro}</p>
      <p className="text-sm text-[var(--text-muted)]">
        اولویت توسعه: <strong className="text-[var(--color-navy)]">{priorityLabel[mod.priority]}</strong>
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Info title="هدف" text={mod.purpose} />
        <Info title="کاربران" text={mod.users.join('، ')} />
      </div>

      {children}

      <Accordion
        items={[
          { title: '1–4. قابلیت‌ها و صفحات', content: <TwoCol left="قابلیت‌ها" right="صفحات" a={mod.features} b={mod.pages} /> },
          {
            title: '5–8. فیلدها، گردش کار و قواعد',
            content: (
              <div className="space-y-3">
                <List title="فیلدهای اصلی" items={mod.fields} />
                <List title="گردش کار" items={mod.workflow} ordered />
                <List title="قواعد کسب‌وکار" items={mod.businessRules} />
              </div>
            ),
          },
          {
            title: '9–11. اعلان‌ها، گزارش‌ها و ارتباط ماژول‌ها',
            content: (
              <div className="space-y-3">
                <List title="اعلان‌ها" items={mod.notifications.length ? mod.notifications : ['—']} />
                <List title="گزارش‌ها" items={mod.reports} />
                <List title="ارتباط با سایر ماژول‌ها" items={mod.integrations} />
              </div>
            ),
          },
          {
            title: '12–15. دیتابیس، امنیت، پذیرش و اولویت',
            content: (
              <div className="space-y-3">
                <List title="جدول‌های دیتابیس" items={mod.tables} code />
                <List title="امنیت" items={mod.security} />
                <List title="معیارهای پذیرش" items={mod.acceptance} />
                <p>
                  اولویت توسعه: <strong>{priorityLabel[mod.priority]}</strong>
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-semibold tracking-wide text-[var(--color-teal)]">{title}</p>
      <p className="mt-1.5 text-sm leading-7 text-[var(--text-muted)]">{text}</p>
    </div>
  )
}

function List({ title, items, ordered, code }: { title: string; items: string[]; ordered?: boolean; code?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <div>
      <p className="mb-1 font-medium text-[var(--color-navy)]">{title}</p>
      <Tag className={ordered ? 'list-decimal space-y-1 ps-5' : 'list-disc space-y-1 ps-5'}>
        {items.map((item) => (
          <li key={item} className={code ? 'ltr-code text-xs' : undefined}>
            {item}
          </li>
        ))}
      </Tag>
    </div>
  )
}

function TwoCol({ left, right, a, b }: { left: string; right: string; a: string[]; b: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <List title={left} items={a} />
      <List title={right} items={b} />
    </div>
  )
}
