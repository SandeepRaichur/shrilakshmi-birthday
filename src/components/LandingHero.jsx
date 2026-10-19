import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { playSparkle, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LandingHero({ onEnter, visitInfo }) {
  const [isBlooming, setIsBlooming] = useState(false);
  const { introduction, profile } = shrilakshmiContent;

  const handleEnterClick = () => {
    setIsBlooming(true);
    playSparkle();
    setTimeout(() => {
      onEnter();
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden select-none">
      {/* Soft ethereal ambient lighting */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/40 via-purple-200/35 to-amber-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-sage-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pastelPink-200/35 rounded-full blur-2xl pointer-events-none" />

      {/* Floating stardust accents */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 8, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-1/6 text-2xl opacity-60 pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [8, -12, 8], rotate: [0, -10, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-24 left-1/6 text-xl opacity-60 pointer-events-none"
      >
        🌸
      </motion.div>

      {/* Visit badge if returning visitor */}
      {visitInfo && visitInfo.count > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-8 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-soft text-xs md:text-sm text-purple-900 font-medium tracking-wide flex items-center gap-1.5 z-20"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
          <span>{visitInfo.message}</span>
        </motion.div>
      )}

      {/* Center Postcard / Aesthetic Card */}
      <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isBlooming ? (
            <motion.div
              key="landing-card"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full p-8 sm:p-12 rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/90 shadow-glass flex flex-col items-center text-center"
            >
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-44 h-7 washi-tape-amber rotate-[-1.5deg] rounded-xs flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-amber-900/70 uppercase font-bold">
                  {introduction?.badge || "FOR YOU · NINAGAGI"}
                </span>
              </div>

              {/* Tiny Botanical Icon */}
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-100 via-purple-50 to-amber-100 border border-purple-200/50 flex items-center justify-center text-2xl shadow-xs mb-5 cursor-default"
              >
                🌷
              </motion.div>

              {/* Salutation in Fraunces serif */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-stone-800 tracking-tight leading-tight">
                hey,{' '}
                <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 bg-clip-text text-transparent italic">
                  {profile?.name || "Shrilakshmi"}
                </span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }}
                  className="inline-block ml-2 text-3xl sm:text-4xl origin-bottom-right"
                >
                  👋
                </motion.span>
              </h1>

              {introduction?.salutation && (
                <p className="text-base sm:text-lg font-handwriting text-purple-700 font-bold mt-1">
                  {introduction.salutation}
                </p>
              )}

              {/* Subtitle */}
              <p className="mt-2 text-stone-600 text-sm sm:text-base font-sans font-medium max-w-sm leading-relaxed">
                {introduction?.subtitle || "I made you a tiny corner of the internet."}
              </p>

              {/* Handwritten Note Accent with cute curved doodle */}
              {introduction?.handwrittenNote && (
                <div className="mt-5 mb-4 px-5 py-3 rounded-2xl bg-purple-50/60 border border-purple-100/80 text-stone-700 font-handwriting text-xl sm:text-2xl leading-snug transform -rotate-1 shadow-2xs">
                  <p>{introduction.handwrittenNote.line1}</p>
                  <p className="text-purple-700 font-semibold">{introduction.handwrittenNote.line2}</p>
                  {introduction.handwrittenNote.caption && (
                    <p className="text-xs text-stone-400 font-sans mt-0.5 font-normal tracking-wide">
                      {introduction.handwrittenNote.caption}
                    </p>
                  )}
                </div>
              )}

              {/* Cute Station Preview Chips */}
              {introduction?.previewChips && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-7 max-w-sm">
                  {introduction.previewChips.map((chip) => (
                    <span
                      key={chip.id}
                      className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/80"
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Tactile ENTER button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnterClick}
                className="group relative inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-gradient-to-r from-stone-900 via-purple-950 to-stone-900 text-white font-semibold text-base sm:text-lg shadow-lg shadow-purple-950/20 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300"
              >
                <span className="tracking-wide font-sans">{introduction?.buttonText || "ENTER · banni"}</span>
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 -z-10" />
              </motion.button>

              <p className="mt-6 text-xs text-stone-400 font-mono tracking-wide">
                {introduction?.audioHint || "headphones recommended · made with care for Shrilakshmi"}
              </p>
            </motion.div>
          ) : (
            /* Blooming flower transition */
            <motion.div
              key="blooming"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Radiant multi-layer glow */}
                <motion.div
                  animate={{ scale: [1, 2, 2.6], opacity: [0.4, 0.8, 0] }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full blur-2xl"
                />

                {/* Blooming plant SVG with watercolor feel */}
                <svg viewBox="0 0 100 100" className="w-40 h-40 relative z-10 filter drop-shadow-md">
                  {/* Stem */}
                  <motion.path
                    d="M 50 88 Q 51 68 50 48"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />

                  {/* Left leaf */}
                  <motion.path
                    d="M 50 70 Q 36 66 32 55 Q 44 56 50 70"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  />

                  {/* Right leaf */}
                  <motion.path
                    d="M 50 62 Q 64 58 68 47 Q 56 48 50 62"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  />

                  {/* Blooming petals */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.ellipse
                      key={angle}
                      cx="50"
                      cy="36"
                      rx="8"
                      ry="17"
                      fill="#F472B6"
                      opacity="0.9"
                      transform={`rotate(${angle} 50 36)`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      transition={{ delay: 0.65 + i * 0.07, duration: 0.4, type: 'spring' }}
                    />
                  ))}

                  {/* Inner golden core */}
                  <motion.circle
                    cx="50"
                    cy="36"
                    r="8"
                    fill="#FDE047"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1] }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                  />
                </svg>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4 text-purple-900 font-serif italic text-2xl font-bold"
              >
                {introduction?.bloomingWelcome || "banni Shrilakshmi, welcome to your corner... 🌷"}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
