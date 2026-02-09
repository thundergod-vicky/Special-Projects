import { useState } from 'react'
import { motion } from 'framer-motion'

const colors = ['#ff6b9d', '#ff85a2', '#ffd700', '#c8a2c8', '#98fb98', '#87ceeb']

export default function Confetti({ active }) {
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[i % colors.length],
      size: 8 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  )

  if (!active) return null

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
          initial={{ y: -50, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: 0.6,
            rotate: p.rotation + 720,
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
