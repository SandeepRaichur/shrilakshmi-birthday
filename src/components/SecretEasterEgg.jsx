import React from 'react';
import { motion } from 'framer-motion';
import { playPop } from '../utils/audioEffects';

export default function SecretEasterEgg({ onTriggerSecret }) {
  return (
    <div className="fixed bottom-4 right-4 z-30 select-none">
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          playPop();
          onTriggerSecret();
        }}
        className="group relative p-2 rounded-sm bg-paper/80 border border-paper-border hover:border-ink text-muted-text hover:text-ink transition-colors cursor-pointer text-xs font-mono"
        title="probably nothing..."
      >
        <span>✦</span>

        {/* Playful editorial tooltip on hover */}
        <span className="pointer-events-none absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-sm bg-ink text-paper text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          ARCHIVE SPECIMEN · PROBABLY NOTHING...
        </span>
      </motion.button>
    </div>
  );
}
