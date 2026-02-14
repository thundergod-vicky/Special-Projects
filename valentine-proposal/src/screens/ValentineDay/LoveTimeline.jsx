import { motion } from 'framer-motion'
import { useState } from 'react'

const MEMORIES = [
  {
    image: '/src/Our Pics /IMG_2146.png',
    title: 'The Beginning',
    text: 'Where our story started, and my life changed forever.'
  },
  {
    image: '/src/Our Pics /IMG_1424.png',
    title: 'Sweet Moments',
    text: 'Every second spent with you is a treasure I hold dear.'
  },
  {
    image: '/src/Our Pics /IMG_2408.png',
    title: 'Your Smile',
    text: 'The most beautiful sight in the world that lights up my day.'
  },
  {
    image: '/src/Our Pics /IMG_2641.png',
    title: 'Us Forever',
    text: 'Building a future filled with love, laughter, and you.'
  }
]

export default function LoveTimeline({ onBack, onNext }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      key="loveTimeline"
      className="screen valentine-screen timeline-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="valentine-back-btn" onClick={onBack}>
        ← Back
      </button>

      <h2 className="timeline-heading">Our Best Days 🎞️</h2>

      <div className="timeline-container">
        <div className="timeline-card">
          <motion.img
            key={MEMORIES[activeIndex].image}
            src={MEMORIES[activeIndex].image}
            alt={MEMORIES[activeIndex].title}
            className="timeline-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            key={MEMORIES[activeIndex].title}
            className="timeline-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>{MEMORIES[activeIndex].title}</h3>
            <p>{MEMORIES[activeIndex].text}</p>
          </motion.div>
        </div>

        <div className="timeline-dots">
          {MEMORIES.map((_, i) => (
            <button
              key={i}
              className={`timeline-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show memory ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="timeline-actions">
        {activeIndex < MEMORIES.length - 1 ? (
          <button className="valentine-btn" onClick={() => setActiveIndex(prev => prev + 1)}>
            Next Memory →
          </button>
        ) : (
          <button className="valentine-btn" onClick={onNext}>
            The Best is Yet to Come 💖
          </button>
        )}
      </div>
    </motion.div>
  )
}
