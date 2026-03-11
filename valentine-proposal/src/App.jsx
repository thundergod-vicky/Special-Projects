import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HTMLFlipBook from 'react-pageflip'
import './App.css'

import { GIRL_NAME, BOY_NAME, createGameSpots, TOTAL_HEARTS } from './constants/index.js'
import { BOOK_COVER_IMAGE } from './constants/ourPics.js'
import { BOOK_PAGES, BOOK_TOTAL_PAGES } from './data/book.js'
import { BookPage } from './components/Book/index.jsx'
import HeartsBackground from './components/HeartsBackground.jsx'
import Confetti from './components/Confetti.jsx'
import HomeScreen from './screens/Home/HomeScreen.jsx'
import {
  ChocolateIntro,
  ChocolateMeaning,
  ChocolateUnwrap,
  ChocolateMessages,
  ChocolateEnd,
} from './screens/ChocolateDay/index.js'
import {
  TeddyIntro,
  TeddyMeet,
  TeddyPhoto,
  TeddyReal,
  TeddyReveal,
  TeddyTravelQuestion,
  TeddyVerseGallery,
  TeddyHop,
  TeddyEnd,
} from './screens/TeddyDay/index.js'
import {
  PromiseIntro,
  PromiseVows,
  PromiseMemories,
  PromiseEnd,
} from './screens/PromiseDay/index.js'
import {
  ProposeIntro,
  FindHearts,
  Envelope,
  Ready,
  Loading,
  Reasons,
  Proposal,
  Celebration,
  Certificate,
} from './screens/ProposeDay/index.js'
import { ValentineIntro,
  LoveTimeline,
  ValentineReason,
  FinalDeclaration,
  ValentineProposal,
  ValentineQuestion,
  HeartfeltLetter,
} from './screens/ValentineDay/index.js'
import PasswordScreen from './screens/PasswordScreen.jsx'
import PortalSelection from './screens/PortalSelection.jsx'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [appArea, setAppArea] = useState(null)
  
  const [screen, setScreen] = useState('home')
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
  const [homeActiveIndex, setHomeActiveIndex] = useState(7) /* Valentine's Day = index 7 */
  const [chocolateMessageIndex, setChocolateMessageIndex] = useState(0)
  const [chocolateBoxOpen, setChocolateBoxOpen] = useState(false)
  const [openedSweetMemories, setOpenedSweetMemories] = useState([false, false, false, false])
  const [hoveredSweetMemory, setHoveredSweetMemory] = useState(null)
  const bookRef = useRef(null)
  const [bookSize, setBookSize] = useState(() => ({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 520) : 480,
    height: typeof window !== 'undefined' ? Math.min(window.innerHeight - 140, 720) : 600,
  }))
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)

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

  const goToIntro = useCallback(() => setScreen('intro'), [])
  const goToChocolate = useCallback(() => setScreen('chocolateIntro'), [])
  const goToTeddy = useCallback(() => setScreen('teddyIntro'), [])
  const goToPromise = useCallback(() => setScreen('promiseIntro'), [])

  const openDayFromHome = useCallback((dayId) => {
    if (dayId === 'propose') goToIntro()
    else if (dayId === 'chocolate') goToChocolate()
    else if (dayId === 'teddy') goToTeddy()
    else if (dayId === 'promise') goToPromise()
    else if (dayId === 'valentine') {
      setScreen('valentineProposal')
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      }
    }
  }, [goToIntro, goToChocolate, goToTeddy, goToPromise])

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

  const prevScreenRef = useRef(screen)
  useEffect(() => {
    if (screen === 'chocolateEnd' && prevScreenRef.current !== 'chocolateEnd') {
      setOpenedSweetMemories([false, false, false, false])
      setHoveredSweetMemory(null)
    }
    prevScreenRef.current = screen
  }, [screen])

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

  if (!isAuthenticated) {
    return <PasswordScreen onUnlock={() => setIsAuthenticated(true)} />
  }

  if (!appArea) {
    return <PortalSelection onSelect={(area) => setAppArea(area)} onBack={() => setIsAuthenticated(false)} />
  }

  if (appArea === 'multiverse') {
    return (
      <div className="screen" style={{ background: '#0a0a0a', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, #000 60%)', zIndex: 0 }} />
        
        {/* Floating particles for multiverse */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['-10vh', '110vh'],
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: 0,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              borderRadius: '50%',
              background: '#c084fc',
              boxShadow: '0 0 10px 2px rgba(192, 132, 252, 0.5)',
              zIndex: 1,
            }}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAppArea(null)}
          style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 20, padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(139, 92, 246, 0.5)', background: 'rgba(139, 92, 246, 0.1)', color: '#fff', cursor: 'pointer', fontFamily: '"Quicksand", sans-serif', fontWeight: 700, backdropFilter: 'blur(10px)', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}
        >
          <span style={{ fontSize: '1.2rem' }}>👈</span> Return to Nexus
        </motion.button>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }} style={{ zIndex: 10 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))', marginBottom: '1rem' }}>
            🌌
          </motion.div>
          <h1 style={{ fontFamily: '"Quicksand", sans-serif', fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1rem', background: 'linear-gradient(to right, #8b5cf6, #3b82f6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))', fontWeight: 900 }}>
            Multiverse
          </h1>
          <p style={{ fontSize: '1.4rem', opacity: 0.85, marginBottom: '2rem', fontWeight: 500 }}>
            The secrets of this realm are yet to be revealed... ✨
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <HeartsBackground />
      <Confetti active={confetti || letterConfetti} />

      {/* Floating back button for Valentine's Days Area */}
      {screen === 'home' && appArea === 'valentine' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAppArea(null)}
          style={{ 
            position: 'absolute', 
            top: '1.5rem', 
            left: '1.5rem', 
            zIndex: 9999, 
            padding: '0.8rem 1.5rem', 
            borderRadius: '50px', 
            border: '1px solid rgba(255, 255, 255, 0.4)', 
            background: 'rgba(0, 0, 0, 0.25)', 
            color: '#fff', 
            cursor: 'pointer', 
            fontFamily: '"Quicksand", sans-serif', 
            fontWeight: 700, 
            backdropFilter: 'blur(10px)', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '1.05rem',
            transition: 'background 0.3s'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🌌</span> Switch Universe
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <HomeScreen
            homeActiveIndex={homeActiveIndex}
            setHomeActiveIndex={setHomeActiveIndex}
            onOpenDay={openDayFromHome}
          />
        )}

        {screen === 'chocolateIntro' && (
          <ChocolateIntro
            onBack={() => setScreen('home')}
            onNext={() => setScreen('chocolateMeaning')}
          />
        )}
        {screen === 'chocolateMeaning' && (
          <ChocolateMeaning
            onBack={() => setScreen('chocolateIntro')}
            onNext={() => { setScreen('chocolateUnwrap'); setChocolateBoxOpen(false) }}
          />
        )}
        {screen === 'chocolateUnwrap' && (
          <ChocolateUnwrap
            chocolateBoxOpen={chocolateBoxOpen}
            setChocolateBoxOpen={setChocolateBoxOpen}
            onBack={() => setScreen('chocolateMeaning')}
            onNext={() => setScreen('chocolateMessages')}
          />
        )}
        {screen === 'chocolateMessages' && (
          <ChocolateMessages
            chocolateMessageIndex={chocolateMessageIndex}
            setChocolateMessageIndex={setChocolateMessageIndex}
            onBack={() => setScreen('chocolateUnwrap')}
            onNext={() => setScreen('chocolateEnd')}
          />
        )}
        {screen === 'chocolateEnd' && (
          <ChocolateEnd
            onBack={() => setScreen('chocolateMessages')}
            onBackToHome={() => { setScreen('home'); setChocolateMessageIndex(0); setChocolateBoxOpen(false) }}
            openedSweetMemories={openedSweetMemories}
            setOpenedSweetMemories={setOpenedSweetMemories}
            hoveredSweetMemory={hoveredSweetMemory}
            setHoveredSweetMemory={setHoveredSweetMemory}
          />
        )}

        {screen === 'teddyIntro' && (
          <TeddyIntro
            onBack={() => setScreen('home')}
            onNext={() => setScreen('teddyMeet')}
          />
        )}
        {screen === 'teddyMeet' && (
          <TeddyMeet
            onBack={() => setScreen('teddyIntro')}
            onRevealed={() => setScreen('teddyPhoto')}
          />
        )}
        {screen === 'teddyPhoto' && (
          <TeddyPhoto
            onBack={() => setScreen('teddyMeet')}
            onNext={() => setScreen('teddyReal')}
          />
        )}
        {screen === 'teddyReal' && (
          <TeddyReal
            onBack={() => setScreen('teddyPhoto')}
            onNext={() => setScreen('teddyReveal')}
          />
        )}
        {screen === 'teddyReveal' && (
          <TeddyReveal
            onBack={() => setScreen('teddyMeet')}
            onNext={() => setScreen('teddyTravelQuestion')}
          />
        )}
        {screen === 'teddyTravelQuestion' && (
          <TeddyTravelQuestion
            onBack={() => setScreen('teddyReveal')}
            onYes={() => setScreen('teddyVerseGallery')}
          />
        )}
        {screen === 'teddyVerseGallery' && (
          <TeddyVerseGallery
            onBack={() => setScreen('teddyTravelQuestion')}
            onNext={() => setScreen('teddyEnd')}
            onHop={() => setScreen('teddyHop')}
          />
        )}
        {screen === 'teddyHop' && (
          <TeddyHop
            onBack={() => setScreen('teddyVerseGallery')}
            onNext={() => setScreen('teddyEnd')}
          />
        )}
        {screen === 'teddyEnd' && (
          <TeddyEnd onBackToHome={() => setScreen('home')} />
        )}

        {screen === 'promiseIntro' && (
          <PromiseIntro
            onBack={() => setScreen('home')}
            onNext={() => setScreen('promiseVows')}
          />
        )}
        {screen === 'promiseVows' && (
          <PromiseVows
            onBack={() => setScreen('promiseIntro')}
            onNext={() => setScreen('promiseMemories')}
          />
        )}
        {screen === 'promiseMemories' && (
          <PromiseMemories
            onBack={() => setScreen('promiseVows')}
            onNext={() => setScreen('promiseEnd')}
          />
        )}
        {screen === 'promiseEnd' && (
          <PromiseEnd onBackToHome={() => setScreen('home')} />
        )}

        {screen === 'intro' && (
          <ProposeIntro onOpenSurprise={openFindHearts} />
        )}
        {screen === 'findHearts' && gameSpots.length > 0 && (
          <FindHearts
            gameSpots={gameSpots}
            heartsFound={heartsFound}
            revealedSpots={revealedSpots}
            onCheckSpot={checkSpot}
          />
        )}
        {screen === 'envelope' && (
          <Envelope envelopeOpen={envelopeOpen} onOpenEnvelope={openEnvelope} />
        )}
        {screen === 'ready' && (
          <Ready onReady={goToLoading} />
        )}
        {screen === 'loading' && (
          <Loading loadingProgress={loadingProgress} />
        )}
        {screen === 'reasons' && (
          <Reasons
            pleadStep={pleadStep}
            showHeartbrokenPopup={showHeartbrokenPopup}
            reasonsNoPosition={reasonsNoPosition}
            onCloseHeartbrokenPopup={handleCloseHeartbrokenPopup}
            onNoClick={handleReasonsNoClick}
            onNoRunAway={handleReasonsNoRunAway}
            onConvinced={() => setScreen('proposal')}
          />
        )}
        {screen === 'proposal' && (
          <Proposal
            noPosition={noPosition}
            onYes={handleYes}
            onNoRunAway={handleNoRunAway}
          />
        )}
        {screen === 'celebration' && (
          <Celebration onGetCertificate={() => setScreen('certificate')} />
        )}
        {screen === 'certificate' && (
          <Certificate onOpenLetter={openLetter} />
        )}

        {screen === 'valentineProposal' && (
          <ValentineProposal
            onNext={() => setScreen('valentineQuestion')}
          />
        )}
        {screen === 'valentineQuestion' && (
          <ValentineQuestion
            onFinished={() => setScreen('valentineIntro')}
          />
        )}
        {screen === 'valentineIntro' && (
          <ValentineIntro
            onBack={() => setScreen('home')}
            onNext={() => setScreen('valentineReason')}
          />
        )}
        {screen === 'valentineReason' && (
          <ValentineReason
            onBack={() => setScreen('valentineIntro')}
            onNext={() => setScreen('finalDeclaration')}
          />
        )}
        {screen === 'finalDeclaration' && (
          <FinalDeclaration
            onBack={() => setScreen('valentineReason')}
            onYes={() => setScreen('heartfeltLetter')}
          />
        )}
        {screen === 'heartfeltLetter' && (
          <HeartfeltLetter onBackToHome={() => setScreen('home')} />
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src="/perfect.mp3"
        loop
        style={{ display: 'none' }}
      />
      
      {screen !== 'home' && (
        <button 
          className="music-toggle-btn"
          onClick={() => {
            if (audioRef.current) {
              if (isMuted) audioRef.current.play()
              else audioRef.current.pause()
              setIsMuted(!isMuted)
            }
          }}
        >
          {isMuted ? '🔇' : '🎵'}
        </button>
      )}

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
