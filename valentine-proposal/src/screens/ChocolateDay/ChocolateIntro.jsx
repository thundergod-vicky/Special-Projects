import { motion } from 'framer-motion'

export default function ChocolateIntro({ onBack, onNext }) {
  return (
    <motion.div
      key="chocolateIntro"
      className="screen chocolate-screen chocolate-intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="chocolate-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.div
        className="chocolate-float chocolate-float-1"
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍫
      </motion.div>
      <motion.div
        className="chocolate-float chocolate-float-2"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        🍬
      </motion.div>
      <motion.h1
        className="chocolate-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        🍫 Chocolate Day 🍫
      </motion.h1>
      <motion.p
        className="chocolate-date"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        February 9
      </motion.p>
      <motion.p
        className="chocolate-intro-text"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        You picked the sweetest day of the week...
      </motion.p>
      <motion.p
        className="chocolate-intro-sub"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        Let&apos;s make it extra sweet 💕
      </motion.p>
      <motion.button
        className="chocolate-btn"
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Lets Eat Some Choclate Together
      </motion.button>
    </motion.div>
  )
}
