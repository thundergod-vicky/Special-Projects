import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import { OUR_PICS_URLS, BOOK_COVER_IMAGE } from '../../constants/ourPics.js'

export default function Proposal({ noPosition, onYes, onNoRunAway }) {
  return (
    <motion.div
      key="proposal"
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p
        className="proposal-title"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        Will you be my Valentine? 💖
      </motion.p>
      <motion.p
        className="proposal-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        (Propose Day – no takebacks! 😄)
      </motion.p>
      <motion.div
        className="teddies-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CuteImage src={OUR_PICS_URLS[0]} alt="Us 1" className="teddy-small" />
        <CuteImage src={BOOK_COVER_IMAGE} alt="Us 2" className="teddy-small" />
        <CuteImage src={OUR_PICS_URLS[4]} alt="Us 3" className="teddy-small" />
      </motion.div>
      <motion.div
        className="buttons-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="yes-btn"
          onClick={onYes}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          Yes! 💕
        </motion.button>
        <motion.div
          className="no-btn-wrapper"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            transition: 'transform 0.15s ease-out',
          }}
          onMouseEnter={onNoRunAway}
          onMouseMove={onNoRunAway}
        >
          <motion.button
            className="no-btn"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNoRunAway}
          >
            Maybe later 😅
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
