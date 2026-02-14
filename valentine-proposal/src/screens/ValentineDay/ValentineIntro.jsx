import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function ValentineIntro({ onBack, onNext }) {
  return (
    <motion.div
      key="valentineIntro"
      className="screen valentine-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <button type="button" className="valentine-back-btn" onClick={onBack}>
        ← Back
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <h1 className="valentine-title">Happy Valentine's Day! 💝</h1>
        <p className="valentine-date">February 14, 2026</p>
      </motion.div>

      <motion.div
        className="valentine-intro-box"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Today is the most special day of the week, {GIRL_NAME}.</p>
        <p>But for me, every day is special because I have you by my side.</p>
        <p>I've prepared a little journey of our love for you...</p>
      </motion.div>

      <motion.button
        type="button"
        className="valentine-btn"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start the Journey 💖
      </motion.button>
    </motion.div>
  )
}
