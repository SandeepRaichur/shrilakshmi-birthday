import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { playPop, playPaperFlip } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LandingHero({ onEnter, onScrollToIndex }) {
  const { introduction, profile } = shrilakshmiContent;

  const handleCueClick = () => {
    playPaperFlip();
    if (onEnter) onEnter();
    if (onScrollToIndex) {
      onScrollToIndex();
    } else {
      const el = document.getElementById('story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 select-none border-b border-paper-border bg-paper">
      
      {/* -----------------------------------------------------------------------
          TOP MASTHEAD
          ----------------------------------------------------------------------- */}
      <header className="w-full">
        <div className="flex items-center justify-between text-xs font-mono font-medium tracking-wider text-muted-text uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-olive inline-block" />
            <span>{introduction.mastheadLeft || "A SMALL WEBSITE"}</span>
          </div>

          <div className="tracking-wider">
            {introduction.mastheadRight || `MADE FOR SHRILAKSHMI · 2026`}
          </div>
        </div>

        <div className="w-full h-px bg-paper-border mt-4" />
      </header>

      {/* -----------------------------------------------------------------------
          MAIN HERO: BALANCED 2-COLUMN LAYOUT (PERFECTLY ALIGNED & PROPORTIONED)
          ----------------------------------------------------------------------- */}
      <div className="w-full max-w-6xl mx-auto my-auto py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Greeting & Simple English Text */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          
          {/* Friendly Kannada greeting */}
          {introduction.salutation && (
            <p className="text-xs sm:text-sm font-mono text-olive font-semibold tracking-wider">
              [{introduction.salutation}]
            </p>
          )}

          {/* Bold, architectural headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-display font-bold text-ink leading-[0.9] tracking-tighter">
            <span className="block">{introduction.headlineLine1 || "hey,"}</span>
            <span className="block text-ink/90 font-display font-bold lowercase">
              {profile?.name ? `${profile.name.toLowerCase()}.` : (introduction.headlineLine2 || "shrilakshmi.")}
            </span>
          </h1>

          {/* Simple English text */}
          <div className="space-y-2.5 max-w-lg">
            <p className="text-lg sm:text-2xl font-sans font-medium text-ink leading-snug">
              {introduction.tagline || "No big reason for this website, just made it for fun."}
            </p>

            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              {introduction.supportingText || "Our story, some photos from college, and a small letter."}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={handleCueClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-ink text-paper text-xs font-mono font-semibold tracking-wider uppercase rounded-xs hover:bg-olive transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <span>{introduction.scrollCue || "SEE OUR STORY ↓"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Properly Sized, Symmetrical Photo Card (2.jpeg) */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-[430px] xl:max-w-[460px] bg-paper-light p-3.5 sm:p-5 border border-paper-border rounded-xs shadow-sm hover:shadow-md hover:border-ink/50 transition-all duration-300">
            
            {/* Top Header Strip */}
            <div className="flex items-center justify-between text-xs font-mono text-muted-text pb-3 mb-3 border-b border-paper-border">
              <span className="font-semibold text-ink tracking-wide">MOMENT #01</span>
              <span className="text-olive font-bold text-[11px] tracking-wider uppercase">TULIPS & BOW 🌷</span>
            </div>

            {/* Photo 2.jpeg: Square 1:1 Aspect Ratio matching the 736x736 image */}
            <div className="relative aspect-square w-full overflow-hidden bg-paper-dark border border-paper-border/80 rounded-xs">
              <img
                src="/photos/2.jpeg"
                alt="Shrilakshmi moment"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Simple, cute caption */}
            <div className="mt-3.5 pt-2.5 border-t border-paper-border/70 flex items-center justify-between text-xs font-mono text-muted-text">
              <span className="truncate pr-2">"A little cute moment for you"</span>
              <span className="text-ink font-semibold shrink-0">✨ 🌷</span>
            </div>

          </div>
        </div>

      </div>

      {/* -----------------------------------------------------------------------
          BOTTOM INDEX FOOTER
          ----------------------------------------------------------------------- */}
      <footer className="w-full pt-4 border-t border-paper-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-muted-text">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs bg-paper-border/60 text-ink text-[10px] uppercase font-bold">
            SECTIONS
          </span>
          <span>OUR STORY / PHOTOS / LETTER</span>
        </div>

        <button
          onClick={handleCueClick}
          className="flex items-center gap-1.5 text-ink hover:text-olive transition-colors cursor-pointer"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </footer>

    </section>
  );
}
