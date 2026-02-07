import { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HTMLFlipBook from 'react-pageflip'
import './App.css'

// Find My Heart game – icons to hide hearts in
const HIDING_ICONS = ['🎁', '🎁', '🎁', '🧸', '🧸', '💐', '💐', '☁️', '💌', '🍬', '🧁', '🌹']
const TOTAL_HEARTS = 3

function createGameSpots() {
  const icons = [...HIDING_ICONS].sort(() => Math.random() - 0.5)
  const heartIndices = new Set()
  while (heartIndices.size < TOTAL_HEARTS) {
    heartIndices.add(Math.floor(Math.random() * icons.length))
  }
  return icons.map((icon, i) => ({
    id: i,
    icon,
    hasHeart: heartIndices.has(i),
  }))
}

// Cute teddy images – reliable Unsplash CDN URLs (teddy/plush themed)
const TEDDY_IMAGES = [
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578632292335-df3d6f1136b0?w=400&h=400&fit=crop', // Teddy 2 – different plush
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop',
]

const HEARTS = ['💕', '💗', '💖', '💝', '❤️', '🌸', '💓']

const GIRL_NAME = 'Saloni'
const BOY_NAME = 'Souvik'

const BOOK_TITLE = 'We Met Somehow in 8 Billion People'
const BOOK_AUTHOR = 'Souvik Basu'

// Our Pics: PNG and JPG only from src/Our Pics /, ordered by name (1, 2, 3, … then rest)
const ourPicsGlob = import.meta.glob('./Our Pics /*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
function orderedOurPicsUrls() {
  const entries = Object.entries(ourPicsGlob)
  const byNum = (key) => {
    const name = key.replace(/^.*\//, '').replace(/\.[^.]+$/i, '')
    const n = parseInt(name, 10)
    return Number.isNaN(n) ? Infinity : n
  }
  entries.sort((a, b) => {
    const na = byNum(a[0])
    const nb = byNum(b[0])
    if (na !== nb) return na - nb
    return a[0].localeCompare(b[0])
  })
  const seen = new Set()
  return entries
    .map(([key, url]) => {
      const basename = key.replace(/^.*\//, '').toLowerCase()
      if (seen.has(basename)) return null
      seen.add(basename)
      return url
    })
    .filter(Boolean)
}
const OUR_PICS_URLS = orderedOurPicsUrls()
// Cover image: 9.png (explicitly pick file 9 so it's always the red-sari portrait)
const BOOK_COVER_IMAGE = OUR_PICS_URLS.find((u) => /\/9\.(png|jpg|jpeg)$/i.test(u)) ?? OUR_PICS_URLS[0]

// Book page data – each page has 3 images + 3 notes in grid (image/note alternating), then letter
// Story notes – one narrative across the book (longer lines for a fuller look)
const PAGE_NOTES = [
  'Thank you for being mine, choosing me all over again against all the odds. 💕',
  "That's where our story started. Little did we know where it would take us.",
  'Every moment with you felt like fate. Some things are just meant to be.',
  'Our first adventure together. We’ve had so many since, and I want so many more.',
  'Laughing till we couldn’t stop. You’ve always known how to make me smile.',
  'You became my favourite person. My safe place, my home, my favourite hello.',
  'Two hearts, one story. Ours is my favourite story to tell.',
  'Growing closer every day. I fall for you a little more with each one.',
  'My favourite memory with you. (It’s hard to pick just one—there are so many.)',
  'Forever grateful for us. For you choosing me, and for every day we get together.',
  'And through it all, you stayed. Thank you for never giving up on us.',
  'This is just the beginning. I can’t wait to see what we write next. 💕',
  'Every chapter with you is my favourite. Here’s to filling many more pages.',
  'Here’s to many more pages. With you, the best is always yet to come.',
  'With you, every day is a gift. Thank you for being mine.',
]
const IMAGES_PER_PAGE = 3
const LETTER_LINES = [
  "I don't know how to put all my feelings into words, but I know one thing for sure — my heart has always known you were meant to be mine.",
  "From the moment you came into my life, everything felt different… calmer, warmer, real. You didn't just become someone I love — you became my **safe place**, my **best friend**, my **soulmate**, the one person my heart runs to without thinking. 🤍✨",
  "Being loved by you is something I had craved for all my life, and now that I have it, I never want to imagine a world without you.",
  "I want you to know this, clearly and honestly — **I choose you**. Not just today, not just when things are easy, but **every single day**, in every phase of life. I promise to stand by you in your happiest moments and hold you even tighter in your hardest ones. I'll be there when you smile, when you cry, when you're strong, and even when you feel tired. 🫶",
  'You are not alone. You never will be.',
  'Your dreams are my dreams. Your pain is my pain. Your happiness is my biggest victory. I want to grow with you, learn with you, and build a life where love, trust, and respect never fade.',
  "I don't promise perfection — but I promise **loyalty, honesty, patience, and a love that lasts till my last breath**. ♾️❤️",
  "If soulmates exist, then my heart already knows its answer — **it's you**.",
  'Forever yours,',
  'Always by your side,',
  'With all my love ❤️✨',
]
const LETTER_PAGE_1 = {
  letter: true,
  title: 'My Dearest AmorZinho',
  lines: LETTER_LINES.slice(0, 6),
}
const LETTER_PAGE_2 = {
  letter: true,
  title: null,
  lines: [...LETTER_LINES.slice(6), `Your ${BOY_NAME}`],
}
function buildBookSpreads() {
  const spreads = []
  let idx = 0
  const take = (n) => {
    const arr = []
    for (let i = 0; i < n && idx < OUR_PICS_URLS.length; i++) {
      arr.push(OUR_PICS_URLS[idx])
      idx += 1
    }
    return arr
  }
  while (idx < OUR_PICS_URLS.length) {
    const spreadId = spreads.length
    const noteBase = spreadId * 6
    const leftUrls = take(IMAGES_PER_PAGE)
    const notes = [
      PAGE_NOTES[(noteBase + 0) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 1) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 2) % PAGE_NOTES.length],
    ]
    const rightNotes = [
      PAGE_NOTES[(noteBase + 3) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 4) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 5) % PAGE_NOTES.length],
    ]
    const left = {
      imageUrls: leftUrls,
      notes,
      spreadId,
      page: 'L',
      ...(spreadId === 2 ? { skipMiddleRow: true } : {}),
    }
    const rightUrls = take(IMAGES_PER_PAGE)
    if (rightUrls.length > 0) {
      spreads.push({
        left,
        right: { imageUrls: rightUrls, notes: rightNotes, spreadId, page: 'R' },
      })
    } else {
      spreads.push({ left, right: LETTER_PAGE_1 })
      spreads.push({ left: LETTER_PAGE_2, right: { dedication: true } })
      return spreads
    }
  }
  spreads.push({
    left: { dedication: true },
    right: LETTER_PAGE_1,
  })
  spreads.push({
    left: LETTER_PAGE_2,
    right: { dedication: true },
  })
  return spreads
}
const BOOK_SPREADS = buildBookSpreads()
const BOOK_PAGES = BOOK_SPREADS.flatMap((s) => [s.left, s.right])
const BOOK_TOTAL_PAGES = BOOK_PAGES.length

// Grid: row1 = image top-left, note top-right; row2 = note middle-left, image middle-right; row3 = image bottom-left, note bottom-right
function renderBookPageContent(pageContent) {
  if (!pageContent) return <div className="notebook-page-blank" />
  if (pageContent.dedication) {
    return (
      <div className="notebook-page dedication-page">
        <p className="dedication-for">Made with love</p>
        <p className="dedication-for">For My Love</p>
        <p className="dedication-name">{GIRL_NAME}</p>
        <p className="dedication-hearts">💕</p>
      </div>
    )
  }
  if (pageContent.letter) {
    const formatBold = (text) =>
      text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )
    return (
      <div className="notebook-page letter-page">
        {pageContent.title && <h2 className="notebook-letter-title">{pageContent.title}</h2>}
        {pageContent.lines.map((line, i) => (
          <p
            key={i}
            className={`notebook-letter-line ${i === pageContent.lines.length - 1 ? 'notebook-letter-signature' : ''}`}
          >
            {formatBold(line)}
          </p>
        ))}
      </div>
    )
  }
  if (pageContent.blank) {
    return <div className="notebook-page notebook-page-blank" />
  }
  const imageUrls = pageContent.imageUrls || []
  const notes = pageContent.notes || []
  // Row 1: image left, note right. Row 2: note left, image right. Row 3: image left, note right.
  const allRows = [
    { imageFirst: true, imageSlot: 0, noteSlot: 0 },
    { imageFirst: false, imageSlot: 1, noteSlot: 1 },
    { imageFirst: true, imageSlot: 2, noteSlot: 2 },
  ]
  // Only show rows that have an image – no "Photo" placeholder rows
  let rows = allRows.filter((row) => imageUrls[row.imageSlot])
  // Only for the specific page with skipMiddleRow: show 2 rows (top + bottom), hide middle
  if (pageContent.skipMiddleRow && rows.length === 3) rows = [rows[0], rows[2]]

  // Single-image page: image at top, note at bottom
  if (rows.length === 1) {
    const row = rows[0]
    return (
      <div className="notebook-page notebook-page-single">
        <div className="notebook-single-image-wrap">
          <div className="notebook-image-slot">
            <img
              src={imageUrls[row.imageSlot]}
              alt=""
              className="notebook-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="notebook-single-note-wrap">
          {notes[row.noteSlot] && (
            <div className="notebook-note">
              <span className="notebook-note-icon">📌</span>
              {notes[row.noteSlot]}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="notebook-page">
      <div className="notebook-grid">
        {rows.map((row, ri) => (
          <div key={ri} className="notebook-grid-row">
            {row.imageFirst ? (
              <>
                <div className="notebook-image-slot">
                  <img
                    src={imageUrls[row.imageSlot]}
                    alt=""
                    className="notebook-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="notebook-note-slot">
                  {notes[row.noteSlot] && (
                    <div className="notebook-note">
                      <span className="notebook-note-icon">📌</span>
                      {notes[row.noteSlot]}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="notebook-note-slot">
                  {notes[row.noteSlot] && (
                    <div className="notebook-note">
                      <span className="notebook-note-icon">📌</span>
                      {notes[row.noteSlot]}
                    </div>
                  )}
                </div>
                <div className="notebook-image-slot">
                  <img
                    src={imageUrls[row.imageSlot]}
                    alt=""
                    className="notebook-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const BookPage = forwardRef(({ pageContent }, ref) => (
  <div ref={ref} className="flip-book-page">
    {renderBookPageContent(pageContent)}
  </div>
))

// Image with fallback so teddies always show something cute
function CuteImage({ src, alt, className, fallbackEmoji = '🐻' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} teddy-fallback`} role="img" aria-label={alt}>
        <span className="teddy-fallback-emoji">{fallbackEmoji}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

function HeartsBackground() {
  return (
    <div className="hearts-bg" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span key={i} className="heart-float" style={{ left: `${5 + i * 10}%` }}>
          {h}
        </span>
      ))}
    </div>
  )
}

function Confetti({ active }) {
  const colors = ['#ff6b9d', '#ff85a2', '#ffd700', '#c8a2c8', '#98fb98', '#87ceeb']
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[i % colors.length],
      size: 8 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  )

  if (!active) return null

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
          initial={{ y: -50, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: 0.6,
            rotate: p.rotation + 720,
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const REASONS = [
  'Because with you, every ordinary day feels a little more meaningful.',
  'Because you see the best in me even when I don’t.',
  'Because I want to choose you, and keep choosing you, every day.',
  'Because you make me want to be a better person.',
  'Because “together” is the only place I want to be. 💕',
]

const PLEAD_MESSAGES = [
  "The No button isn't available! Please click 'I'm convinced!' 🙏",
  "You have to! There's no other way! 😭",
  "There's no way without it! 💔",
  "Please please please click on it! 🙏💕",
]

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [reasonsNoPosition, setReasonsNoPosition] = useState({ x: 0, y: 0 })
  const [confetti, setConfetti] = useState(false)
  const [letterConfetti, setLetterConfetti] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showHeartbrokenPopup, setShowHeartbrokenPopup] = useState(false)
  const [pleadStep, setPleadStep] = useState(0)
  const [heartsFound, setHeartsFound] = useState(0)
  const [gameSpots, setGameSpots] = useState([])
  const [revealedSpots, setRevealedSpots] = useState(new Set())
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [showBookCover, setShowBookCover] = useState(true)
  const bookRef = useRef(null)
  const [bookSize, setBookSize] = useState(() => ({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 520) : 480,
    height: typeof window !== 'undefined' ? Math.min(window.innerHeight - 140, 720) : 600,
  }))

  useEffect(() => {
    if (!showLetter) return
    const updateSize = () => {
      setBookSize({
        width: Math.min(window.innerWidth - 48, 520),
        height: Math.min(window.innerHeight - 140, 720),
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [showLetter])

  const handleYes = useCallback(() => {
    setConfetti(true)
    setScreen('celebration')
  }, [])

  const handleNoRunAway = useCallback(() => {
    setNoPosition({
      x: (Math.random() - 0.5) * 700,
      y: (Math.random() - 0.5) * 450,
    })
  }, [])

  const handleReasonsNoClick = useCallback(() => {
    if (pleadStep === 0) {
      setShowHeartbrokenPopup(true)
    } else if (pleadStep < 4) {
      setPleadStep((s) => s + 1)
    }
  }, [pleadStep])

  const handleCloseHeartbrokenPopup = useCallback(() => {
    setShowHeartbrokenPopup(false)
    setPleadStep(1)
  }, [])

  const handleReasonsNoRunAway = useCallback(() => {
    setReasonsNoPosition({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 350,
    })
  }, [])

  const goToLoading = useCallback(() => {
    setScreen('loading')
    setLoadingProgress(0)
    const steps = [0, 25, 50, 75, 100]
    steps.forEach((p, i) => {
      setTimeout(() => setLoadingProgress(p), i * 600)
    })
    setTimeout(() => setScreen('reasons'), 3200)
  }, [])

  const openFindHearts = useCallback(() => {
    setGameSpots(createGameSpots())
    setHeartsFound(0)
    setRevealedSpots(new Set())
    setScreen('findHearts')
  }, [])

  const checkSpot = useCallback((spotId, hasHeart) => {
    setRevealedSpots((prev) => {
      if (prev.has(spotId)) return prev
      const next = new Set(prev)
      next.add(spotId)
      if (hasHeart) setHeartsFound((n) => n + 1)
      return next
    })
  }, [])

  useEffect(() => {
    if (screen === 'findHearts' && heartsFound === TOTAL_HEARTS) {
      const t = setTimeout(() => {
        setEnvelopeOpen(false)
        setShowLetter(false)
        setScreen('envelope')
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [screen, heartsFound])

  const openEnvelope = useCallback(() => {
    setEnvelopeOpen(true)
    setTimeout(() => setScreen('ready'), 1500)
  }, [])

  const openLetter = useCallback(() => {
    setShowLetter(true)
    setLetterConfetti(true)
  }, [])

  const closeLetter = useCallback(() => {
    setShowLetter(false)
    setLetterConfetti(false)
    setCurrentPageIndex(0)
    setShowBookCover(true)
  }, [])

  const openBookFromCover = useCallback(() => {
    setShowBookCover(false)
  }, [])

  const onBookFlip = useCallback((e) => {
    const raw = e?.data
    const next = typeof raw === 'number' && raw >= 0 ? raw : Number(raw)
    if (!Number.isFinite(next) || next < 0) return
    requestAnimationFrame(() => {
      setCurrentPageIndex(Math.min(next, BOOK_TOTAL_PAGES - 1))
    })
  }, [])

  const turnNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext()
  }, [])

  const turnPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev()
  }, [])

  const downloadPDF = useCallback(() => {
    const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    const lineToHtml = (line) =>
      line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

    const pageHtml = BOOK_PAGES.map((p) => {
      if (!p) return `<div class="print-page"><p>(Blank page)</p></div>`
      if (p.dedication) {
        return `<div class="print-page dedication">
          <p class="print-dedication-for">Made with love</p>
          <p class="print-dedication-for">For My Love</p>
          <p class="print-dedication-name">${escapeHtml(GIRL_NAME)}</p>
          <p class="print-dedication-hearts">💕</p>
        </div>`
      }
      if (p.letter) {
        const title = p.title ? `<h2>${escapeHtml(p.title)}</h2>` : ''
        const linesHtml = (p.lines || []).map((l) => `<p>${lineToHtml(escapeHtml(l))}</p>`).join('')
        return `<div class="print-page letter">${title}${linesHtml}</div>`
      }
      const imageUrls = p.imageUrls || []
      const notes = p.notes || []
      const allRows = [
        { imageFirst: true, imageSlot: 0, noteSlot: 0 },
        { imageFirst: false, imageSlot: 1, noteSlot: 1 },
        { imageFirst: true, imageSlot: 2, noteSlot: 2 },
      ]
      let rows = allRows.filter((r) => imageUrls[r.imageSlot])
      if (p.skipMiddleRow && rows.length === 3) rows = [rows[0], rows[2]]

      if (rows.length === 0) return `<div class="print-page"><p>(Blank page)</p></div>`
      if (rows.length === 1) {
        const row = rows[0]
        const img = imageUrls[row.imageSlot]
        const note = notes[row.noteSlot]
        return `<div class="print-page print-single-image">
          <div class="print-image-wrap"><img src="${img}" alt="" class="print-image" /></div>
          ${note ? `<p class="print-note">📌 ${escapeHtml(note)}</p>` : ''}
        </div>`
      }
      const rowsHtml = rows
        .map(
          (row) => `
          <div class="print-row">
            ${row.imageFirst
              ? `<img src="${imageUrls[row.imageSlot]}" alt="" class="print-image" /><p class="print-note">📌 ${escapeHtml(notes[row.noteSlot] || '')}</p>`
              : `<p class="print-note">📌 ${escapeHtml(notes[row.noteSlot] || '')}</p><img src="${imageUrls[row.imageSlot]}" alt="" class="print-image" />`}
          </div>`
        )
        .join('')
      return `<div class="print-page print-grid">${rowsHtml}</div>`
    }).join('')

    const html = `<!DOCTYPE html><html><head>
      <title>For ${escapeHtml(GIRL_NAME)} – From ${escapeHtml(BOY_NAME)}</title>
      <style>
        body { font-family: 'Caveat', cursive; padding: 2rem; max-width: 700px; margin: 0 auto; color: #2c1810; }
        .print-page { page-break-after: always; padding: 1.5rem 0; min-height: 80vh; }
        .print-page:last-child { page-break-after: auto; }
        .print-page.letter h2 { color: #e91e63; text-align: center; }
        .print-page.letter p { margin-bottom: 0.5rem; line-height: 1.6; }
        .print-page.dedication { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .print-dedication-for { margin: 0 0 0.5rem; color: #8b6b5c; font-size: 1.5rem; }
        .print-dedication-name { margin: 0 0 0.5rem; color: #e91e63; font-size: 2.5rem; font-weight: 600; }
        .print-dedication-hearts { margin: 0; font-size: 1.5rem; }
        .print-note { background: #fff9e6; padding: 0.5rem; border-radius: 8px; margin: 0.5rem 0; }
        .print-image { max-width: 280px; max-height: 280px; width: auto; height: auto; object-fit: contain; display: block; }
        .print-image-wrap { text-align: center; margin-bottom: 1rem; }
        .print-single-image .print-image-wrap .print-image { max-width: 400px; max-height: 50vh; }
        .print-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
        .print-row .print-image { flex-shrink: 0; }
        .print-row .print-note { flex: 1; }
      </style>
    </head><body>${pageHtml}</body></html>`
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    setTimeout(() => {
      w.print()
      w.onafterprint = () => w.close()
    }, 500)
  }, [])

  return (
    <>
      <HeartsBackground />
      <Confetti active={confetti || letterConfetti} />

      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="intro"
            className="screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="intro-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              💕 Propose Day Special 💕
            </motion.p>
            <motion.p
              className="intro-sub"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Something cute is waiting for you...
            </motion.p>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <CuteImage src={TEDDY_IMAGES[0]} alt="Cute teddy" className="teddy-intro" />
            </motion.div>
            <motion.button
              className="open-btn"
              onClick={openFindHearts}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Open the surprise 🎀
            </motion.button>
          </motion.div>
        )}

        {screen === 'findHearts' && gameSpots.length > 0 && (
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
                I’ve hidden {TOTAL_HEARTS} hearts inside these gifts and surprises.
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
                    onClick={() => !revealed && checkSpot(spot.id, spot.hasHeart)}
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
        )}

        {screen === 'envelope' && (
          <motion.div
            key="envelope"
            className="screen envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="envelope-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {GIRL_NAME}, you found all my hearts 💕
            </motion.p>
            <motion.div
              className={`envelope-container ${envelopeOpen ? 'open' : ''}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <div className="envelope">
                <div className="envelope-pocket" />
                <div className="envelope-letter-preview" />
                <div className="envelope-flap" />
                <div className="envelope-seal">❤️</div>
              </div>
            </motion.div>
            {!envelopeOpen && (
              <motion.button
                type="button"
                className="open-btn envelope-open-btn"
                onClick={openEnvelope}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Open Me
              </motion.button>
            )}
          </motion.div>
        )}

        {screen === 'ready' && (
          <motion.div
            key="ready"
            className="screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="step-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Psst... 👀
            </motion.p>
            <motion.p
              className="step-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Close your eyes and count to 3...
              <br />
              <span className="step-funny">Just kidding! Keep them open, you’ll miss the cute stuff 😄</span>
            </motion.p>
            <motion.span
              className="step-emoji"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🐻
            </motion.span>
            <motion.button
              className="open-btn ready-btn"
              onClick={goToLoading}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              I’m ready! 💕
            </motion.button>
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            className="screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="step-title loading-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Preparing something special...
            </motion.p>
            <motion.p
              className="loading-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {loadingProgress < 50 && 'Loading love... 💕'}
              {loadingProgress >= 50 && loadingProgress < 100 && 'Loading teddies... 🐻'}
              {loadingProgress === 100 && 'Done! You’re the best! 🎉'}
            </motion.p>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <motion.div
              className="loading-teddies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="loading-emoji">🐻</span>
              <span className="loading-emoji">💖</span>
              <span className="loading-emoji">🐻</span>
            </motion.div>
          </motion.div>
        )}

        {screen === 'reasons' && (
          <motion.div
            key="reasons"
            className="screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {showHeartbrokenPopup && (
              <motion.div
                className="popup-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleCloseHeartbrokenPopup}
              >
                <motion.div
                  className="popup-box heartbroken-popup"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="popup-emoji">💔</span>
                  <p className="popup-title">My heart is broken...</p>
                  <p className="popup-text">You really said you’re not convinced? 🥹 The teddies are crying. I’m gonna go eat ice cream and watch sad movies...</p>
                  <button
                    type="button"
                    className="popup-btn"
                    onClick={handleCloseHeartbrokenPopup}
                  >
                    Okay... 😢
                  </button>
                </motion.div>
              </motion.div>
            )}

            <motion.p
              className="step-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              A few reasons from the heart 💕
            </motion.p>
            <ul className="reasons-list">
              {REASONS.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  {r}
                </motion.li>
              ))}
            </ul>

            {pleadStep >= 1 && (
              <motion.p
                className="plead-message"
                key={pleadStep}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {PLEAD_MESSAGES[pleadStep - 1]}
              </motion.p>
            )}

            <motion.div
              className="buttons-row reasons-buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="open-btn yes-reasons-btn"
                onClick={() => setScreen('proposal')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                I’m convinced! Let’s go 💖
              </motion.button>
              {pleadStep < 4 ? (
                <motion.button
                  type="button"
                  className="no-reasons-btn"
                  onClick={handleReasonsNoClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  No, I’m not convinced 😅
                </motion.button>
              ) : (
                <motion.div
                  className="no-btn-wrapper"
                  style={{
                    transform: `translate(${reasonsNoPosition.x}px, ${reasonsNoPosition.y}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  onMouseEnter={handleReasonsNoRunAway}
                  onMouseMove={handleReasonsNoRunAway}
                >
                  <motion.button
                    type="button"
                    className="no-reasons-btn"
                    onClick={handleReasonsNoRunAway}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    No, I’m not convinced 😅
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {screen === 'proposal' && (
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
              <CuteImage src={TEDDY_IMAGES[0]} alt="Teddy 1" className="teddy-small" />
              <CuteImage src={TEDDY_IMAGES[1]} alt="Teddy 2" className="teddy-small" />
              <CuteImage src={TEDDY_IMAGES[2]} alt="Teddy 3" className="teddy-small" />
            </motion.div>
            <motion.div
              className="buttons-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="yes-btn"
                onClick={handleYes}
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
                onMouseEnter={handleNoRunAway}
                onMouseMove={handleNoRunAway}
              >
                <motion.button
                  className="no-btn"
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNoRunAway}
                >
                  Maybe later 😅
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {screen === 'celebration' && (
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
              <CuteImage src={TEDDY_IMAGES[0]} alt="Teddy" className="teddy-celebration" />
              <CuteImage src={TEDDY_IMAGES[1]} alt="Teddy" className="teddy-celebration" />
              <CuteImage src={TEDDY_IMAGES[2]} alt="Teddy" className="teddy-celebration" />
            </motion.div>
            <motion.div
              className="message-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {GIRL_NAME}, you just made me the happiest person. Here’s to us! 💖🐻 – {BOY_NAME}
            </motion.div>
            <motion.button
              className="open-btn cert-btn"
              onClick={() => setScreen('certificate')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get your certificate 🏆
            </motion.button>
          </motion.div>
        )}

        {screen === 'certificate' && (
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
              onClick={openLetter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Read your letter, {GIRL_NAME} 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book – opens to cover first (one page), then flip book */}
      {showLetter && (
        <motion.div
          className="letter-view-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && closeLetter()}
        >
          <motion.div
            className="book-open-view book-real book-react-pageflip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="letter-close-btn" onClick={closeLetter} aria-label="Close">
              ×
            </button>

            {showBookCover ? (
              <div className="book-cover-view">
                <div className="book-cover-page">
                  <img src={BOOK_COVER_IMAGE} alt="" className="book-cover-image" />
                  <h1 className="book-cover-title">{BOOK_TITLE}</h1>
                  <p className="book-cover-author">{BOOK_AUTHOR}</p>
                  <motion.button
                    type="button"
                    className="book-cover-open-btn"
                    onClick={openBookFromCover}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Open Book
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="book-arrow book-arrow-left"
                  onClick={turnPrev}
                  disabled={currentPageIndex === 0}
                  aria-label="Previous page"
                >
                  <span className="book-arrow-icon">‹</span>
                </button>
                <div className="book-flip-wrapper">
                  <HTMLFlipBook
                    ref={bookRef}
                    width={bookSize.width}
                    height={bookSize.height}
                    size="fixed"
                    showCover={false}
                    flippingTime={600}
                    drawShadow
                    onFlip={onBookFlip}
                    usePortrait
                    startZIndex={0}
                    useMouseEvents
                  >
                    {BOOK_PAGES.map((pageContent, index) => (
                      <BookPage key={index} pageContent={pageContent} />
                    ))}
                  </HTMLFlipBook>
                </div>
                <button
                  type="button"
                  className="book-arrow book-arrow-right"
                  onClick={currentPageIndex >= BOOK_TOTAL_PAGES - 1 ? closeLetter : turnNext}
                  aria-label={currentPageIndex >= BOOK_TOTAL_PAGES - 1 ? 'Close' : 'Next page'}
                >
                  <span className="book-arrow-icon">›</span>
                </button>
                <button
                  type="button"
                  className="book-download-btn"
                  onClick={downloadPDF}
                  aria-label="Download PDF"
                >
                  Download PDF
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
