import { motion } from 'framer-motion'
import { GIRL_NAME, BOY_NAME } from '../../constants/index.js'

export default function FinalDeclaration({ onBack, onYes }) {
  return (
    <motion.div
      key="finalDeclaration"
      className="screen valentine-screen final-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <button type="button" className="valentine-back-btn" onClick={onBack}>
        ← Back
      </button>

      <motion.div
        className="final-box"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        <span className="final-emoji">💍</span>
        <h1 className="final-title">Will you be my Valentine forever?</h1>
        <p className="final-text">
          Everything we've shared, every laugh, every tear, has led us to this moment.
          I love you more than words can express, {GIRL_NAME}.
        </p>

        <div className="final-actions">
          <motion.button
            type="button"
            className="valentine-btn-large"
            onClick={onYes}
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.9 }}
          >
            YES, FOREVER! ❤️
          </motion.button>
        </div>
        
        <p className="final-signature">— Love, {BOY_NAME}</p>
      </motion.div>
    </motion.div>
  )
}
