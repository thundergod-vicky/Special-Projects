import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PasswordScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Background floating particles for a magical/futuristic feel
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '06112025/salonixsouvik') {
      onUnlock();
    } else {
      setError('Oopsie! Wrong password, cutie! 🥺 Please try again!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="screen" style={{ 
      background: 'radial-gradient(circle at center, #1a0b2e 0%, #000000 100%)', 
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: ['-10vh', '110vh'],
            x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.x}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.5)',
            zIndex: 1,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '3.5rem 2.5rem',
          borderRadius: '30px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(236, 72, 153, 0.2)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '440px',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '4.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.6))' }}
        >
          🔐
        </motion.div>
        
        <h2 style={{ fontFamily: '"Quicksand", sans-serif', marginBottom: '1rem', fontSize: '2.4rem', fontWeight: 800, background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          Restricted Portal
        </h2>
        
        <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
          Halt! Who goes there? <br/> Provide the secret code to enter the multiverse! ✨
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter the secret code..."
              style={{ 
                width: '100%', 
                padding: '1.2rem 1.5rem', 
                borderRadius: '50px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                background: 'rgba(0,0,0,0.3)', 
                color: '#fff', 
                outline: 'none', 
                fontSize: '1.2rem', 
                textAlign: 'center',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                transition: 'border 0.3s, box-shadow 0.3s, transform 0.2s',
                fontFamily: '"Quicksand", sans-serif',
                letterSpacing: '2px'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #ec4899';
                e.target.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4), inset 0 2px 5px rgba(0,0,0,0.5)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(255,255,255,0.2)';
                e.target.style.boxShadow = 'inset 0 2px 10px rgba(0,0,0,0.5)';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                style={{ color: '#ff4d4d', fontSize: '1rem', fontWeight: 600, marginTop: '-0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(236, 72, 153, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{ 
              marginTop: '0.5rem',
              padding: '1.2rem 2rem', 
              borderRadius: '50px', 
              border: 'none', 
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)', 
              color: '#fff', 
              fontSize: '1.3rem', 
              fontWeight: 800, 
              cursor: 'pointer',
              letterSpacing: '1px',
              fontFamily: '"Quicksand", sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              textTransform: 'uppercase'
            }}
          >
            Unlock Portal 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
