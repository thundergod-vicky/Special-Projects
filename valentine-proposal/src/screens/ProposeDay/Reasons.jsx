import { motion } from 'framer-motion'
import { REASONS, PLEAD_MESSAGES } from '../../constants/index.js'

export default function Reasons({
  pleadStep,
  showHeartbrokenPopup,
  reasonsNoPosition,
  onCloseHeartbrokenPopup,
  onNoClick,
  onNoRunAway,
  onConvinced,
}) {
  return (
    <motion.div
      key="reasons"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {showHeartbrokenPopup && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onCloseHeartbrokenPopup}
        >
          <motion.div
            className="popup-box heartbroken-popup"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="popup-emoji">💔</span>
            <p className="popup-title">My heart is broken...</p>
            <p className="popup-text">You really said you're not convinced? 🥹 The teddies are crying. I'm gonna go eat ice cream and watch sad movies...</p>
            <button
              type="button"
              className="popup-btn"
              onClick={onCloseHeartbrokenPopup}
            >
              Okay... 😢
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.p
        className="step-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        A few reasons from the heart 💕
      </motion.p>
      <ul className="reasons-list">
        {REASONS.map((r, i) => (
          <motion.li
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.12 }}
          >
            {r}
          </motion.li>
        ))}
      </ul>

      {pleadStep >= 1 && (
        <motion.p
          className="plead-message"
          key={pleadStep}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {PLEAD_MESSAGES[pleadStep - 1]}
        </motion.p>
      )}

      <motion.div
        className="buttons-row reasons-buttons"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.button
          className="open-btn yes-reasons-btn"
          onClick={onConvinced}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          I'm convinced! Let's go 💖
        </motion.button>
        {pleadStep < 4 ? (
          <motion.button
            type="button"
            className="no-reasons-btn"
            onClick={onNoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            No, I'm not convinced 😅
          </motion.button>
        ) : (
          <motion.div
            className="no-btn-wrapper"
            style={{
              transform: `translate(${reasonsNoPosition.x}px, ${reasonsNoPosition.y}px)`,
              transition: 'transform 0.15s ease-out',
            }}
            onMouseEnter={onNoRunAway}
            onMouseMove={onNoRunAway}
          >
            <motion.button
              type="button"
              className="no-reasons-btn"
              onClick={onNoRunAway}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No, I'm not convinced 😅
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
