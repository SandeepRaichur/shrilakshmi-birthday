import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Brain, Search, Laugh, Sparkles, Moon, Volume2 } from 'lucide-react';
import ShrilakshmiAlgorithm from './arcade/ShrilakshmiAlgorithm';
import MemoryHunt from './arcade/MemoryHunt';
import MakeHerLaugh from './arcade/MakeHerLaugh';
import CatchCompliments from './arcade/CatchCompliments';
import StarCatcher from './arcade/StarCatcher';
import { playCartridgeClick, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

const CARTRIDGES = [
  {
    id: 'algo',
    title: 'The Algorithm · 11:47 PM Quiz',
    badge: 'Neural Quiz',
    icon: '🧠',
    color: 'from-purple-100 to-indigo-100 border-purple-300 text-purple-950',
    component: ShrilakshmiAlgorithm,
    discoveryKey: 'arcade_algo',
  },
  {
    id: 'memory',
    title: 'Memory Hunt · Hudukodu',
    badge: 'Detective',
    icon: '🔍',
    color: 'from-amber-100 to-yellow-100 border-amber-300 text-amber-950',
    component: MemoryHunt,
    discoveryKey: 'arcade_memory',
  },
  {
    id: 'laugh',
    title: 'Make Her Laugh · Nagisodu',
    badge: 'Comedy Test',
    icon: '😂',
    color: 'from-pink-100 to-rose-100 border-pink-300 text-pink-950',
    component: MakeHerLaugh,
    discoveryKey: 'arcade_laugh',
  },
  {
    id: 'compliments',
    title: 'Compliment Catch · Catch Maadu',
    badge: 'Reflexes',
    icon: '🌸',
    color: 'from-emerald-100 to-teal-100 border-emerald-300 text-emerald-950',
    component: CatchCompliments,
    discoveryKey: 'arcade_compliments',
  },
  {
    id: 'stars',
    title: 'Star Catcher · Nakshatra',
    badge: 'Constellation',
    icon: '⭐',
    color: 'from-indigo-100 to-slate-200 border-indigo-300 text-indigo-950',
    component: StarCatcher,
    discoveryKey: 'arcade_stars',
  },
];

export default function ArcadeSection({ onDiscoveryUnlocked, discoveries = [] }) {
  const [activeCartridgeId, setActiveCartridgeId] = useState('algo');
  const [isInserting, setIsInserting] = useState(false);

  const activeCartridge = CARTRIDGES.find((c) => c.id === activeCartridgeId) || CARTRIDGES[0];
  const ActiveGame = activeCartridge.component;

  const headerInfo = shrilakshmiContent.games?.header || {
    badge: "🕹️ PASTEL ARCADE CONSOLE · AATA AADONA",
    subtitleText: "okay, enough emotional stuff · saaku bidi emotional maathu.",
    mainTitle: "Let's play · banni aata aadona! 😂",
    description: "Click any mini-game cartridge to slot it into the console · cartridge choose maadi aata shuru maadu!",
  };

  const handleInsertCartridge = (id) => {
    if (id === activeCartridgeId) return;
    playCartridgeClick();
    setIsInserting(true);
    setActiveCartridgeId(id);
    setTimeout(() => {
      setIsInserting(false);
    }, 350);
  };

  return (
    <section id="arcade" className="relative w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center select-none">
      {/* Required Header */}
      <div className="text-center mb-10">
        <span className="editorial-pill bg-purple-100/90 text-purple-900 border border-purple-200/80 mb-3 shadow-2xs">
          {headerInfo.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-purple-700/90 leading-tight">
          {headerInfo.subtitleText}
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 font-serif mt-1 tracking-tight">
          {headerInfo.mainTitle}
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-2 font-sans">
          {headerInfo.description}
        </p>
      </div>

      {/* Cartridge Rack (Select Game) */}
      <div className="w-full max-w-2xl flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none px-2">
        {CARTRIDGES.map((cartridge) => {
          const isActive = cartridge.id === activeCartridgeId;
          const isDone = discoveries.includes(cartridge.discoveryKey);

          return (
            <motion.button
              key={cartridge.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleInsertCartridge(cartridge.id)}
              className={`relative px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-stone-900 via-purple-950 to-stone-900 text-white border-stone-800 shadow-md shadow-purple-950/20'
                  : 'bg-white/90 hover:bg-white text-stone-700 border-purple-100 shadow-2xs'
              }`}
            >
              <span className="text-base">{cartridge.icon}</span>
              <span className="font-sans">{cartridge.title}</span>
              {isDone && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-2xs" title="Completed!" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Retro-Chic Pastel Arcade Cabinet Shell */}
      <div className="relative w-full max-w-2xl p-6 sm:p-9 rounded-[3rem] bg-gradient-to-b from-purple-50 via-cream-50 to-pink-50 border-4 border-white shadow-glass">
        {/* Console Top Bezel / Brand Stamp */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-200/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-purple-900 uppercase">
              SHRILAKSHMI ENTERTAINMENT SYSTEM
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            {/* Speaker Grilles */}
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-purple-200 rounded-full" />
              <span className="w-1 h-3 bg-purple-200 rounded-full" />
              <span className="w-1 h-3 bg-purple-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Console Screen with Subtle Scanlines Effect */}
        <div className="relative overflow-hidden rounded-[2rem] bg-stone-50/50 p-2 sm:p-3">
          <AnimatePresence mode="wait">
            {!isInserting ? (
              <motion.div
                key={activeCartridgeId}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <ActiveGame
                  onComplete={() => {
                    if (onDiscoveryUnlocked) {
                      onDiscoveryUnlocked(activeCartridge.discoveryKey);
                    }
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="inserting-cartridge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-80 flex flex-col items-center justify-center text-center p-6"
              >
                <span className="text-4xl animate-bounce mb-2">{activeCartridge.icon}</span>
                <p className="font-mono text-xs text-purple-700 tracking-wider font-bold">
                  LOADING CARTRIDGE: {activeCartridge.title}...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Console Bottom Controls / Details */}
        <div className="mt-5 pt-3 border-t border-purple-200/40 flex items-center justify-between text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-purple-100 text-[10px] font-bold text-purple-900">
              {activeCartridge.badge}
            </span>
            <span className="hidden sm:inline text-[11px] text-stone-400">
              100% Touch &amp; Click Calibrated
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-2xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-2xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-2xs" />
          </div>
        </div>
      </div>
    </section>
  );
}
