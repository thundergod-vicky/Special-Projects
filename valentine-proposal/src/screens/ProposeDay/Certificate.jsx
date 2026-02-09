import { motion } from 'framer-motion'
import { GIRL_NAME, BOY_NAME } from '../../constants/index.js'

export default function Certificate({ onOpenLetter }) {
  return (
    <motion.div
      key="certificate"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="certificate-box"
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
      >
        <p className="certificate-title">🏆 Official Certificate 🏆</p>
        <p className="certificate-sub">This certifies that</p>
        <p className="certificate-name">{GIRL_NAME}</p>
        <p className="certificate-sub">is officially the</p>
        <p className="certificate-award">Best Valentine Ever 💕</p>
        <p className="certificate-date">Propose Day · {BOY_NAME} & {GIRL_NAME}</p>
        <p className="certificate-signature">Signed: {BOY_NAME} 🐻</p>
      </motion.div>
      <motion.p
        className="certificate-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        The end. (But {BOY_NAME} & {GIRL_NAME}'s story is just beginning 💖)
      </motion.p>
      <motion.button
        type="button"
        className="open-btn letter-open-btn"
        onClick={onOpenLetter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Read your letter, {GIRL_NAME} 💌
      </motion.button>
    </motion.div>
  )
}
