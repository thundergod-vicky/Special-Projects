import React from 'react';
import { motion } from 'framer-motion';

export default function PortalSelection({ onSelect, onBack }) {
  const options = [
    {
      id: 'valentine',
      title: "Valentine's Universe",
      subtitle: "Relive the magic of our special days. 💖",
      emoji: "🏹",
      glowColor: "rgba(236, 72, 153, 0.6)",
      gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(244, 63, 94, 0.05) 100%)",
      border: "1px solid rgba(236, 72, 153, 0.6)",
    },
    {
      id: 'multiverse',
      title: "The Multiverse",
      subtitle: "Venture into the unknown realms of us. 🌌",
      emoji: "🔮",
      glowColor: "rgba(139, 92, 246, 0.6)",
      gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)",
      border: "1px solid rgba(139, 92, 246, 0.6)",
    }
  ];

  return (
    <div className="screen" style={{ 
        background: 'radial-gradient(ellipse at center, #1b2735 0%, #000000 100%)', 
        color: '#fff', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
    }}>
      {/* Dynamic Grid Background mimicking Cyberspace/Multiverse travel */}
      <div style={{
          position: 'absolute', inset: -100,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)',
          backgroundSize: '100px 100px',
          transform: 'perspective(600px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          animation: 'gridMove 10s linear infinite',
          zIndex: 0,
      }}></div>
      <style>{`
        @keyframes gridMove {
            0% { transform: perspective(600px) rotateX(60deg) translateY(0) translateZ(-200px); }
            100% { transform: perspective(600px) rotateX(60deg) translateY(100px) translateZ(-200px); }
        }
      `}</style>
      
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 20,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '0.8rem 1.5rem',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            transition: 'background 0.3s, box-shadow 0.3s',
            fontFamily: '"Quicksand", sans-serif',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>👈</span> Lock Portal
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', width: '100%', maxWidth: '1000px', zIndex: 10, padding: '2rem' }}
      >
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 5px 15px rgba(255,255,255,0.3))' }}
        >
            🛸
        </motion.div>
        
        <h1 style={{ fontFamily: '"Quicksand", sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 15px rgba(192, 132, 252, 0.5))' }}>
          Choose Your Destiny
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.85, marginBottom: '3.5rem', fontWeight: 600, letterSpacing: '0.5px' }}>
          Two realities exist before you... Which portal will you step through today, pookie? ✨
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10, boxShadow: `0 20px 40px ${option.glowColor}`, borderColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(option.id)}
              style={{
                background: option.gradient,
                border: option.border,
                borderRadius: '35px',
                padding: '3.5rem 2rem',
                flex: '1 1 350px',
                maxWidth: '450px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 10px 30px rgba(0,0,0,0.6), inset 0 0 20px ${option.glowColor}`,
                transition: 'border-color 0.3s'
              }}
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index }}
                style={{ fontSize: '6rem', filter: `drop-shadow(0 15px 25px ${option.glowColor})` }}
              >
                {option.emoji}
              </motion.div>
              <div>
                <h2 style={{ fontFamily: '"Quicksand", sans-serif', fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.8rem 0', textShadow: '0 4px 10px rgba(0,0,0,0.8)', color: '#fff' }}>
                  {option.title}
                </h2>
                <p style={{ fontSize: '1.15rem', opacity: 0.9, margin: 0, lineHeight: 1.5, letterSpacing: '0.5px', color: '#e2e8f0' }}>
                  {option.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
