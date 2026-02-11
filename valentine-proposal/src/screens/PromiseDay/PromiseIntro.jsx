import { motion } from 'framer-motion'
import { PROMISE_DAY_TAGLINE } from '../../constants/promise.js'

export default function PromiseIntro({ onBack, onNext }) {
  return (
    <motion.div
      key="promiseIntro"
      className="screen promise-screen promise-intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="promise-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.div
        className="promise-float promise-float-1"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🤝
      </motion.div>
      <motion.div
        className="promise-float promise-float-2"
        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        💕
      </motion.div>
      <motion.h1
        className="promise-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        🤝 Promise Day 🤝
      </motion.h1>
      <motion.p
        className="promise-date"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        February 11
      </motion.p>
      <motion.p
        className="promise-intro-text"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {PROMISE_DAY_TAGLINE}
      </motion.p>
      <motion.p
        className="promise-intro-sub"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        Tap to discover the promises I make to you.
      </motion.p>
      <motion.button
        className="promise-btn"
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        See my promises →
      </motion.button>
    </motion.div>
  )
}
