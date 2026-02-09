import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import { GIRL_NAME, BOY_NAME } from '../../constants/index.js'
import { OUR_PICS_URLS } from '../../constants/ourPics.js'
import { BOOK_COVER_IMAGE } from '../../constants/ourPics.js'

export default function Celebration({ onGetCertificate }) {
  return (
    <motion.div
      key="celebration"
      className="screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="celebration-title"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {GIRL_NAME} said YES! 🎉💕
      </motion.p>
      <motion.p
        className="celebration-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Best Propose Day ever, {GIRL_NAME} & {BOY_NAME}!
      </motion.p>
      <motion.div
        className="teddies-celebration"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CuteImage src={OUR_PICS_URLS[0]} alt="Us" className="teddy-celebration" />
        <CuteImage src={BOOK_COVER_IMAGE} alt="Us" className="teddy-celebration" />
        <CuteImage src={OUR_PICS_URLS[4]} alt="Us" className="teddy-celebration" />
      </motion.div>
      <motion.div
        className="message-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {GIRL_NAME}, you just made me the happiest person. Here's to us! 💖🐻 – {BOY_NAME}
      </motion.div>
      <motion.button
        className="open-btn cert-btn"
        onClick={onGetCertificate}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get your certificate 🏆
      </motion.button>
    </motion.div>
  )
}
