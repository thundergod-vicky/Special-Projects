import { useState } from 'react'

export default function CuteImage({ src, alt, className, fallbackEmoji = '🐻' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} teddy-fallback`} role="img" aria-label={alt}>
        <span className="teddy-fallback-emoji">{fallbackEmoji}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
