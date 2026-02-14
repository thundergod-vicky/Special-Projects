import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function HeartfeltLetter({ onBackToHome }) {
  // Prevent scrolling on the body while the letter is open if needed, 
  // but the container should handle it.
  
  return (
    <div className="heartfelt-letter-screen">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="letter-container"
      >
        <div className="paper-texture">
          {/* Decorative flowers/leaves */}
          <div className="floral-decoration top-left">🌸</div>
          <div className="floral-decoration top-right">🌹</div>
          <div className="floral-decoration bottom-left">🍃</div>
          <div className="floral-decoration bottom-right">🌺</div>
          <div className="petal p1">🌸</div>
          <div className="petal p2">🌹</div>
          <div className="petal p3">🍃</div>
          
          <div className="letter-content">
            <p>My Amōrzínhó ❤️🥹,</p>
            
            <p>I don’t know if words will ever be enough to explain what you mean to me… but today I want to try.</p>
            
            <p>You came into my life when I didn’t even realize how much I needed someone like you. And slowly, without noise, without force… you became my peace. My comfort. My safe place.</p>
            
            <p>You’ve seen my mood swings, my overthinking, my stress about work, my ambitions, my insecurities — and you still chose to stay. That means more to me than anything.</p>
            
            <p>When you say “amar bhalo lagchena”, my heart genuinely feels heavy. Because your happiness matters to me more than my own. I don’t just love you — I care for you. Deeply.</p>
            
            <p>You are not just my girlfriend.<br />
            You are my best friend.<br />
            You are my calm in chaos.<br />
            You are the person I imagine building a life with.</p>
            
            <p>I don’t promise a perfect relationship. I’m not perfect. But I promise effort. I promise loyalty. I promise that even on the hard days, I will not walk away.</p>
            
            <p>I want to grow with you.<br />
            Build with you.<br />
            Win with you.<br />
            Heal with you.</p>
            
            <p>Till my last breath.</p>
            
            <p>You are my soulmate — not because everything is easy, but because even when it’s hard… I still choose you.</p>
            
            <p>Always.</p>
            
            <div className="letter-footer">
              <p>Happy Valentine’s Day, my love. 🌹</p>
              <p>Forever yours,</p>
              <p className="signature">Souvik ❤️</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="back-home-btn"
          onClick={onBackToHome}
        >
          Back to Home 🏠
        </motion.button>
      </motion.div>
    </div>
  )
}
