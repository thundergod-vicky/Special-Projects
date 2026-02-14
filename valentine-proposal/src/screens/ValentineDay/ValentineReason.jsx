import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function ValentineReason({ onBack, onNext }) {
  return (
    <motion.div
      key="valentineReason"
      className="screen valentine-screen reason-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <button type="button" className="valentine-back-btn" onClick={onBack}>
        ← Back
      </button>

      <motion.div
        className="reason-box"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="reason-emoji">✨</span>
        <h2 className="reason-title">To my dearest {GIRL_NAME},</h2>
        <p className="reason-text">
          I promise to love you, cherish you, and make you laugh every single day. 
          You're not just my girlfriend, you're my best friend and my entire world.
        </p>
        <p className="reason-text">
          Thank you for being you.
        </p>
      </motion.div>

      <motion.button
        type="button"
        className="valentine-btn"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        One More Thing... 💌
      </motion.button>
    </motion.div>
  )
}
