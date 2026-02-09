import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import { TEDDY_IMAGES } from '../../constants/index.js'

export default function Intro({ onOpenSurprise }) {
  return (
    <motion.div
      key="intro"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p
        className="intro-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        💕 Propose Day Special 💕
      </motion.p>
      <motion.p
        className="intro-sub"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Something cute is waiting for you...
      </motion.p>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      >
        <CuteImage src={TEDDY_IMAGES[0]} alt="Cute teddy" className="teddy-intro" />
      </motion.div>
      <motion.button
        className="open-btn"
        onClick={onOpenSurprise}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Open the surprise 🎀
      </motion.button>
    </motion.div>
  )
}
