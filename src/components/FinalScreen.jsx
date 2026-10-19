import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';
import { playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function FinalScreen({ onScrollToTop }) {
  const { footer } = shrilakshmiContent;
  const paragraphs = footer?.paragraphs || [];

  return (
    <footer className="relative w-full max-w-2xl mx-auto px-6 pt-16 pb-28 text-center select-none border-t border-purple-200/40">
      {/* Background ambient warmth */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-80 h-80 rounded-full bg-pastelPink-100/40 blur-3xl" />
        <div className="w-64 h-64 rounded-full bg-warmYellow-100/30 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <span className="text-4xl mb-3">🌷</span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 font-serif tracking-tight">
          {footer?.title || "That's all"} ·{' '}
          <span className="italic font-handwriting text-purple-700 font-bold text-3xl sm:text-4xl">
            {footer?.kannadaTitle || "ashte kano!"}
          </span>{' '}
          🌷
        </h3>

        <div className="my-8 space-y-2.5 text-stone-600 text-base sm:text-lg max-w-md">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 1
                  ? "font-bold text-stone-900 text-xl sm:text-2xl font-serif"
                  : "font-sans leading-relaxed"
              }
            >
              {p}
            </p>
          ))}
        </div>

        {/* Author signature */}
        {footer?.signature && (
          <div className="mt-2 mb-6 flex flex-col items-center gap-1.5">
            <span className="text-3xl sm:text-4xl font-handwriting font-bold text-purple-900 px-8 py-3 rounded-full bg-white/90 backdrop-blur-md border border-purple-300/80 shadow-glass inline-block transform hover:scale-105 transition-transform">
              {footer.signature}
            </span>
            {footer.authorTransliteration && (
              <span className="text-xs font-mono font-medium text-purple-800/80 bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200 shadow-2xs">
                {footer.authorTransliteration}
              </span>
            )}
          </div>
        )}

        {/* Cute sticky note for P.S. */}
        {footer?.psStickyNote && (
          <div className="relative p-5 sm:p-6 rounded-2xl bg-amber-50/95 border border-amber-200/90 shadow-polaroid max-w-xs sm:max-w-sm mb-10 transform -rotate-1">
            {/* Washi tape on sticky note */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape-amber rounded-xs pointer-events-none" />

            <p className="text-xs sm:text-sm text-amber-950 font-handwriting text-xl sm:text-2xl leading-relaxed mt-1">
              {footer.psStickyNote.line1}
            </p>
            {footer.psStickyNote.line2 && (
              <p className="text-[11px] text-amber-900/70 font-sans mt-1">
                {footer.psStickyNote.line2}
              </p>
            )}
          </div>
        )}

        {/* Back to top button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playPop();
            onScrollToTop();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 hover:bg-white text-stone-800 text-xs sm:text-sm font-semibold border border-purple-200/80 shadow-soft hover:shadow-hover transition-all"
        >
          <ArrowUp className="w-4 h-4 text-purple-600" />
          <span className="font-sans">
            {footer?.backToDeskButtonText || "Back to Cozy Desk · manege banni 🏠"}
          </span>
        </motion.button>

        <p className="mt-10 text-[11px] text-stone-400 font-mono">
          {footer?.copyrightText || "Handcrafted with React & care for Shrilakshmi · 2026"}
        </p>
      </motion.div>
    </footer>
  );
}
