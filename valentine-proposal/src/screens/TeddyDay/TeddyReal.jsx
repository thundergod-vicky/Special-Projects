import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import { GIRL_NAME } from '../../constants/index.js'
import TeddyRealPic from '../../Our Pics /9.png'

export default function TeddyReal({ onBack, onNext }) {
  const [revealed, setRevealed] = useState(false)
  const [canFlip, setCanFlip] = useState(false)

  useEffect(() => {
    if (!revealed) return
    const id = setTimeout(() => setCanFlip(true), 3000)
    return () => clearTimeout(id)
  }, [revealed])

  return (
    <motion.div
      key="teddyReal"
      className="screen teddy-screen teddy-real"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="teddy-real-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Let me show you my teddy bear in this universe
      </motion.h2>

      {!revealed && (
        <motion.button
          className="teddy-btn teddy-real-reveal-btn"
          onClick={() => setRevealed(true)}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Reveal her 🐻
        </motion.button>
      )}

      {revealed && (
        <>
          <motion.div
            className={`teddy-real-image-wrap ${canFlip ? 'teddy-real-image-wrap--canflip' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="teddy-real-flip">
              <div className="teddy-real-face teddy-real-front">
                <CuteImage
                  src={TeddyRealPic}
                  alt={`${GIRL_NAME}, my teddy bear in this universe`}
                  className="teddy-real-image"
                  fallbackEmoji="💕"
                />
              </div>
              <div className="teddy-real-face teddy-real-backcard">
                <p className="teddy-real-back-line">
                  That&apos;s my teddy bear in this universe… and the one my heart always runs to. 💕
                </p>
                <p className="teddy-real-back-line">
                  The cutest, softest, most huggable teddy in my whole life.
                </p>
                <p className="teddy-real-back-line">
                  The sweetest gift God ever wrapped up for me.
                </p>
                <p className="teddy-real-back-line">
                  You&apos;re my safe place, my calm, my soft spot after every hard day.
                </p>
                <p className="teddy-real-back-line">
                  Not only in this universe and the TeddyVerse – I choose and love you in every
                  universe that could ever exist. 💖
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="teddy-real-messages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="teddy-real-caption">
              Hover over the photo to read what my heart says about you. 🐻💕
            </p>
          </motion.div>

          <motion.button
            className="teddy-btn"
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            See why you&apos;re the best →
          </motion.button>
        </>
      )}
    </motion.div>
  )
}

