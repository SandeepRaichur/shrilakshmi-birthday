import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, RefreshCw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

const DEFAULT_HIDDEN_ITEMS = [
  { id: 'flower', label: 'Flower', emoji: '🌸', x: 24, y: 38, message: "You found it! The plant was feeling shy." },
  { id: 'cup', label: 'Cup', emoji: '☕', x: 62, y: 68, message: "Okay detective. 👀 Coffee was getting cold anyway." },
  { id: 'star', label: 'Star', emoji: '⭐', x: 82, y: 22, message: "How did you notice that? Shining bright in the corner." },
  { id: 'headphones', label: 'Headphones', emoji: '🎧', x: 44, y: 62, message: "Tune in! Playing good vibes only." },
  { id: 'envelope', label: 'Envelope', emoji: '💌', x: 35, y: 78, message: "A little note tucked away. Sneaky!" },
  { id: 'butterfly', label: 'Butterfly', emoji: '🦋', x: 15, y: 18, message: "Fluttered right into your view!" },
];

export default function MemoryHunt({ onComplete }) {
  const hiddenItems = shrilakshmiContent.games?.memoryHunt?.items || DEFAULT_HIDDEN_ITEMS;
  const gameTitle = shrilakshmiContent.games?.memoryHunt?.title || "Memory Hunt";
  const [foundIds, setFoundIds] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleObjectClick = (item) => {
    if (foundIds.includes(item.id)) return;

    playChime();
    const updated = [...foundIds, item.id];
    setFoundIds(updated);
    setActiveMessage(item.message);

    if (updated.length === hiddenItems.length) {
      setTimeout(() => {
        setIsFinished(true);
        playSuccess();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#38BDF8', '#FDE047'],
        });
        if (onComplete) onComplete();
      }, 900);
    }
  };

  const handleReset = () => {
    playPop();
    setFoundIds([]);
    setActiveMessage(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/90 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 shadow-2xs">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xl font-serif tracking-tight">
              {gameTitle}
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Tap the hidden objects scattered in the room
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          {foundIds.length}/{hiddenItems.length} Found
        </span>
      </div>

      {/* Target Items Checklist Bar */}
      <div className="grid grid-cols-6 gap-2 mb-4 bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
        {hiddenItems.map((item) => {
          const isFound = foundIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
                isFound
                  ? 'bg-amber-100/70 border border-amber-300'
                  : 'bg-white border border-stone-200/60 opacity-40 grayscale'
              }`}
            >
              <span className="text-base sm:text-lg">{item.emoji}</span>
              <span className="text-[10px] font-medium text-stone-600 mt-0.5 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Illustrated Cozy Room Scene */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-amber-50/50 border border-purple-100 overflow-hidden select-none">
        {/* Background Room Architecture: Window */}
        <div className="absolute top-4 right-6 w-28 h-28 rounded-2xl border-4 border-white/90 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 shadow-inner overflow-hidden">
          {/* Moon in window */}
          <div className="absolute top-3 right-4 text-xs">🌙</div>
          <div className="absolute top-7 left-3 w-1 h-1 bg-white rounded-full animate-ping" />
        </div>

        {/* Bookshelf on left */}
        <div className="absolute top-10 left-6 w-24 h-40 border-r-2 border-stone-300/40 flex flex-col justify-between py-2">
          <div className="w-20 h-2 bg-amber-200/70 rounded-sm" />
          {/* Books */}
          <div className="flex gap-1 items-end px-1">
            <div className="w-3 h-14 bg-rose-300 rounded-xs" />
            <div className="w-4 h-16 bg-purple-300 rounded-xs" />
            <div className="w-3 h-12 bg-teal-300 rounded-xs" />
          </div>
          <div className="w-20 h-2 bg-amber-200/70 rounded-sm" />
          <div className="flex gap-1 items-end px-1">
            <div className="w-4 h-14 bg-amber-300 rounded-xs" />
            <div className="w-3 h-10 bg-indigo-300 rounded-xs" />
          </div>
          <div className="w-20 h-2 bg-amber-200/70 rounded-sm" />
        </div>

        {/* Cozy Study Desk & Chair */}
        <div className="absolute bottom-6 left-1/4 right-12 h-24 bg-white/70 backdrop-blur-xs rounded-xl border border-stone-200 shadow-xs flex items-center justify-around px-4">
          {/* Desk Lamp */}
          <div className="w-4 h-12 bg-amber-400/80 rounded-t-full shadow-xs" />
          {/* Laptop */}
          <div className="w-16 h-10 bg-stone-300 rounded-md border border-stone-400/60 shadow-xs flex items-center justify-center">
            <span className="text-[8px] text-stone-500 font-mono">coder</span>
          </div>
          {/* Notepad */}
          <div className="w-8 h-10 bg-yellow-100 rounded-xs border border-yellow-200 shadow-2xs rotate-6" />
        </div>

        {/* Cozy Rug on Floor */}
        <div className="absolute -bottom-6 left-12 right-12 h-14 rounded-full bg-pastelPink-100/60 border border-pink-200/40" />

        {/* Clickable Hidden Items Placed Inside the Scene */}
        {hiddenItems.map((item) => {
          const isFound = foundIds.includes(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => handleObjectClick(item)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl cursor-pointer p-1.5 rounded-full transition-transform ${
                isFound
                  ? 'opacity-30 cursor-default pointer-events-none'
                  : 'hover:bg-white/70 active:scale-95'
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              title={isFound ? 'Already found' : 'Click me!'}
            >
              <span>{item.emoji}</span>
              {!isFound && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </motion.button>
          );
        })}

        {/* Flash Message when an object is found */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              key={activeMessage}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-2 inset-x-4 bg-stone-900/85 backdrop-blur-md text-white text-xs sm:text-sm py-2 px-3 rounded-xl text-center shadow-lg font-medium"
            >
              {activeMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Completion Dialog */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"
        >
          <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-sm sm:text-base font-display">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Memory Hunt complete ✨</span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Impressive eye for detail, Shrilakshmi! Found every single memory artifact.
          </p>
          <button
            onClick={handleReset}
            className="mt-3 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-stone-700 hover:text-stone-900 text-xs font-semibold border border-stone-200 shadow-xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Play Again</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
