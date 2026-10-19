import React from 'react';
import { motion } from 'framer-motion';
import { playPop } from '../utils/audioEffects';

export default function SecretEasterEgg({ onTriggerSecret }) {
  return (
    <div className="fixed bottom-4 right-4 z-30 select-none">
      <motion.button
        whileHover={{ scale: 1.35, rotate: 20 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          playPop();
          onTriggerSecret();
        }}
        className="group relative p-2.5 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-xs text-amber-400 hover:text-amber-500 transition-all duration-300 shadow-2xs hover:shadow-sm"
        title="probably nothing..."
      >
        <span className="text-sm block animate-spin-slow">✨</span>

        {/* Playful tooltip on hover */}
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-xl bg-stone-900/80 text-white text-[10px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          probably nothing... 👀
        </span>
      </motion.button>
    </div>
  );
}
