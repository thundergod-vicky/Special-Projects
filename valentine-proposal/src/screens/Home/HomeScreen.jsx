import { motion } from 'framer-motion'
import { VALENTINE_WEEK_DAYS } from '../../constants/index.js'

export default function HomeScreen({ homeActiveIndex, setHomeActiveIndex, onOpenDay }) {
  return (
    <motion.div
      key="home"
      className="screen home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="home-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        💕 Valentine&apos;s Week 💕
      </motion.h1>
      <motion.p
        className="home-sub"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        Choose a day to celebrate
      </motion.p>
      <div className="home-slider">
        <div
          className="home-slider-zone home-slider-zone-left"
          role="button"
          tabIndex={0}
          aria-label="Previous card"
          onClick={() => setHomeActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
          onKeyDown={(e) => e.key === 'Enter' && setHomeActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        />
        <div
          className="home-slider-zone home-slider-zone-right"
          role="button"
          tabIndex={0}
          aria-label="Next card"
          onClick={() => setHomeActiveIndex((prev) => (prev < VALENTINE_WEEK_DAYS.length - 1 ? prev + 1 : prev))}
          onKeyDown={(e) => e.key === 'Enter' && setHomeActiveIndex((prev) => (prev < VALENTINE_WEEK_DAYS.length - 1 ? prev + 1 : prev))}
        />
        {VALENTINE_WEEK_DAYS.map((day, i) => {
          const isActive = i === homeActiveIndex
          const sttRight = i - homeActiveIndex
          const sttLeft = homeActiveIndex - i
          let style = {
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '280px',
            marginLeft: '-140px',
            transition: 'transform 0.5s, filter 0.5s, opacity 0.5s',
          }
          if (isActive) {
            style.transform = 'none'
            style.zIndex = 1
            style.filter = 'none'
            style.opacity = 1
          } else if (i > homeActiveIndex) {
            const stt = sttRight
            style.transform = `translateX(${170 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`
            style.zIndex = -stt
            style.filter = 'blur(5px)'
            style.opacity = stt > 2 ? 0 : 0.6
          } else {
            const stt = sttLeft
            style.transform = `translateX(${-170 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`
            style.zIndex = -stt
            style.filter = 'blur(5px)'
            style.opacity = stt > 2 ? 0 : 0.6
          }
          return (
            <motion.div
              key={day.id}
              className={`day-card day-card-slider ${day.active ? 'day-card--active' : 'day-card--locked'}`}
              style={style}
              onClick={isActive && day.active ? () => onOpenDay(day.id) : undefined}
              role={isActive && day.active ? 'button' : undefined}
              tabIndex={isActive && day.active ? 0 : -1}
              onKeyDown={isActive && day.active ? (e) => e.key === 'Enter' && onOpenDay(day.id) : undefined}
            >
              <span className="day-card-emoji">{day.emoji}</span>
              <h2 className="day-card-title">{day.label}</h2>
              <span className="day-card-date">{day.date}</span>
              {!day.active && <span className="day-card-badge">Coming soon</span>}
              {isActive && day.active && (
                <span className="day-card-enter">Tap to open →</span>
              )}
            </motion.div>
          )
        })}
      </div>
      <button
        type="button"
        className="home-slider-btn home-slider-prev"
        onClick={() => setHomeActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        className="home-slider-btn home-slider-next"
        onClick={() => setHomeActiveIndex((prev) => (prev < VALENTINE_WEEK_DAYS.length - 1 ? prev + 1 : prev))}
        aria-label="Next"
      >
        ›
      </button>
    </motion.div>
  )
}
