import { motion } from 'framer-motion'

export default function Ready({ onReady }) {
  return (
    <motion.div
      key="ready"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p
        className="step-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Psst... 👀
      </motion.p>
      <motion.p
        className="step-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Close your eyes and count to 3...
        <br />
        <span className="step-funny">Just kidding! Keep them open, you'll miss the cute stuff 😄</span>
      </motion.p>
      <motion.span
        className="step-emoji"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🐻
      </motion.span>
      <motion.button
        className="open-btn ready-btn"
        onClick={onReady}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        I'm ready! 💕
      </motion.button>
    </motion.div>
  )
}
