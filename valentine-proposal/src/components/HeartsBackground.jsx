import { HEARTS } from '../constants/index.js'

export default function HeartsBackground() {
  return (
    <div className="hearts-bg" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span key={i} className="heart-float" style={{ left: `${5 + i * 10}%` }}>
          {h}
        </span>
      ))}
    </div>
  )
}
