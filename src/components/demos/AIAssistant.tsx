import { useState } from 'react'
import { aiPresets } from '../../data/sample'

const prompts = Object.keys(aiPresets)

export function AIAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'این پنل یک نمونه مفهومی است. مدل هوش مصنوعی واقعی متصل نیست. یکی از پرسش‌های نمونه را انتخاب کنید.' },
  ])

  const ask = (prompt: string) => {
    setMessages((m) => [...m, { role: 'user', text: prompt }, { role: 'assistant', text: aiPresets[prompt] }])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {prompts.map((p) => (
          <button key={p} type="button" onClick={() => ask(p)} className="text-sm text-[var(--color-teal)] underline-offset-4 transition hover:text-[var(--color-navy)] hover:underline">
            {p}
          </button>
        ))}
      </div>
      <div className="max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`animate-msg text-sm leading-7 ${m.role === 'user' ? 'font-medium text-[var(--color-navy)]' : 'text-[var(--text-muted)]'}`}
          >
            <span className="text-xs tracking-wide text-[var(--text-muted)]">{m.role === 'user' ? 'پرسش' : 'پاسخ'} · </span>
            {m.text}
          </div>
        ))}
      </div>
    </div>
  )
}
