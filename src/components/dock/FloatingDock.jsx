import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Layers, Compass, Award } from 'lucide-react';
import { isSoundEnabled, toggleSound, playPop, playChime } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function FloatingDock({
  activeStation,
  onSelectStation,
  viewMode,
  onToggleViewMode,
  discoveries = [],
  onOpenBadges,
  onOpenSecret,
}) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [hoveredStation, setHoveredStation] = useState(null);
  const sections = shrilakshmiContent.sections || {};

  const availableStations = [
    { id: 'desk', label: 'Desk · Mane', icon: '🏠', color: 'hover:bg-amber-100/80 text-amber-900' },
    { id: 'garden', label: 'Terrarium · Chiguru', icon: '🪴', color: 'hover:bg-emerald-100/80 text-emerald-900', enabled: sections.garden !== false },
    { id: 'arcade', label: 'Arcade · Aata', icon: '🕹️', color: 'hover:bg-purple-100/80 text-purple-900', enabled: sections.games !== false },
    { id: 'about-shrilakshmi', label: 'Dossier · Devi Lore', icon: '🗂️', color: 'hover:bg-orange-100/80 text-orange-900', enabled: sections.memes !== false },
    { id: 'photos', label: 'Photos · Moments', icon: '📷', color: 'hover:bg-amber-100/80 text-amber-900', enabled: sections.photos !== false },
    { id: 'little-things', label: 'Scrapbook · Nenapu', icon: '💌', color: 'hover:bg-pink-100/80 text-pink-900', enabled: sections.littleThings !== false },
    { id: 'heart', label: 'Letter · Kagadha', icon: '✨', color: 'hover:bg-indigo-100/80 text-indigo-900', enabled: sections.personalMessage !== false },
  ].filter((st) => st.enabled !== false);

  const handleToggleSound = () => {
    const s = toggleSound();
    setSoundOn(s);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none max-w-full px-2">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
        className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/85 dark:bg-stone-900/85 backdrop-blur-xl border border-white/90 dark:border-stone-700/80 shadow-2xl shadow-stone-900/15"
      >
        {/* Navigation Stations */}
        {availableStations.map((st) => {
          const isActive = activeStation === st.id;

          return (
            <div key={st.id} className="relative group">
              <motion.button
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPop();
                  onSelectStation(st.id);
                }}
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-md shadow-purple-900/30 ring-2 ring-purple-300'
                    : 'bg-stone-100/80 hover:bg-stone-200/90 text-stone-700'
                }`}
              >
                <span>{st.icon}</span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-purple-500" />
                )}
              </motion.button>

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 transform group-hover:-translate-y-1 bg-stone-900 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                {st.label}
              </div>
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-[1px] h-6 bg-stone-300/80 dark:bg-stone-700 mx-1" />

        {/* Secret Key Trigger */}
        {sections.secretMessage !== false && (
          <motion.button
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playPop();
              onOpenSecret();
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-base shadow-sm relative group"
            title="Open Secret Vault"
          >
            <span>🗝️</span>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 transform group-hover:-translate-y-1 bg-stone-900 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
              Secret Vault
            </div>
          </motion.button>
        )}

        {/* Audio Toggle */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleSound}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs transition-colors ${
            soundOn
              ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
              : 'bg-stone-200/70 text-stone-500 hover:bg-stone-300'
          }`}
          title={soundOn ? 'Sound is ON (Click to Mute)' : 'Sound is OFF (Click to Unmute)'}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>

        {/* View Mode Toggle (Studio Mode vs Continuous Scroll) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playPop();
            onToggleViewMode();
          }}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200/80 shadow-2xs transition-all"
          title="Switch between Studio Focused View and Continuous Scroll"
        >
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          <span className="font-mono text-[10px] uppercase">
            {viewMode === 'studio' ? 'Studio Mode' : 'Story Scroll'}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
