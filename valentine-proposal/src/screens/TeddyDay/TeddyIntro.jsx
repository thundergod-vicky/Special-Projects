import { motion } from 'framer-motion'
import { TEDDY_DAY_TAGLINE } from '../../constants/teddy.js'
import CuteImage from '../../components/CuteImage.jsx'
import TeddyAvatar from '../../teddy DAy/Purple and White Modern QR Code Wi-Fi Access Instagram Post.png'

export default function TeddyIntro({ onBack, onNext }) {
  return (
    <motion.div
      key="teddyIntro"
      className="screen teddy-screen teddy-day-intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>
      <motion.div
        className="teddy-float teddy-float-1"
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧸
      </motion.div>
      <motion.div
        className="teddy-float teddy-float-2"
        animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        🐻
      </motion.div>
      <motion.div
        className="teddy-intro-card"
        initial={{ opacity: 0, y: 15, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 18 }}
      >
        {/* Teddy avatar enters from below then waves / bounces gently */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 220, damping: 18 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 6, -4, 0] }}
            transition={{ delay: 0.7, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CuteImage
              src={TeddyAvatar}
              alt="Cute teddy for Teddy Day"
              className="teddy-intro"
              fallbackEmoji="🧸"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          className="teddy-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 220 }}
        >
          🐻 Teddy Day 🐻
        </motion.h1>
        <motion.p
          className="teddy-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          February 10
        </motion.p>
        <motion.p
          className="teddy-intro-text"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {TEDDY_DAY_TAGLINE}
        </motion.p>
        <motion.p
          className="teddy-intro-sub"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          Tap to meet my favourite one 💕
        </motion.p>
        <motion.button
          className="teddy-btn"
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Meet my teddy 🧸
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
