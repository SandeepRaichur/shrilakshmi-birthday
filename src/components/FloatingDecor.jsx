import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingDecor({ theme = 'day' }) {
  const isNight = theme === 'night';
  const isSunset = theme === 'sunset';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700">
      {/* Dynamic atmospheric gradient orbs */}
      {!isNight && !isSunset && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pastelPink-100/50 blur-3xl" />
          <div className="absolute top-1/3 -right-28 w-80 h-80 rounded-full bg-mutedLavender-100/50 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-sage-100/40 blur-3xl" />
          <div className="absolute top-3/4 right-1/4 w-72 h-72 rounded-full bg-warmYellow-100/40 blur-3xl" />
        </>
      )}

      {isSunset && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-200/45 blur-3xl" />
          <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-rose-200/50 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl" />
        </>
      )}

      {isNight && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-900/35 blur-3xl" />
          <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-purple-900/30 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-slate-900/40 blur-3xl" />
          {/* Subtle night stars */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/70 animate-ping"
              style={{
                left: `${(i * 19) % 95}%`,
                top: `${(i * 27) % 85}%`,
                animationDuration: `${2.5 + (i % 3)}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Gentle drifting clouds */}
      <motion.div
        animate={{ x: [-20, 25, -20], y: [-5, 8, -5] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-8 opacity-40 hidden md:block"
      >
        <svg width="68" height="34" viewBox="0 0 100 50" fill="none">
          <path
            d="M20,35 A15,15 0 0,1 45,25 A22,22 0 0,1 80,30 A14,14 0 0,1 85,45 A10,10 0 0,1 15,45 Z"
            fill="#FFFFFF"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.03))"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{ x: [15, -20, 15], y: [6, -10, 6] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-44 right-12 opacity-35 hidden md:block"
      >
        <svg width="55" height="28" viewBox="0 0 100 50" fill="none">
          <path
            d="M20,35 A15,15 0 0,1 45,25 A22,22 0 0,1 80,30 A14,14 0 0,1 85,45 A10,10 0 0,1 15,45 Z"
            fill="#FFFFFF"
          />
        </svg>
      </motion.div>

      {/* Tiny floating botanicals */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 25, -15, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 text-pastelPink-300/40 text-lg select-none"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [0, -22, 0], rotate: [0, -20, 10, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-2/3 right-1/6 text-mutedLavender-300/35 text-base select-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -26, 0], rotate: [0, 15, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/5 left-12 text-sage-400/35 text-sm select-none"
      >
        🌱
      </motion.div>
    </div>
  );
}
