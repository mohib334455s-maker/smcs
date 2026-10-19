import { useState } from 'react'
import { allPermissions, roles } from '../../data/roles'

export function RolesMatrix() {
  const [roleId, setRoleId] = useState(roles[0].id)
  const role = roles.find((r) => r.id === roleId) ?? roles[0]

  return (
    <div className="space-y-5">
      <p className="text-sm leading-8 text-[var(--text-muted)]">
        در سیستم واقعی، کنترل دسترسی باید در سمت خدمت‌دهنده اجرا شود؛ نمایش در صفحه به‌تنهایی کافی نیست.
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-[var(--border)] pb-3">
        {roles.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRoleId(r.id)}
            className={`text-sm transition ${roleId === r.id ? 'font-semibold text-[var(--color-teal)]' : 'text-[var(--text-muted)] hover:text-[var(--color-navy)]'}`}
          >
            {r.name}
          </button>
        ))}
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-[var(--color-navy)]">{role.name}</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {allPermissions.map((p) => {
            const allowed = role.permissions.includes(p)
            return (
              <div key={p} className="rounded-xl border border-[var(--border)] bg-white/70 px-3 py-2 text-sm transition duration-300" data-reveal>
                <span className="font-medium text-[var(--color-navy)]">{p}</span>
                <p className="text-xs text-[var(--text-muted)]">{allowed ? 'مجاز (نمونه)' : 'غیرمجاز'}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
