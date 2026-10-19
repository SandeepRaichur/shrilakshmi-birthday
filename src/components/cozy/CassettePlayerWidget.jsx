import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playPop, playCartridgeClick } from '../../utils/audioEffects';

const TRACKS = [
  { id: 1, title: "01. Morning Kalimba Glow", vibe: "Warm & Serene" },
  { id: 2, title: "02. Dussehra Festival Echoes", vibe: "Slightly Chaotic" },
  { id: 3, title: "03. MBA Case Study Lo-Fi", vibe: "Strategic Thinking" },
  { id: 4, title: "04. Midnight Debriefs", vibe: "Quiet Starlight" },
];

export default function CassettePlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(isSoundEnabled());
  const [trackIndex, setTrackIndex] = useState(0);

  const currentTrack = TRACKS[trackIndex % TRACKS.length];

  const handleTogglePlay = () => {
    playCartridgeClick();
    const newState = !isPlaying;
    setIsPlaying(newState);
    setSoundEnabled(newState);
  };

  const handleNextTrack = () => {
    playPop();
    setTrackIndex((prev) => prev + 1);
  };

  return (
    <div className="relative p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50 border border-purple-200/80 shadow-soft backdrop-blur-md select-none max-w-xs w-full transition-all hover:shadow-hover">
      {/* Cassette Header Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-purple-900/80 font-bold uppercase">
            COZY LO-FI CASSETTE
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-100/80 text-purple-800 font-semibold">
          SIDE A
        </span>
      </div>

      {/* Cassette Window & Spinning Tape Reels */}
      <div className="relative w-full h-16 rounded-2xl bg-stone-900/90 border border-stone-800 p-2 flex items-center justify-between px-6 shadow-inner overflow-hidden">
        {/* Tape magnetic film strip */}
        <div className="absolute top-1/2 left-10 right-10 h-3 -translate-y-1/2 bg-stone-800/80 rounded-xs pointer-events-none" />

        {/* Left Reel */}
        <div className="relative z-10 w-10 h-10 rounded-full border-2 border-stone-700 bg-stone-950 flex items-center justify-center">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
            className="w-7 h-7 rounded-full border border-dashed border-amber-300/70 flex items-center justify-center text-[10px] text-amber-200"
          >
            ⚙️
          </motion.div>
        </div>

        {/* Center Display / Equalizer */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-0.5 h-4 mb-0.5">
            {[40, 75, 100, 60, 90, 45].map((h, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] } : { height: '20%' }}
                transition={isPlaying ? { duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut' } : {}}
                className={`w-1 rounded-full ${isPlaying ? 'bg-amber-400' : 'bg-stone-700'}`}
                style={{ height: '20%' }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-stone-400">
            {isPlaying ? 'PLAYING' : 'PAUSED'}
          </span>
        </div>

        {/* Right Reel */}
        <div className="relative z-10 w-10 h-10 rounded-full border-2 border-stone-700 bg-stone-950 flex items-center justify-center">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
            className="w-7 h-7 rounded-full border border-dashed border-amber-300/70 flex items-center justify-center text-[10px] text-amber-200"
          >
            ⚙️
          </motion.div>
        </div>
      </div>

      {/* Track Title */}
      <div className="mt-2.5 flex items-center justify-between">
        <div className="overflow-hidden">
          <p className="text-xs font-serif font-bold text-stone-800 truncate">
            {currentTrack.title}
          </p>
          <p className="text-[10px] font-sans text-stone-500">
            {currentTrack.vibe}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          <button
            onClick={handleTogglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-stone-800 text-stone-100 hover:bg-stone-700'
            }`}
            title={isPlaying ? 'Pause Lo-Fi' : 'Play Lo-Fi Ambient'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={handleNextTrack}
            className="w-7 h-7 rounded-full bg-stone-200/70 hover:bg-stone-300/80 text-stone-700 flex items-center justify-center transition-all"
            title="Next Track"
          >
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
