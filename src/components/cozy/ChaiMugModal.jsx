import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sparkles, RefreshCw, X, Heart } from 'lucide-react';
import { playPop, playSip } from '../../utils/audioEffects';

const CHAI_THOUGHTS = [
  {
    quote: "“Bisi bisi chai kudi Shrilakshmi... swalpa tension bittu rest maadu.”",
    sub: "Hot chai status: 100%. Relax your mind.",
    tag: "BISIBISI CHAI TIME",
    mood: "☕"
  },
  {
    quote: "“Shrilakshmi: ‘Nanage ivattu tumba kelsa ide.’ Also Shrilakshmi: reels nododu 45 minutes straight.”",
    sub: "Classic pro-level procrastination.",
    tag: "FULL FOCUS MODE 👀",
    mood: "👀"
  },
  {
    quote: "“Festival committee yella varsha: ‘Bega nodro, Shrilakshmi birthday yavag ide? Aa dinave dodda festival haaki!’”",
    sub: "Diwali 2025, Dasara 2026. Calendar doesn't lie.",
    tag: "DEVI CONSPIRACY 🪔",
    mood: "🪔"
  },
  {
    quote: "“Nanna hesaru Sandeep... and I spent hours making sure this website makes you smile. Boring anali antha alla! 😂”",
    sub: "Directly from the developer's heart.",
    tag: "DEV NOTE · SANDEEP",
    mood: "💻"
  },
  {
    quote: "“November alli MBA start aada mele full English jargon maathadtiya... adikke iga swalpa chill maadu.”",
    sub: "Brace for corporate frameworks and synergies.",
    tag: "MBA ERA FORECAST",
    mood: "📈"
  },
  {
    quote: "“Swalpa nagode mukya kano. Life tumba serious aagi thagobeda. Tea sip maadu!”",
    sub: "Taking a tea break is an officially approved life strategy.",
    tag: "QUIET WISDOM 🌷",
    mood: "🌷"
  },
  {
    quote: "“Neenu tumba chaotic aagiddru, thumba genuine and dependable friend. I appreciate you!”",
    sub: "Warm and chaotic, exactly how friendship should be.",
    tag: "GENUINE APPRECIATION",
    mood: "✨"
  }
];

export default function ChaiMugModal({ isOpen, onClose }) {
  const [index, setIndex] = useState(0);
  const [sipsTaken, setSipsTaken] = useState(0);

  if (!isOpen) return null;

  const currentThought = CHAI_THOUGHTS[index % CHAI_THOUGHTS.length];

  const handleNext = () => {
    playPop();
    setIndex((prev) => prev + 1);
  };

  const handleSip = () => {
    playSip();
    setSipsTaken((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-[2.5rem] bg-amber-50/95 border border-amber-200/90 shadow-glass text-stone-800 overflow-hidden"
        >
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-44 h-6 washi-tape-amber rotate-[-1deg] rounded-xs flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest text-amber-950 uppercase font-bold">
              BISIBISI CHAI CORNER ☕
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-amber-200/60 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Steaming Mug Visual */}
          <div className="flex flex-col items-center text-center mt-2">
            <div className="relative mb-3">
              {/* Animated steam wisps */}
              <motion.div
                animate={{ y: [-4, -14, -20], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 1.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg pointer-events-none"
              >
                ♨️
              </motion.div>
              <div
                onClick={handleSip}
                className="w-16 h-16 rounded-2xl bg-amber-200/80 border border-amber-300 flex items-center justify-center text-3xl shadow-sm cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                title="Click to sip! (Swalpa kudi)"
              >
                ☕
              </div>
            </div>

            <span className="text-[11px] font-mono tracking-widest font-bold text-amber-800/80 uppercase px-3 py-0.5 rounded-full bg-amber-200/60 mb-2">
              {currentThought.tag}
            </span>

            {/* Thought quote */}
            <p className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug min-h-[90px] flex items-center justify-center px-2">
              {currentThought.quote}
            </p>

            <p className="text-xs text-amber-900/70 font-sans italic mt-1">
              {currentThought.sub}
            </p>

            {/* Sips counter */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-amber-900/80">
              <span>Sips taken: {sipsTaken}</span>
              {sipsTaken > 0 && <span className="text-amber-700 font-semibold">✨ Chai shakthi +{sipsTaken * 10}%</span>}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-5 w-full">
              <button
                onClick={handleSip}
                className="flex-1 py-2.5 px-4 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-sans font-bold text-xs sm:text-sm border border-amber-300/80 shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Swalpa kudi</span>
                <span>☕</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-1 py-2.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-100 font-sans font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Mundhe nodu</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
