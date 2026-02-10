import { useState } from 'react'
import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'
import { TEDDY_REVEAL_HEADLINE, TEDDY_REVEAL_SUB } from '../../constants/teddy.js'

export default function TeddyReveal({ onBack, onNext }) {
  const [revealedTokens, setRevealedTokens] = useState([false, false, false])

  const allRevealed = revealedTokens.every(Boolean)

  const handleRevealClick = (index) => {
    setRevealedTokens((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <motion.div
      key="teddyReveal"
      className="screen teddy-screen teddy-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.div
        className="teddy-reveal-hearts"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🐻 💕 🧸
      </motion.div>
      <motion.div
        className="teddy-reveal-message-box"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
      >
        <motion.h2
          className="teddy-reveal-headline"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {TEDDY_REVEAL_HEADLINE}
        </motion.h2>
        <motion.p
          className="teddy-reveal-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {TEDDY_REVEAL_SUB}
        </motion.p>
        <motion.p
          className="teddy-reveal-extra"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          You&apos;re the one I want to hug forever, {GIRL_NAME}. Happy Teddy Day! 🧸💕
        </motion.p>
      </motion.div>

      <motion.div
        className="teddy-reveal-game"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        {[0, 1, 2].map((i) => {
          const unlocked = revealedTokens[i]
          const messages = [
            'Tap to reveal a reason you are my favorite teddy.',
            'Another little reason my heart chose you.',
            'One more tiny truth my teddy needs to know.',
          ]
          const revealedMessages = [
            'You make every hug feel like the safest place in the world.',
            'You turn even my ordinary days into something I look forward to.',
            'You are my teddy, my comfort, and my forever favourite human.',
          ]
          return (
            <motion.button
              key={i}
              type="button"
              className={`teddy-reveal-token ${unlocked ? 'teddy-reveal-token--unlocked' : ''}`}
              onClick={() => handleRevealClick(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="teddy-reveal-token-emoji">{unlocked ? '💗' : '🧸'}</span>
              <span className="teddy-reveal-token-text">
                {unlocked ? revealedMessages[i] : messages[i]}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.button
        className={`teddy-btn ${allRevealed ? '' : 'teddy-btn-disabled'}`}
        onClick={allRevealed ? onNext : undefined}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={allRevealed ? { scale: 1.05 } : undefined}
        whileTap={allRevealed ? { scale: 0.98 } : undefined}
      >
        {allRevealed ? 'One more thing 💕' : 'Tap all the hearts to continue'}
      </motion.button>
    </motion.div>
  )
}
