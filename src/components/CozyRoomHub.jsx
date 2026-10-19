import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Sun, Moon, Sunset } from 'lucide-react';
import { playPop, playChime } from '../utils/audioEffects';

export default function CozyRoomHub({ onNavigate, onOpenSecret, currentTheme, onChangeTheme }) {
  const hubItems = [
    {
      id: 'garden',
      label: 'The Garden Terrarium',
      desc: 'Nurture living seeds & companion flowers',
      icon: '🪴',
      badge: 'Interactive Flora',
      color: 'from-emerald-50 via-teal-50 to-emerald-100/70 border-emerald-200/80',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'arcade',
      label: 'The Pastel Arcade',
      desc: 'Algorithm quiz, Memory hunt & Mini-games',
      icon: '🕹️',
      badge: '5 Games',
      color: 'from-purple-50 via-pink-50 to-purple-100/70 border-purple-200/80',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'about-shrilakshmi',
      label: 'The Shrilakshmi Lore',
      desc: 'Diwali vs Dasara conspiracy & MBA 2026',
      icon: '🗂️',
      badge: 'Two Realities',
      color: 'from-amber-50 via-orange-50 to-amber-100/70 border-amber-200/80',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'little-things',
      label: 'Scrapbook of Little Things',
      desc: 'Flippable polaroids & quiet memories',
      icon: '📷',
      badge: 'Memory Line',
      color: 'from-pink-50 via-rose-50 to-pink-100/70 border-pink-200/80',
      badgeColor: 'bg-pink-100 text-pink-900',
    },
    {
      id: 'heart',
      label: 'A Small Note',
      desc: 'The quiet starlight letter from Sandeep',
      icon: '💌',
      badge: 'The Heart',
      color: 'from-indigo-50 via-purple-50 to-indigo-100/70 border-indigo-200/80',
      badgeColor: 'bg-indigo-100 text-indigo-900',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-14 select-none">
      {/* Aesthetic Hub Banner */}
      <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/90 shadow-glass overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pastelPink-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mutedLavender-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Top Hub Bar with Lighting / Mood Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-stone-500 uppercase font-semibold">
                POCKET WORLD · SHRILAKSHMI.SPACE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
              Where would you like to explore first?
            </h2>
          </div>

          {/* Day / Sunset / Night Atmosphere Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-stone-100/80 border border-stone-200/60 shadow-2xs">
            <button
              onClick={() => {
                playPop();
                onChangeTheme('day');
              }}
              className={`p-2 rounded-full transition-all ${
                currentTheme === 'day' ? 'bg-white text-amber-600 shadow-xs scale-105' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Daylight Cream"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playPop();
                onChangeTheme('sunset');
              }}
              className={`p-2 rounded-full transition-all ${
                currentTheme === 'sunset' ? 'bg-white text-orange-600 shadow-xs scale-105' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Golden Sunset"
            >
              <Sunset className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playPop();
                onChangeTheme('night');
              }}
              className={`p-2 rounded-full transition-all ${
                currentTheme === 'night' ? 'bg-indigo-950 text-indigo-300 shadow-xs scale-105' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Midnight Starlight"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Diorama Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {hubItems.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playChime(500 + idx * 80);
                onNavigate(item.id);
              }}
              className={`cursor-pointer p-5 rounded-3xl bg-gradient-to-br ${item.color} border shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${item.badgeColor} font-mono`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg tracking-tight group-hover:text-purple-900 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px] font-bold text-stone-500 group-hover:text-stone-800">
                <span>Enter &rarr;</span>
                <span className="text-[10px] text-stone-400 font-mono">#0{idx + 1}</span>
              </div>
            </motion.div>
          ))}

          {/* Secret Vault Tile */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playPop();
              onOpenSecret();
            }}
            className="cursor-pointer p-5 rounded-3xl bg-gradient-to-br from-stone-900 via-purple-950 to-stone-900 text-white border border-purple-500/40 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:rotate-12 transition-transform">
                  🗝️
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-500/30 text-amber-300 font-mono border border-purple-400/40">
                  CONFIDENTIAL
                </span>
              </div>
              <h3 className="font-serif font-bold text-white text-lg tracking-tight">
                The Secret Vault
              </h3>
              <p className="text-xs text-stone-300 mt-1 font-sans leading-relaxed">
                A hidden corner only accessible to people who investigate everything.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-amber-300">
              <span>Unlock &rarr;</span>
              <span className="text-[10px] text-stone-400 font-mono">#06</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
