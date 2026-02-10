import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TeddyTravelQuestion({ onBack, onYes }) {
  const [noBroken, setNoBroken] = useState(false)

  return (
    <motion.div
      key="teddyTravelQuestion"
      className="screen teddy-screen teddy-travel-question"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="teddy-travel-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        You might want to travel back to the TeddyVerse…
      </motion.h2>

      <motion.p
        className="teddy-travel-sub"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Would you like to take one more little trip there with me?
      </motion.p>

      <motion.div
        className="teddy-travel-actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <motion.button
          type="button"
          className="teddy-btn"
          onClick={onYes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Yes, take me to the TeddyVerse 🧸✨
        </motion.button>
        <motion.button
          type="button"
          className={`teddy-btn teddy-btn-outline teddy-travel-no-btn ${noBroken ? 'teddy-travel-no-btn--broken' : ''}`}
          onClick={() => {
            if (noBroken) return
            setNoBroken(true)
          }}
          whileHover={noBroken ? undefined : { scale: 1.03 }}
          whileTap={noBroken ? undefined : { scale: 0.98 }}
        >
          {noBroken ? '💔💔💔' : "I’ll stay in this universe for now 💕"}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

