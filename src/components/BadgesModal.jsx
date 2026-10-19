import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function BadgesModal({ isOpen, onClose, discoveries = [] }) {
  const { badges } = shrilakshmiContent;
  const badgeList = badges?.list || [];

  if (!isOpen) return null;

  const count = discoveries.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-md p-6 rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-stone-900 text-xl font-serif tracking-tight">
              {badges?.title || "Shrilakshmi's Discoveries"} ·{' '}
              <span className="font-handwriting text-purple-700 font-bold text-xl">
                {badges?.kannadaTitle || "sadhanegalu"}
              </span>
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-5 font-sans">
            You&apos;ve discovered {count} out of {badgeList.length} {badges?.subtitleText || "moments discovered · Yella kandhidya nodu!"}
          </p>

          {/* Badges List */}
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {badgeList.map((badge) => {
              const isUnlocked = discoveries.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-purple-50/60 border-purple-200/80 shadow-2xs'
                      : 'bg-stone-50 border-stone-200/50 opacity-50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isUnlocked ? 'bg-white shadow-xs' : 'bg-stone-200/60 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800 truncate">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {badge.desc}
                    </p>
                  </div>

                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-full mt-5 py-2.5 rounded-full bg-stone-800 text-white text-xs sm:text-sm font-semibold hover:bg-stone-900 transition-all active:scale-98"
          >
            {badges?.closeButtonText || "Close · Saaku ✨"}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
