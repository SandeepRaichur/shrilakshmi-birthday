import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function FinalScreen({ onScrollToTop }) {
  const { footer, profile } = shrilakshmiContent;

  const handleScrollTop = () => {
    playPop();
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 select-none">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-paper-border gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-text">
            COLOPHON · 2026
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-ink mt-1">
            {footer?.title || "That's all."}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-muted-text mt-2 max-w-sm">
            {footer?.authorTransliteration || profile?.authorTransliteration || "nanna hesaru sandeep · made with care for Shrilakshmi"}
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={handleScrollTop}
          className="self-start sm:self-auto px-4 py-2 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase text-ink transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-olive" />
        </button>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-muted-text gap-2">
        <span>A SMALL INTERNET EXPERIMENT · CRAFTED FOR SHRILAKSHMI</span>
        <span>{profile?.year || "2026"}</span>
      </div>
    </footer>
  );
}
