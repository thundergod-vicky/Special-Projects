import { useState } from 'react'
import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants/index.js'

// Promo-day gallery – 1 to 21 in serial order
import img1 from '../../promo day/1.jpg'
import img2 from '../../promo day/2.jpg'
import img3 from '../../promo day/3.jpg'
import img4 from '../../promo day/4.jpg'
import img5 from '../../promo day/5.jpg'
import img6 from '../../promo day/6.jpg'
import img7 from '../../promo day/7.jpg'
import img8 from '../../promo day/8.jpg'
import img9 from '../../promo day/9.jpg'
import img10 from '../../promo day/10.jpg'
import img11 from '../../promo day/11.jpg'
import img12 from '../../promo day/12.jpg'
import img13 from '../../promo day/13.jpg'
import img14 from '../../promo day/14.jpg'
import img15 from '../../promo day/15.jpg'
import img16 from '../../promo day/16.jpg'
import img17 from '../../promo day/17.jpg'
import img18 from '../../promo day/18.jpg'
import img19 from '../../promo day/19.jpg'
import img20 from '../../promo day/20.jpg'
import img21 from '../../promo day/21.png'

const PROMISE_MEMORIES = [
  { src: img1, title: 'The day we first met', description: 'The day we first met—when a normal moment secretly became the start of everything.' },
  { src: img2, title: 'Those soft little moments', description: 'Those soft little moments where the quiet between our laughs became the place my attraction to you grew.' },
  { src: img3, title: 'Your eyes, my peace', description: 'This is the first time I got really attracted to you after I got drunk and realised: the girl I am drawn to even then… she is the one.' },
  { src: img4, title: 'A tiny forever', description: 'The first time I sat with her with full pride and so much love.' },
  { src: img5, title: 'Etched in my heart', description: 'The first time you held my hands tightly—and I knew you are the one.' },
  { src: img6, title: 'Our silly hours', description: 'I got comfortable here. Felt like home sweet home.' },
  { src: img7, title: 'The smile I fell for', description: 'This smile is the one I want to see every day for the rest of my life.' },
  { src: img8, title: 'The promise I finally made', description: 'I finally prepared myself and made the proposal—and you accepted it. Of course it had to be on your special day.' },
  { src: img9, title: 'Candid love', description: 'The first time you fed me with your hands—it felt so simple, so caring, like a tiny taste of heaven.' },
  { src: img10, title: 'Little adventures', description: 'The day I made my first move. That’s my question for you—remember what I did that day?' },
  { src: img11, title: 'I choose you', description: 'The day we were drunk on each other—without drinking a single drop of alcohol.' },
  { src: img12, title: 'Warm hugs', description: 'The day I did the actual proposal. I said with all my heart: I love you, for the rest of my life.' },
  { src: img13, title: 'Just us two', description: 'I dove into the depth of your divine eyes and got lost there forever.' },
  { src: img14, title: 'Our chaos, our comfort', description: 'Of course this picture had to be here—it’s my favourite picture of you. Just kidding. You’re my favourite in every attire.' },
  { src: img15, title: 'You glowing', description: 'This day I had you completely—heart, smile, and every moment, all mine.' },
  { src: img16, title: 'Heart snapshot', description: 'In this moment I felt you were completely mine—every bit of you, not a single part left out.' },
  { src: img17, title: 'The way you look at me', description: 'The best kiss I have ever got in my life. It’s you, it’s only you. And It was the day.' },
  { src: img18, title: 'Safe and loved', description: 'Our first Saraswati Puja together. The best memories were only just beginning.' },
  { src: img19, title: 'Our little world', description: 'This was my special day—and you were with me. That was the biggest blessing of all.' },
  { src: img20, title: 'Soft promises', description: 'The best night I have ever had in my whole life—and one of the best pictures of us too.' },
  { src: img21, title: 'Forever kind of love', description: 'And today it’s you—fully mine, completely mine. My baby, my sweetheart, my everything.' },
]

export default function PromiseMemories({ onBack, onNext }) {
  const [items, setItems] = useState(PROMISE_MEMORIES)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const handleNext = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev
      return [...prev.slice(1), prev[0]]
    })
  }

  const handlePrev = () => {
    setItems((prev) => {
      if (prev.length <= 1) return prev
      return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]
    })
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const showNextInLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev == null) return prev
      return (prev + 1) % items.length
    })
  }

  const showPrevInLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev == null) return prev
      return (prev - 1 + items.length) % items.length
    })
  }

  return (
    <motion.div
      key="promiseMemories"
      className="screen promise-screen promise-memories"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      <button type="button" className="promise-back-btn" onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <motion.h2
        className="promise-memories-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        Our promise memories, {GIRL_NAME} 💞
      </motion.h2>
      <motion.p
        className="promise-memories-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Slide through our little gallery. Every picture is a promise I want to keep with you.
      </motion.p>

      <div className="promise-memories-container">
        <div className="promise-memories-slide">
          {items.map((item, index) => (
            <div
              key={index}
              className="promise-memories-item"
              style={{ backgroundImage: `url(${item.src})` }}
            >
              <div className="promise-memories-content">
                <div className="promise-memories-name">{item.title}</div>
                <div className="promise-memories-des">{item.description}</div>
                <button
                  type="button"
                  className="promise-memories-see-more"
                  onClick={() => openLightbox(index)}
                >
                  See more of us
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="promise-memories-nav">
          <button type="button" className="promise-memories-arrow" onClick={handlePrev}>
            ‹
          </button>
          <button type="button" className="promise-memories-arrow" onClick={handleNext}>
            ›
          </button>
        </div>
      </div>

      <motion.button
        className="promise-btn promise-memories-cta"
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Seal these promises →
      </motion.button>

      {lightboxIndex != null && (
        <div className="promise-memories-modal-backdrop" onClick={closeLightbox}>
          <motion.div
            className="promise-memories-modal"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="promise-memories-modal-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="promise-memories-modal-main">
              <div className="promise-memories-modal-image-wrap">
                <img
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].title}
                  className="promise-memories-modal-image"
                />
              </div>
              <div className="promise-memories-modal-text">
                <h3 className="promise-memories-modal-title">
                  {items[lightboxIndex].title}
                </h3>
                <p className="promise-memories-modal-note">
                  {items[lightboxIndex].description}
                </p>
                <div className="promise-memories-modal-nav">
                  <button
                    type="button"
                    className="promise-memories-modal-arrow"
                    onClick={showPrevInLightbox}
                  >
                    ‹ Prev
                  </button>
                  <button
                    type="button"
                    className="promise-memories-modal-arrow"
                    onClick={showNextInLightbox}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

