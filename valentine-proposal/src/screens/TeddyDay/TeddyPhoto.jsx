import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import { GIRL_NAME } from '../../constants/index.js'
import TeddyGirl from '../../teddy DAy/Gemini_Generated_Image_blexoeblexoeblex.png'

export default function TeddyPhoto({ onBack, onNext }) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const [showPopup, setShowPopup] = useState(false)
  const [teddyChoice, setTeddyChoice] = useState('none') // 'none' | 'stay'

  useEffect(() => {
    // If she chose to stay in the TeddyVerse, stop the timer / popup logic
    if (teddyChoice === 'stay') return
    if (showPopup) return
    if (secondsLeft <= 0) {
      setShowPopup(true)
      return
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft, showPopup, teddyChoice])

  return (
    <motion.div
      key="teddyPhoto"
      className="screen teddy-screen teddy-photo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="teddy-photo-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Do you know who that teddy is?
      </motion.h2>

      <motion.p
        className="teddy-photo-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Here&apos;s a little glimpse of her 💕
      </motion.p>

      <motion.div
        className="teddy-photo-image-wrap"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 22 }}
      >
        <CuteImage
          src={TeddyGirl}
          alt={`${GIRL_NAME} as my teddy`}
          className="teddy-photo-image"
          fallbackEmoji="🐻"
        />
      </motion.div>

      <motion.div
        className="teddy-countdown"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {teddyChoice !== 'stay' && !showPopup && (
          <>
            <div className="teddy-countdown-ring" aria-hidden="true">
              <div className="teddy-countdown-number">{secondsLeft}</div>
            </div>
            <p className="teddy-countdown-text">
              Something special is loading just for you
            </p>
          </>
        )}

        {teddyChoice === 'stay' && (
          <>
            <p className="teddy-countdown-text teddy-apology-warning">
              You can&apos;t stay for long in this universe… it&apos;s time to get back to your
              main universe.
            </p>
            <motion.button
              className="teddy-btn"
              type="button"
              onClick={onNext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Let&apos;s go →
            </motion.button>
          </>
        )}
      </motion.div>

      {showPopup && teddyChoice !== 'stay' && (
        <div className="popup-overlay teddy-apology-overlay">
          <motion.div
            className="popup-box teddy-apology-box"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="popup-emoji">🧸💫</div>
            <h2 className="popup-title">Oh, I&apos;m really sorry…</h2>
            <p className="popup-text">
              I went to another universe in your love.
              <br />
              The teddy you just saw – that&apos;s you in the <strong>TeddyVerse</strong>. 💕
            </p>
            {teddyChoice === 'none' ? (
              <div className="popup-actions">
                <button
                  type="button"
                  className="popup-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNext()
                  }}
                >
                  Take me to this universe →
                </button>
                <button
                  type="button"
                  className="popup-btn popup-btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    setTeddyChoice('stay')
                    setShowPopup(false)
                  }}
                >
                  Let me be in the TeddyVerse
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="popup-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onNext()
                }}
              >
                Let&apos;s go →
              </button>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
