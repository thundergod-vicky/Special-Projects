import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'
import { SWEET_MEMORIES_IMAGES } from '../../constants/ourPics.js'
import { SWEET_MEMORIES_ITEMS } from '../../constants/chocolate.js'

export default function ChocolateEnd({
  onBack,
  onBackToHome,
  openedSweetMemories,
  setOpenedSweetMemories,
  hoveredSweetMemory,
  setHoveredSweetMemory,
}) {
  return (
    <motion.div
      key="chocolateEnd"
      className="screen chocolate-screen chocolate-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button type="button" className="chocolate-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.div
        className="chocolate-end-hearts"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍫 💕 🍫
      </motion.div>
      <motion.h2
        className="chocolate-end-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        Happy Chocolate Day, {GIRL_NAME}!
      </motion.h2>
      <motion.p
        className="chocolate-end-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        Thank you for being the sweetest part of my life 💕
      </motion.p>
      <motion.div
        className="sweet-memories-frame"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="sweet-memories-title">Sweet Memories</h3>
        <div className="sweet-memories-grid">
          {SWEET_MEMORIES_ITEMS.map((item, i) => {
            const isOpen = openedSweetMemories[i]
            const isFlipped = hoveredSweetMemory === i
            return (
              <div
                key={i}
                className="sweet-memories-card"
                onMouseEnter={() => isOpen && setHoveredSweetMemory(i)}
                onMouseLeave={() => setHoveredSweetMemory(null)}
              >
                {!isOpen ? (
                  <button
                    type="button"
                    className="sweet-memories-card-closed"
                    onClick={() => setOpenedSweetMemories((prev) => {
                      const next = [...prev]
                      next[i] = true
                      return next
                    })}
                    aria-label="Open memory"
                  >
                    <span className="sweet-memories-closed-icon">💕</span>
                    <span className="sweet-memories-closed-text">Tap to open</span>
                  </button>
                ) : (
                  <>
                    <div className="sweet-memories-card-flip-wrap">
                      <div
                        className="sweet-memories-card-flip-inner"
                        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                      >
                        <div className="sweet-memories-card-front">
                          <div className="sweet-memories-card-img-wrap">
                            {SWEET_MEMORIES_IMAGES[i] ? (
                              <img src={SWEET_MEMORIES_IMAGES[i]} alt="" className="sweet-memories-img" />
                            ) : (
                              <div className="sweet-memories-placeholder">💕</div>
                            )}
                          </div>
                        </div>
                        <div className="sweet-memories-card-back">
                          <p className="sweet-memories-elaborate-msg">{item.elaborate}</p>
                        </div>
                      </div>
                    </div>
                    <p className="sweet-memories-card-msg">{item.msg}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
      <motion.button
        className="chocolate-btn chocolate-btn-outline"
        onClick={onBackToHome}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Back to Valentine&apos;s Week
      </motion.button>
    </motion.div>
  )
}
