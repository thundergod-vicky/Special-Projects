import { motion } from 'framer-motion'
import { GIRL_NAME, BOY_NAME } from '../../constants/index.js'

export default function ChocolateUnwrap({ chocolateBoxOpen, setChocolateBoxOpen, onBack, onNext }) {
  return (
    <motion.div
      key="chocolateUnwrap"
      className="screen chocolate-screen chocolate-unwrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        className="chocolate-back-btn"
        onClick={() => { onBack(); setChocolateBoxOpen(false) }}
        aria-label="Go back"
      >
        ← Back
      </button>
      <motion.p
        className="chocolate-unwrap-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {chocolateBoxOpen ? 'So sweet! Hope it made you smile 💕🍫✨' : 'Tap the box to open it! 🎀'}
      </motion.p>
      <motion.div
        className={`chocolate-box-wrap ${chocolateBoxOpen ? 'opened' : ''}`}
        onClick={() => !chocolateBoxOpen && setChocolateBoxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => !chocolateBoxOpen && e.key === 'Enter' && setChocolateBoxOpen(true)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 180 }}
        whileTap={!chocolateBoxOpen ? { scale: 0.95 } : {}}
      >
        <img
          src="https://images.pexels.com/photos/360624/pexels-photo-360624.jpeg?auto=compress&cs=tinysrgb&w=520&h=400&fit=crop"
          alt="Chocolate gift box"
          className="chocolate-box-image"
        />
        <motion.div
          className="chocolate-box-inner"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={chocolateBoxOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: chocolateBoxOpen ? 0.4 : 0, duration: 0.4 }}
        >
          <span className="chocolate-box-emoji">🍫🍬💕</span>
          <p className="chocolate-box-message">
            You don't just make life sweeter—you are the sweetness in mine. 💕<br />
            This box is for you, but the real gift is every moment we share.<br />
            Happy Chocolate Day, {GIRL_NAME}. Here's to us. 🍫✨<br />
            <span className="chocolate-box-from">— With all my love, {BOY_NAME}</span>
          </p>
        </motion.div>
      </motion.div>
      {chocolateBoxOpen && (
        <motion.button
          className="chocolate-btn"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          More sweetness →
        </motion.button>
      )}
    </motion.div>
  )
}
