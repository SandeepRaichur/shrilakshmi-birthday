import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

const DEFAULT_HIDDEN_ITEMS = [
  { id: 'flower', label: 'Flower', emoji: '🌸', x: 24, y: 38, message: "You found it! Plant was feeling shy." },
  { id: 'cup', label: 'Cup', emoji: '☕', x: 62, y: 68, message: "Okay detective. Tea was getting cold anyway." },
  { id: 'star', label: 'Star', emoji: '⭐', x: 82, y: 22, message: "Shining bright in the top corner." },
  { id: 'headphones', label: 'Headphones', emoji: '🎧', x: 44, y: 62, message: "Playing good vibes only." },
  { id: 'envelope', label: 'Envelope', emoji: '💌', x: 35, y: 78, message: "A little note tucked away. Sneaky!" },
  { id: 'butterfly', label: 'Butterfly', emoji: '🦋', x: 15, y: 18, message: "Fluttered right into your view!" },
];

export default function MemoryHunt({ onDiscoveryUnlocked }) {
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
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#777D5A', '#D8F36A', '#22231F'],
        });
        if (onDiscoveryUnlocked) onDiscoveryUnlocked('arcade_memory');
      }, 700);
    }
  };

  const handleReset = () => {
    playPop();
    setFoundIds([]);
    setActiveMessage(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-paper border border-paper-border text-ink">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            ACTIVITY #02 · COZY DISCOVERY HUNT
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-ink mt-0.5">
            {gameTitle}
          </h4>
        </div>

        <span className="text-xs font-mono text-muted-text border border-paper-border px-2.5 py-1 rounded-sm">
          {foundIds.length} / {hiddenItems.length} FOUND
        </span>
      </div>

      {/* Target Items Checklist */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {hiddenItems.map((item) => {
          const isFound = foundIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`px-3 py-1 rounded-sm border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isFound
                  ? 'border-olive bg-olive text-paper font-semibold'
                  : 'border-paper-border bg-paper/60 text-muted-text'
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
              {isFound && <span className="text-[10px] ml-0.5">✓</span>}
            </div>
          );
        })}
      </div>

      {!isFinished ? (
        <>
          {/* Studio Canvas with Hidden Objects */}
          <div className="relative w-full aspect-[16/10] rounded-sm border border-paper-border bg-paper/80 overflow-hidden shadow-2xs select-none">
            {/* Ambient Room Grid Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #DAD5C9 1px, transparent 1px), linear-gradient(to bottom, #DAD5C9 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Room Furniture silhouettes */}
            <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-paper-border/60 bg-paper-border/20 pointer-events-none" />
            <div className="absolute bottom-16 left-6 w-24 h-28 border border-paper-border/60 rounded-sm pointer-events-none opacity-40" />
            <div className="absolute top-6 right-8 w-20 h-28 border border-paper-border/60 rounded-sm pointer-events-none opacity-40" />

            {/* Hidden Clickable Objects */}
            {hiddenItems.map((item) => {
              const isFound = foundIds.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleObjectClick(item)}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-sm transition-transform cursor-pointer ${
                    isFound
                      ? 'scale-125 opacity-100 ring-1 ring-olive bg-olive/15'
                      : 'opacity-70 hover:opacity-100 hover:scale-120'
                  }`}
                  title={item.label}
                >
                  <span className="text-xl sm:text-2xl block">{item.emoji}</span>
                </button>
              );
            })}
          </div>

          {/* Active Discovery Feedback */}
          {activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-sm border border-paper-border bg-paper/90 text-xs font-mono text-olive font-medium text-center"
            >
              DISCOVERY LOG: {activeMessage}
            </motion.div>
          )}
        </>
      ) : (
        /* Finished State */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-4"
        >
          <div className="w-10 h-10 rounded-full border border-olive text-olive mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <h4 className="text-2xl sm:text-3xl font-serif text-ink">
            All 6 Objects Located.
          </h4>

          <p className="text-sm font-sans text-muted-text max-w-sm mx-auto leading-relaxed">
            Master detective instincts verified. Zero details escaped your keen observation.
          </p>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>HUNT AGAIN</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
