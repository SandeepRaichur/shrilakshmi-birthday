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
    <section className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 sm:py-12 select-none border-b border-paper-border bg-paper">

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
          MAIN HERO: 2-COLUMN LAYOUT (TEXT ON LEFT, 1.JPEG ON RIGHT)
          ----------------------------------------------------------------------- */}
      <div className="w-full max-w-6xl mx-auto my-auto py-8 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Column: Greeting & Simple English Text */}
        <div className="lg:col-span-7 space-y-6 text-left">

          {/* Friendly Kannada greeting */}
          {introduction.salutation && (
            <p className="text-xs sm:text-sm font-mono text-olive font-semibold tracking-wider">
              [{introduction.salutation}]
            </p>
          )}

          {/* Bold headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-ink leading-[0.9] tracking-tighter">
            <span className="block">{introduction.headlineLine1 || "hey,"}</span>
            <span className="block text-ink/90 font-display font-bold lowercase">
              {profile?.name ? `${profile.name.toLowerCase()}.` : (introduction.headlineLine2 || "shrilakshmi.")}
            </span>
          </h1>

          {/* Simple English text */}
          <div className="space-y-2 max-w-lg">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-xs font-mono font-semibold tracking-wider uppercase rounded-xs hover:bg-olive transition-all cursor-pointer shadow-2xs active:scale-98"
            >
              <span>{introduction.scrollCue || "SEE OUR STORY ↓"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: 1.jpeg photo (Exactly where user drew the orange arrow!) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-paper-light p-3 sm:p-4 border border-paper-border rounded-xs shadow-xs hover:border-ink/60 transition-all duration-300">

            {/* Top Tape Sticker */}
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-text pb-2.5 mb-2 border-b border-paper-border">
              <span className="font-semibold text-ink">MOMENT #01</span>
              <span className="text-olive font-bold">FAVOURITE MEME</span>
            </div>

            {/* Photo 1.jpeg container */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-dark border border-paper-border rounded-xs">
              <img
                src="/photos/2.jpeg"
                alt="Shrilakshmi moment 1"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Simple caption */}
            <p className="text-xs font-mono text-muted-text mt-3 text-center">
              "Chef's kiss reaction 😂"
            </p>

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
