import { motion } from 'framer-motion'
import { TOTAL_HEARTS } from '../../constants/index.js'

export default function FindHearts({ gameSpots, heartsFound, revealedSpots, onCheckSpot }) {
  return (
    <motion.div
      key="findHearts"
      className="screen game-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="game-instructions"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="game-title">Find My Heart</h2>
        <p className="game-sub">
          I've hidden {TOTAL_HEARTS} hearts inside these gifts and surprises.
          <br />
          Click them to find where my heart lies!
        </p>
        <p className="game-score">Hearts Found: <span>{heartsFound}</span>/{TOTAL_HEARTS}</p>
      </motion.div>
      <div className="hiding-spots-container">
        {gameSpots.map((spot) => {
          const revealed = revealedSpots.has(spot.id)
          const foundHeart = revealed && spot.hasHeart
          return (
            <motion.div
              key={spot.id}
              className={`hiding-spot ${revealed ? (foundHeart ? 'revealed' : 'shaking') : ''}`}
              onClick={() => !revealed && onCheckSpot(spot.id, spot.hasHeart)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 + spot.id * 0.03, type: 'spring', stiffness: 200 }}
              whileHover={!revealed ? { scale: 1.1, y: -5 } : {}}
            >
              {foundHeart ? (
                <motion.span
                  className="found-heart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  ❤️
                </motion.span>
              ) : (
                <span className="hiding-icon">{spot.icon}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
