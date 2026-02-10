import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CuteImage from '../../components/CuteImage.jsx'

import BadassT from '../../teddy DAy/badass_t.png'
import Badass from '../../teddy DAy/badaas.jpg'
import CuteT from '../../teddy DAy/cute_t.png'
import Cute from '../../teddy DAy/cute.png'
import FunnyT from '../../teddy DAy/funny_t.png'
import Funny from '../../teddy DAy/funny.jpg'
import OverwhelmedT from '../../teddy DAy/overwhelmed_t.png'
import Overwhelmed from '../../teddy DAy/overwhelmed.jpg'
import PookieT from '../../teddy DAy/pookie_t.png'
import Pookie from '../../teddy DAy/pookie.jpg'
import PrettyT from '../../teddy DAy/pretty_t.png'
import Pretty from '../../teddy DAy/pretty.png'

const OPTIONS = [
  {
    id: 'cute',
    front: CuteT,
    back: Cute,
    title: 'Soft Teddy',
    subtitle: 'The cutest little pookie face',
    icon: '🧸',
  },
  {
    id: 'funny',
    front: FunnyT,
    back: Funny,
    title: 'Giggle Teddy',
    subtitle: 'The one who makes me laugh the loudest',
    icon: '😂',
  },
  {
    id: 'overwhelmed',
    front: OverwhelmedT,
    back: Overwhelmed,
    title: 'Overwhelmed Teddy',
    subtitle: 'The “I can’t believe you love me this much” face',
    icon: '🥹',
  },
  {
    id: 'pookie',
    front: PookieT,
    back: Pookie,
    title: 'Pookie Teddy',
    subtitle: 'The most precious person in my universe',
    icon: '💖',
  },
  {
    id: 'pretty',
    front: PrettyT,
    back: Pretty,
    title: 'Pretty Teddy',
    subtitle: 'Looking like a dream I never want to wake from',
    icon: '✨',
  },
  {
    id: 'badass',
    front: BadassT,
    back: Badass,
    title: 'Badass Teddy',
    subtitle: 'Soft heart, strong mind, unbeatable energy',
    icon: '🔥',
  },
]

export default function TeddyVerseGallery({ onBack, onNext, onHop }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState(null)
  const [showHopDialog, setShowHopDialog] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % OPTIONS.length)
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
      const nextIndex = (current - 1 + OPTIONS.length) % OPTIONS.length
      setActiveIndex(nextIndex)
      return nextIndex
    })
  }

  const goToNext = () => {
    setModalIndex((current) => {
      if (current === null) return current
      const nextIndex = (current + 1) % OPTIONS.length
      setActiveIndex(nextIndex)
      return nextIndex
    })
  }

  return (
    <motion.div
      key="teddyVerseGallery"
      className="screen teddy-screen teddy-verse-gallery"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="teddy-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="teddy-verse-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        Welcome back to the TeddyVerse 🐻✨
      </motion.h2>

      <motion.p
        className="teddy-verse-sub"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Each teddy here is a version of you. Hover to see the real you beneath the teddy skin.
      </motion.p>

      <div className="teddy-verse-options">
        {OPTIONS.map((opt, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={opt.id}
              type="button"
              className={`teddy-verse-option ${isActive ? 'teddy-verse-option--active' : ''}`}
              onClick={() => openModal(index)}
            >
              <div className="teddy-verse-flip">
                <div className="teddy-verse-face teddy-verse-face-front">
                  <CuteImage
                    src={opt.front}
                    alt={`${opt.title} teddy`}
                    className="teddy-verse-image"
                    fallbackEmoji="🧸"
                  />
                </div>
                <div className="teddy-verse-face teddy-verse-face-back">
                  <CuteImage
                    src={opt.back}
                    alt={`${opt.title} real`}
                    className="teddy-verse-image"
                    fallbackEmoji="💕"
                  />
                </div>
              </div>
              <div className="teddy-verse-label">
                <span className="teddy-verse-icon">{opt.icon}</span>
                <div className="teddy-verse-info">
                  <div className="teddy-verse-main">{opt.title}</div>
                  <div className="teddy-verse-subtitle">{opt.subtitle}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <motion.button
        type="button"
        className="teddy-btn teddy-verse-next-btn"
        onClick={onNext}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Back to this universe →
      </motion.button>

      <motion.button
        type="button"
        className="teddy-btn teddy-verse-hop-btn"
        onClick={() => setShowHopDialog(true)}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Lets Hop Around 🐻✨
      </motion.button>

      {showHopDialog && (
        <div className="teddy-verse-hop-overlay" onClick={() => setShowHopDialog(false)}>
          <motion.div
            className="teddy-verse-hop-dialog"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="teddy-verse-hop-title">
              You might have seen one teddy on the first page…
            </h3>
            <p className="teddy-verse-hop-text">
              Would you like to see him properly in the TeddyVerse?
            </p>
            <button
              type="button"
              className="teddy-btn"
              onClick={() => {
                setShowHopDialog(false)
                onHop()
              }}
            >
              Okay →
            </button>
          </motion.div>
        </div>
      )}

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
                      src={OPTIONS[modalIndex].front}
                      alt={`${OPTIONS[modalIndex].title} teddy`}
                      className="teddy-verse-modal-image"
                      fallbackEmoji="🧸"
                    />
                  </div>
                  <div className="teddy-verse-modal-face teddy-verse-modal-face-back">
                    <CuteImage
                      src={OPTIONS[modalIndex].back}
                      alt={`${OPTIONS[modalIndex].title} real`}
                      className="teddy-verse-modal-image"
                      fallbackEmoji="💕"
                    />
                  </div>
                </div>
                <p className="teddy-verse-modal-hint">
                  Hover over the picture to see the real you inside this teddy.
                </p>
              </div>
              <div className="teddy-verse-modal-right">
                <h3 className="teddy-verse-modal-title">
                  <span className="teddy-verse-icon">{OPTIONS[modalIndex].icon}</span>{' '}
                  {OPTIONS[modalIndex].title}
                </h3>
                <p className="teddy-verse-modal-subtitle">{OPTIONS[modalIndex].subtitle}</p>
                <p className="teddy-verse-modal-text">
                  In this corner of the TeddyVerse, this is how I see you—every version soft,
                  lovable, and completely irreplaceable.
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
  )
}

