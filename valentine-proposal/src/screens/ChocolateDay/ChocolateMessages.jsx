import { motion, AnimatePresence } from 'framer-motion'
import { CHOCOLATE_MESSAGES, CHOCOLATE_MESSAGE_IMAGES } from '../../constants/chocolate.js'

export default function ChocolateMessages({ chocolateMessageIndex, setChocolateMessageIndex, onBack, onNext }) {
  return (
    <motion.div
      key="chocolateMessages"
      className="screen chocolate-screen chocolate-messages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className="chocolate-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={chocolateMessageIndex}
          className="chocolate-message-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          <img
            src={CHOCOLATE_MESSAGE_IMAGES[chocolateMessageIndex]}
            alt=""
            className="chocolate-message-image"
          />
          <p className="chocolate-message-text">
            {CHOCOLATE_MESSAGES[chocolateMessageIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="chocolate-message-dots">
        {CHOCOLATE_MESSAGES.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === chocolateMessageIndex ? 'active' : ''}`}
            aria-hidden
          />
        ))}
      </div>
      <div className="chocolate-message-actions">
        {chocolateMessageIndex > 0 && (
          <motion.button
            type="button"
            className="chocolate-btn chocolate-btn-small chocolate-btn-prev"
            onClick={() => setChocolateMessageIndex((i) => i - 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Previous
          </motion.button>
        )}
        {chocolateMessageIndex < CHOCOLATE_MESSAGES.length - 1 ? (
          <motion.button
            type="button"
            className="chocolate-btn chocolate-btn-small"
            onClick={() => setChocolateMessageIndex((i) => i + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Next 💕
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="chocolate-btn"
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue →
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
