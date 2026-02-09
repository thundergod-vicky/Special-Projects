import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function ChocolateMeaning({ onBack, onNext }) {
  return (
    <motion.div
      key="chocolateMeaning"
      className="screen chocolate-screen chocolate-meaning"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className="chocolate-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.h2
        className="chocolate-heading"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        What is Chocolate Day?
      </motion.h2>
      <motion.div
        className="chocolate-meaning-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p>
          Chocolate Day is all about sharing sweetness with the one who makes your world brighter. 🍫✨
        </p>
        <p>
          It&apos;s not just about chocolates, but about the little moments, the warm smiles, and the love that makes everything feel special.
        </p>
        <p>
          Today is a reminder to celebrate us — to sweeten our bond with love, care, and the countless memories we&apos;re creating together. Whether it&apos;s a box of chocolates, a soft hug, or a simple message from the heart, every little thing feels sweeter when it&apos;s with you.
        </p>
        <p>
          You have this magical way of turning ordinary days into something beautiful, and life into something worth smiling about. 💫
          Just like chocolate, you add warmth, comfort, and happiness to my life in ways words can barely explain.
        </p>
        <p>
          Because you don&apos;t just make life sweeter, {GIRL_NAME}…
          you are the sweetness in my life. 💕🍫
        </p>
      </motion.div>
      <motion.button
        className="chocolate-btn"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Open my chocolate box 🍫
      </motion.button>
    </motion.div>
  )
}
