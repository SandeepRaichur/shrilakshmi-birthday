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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-sm bg-paper border border-paper-border shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 text-muted-text hover:text-ink hover:bg-paper-border/30 rounded-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <div className="space-y-1 mb-5">
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              EXPERIMENT LOG · PROGRESS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-ink">
              {badges?.title || "Shrilakshmi's Discoveries"}
            </h3>
            <p className="text-xs font-mono text-muted-text">
              {count} of {badgeList.length} items logged.
            </p>
          </div>

          {/* Badges List */}
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {badgeList.map((badge) => {
              const isUnlocked = discoveries.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-sm border flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-paper/80 border-paper-border text-ink'
                      : 'bg-paper-border/20 border-paper-border/50 text-muted-text opacity-60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-sm border border-paper-border flex items-center justify-center text-sm shrink-0">
                    {isUnlocked ? badge.icon : <Lock className="w-3.5 h-3.5 text-muted-text" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-semibold truncate">
                      {badge.title}
                    </p>
                    <p className="text-[11px] font-sans text-muted-text truncate">
                      {badge.desc}
                    </p>
                  </div>

                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Button */}
          <div className="mt-6 pt-4 border-t border-paper-border flex justify-end">
            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="px-4 py-2 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors cursor-pointer"
            >
              {badges?.closeButtonText || "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
