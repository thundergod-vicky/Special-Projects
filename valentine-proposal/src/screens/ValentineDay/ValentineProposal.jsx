import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GIRL_NAME } from '../../constants'

export default function ValentineProposal({ onNext }) {
  const canvasRef = useRef(null)
  const [showButton, setShowButton] = useState(false)
  const [buttonFade, setButtonFade] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    let animationFrameId
    let frameNumber = 0
    let opacity = 0
    let secondOpacity = 0
    let thirdOpacity = 0

    const stars = 500
    const colorrange = [0, 60, 240]
    const starArray = []

    const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    const initStars = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starArray.length = 0
      for (let i = 0; i < stars; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.2
        const hue = colorrange[getRandom(0, colorrange.length - 1)]
        const sat = getRandom(50, 100)
        const starOpacity = Math.random()
        starArray.push({ x, y, radius, hue, sat, opacity: starOpacity })
      }
    }

    initStars()

    let baseFrame = context.getImageData(0, 0, canvas.width, canvas.height)

    const drawStars = () => {
      for (let i = 0; i < stars; i++) {
        const star = starArray[i]
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, 360)
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`
        context.fill()
      }
    }

    const updateStars = () => {
      for (let i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
          starArray[i].opacity = Math.random()
        }
      }
    }

    const drawTextWithLineBreaks = (lines, x, y, fontSize, lineHeight) => {
      lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight))
      })
    }

    const drawText = () => {
      const fontSize = Math.min(30, window.innerWidth / 24)
      const lineHeight = 8

      context.font = `${fontSize}px "Comic Sans MS", cursive`
      context.textAlign = 'center'
      context.shadowColor = 'rgba(45, 45, 255, 1)'
      context.shadowBlur = 8
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0

      if (frameNumber < 250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('everyday day I cannot believe how lucky I am', canvas.width / 2, canvas.height / 2)
        opacity = opacity + 0.01
      }
      if (frameNumber >= 250 && frameNumber < 500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('everyday day I cannot believe how lucky I am', canvas.width / 2, canvas.height / 2)
        opacity = opacity - 0.01
      }

      if (frameNumber === 500) {
        opacity = 0
      }
      if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(['amongst trillions and trillions of stars,', 'over billions of years'], canvas.width / 2, canvas.height / 2, fontSize, lineHeight)
        } else {
          context.fillText('amongst trillions and trillions of stars, over billions of years', canvas.width / 2, canvas.height / 2)
        }
        opacity = opacity + 0.01
      }
      if (frameNumber >= 750 && frameNumber < 1000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(['amongst trillions and trillions of stars,', 'over billions of years'], canvas.width / 2, canvas.height / 2, fontSize, lineHeight)
        } else {
          context.fillText('amongst trillions and trillions of stars, over billions of years', canvas.width / 2, canvas.height / 2)
        }
        opacity = opacity - 0.01
      }

      if (frameNumber === 1000) {
        opacity = 0
      }
      if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('to be alive, and to get to spend this life with you', canvas.width / 2, canvas.height / 2)
        opacity = opacity + 0.01
      }
      if (frameNumber >= 1250 && frameNumber < 1500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('to be alive, and to get to spend this life with you', canvas.width / 2, canvas.height / 2)
        opacity = opacity - 0.01
      }

      if (frameNumber === 1500) {
        opacity = 0
      }
      if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('is so incredibly, unfathomably unlikely', canvas.width / 2, canvas.height / 2)
        opacity = opacity + 0.01
      }
      if (frameNumber >= 1750 && frameNumber < 2000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        context.fillText('is so incredibly, unfathomably unlikely', canvas.width / 2, canvas.height / 2)
        opacity = opacity - 0.01
      }

      if (frameNumber === 2000) {
        opacity = 0
      }
      if (frameNumber > 2000 && frameNumber < 2250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(['and yet here I am to get the impossible', 'chance to get to know you'], canvas.width / 2, canvas.height / 2, fontSize, lineHeight)
        } else {
          context.fillText('and yet here I am to get the impossible chance to get to know you', canvas.width / 2, canvas.height / 2)
        }
        opacity = opacity + 0.01
      }
      if (frameNumber >= 2250 && frameNumber < 2500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(['and yet here I am to get the impossible', 'chance to get to know you'], canvas.width / 2, canvas.height / 2, fontSize, lineHeight)
        } else {
          context.fillText('and yet here I am to get the impossible chance to get to know you', canvas.width / 2, canvas.height / 2)
        }
        opacity = opacity - 0.01
      }

      if (frameNumber === 2500) {
        opacity = 0
      }
      if (frameNumber > 2500 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks([`I love you so much ${GIRL_NAME}, more than`, 'all the time and space in the universe can contain'], canvas.width / 2, canvas.height / 2, fontSize, lineHeight)
        } else {
          context.fillText(`I love you so much ${GIRL_NAME}, more than all the time and space in the universe can contain`, canvas.width / 2, canvas.height / 2)
        }
        opacity = opacity + 0.01
      }

      if (frameNumber >= 2750 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`
        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(["and I can't wait to spend all the time in", 'the world to share that love with you!'], canvas.width / 2, canvas.height / 2 + 60, fontSize, lineHeight)
        } else {
          context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width / 2, canvas.height / 2 + 50)
        }
        secondOpacity = secondOpacity + 0.01
      }

      if (frameNumber >= 3000 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`
        context.fillText('Happy Valentine\'s Day <3', canvas.width / 2, canvas.height / 2 + 120)
        thirdOpacity = thirdOpacity + 0.01

        if (!showButton && thirdOpacity >= 1) {
          setShowButton(true)
        }
      }

      context.shadowColor = 'transparent'
      context.shadowBlur = 0
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      drawStars()
      updateStars()
      drawText()

      if (frameNumber < 99999) {
        frameNumber++
      }
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      initStars()
      baseFrame = context.getImageData(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [GIRL_NAME, showButton])

  return (
    <div className="valentine-proposal-container">
      <canvas ref={canvasRef} className="starfield-canvas" />
      {showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="valentines-button-overlay"
          onClick={onNext}
        >
          Click Me! ❤
        </motion.button>
      )}
    </div>
  )
}
