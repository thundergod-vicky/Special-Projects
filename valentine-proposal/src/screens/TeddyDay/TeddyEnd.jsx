import { useState } from 'react'
import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function TeddyEnd({ onBackToHome }) {
  const [showWhatsNext, setShowWhatsNext] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [revealedTokens, setRevealedTokens] = useState([false, false, false])

  const allTokensRevealed = revealedTokens.every(Boolean)

  const handleTokenClick = (index) => {
    setRevealedTokens((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <motion.div
      key="teddyEnd"
      className="screen teddy-screen teddy-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="teddy-end-emoji"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧸 💕 🐻
      </motion.div>
      <motion.h2
        className="teddy-end-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        Happy Teddy Day, {GIRL_NAME}!
      </motion.h2>
      <motion.p
        className="teddy-end-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        You&apos;re the best teddy I could ever ask for.
      </motion.p>

      <motion.div
        className="teddy-end-game"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {[
          'Tap to reveal a reason my heart chose you as my teddy.',
          'Another tiny way you make my world softer.',
          'One last little truth from your forever teddy.',
        ].map((prompt, index) => {
          const unlocked = revealedTokens[index]
          const revealedMessages = [
            'Because hugging you feels like home, every single time.',
            'Because even on your sleepy or grumpy days, you are still my favourite person.',
            'Because I can picture growing old with you and still calling you my teddy. 💕',
          ]
          return (
            <motion.button
              key={index}
              type="button"
              className={`teddy-end-token ${unlocked ? 'teddy-end-token--unlocked' : ''}`}
              onClick={() => handleTokenClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="teddy-end-token-emoji">{unlocked ? '💗' : '🧸'}</span>
              <span className="teddy-end-token-text">
                {unlocked ? revealedMessages[index] : prompt}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.button
        className={`teddy-btn teddy-end-whats-next-btn ${
          allTokensRevealed ? '' : 'teddy-btn-disabled'
        }`}
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={allTokensRevealed ? { scale: 0.98 } : undefined}
        onClick={allTokensRevealed ? () => setShowWhatsNext(true) : undefined}
      >
        {allTokensRevealed ? 'Whats now?' : 'Tap all three teddies first'}
      </motion.button>

      {canGoBack && (
        <motion.button
          className="teddy-btn teddy-btn-outline"
          onClick={onBackToHome}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Valentine&apos;s Week
        </motion.button>
      )}

      {showWhatsNext && (
        <div
          className="popup-overlay"
          onClick={() => {
            setShowWhatsNext(false)
            setCanGoBack(true)
          }}
        >
          <motion.div
            className="popup-box teddy-end-whatsnext-box"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-emoji">🧸💭</div>
            <h2 className="popup-title">You might be wondering…</h2>
            <p className="popup-text">
              Where are all our together pictures?
              <br />
              Where&apos;s the teddy loving his wife?
              <br />
              Just wait a little bit, baby—you&apos;ll see. For now, these are all. 💕
            </p>
            <button
              type="button"
              className="popup-btn"
              onClick={() => {
                setShowWhatsNext(false)
                setCanGoBack(true)
              }}
            >
              Okay →
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
