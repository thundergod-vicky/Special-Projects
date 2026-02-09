import { motion } from 'framer-motion'

export default function Loading({ loadingProgress }) {
  return (
    <motion.div
      key="loading"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p
        className="step-title loading-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Preparing something special...
      </motion.p>
      <motion.p
        className="loading-msg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {loadingProgress < 50 && 'Loading love... 💕'}
        {loadingProgress >= 50 && loadingProgress < 100 && 'Loading teddies... 🐻'}
        {loadingProgress === 100 && "Done! You're the best! 🎉"}
      </motion.p>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <motion.div
        className="loading-teddies"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="loading-emoji">🐻</span>
        <span className="loading-emoji">💖</span>
        <span className="loading-emoji">🐻</span>
      </motion.div>
    </motion.div>
  )
}
