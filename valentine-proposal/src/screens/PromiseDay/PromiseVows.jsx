import { useState } from 'react'
import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'
import { PROMISES } from '../../constants/promise.js'

export default function PromiseVows({ onBack, onNext }) {
  const [revealed, setRevealed] = useState(Array(PROMISES.length).fill(false))

  const handleReveal = (index) => {
    setRevealed((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  const allRevealed = revealed.every(Boolean)

  return (
    <motion.div
      key="promiseVows"
      className="screen promise-screen promise-vows"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="promise-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.h2
        className="promise-vows-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        My promises to you, {GIRL_NAME} 💕
      </motion.h2>
      <motion.p
        className="promise-vows-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Tap each hand to reveal a promise.
      </motion.p>

      <div className="promise-vows-list">
        {PROMISES.map((p, i) => {
          const isRevealed = revealed[i]
          return (
            <motion.button
              key={i}
              type="button"
              className={`promise-vow-card ${isRevealed ? 'promise-vow-card--revealed' : ''}`}
              onClick={() => handleReveal(i)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={!isRevealed ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <span className="promise-vow-emoji">{isRevealed ? '💗' : '🤝'}</span>
              <span className="promise-vow-text">
                {isRevealed ? p.text : p.prompt}
              </span>
            </motion.button>
          )
        })}
      </div>

      {allRevealed && (
        <motion.button
          className="promise-btn"
          onClick={onNext}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Happy Promise Day →
        </motion.button>
      )}

      {!allRevealed && (
        <p className="promise-vows-hint">
          Tap all {PROMISES.length} hands to continue
        </p>
      )}
    </motion.div>
  )
}
