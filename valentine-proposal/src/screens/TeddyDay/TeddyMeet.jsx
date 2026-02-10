import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'
import CuteImage from '../../components/CuteImage.jsx'
import TeddyAvatar from '../../teddy DAy/Purple and White Modern QR Code Wi-Fi Access Instagram Post.png'

export default function TeddyMeet({ onBack, onRevealed }) {
  // 'front' -> first tap shows back
  // 'back'  -> second tap goes to next screen
  const [stage, setStage] = useState('front')

  const handleReveal = () => {
    if (stage === 'front') {
      setStage('back')
    } else if (stage === 'back') {
      onRevealed()
    }
  }

  return (
    <motion.div
      key="teddyMeet"
      className="screen teddy-screen teddy-meet"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.p
        className="teddy-meet-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Meet my favourite teddy 🧸
      </motion.p>

      <motion.p
        className="teddy-meet-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {stage === 'back'
          ? "That's right—it's you! 💕"
          : 'Tap the teddy to see who it is...'}
      </motion.p>

      <motion.div
        className="teddy-reveal-card-wrap"
        onClick={handleReveal}
        onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
        role="button"
        tabIndex={0}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 180 }}
      >
        <AnimatePresence mode="wait">
          {stage === 'front' ? (
            <motion.div
              key="front"
              className="teddy-reveal-card teddy-reveal-front"
              initial={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="teddy-reveal-emoji"
                animate={{ scale: [1, 1.12, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CuteImage
                  src={TeddyAvatar}
                  alt="Who is my teddy?"
                  className="teddy-reveal-avatar"
                  fallbackEmoji="🧸"
                />
              </motion.div>
              <p className="teddy-reveal-tap">Tap me!</p>
            </motion.div>
          ) : (
            stage === 'back' && (
              <motion.div
                key="back"
                className="teddy-reveal-card teddy-reveal-back"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <span className="teddy-reveal-heart">💕</span>
                <p className="teddy-reveal-you">It&apos;s you!</p>
                <p className="teddy-reveal-name">{GIRL_NAME}, you&apos;re my teddy 🐻</p>
                <span className="teddy-reveal-cta">Tap this card again to continue →</span>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Next button now lives on the follow-up screen, not here */}
    </motion.div>
  )
}
