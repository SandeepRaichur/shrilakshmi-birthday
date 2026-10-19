import React from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function HeartSection() {
  const { personalMessage } = shrilakshmiContent;
  const lines = personalMessage?.lines || [];
  const finalPeak = personalMessage?.finalPeak;

  return (
    <section id="heart" className="relative w-full max-w-2xl mx-auto px-6 py-28 my-10 flex flex-col items-center text-center select-none">
      {/* Very subtle ambient dust motes & gentle breathing aurora */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-pastelPink-200/35 blur-3xl animate-pulse-subtle" />
        <div className="w-80 h-80 rounded-full bg-mutedLavender-200/35 blur-3xl -bottom-10" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {lines.map((line, index) => {
          let style = "text-stone-700 text-base sm:text-lg font-normal leading-relaxed mb-6 font-sans";
          if (line.isHandwriting) {
            style = "text-purple-700/80 font-handwriting text-3xl mb-8";
          } else if (line.isBold) {
            style = "text-stone-900 text-xl sm:text-2xl font-serif font-bold tracking-tight mb-6";
          } else if (line.isLight) {
            style = "text-stone-500 text-sm sm:text-base mb-6 font-sans font-light";
          }

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: 0.2 + index * 0.25, duration: 0.8, ease: 'easeOut' }}
              className={style}
            >
              {line.text}
            </motion.p>
          );
        })}

        {/* Final Emotional Peak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + lines.length * 0.25, duration: 1, ease: 'easeOut' }}
          className="mt-8 pt-8 border-t border-purple-200/50 w-full flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-pink-100/80 border border-pink-200/80 flex items-center justify-center text-xl shadow-xs mb-3">
            🌷
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-serif">
            {finalPeak?.title || "I'm glad you're here."}
          </h3>
          {finalPeak?.kannadaSubtitle && (
            <p className="text-xl sm:text-2xl font-handwriting text-purple-700 font-bold mt-2">
              {finalPeak.kannadaSubtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
