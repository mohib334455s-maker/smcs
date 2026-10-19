import { useEffect, useState } from 'react'
import { MainContent } from './components/sections/MainContent'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  const [pdfMode, setPdfMode] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isPdf = params.get('pdf') === '1' || params.get('print') === '1'
    setPdfMode(isPdf)
    if (isPdf) {
      document.documentElement.setAttribute('data-pdf', '1')
      document.documentElement.classList.add('pdf-export')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <article className="page-shell">
        <MainContent pdfMode={pdfMode} />
      </article>
    </div>
  )
}
