import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, RotateCcw } from 'lucide-react';
import { playPaperFlip, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LittleThingsSection() {
  const { polaroids, littleThingsHeader } = shrilakshmiContent;
  const cards = polaroids || [];

  const [flippedIds, setFlippedIds] = useState([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  const toggleFlip = (id) => {
    playPaperFlip();
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShuffle = () => {
    playPop();
    setShuffleKey((k) => k + 1);
  };

  return (
    <section id="little-things" className="relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="editorial-pill bg-pastelPink-100 text-pink-900 border border-pink-200/80 mb-3 shadow-2xs">
          {littleThingsHeader?.badge || "💌 MEMORY PINBOARD · FLIP MAADI NODU"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 font-serif tracking-tight">
          {littleThingsHeader?.title || "Little things"} ·{' '}
          <span className="italic font-handwriting text-pink-700 font-bold text-3xl sm:text-4xl">
            {littleThingsHeader?.kannadaTitle || "sanna vishayagalu"}
          </span>
        </h2>
        <p className="text-stone-500 font-sans text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
          {littleThingsHeader?.subtitle || "Things you probably don't even realize matter · namboke kashta aadru idhe mukya."}
        </p>

        <button
          onClick={handleShuffle}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 text-xs font-semibold border border-purple-200/60 shadow-2xs transition-all active:scale-95"
        >
          <Shuffle className="w-3.5 h-3.5 text-purple-600" />
          <span>{littleThingsHeader?.shuffleButtonText || "Shuffle Polaroids · adal-badal maadu"}</span>
        </button>
      </div>

      {/* Interactive Polaroid Grid */}
      <div
        key={shuffleKey}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        {cards.map((card, index) => {
          const isFlipped = flippedIds.includes(card.id);
          const defaultTilts = [-2.5, 2.8, -1.8, 3.2, -2.0, 1.8];
          const tilt = card.tilt ?? defaultTilts[index % defaultTilts.length];

          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFlip(card.id)}
              style={{ rotate: `${tilt}deg` }}
              className="relative cursor-pointer min-h-[260px] rounded-3xl bg-white p-5 shadow-polaroid border border-stone-200/70 flex flex-col justify-between transition-all group perspective-1000"
            >
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-pink rounded-xs pointer-events-none" />

              {!isFlipped ? (
                /* Front Side: Photo Style */
                <div className="flex flex-col h-full justify-between pt-2">
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-stone-100 to-purple-50/60 border border-stone-200/40 flex items-center justify-center text-4xl shadow-inner group-hover:scale-[1.02] transition-transform">
                    {card.emoji || "🌸"}
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-mono tracking-widest text-stone-400 font-bold uppercase">
                      {card.frontTag || "MEMORY NOTE"}
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug mt-0.5">
                      {card.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-purple-700 font-bold">
                    <span>Tap to flip ↺</span>
                    <span className="text-[10px] text-stone-300 font-mono">MEMO #{card.id}</span>
                  </div>
                </div>
              ) : (
                /* Back Side: Handwritten Note */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col h-full justify-between p-2 pt-3"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-purple-700 font-bold uppercase">
                      INSIDE THOUGHT
                    </span>
                    <p className="mt-2 text-stone-800 font-handwriting text-xl sm:text-2xl leading-relaxed">
                      &ldquo;{card.backNote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="text-purple-600 font-bold">Flip back ↻</span>
                    <span className="text-[10px] font-mono">Shrilakshmi Lore</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Reflection Quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative mt-16 text-center max-w-lg p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-white via-purple-50/40 to-amber-50/30 border border-purple-200/80 shadow-glass"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-xl shadow-2xs">
          📖
        </div>

        <p className="text-lg sm:text-xl text-stone-700 font-serif italic leading-relaxed">
          &ldquo;Some moments don&apos;t look important while they&apos;re happening.
        </p>
        <p className="text-lg sm:text-xl font-bold text-purple-950 font-serif mt-1">
          Somehow, they become memories anyway.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
