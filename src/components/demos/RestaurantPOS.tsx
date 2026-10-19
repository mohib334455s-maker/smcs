import { useMemo, useState } from 'react'
import { menuItems } from '../../data/sample'
import { formatNumber } from '../../lib/utils'

type CartLine = { id: string; name: string; price: number; qty: number }

export function RestaurantPOS() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [taxRate, setTaxRate] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [paid, setPaid] = useState(false)
  const [method, setMethod] = useState('نقد')

  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart])
  const discountAmt = Math.min(discount, subtotal)
  const taxable = Math.max(subtotal - discountAmt, 0)
  const tax = Math.round((taxable * taxRate) / 100)
  const total = taxable + tax

  const add = (item: (typeof menuItems)[0]) => {
    setPaid(false)
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  const setQty = (id: string, qty: number) => {
    setPaid(false)
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)).filter((p) => p.qty > 0))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:col-span-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => add(item)}
              className="rounded-xl border border-[var(--border)] bg-white/80 py-3 px-3 text-right transition duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-sm"
            >
              <p className="font-medium text-[var(--color-navy)]">{item.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{item.category}</p>
              <p className="mt-1 text-sm">{formatNumber(item.price)} افغانی</p>
            </button>
          ))}
        </div>
        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-white/90 p-4 lg:col-span-2">
          <h4 className="font-semibold text-[var(--color-navy)]">سبد خرید</h4>
          {cart.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">سبد خالی است.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((line) => (
                <li key={line.id} className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <p>{line.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatNumber(line.price)} × {line.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setQty(line.id, line.qty - 1)} className="text-[var(--text-muted)]">−</button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.id, line.qty + 1)} className="text-[var(--text-muted)]">+</button>
                    <button type="button" onClick={() => setQty(line.id, 0)} className="text-[var(--color-danger)]">حذف</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="space-y-1">
              <span className="text-xs text-[var(--text-muted)]">مالیات ٪</span>
              <input type="number" min={0} value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || 0)} className="classic-input" />
            </label>
            <label className="space-y-1">
              <span className="text-xs text-[var(--text-muted)]">تخفیف</span>
              <input type="number" min={0} value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className="classic-input" />
            </label>
          </div>
          <div className="space-y-1 border-t border-[var(--border)] pt-3 text-sm">
            <Row label="جمع جزء" value={subtotal} />
            <Row label="تخفیف" value={discountAmt} />
            <Row label="مالیات" value={tax} />
            <Row label="قابل پرداخت" value={total} bold />
          </div>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="classic-select w-full">
            <option>نقد</option>
            <option>کارت</option>
            <option>انتقال</option>
          </select>
          <button type="button" disabled={!cart.length} onClick={() => setPaid(true)} className="classic-btn w-full">
            ثبت پرداخت نمونه ({method})
          </button>
          {paid ? <p className="text-sm text-[var(--color-success)]">پرداخت نمونه ثبت شد.</p> : null}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? 'font-semibold text-[var(--color-navy)]' : ''}`}>
      <span>{label}</span>
      <span>{formatNumber(value)}</span>
    </div>
  )
}
