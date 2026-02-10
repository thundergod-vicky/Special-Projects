import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'
import Him1T from '../../teddy DAy/Him/him1_t.png'
import Him1 from '../../teddy DAy/Him/him1.jpg'
import Him2T from '../../teddy DAy/Him/him2_t.png'
import Him2 from '../../teddy DAy/Him/him2.jpg'
import Him3T from '../../teddy DAy/Him/him3_t.png'
import Him3 from '../../teddy DAy/Him/him3.jpg'
import Him4T from '../../teddy DAy/Him/him4_t.png'
import Him4 from '../../teddy DAy/Him/him4.jpg'
import Him5T from '../../teddy DAy/Him/him5_t.png'
import Him5 from '../../teddy DAy/Him/him5.jpg'
import Him6T from '../../teddy DAy/Him/him6_t.png'
import Him6 from '../../teddy DAy/Him/him6.jpg'
import Him7T from '../../teddy DAy/Him/him7_t.png'
import Him7 from '../../teddy DAy/Him/him7.jpg'

const HIM_OPTIONS = [
  {
    id: 'him1',
    front: Him1T,
    back: Him1,
    title: 'Soft Boy Teddy',
    subtitle: 'That “I will always keep you safe” look',
    icon: '🧸',
  },
  {
    id: 'him2',
    front: Him2T,
    back: Him2,
    title: 'Goofy Teddy',
    subtitle: 'The one who makes you laugh without trying',
    icon: '😄',
  },
  {
    id: 'him3',
    front: Him3T,
    back: Him3,
    title: 'Dreamy Teddy',
    subtitle: 'The way I look at you when you’re not watching',
    icon: '✨',
  },
  {
    id: 'him4',
    front: Him4T,
    back: Him4,
    title: 'Chilled Teddy',
    subtitle: 'The relaxed, “I&apos;m just happy you&apos;re here” vibe',
    icon: '😌',
  },
  {
    id: 'him5',
    front: Him5T,
    back: Him5,
    title: 'Serious Teddy',
    subtitle: 'The focused look when he&apos;s planning our future',
    icon: '🧠',
  },
  {
    id: 'him6',
    front: Him6T,
    back: Him6,
    title: 'Chaos Teddy',
    subtitle: 'The “let&apos;s do something stupid and fun” mood',
    icon: '🤪',
  },
  {
    id: 'him7',
    front: Him7T,
    back: Him7,
    title: 'Forever Teddy',
    subtitle: 'The one who looks like home, every single time',
    icon: '💖',
  },
]

export default function TeddyHop({ onBack, onNext }) {
  const [showIntroPopup, setShowIntroPopup] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HIM_OPTIONS.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const openModal = (index) => {
    setActiveIndex(index)
    setModalIndex(index)
  }

  const closeModal = () => {
    setModalIndex(null)
  }

  const goToPrev = () => {
    setModalIndex((current) => {
      if (current === null) return current
      const nextIndex = (current - 1 + HIM_OPTIONS.length) % HIM_OPTIONS.length
      setActiveIndex(nextIndex)
      return nextIndex
    })
  }

  const goToNext = () => {
    setModalIndex((current) => {
      if (current === null) return current
      const nextIndex = (current + 1) % HIM_OPTIONS.length
      setActiveIndex(nextIndex)
      return nextIndex
    })
  }

  return (
    <motion.div
      key="teddyHop"
      className="screen teddy-screen teddy-hop"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="teddy-hop-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        A tiny hop between universes 🐾
      </motion.h2>

      {!showIntroPopup && (
        <motion.div
          className="teddy-hop-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="teddy-hop-text">
            In the TeddyVerse, your lover looks just as adorable as you do. Here&apos;s a tiny peek
            at him in a few of his teddy moods.
          </p>

          <div className="teddy-hop-options">
            {HIM_OPTIONS.map((opt, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`teddy-hop-option ${isActive ? 'teddy-hop-option--active' : ''}`}
                  onClick={() => openModal(index)}
                >
                  <div className="teddy-hop-flip">
                    <div className="teddy-hop-face teddy-hop-face-front">
                      <CuteImage
                        src={opt.front}
                        alt={`${opt.title} teddy`}
                        className="teddy-hop-image"
                        fallbackEmoji="🧸"
                      />
                    </div>
                    <div className="teddy-hop-face teddy-hop-face-back">
                      <CuteImage
                        src={opt.back}
                        alt={`${opt.title} real`}
                        className="teddy-hop-image"
                        fallbackEmoji="💕"
                      />
                    </div>
                  </div>
                  <div className="teddy-hop-label">
                    <span className="teddy-hop-icon">{opt.icon}</span>
                    <div className="teddy-hop-info">
                      <div className="teddy-hop-main">{opt.title}</div>
                      <div className="teddy-hop-subtitle">{opt.subtitle}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <button type="button" className="teddy-btn teddy-hop-next-btn" onClick={onNext}>
            Back to my teddy →
          </button>

          {modalIndex !== null && (
            <div className="teddy-verse-modal-overlay" onClick={closeModal}>
              <motion.div
                className="teddy-verse-modal"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="teddy-verse-modal-close"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  ×
                </button>
                <div className="teddy-verse-modal-content">
                  <div className="teddy-verse-modal-left">
                    <div className="teddy-verse-modal-flip">
                      <div className="teddy-verse-modal-face teddy-verse-modal-face-front">
                        <CuteImage
                          src={HIM_OPTIONS[modalIndex].front}
                          alt={`${HIM_OPTIONS[modalIndex].title} teddy`}
                          className="teddy-verse-modal-image"
                          fallbackEmoji="🧸"
                        />
                      </div>
                      <div className="teddy-verse-modal-face teddy-verse-modal-face-back">
                        <CuteImage
                          src={HIM_OPTIONS[modalIndex].back}
                          alt={`${HIM_OPTIONS[modalIndex].title} real`}
                          className="teddy-verse-modal-image"
                          fallbackEmoji="💕"
                        />
                      </div>
                    </div>
                    <p className="teddy-verse-modal-hint">
                      Hover over the picture to see the real him inside this teddy.
                    </p>
                  </div>
                  <div className="teddy-verse-modal-right">
                    <h3 className="teddy-verse-modal-title">
                      <span className="teddy-hop-icon">{HIM_OPTIONS[modalIndex].icon}</span>{' '}
                      {HIM_OPTIONS[modalIndex].title}
                    </h3>
                    <p className="teddy-verse-modal-subtitle">
                      {HIM_OPTIONS[modalIndex].subtitle}
                    </p>
                    <p className="teddy-verse-modal-text">
                      In this little corner of the TeddyVerse, this is how your teddy boy looks to
                      me—soft, adorable, and completely impossible not to love.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="teddy-verse-modal-arrow teddy-verse-modal-arrow-left"
                  aria-label="Previous teddy"
                  onClick={goToPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="teddy-verse-modal-arrow teddy-verse-modal-arrow-right"
                  aria-label="Next teddy"
                  onClick={goToNext}
                >
                  ›
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {showIntroPopup && (
        <div className="popup-overlay teddy-hop-intro-overlay">
          <motion.div
            className="popup-box teddy-hop-intro-box"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="popup-emoji">🧸✨</div>
            <h2 className="popup-title">You might be wondering…</h2>
            <p className="popup-text">
              how your lover looks like in the TeddyVerse.
              <br />
              Let&apos;s take a little peek together.
            </p>
            <button
              type="button"
              className="popup-btn"
              onClick={() => setShowIntroPopup(false)}
            >
              Lets See →
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

