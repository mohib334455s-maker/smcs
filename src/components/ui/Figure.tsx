export function Figure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 ${className}`} data-reveal>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-48 w-full object-cover transition duration-700 hover:scale-[1.03] md:h-56"
      />
      {caption ? <figcaption className="px-4 py-3 text-sm text-[var(--text-muted)]">{caption}</figcaption> : null}
    </figure>
  )
}
