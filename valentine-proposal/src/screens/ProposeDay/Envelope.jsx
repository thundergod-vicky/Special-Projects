import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

export default function Envelope({ envelopeOpen, onOpenEnvelope }) {
  return (
    <motion.div
      key="envelope"
      className="screen envelope-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="envelope-caption"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {GIRL_NAME}, you found all my hearts 💕
      </motion.p>
      <motion.div
        className={`envelope-container ${envelopeOpen ? 'open' : ''}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        <div className="envelope">
          <div className="envelope-pocket" />
          <div className="envelope-letter-preview" />
          <div className="envelope-flap" />
          <div className="envelope-seal">❤️</div>
        </div>
      </motion.div>
      {!envelopeOpen && (
        <motion.button
          type="button"
          className="open-btn envelope-open-btn"
          onClick={onOpenEnvelope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Open Me
        </motion.button>
      )}
    </motion.div>
  )
}
