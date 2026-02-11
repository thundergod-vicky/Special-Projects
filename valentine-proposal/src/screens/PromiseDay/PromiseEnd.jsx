import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function PromiseEnd({ onBackToHome }) {
  return (
    <motion.div
      key="promiseEnd"
      className="screen promise-screen promise-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="promise-end-emoji"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🤝 💕 🧸
      </motion.div>
      <motion.h2
        className="promise-end-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        Happy Promise Day, {GIRL_NAME}!
      </motion.h2>
      <motion.p
        className="promise-end-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        I meant every word. Here&apos;s to keeping our promises—together. 💕
      </motion.p>
      <motion.button
        className="promise-btn promise-btn-outline"
        onClick={onBackToHome}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Back to Valentine&apos;s Week
      </motion.button>
    </motion.div>
  )
}
