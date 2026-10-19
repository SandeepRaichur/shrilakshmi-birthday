import React from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatHero({ onEnter }) {
  const { hero, profile } = shrilakshmiContent;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper"
    >
      {/* Background Subtle Watermark Paw/Silhouette */}
      <div className="absolute right-4 top-24 opacity-[0.035] select-none pointer-events-none hidden sm:block">
        <svg width="340" height="340" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5.5 4 4.5 7C3.5 10 4 13.5 6 16L12 22L18 16C20 13.5 20.5 10 19.5 7C18.5 4 15.5 2 12 2ZM8.5 6.5C9.33 6.5 10 7.17 10 8C10 8.83 9.33 9.5 8.5 9.5C7.67 9.5 7 8.83 7 8C7 7.17 7.67 6.5 8.5 6.5ZM15.5 6.5C16.33 6.5 17 7.17 17 8C17 8.83 16.33 9.5 15.5 9.5C14.67 9.5 14 8.83 14 8C14 7.17 14.67 6.5 15.5 6.5ZM12 11C13.1 11 14 11.9 14 13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11Z" />
        </svg>
      </div>

      {/* 1. TOP MASTHEAD STRIP */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between border-b border-ink/15 pb-4 mb-8 sm:mb-12 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-ginger animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink font-semibold">
            {hero.masthead || "THE CAT INTERNET"}
          </span>
        </div>
        <div className="font-mono text-[11px] tracking-widest text-muted-text uppercase flex items-center gap-3">
          <span>{hero.subhead || "AN UNOFFICIAL PUBLICATION · EST. 2026"}</span>
          <span className="hidden md:inline text-ink/30">•</span>
          <span className="hidden md:inline text-ginger font-medium">SPECIAL CAT EDITION</span>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL HERO CONTENT */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Headlines & Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-chartreuse/50 border border-ink/10 rounded-full w-fit">
            <span className="text-xs">🐾</span>
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink">
              SPECIAL ISSUE · VOLUME 01
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink leading-[0.92]">
              {hero.headlineLine1} <br />
              <span className="italic font-normal text-ginger">{hero.headlineLine2}</span>
            </h1>
          </div>

          {/* Supporting Headline */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-ink/90 leading-snug font-normal max-w-xl">
            "{hero.supportingHeadline}"
          </p>

          {/* Small Caption / Description */}
          <div className="border-l-2 border-ginger/60 pl-4 py-0.5">
            <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans max-w-lg">
              {hero.caption}
            </p>
            <p className="text-xs text-olive font-mono mt-1.5">
              nanna hesaru sandeep · handcrafted digital archive for Shrilakshmi
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={onEnter}
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-ink hover:bg-ginger text-paper font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] rounded-xs cursor-pointer"
            >
              <span>{hero.ctaButton || "ENTER THE CAT INTERNET →"}</span>
              <span className="group-hover:translate-x-1 transition-transform">🐾</span>
            </button>

            <span className="text-xs font-mono text-muted-text tracking-wide">
              ↓ or scroll down to begin reading
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-paper-border">
            {hero.quickStats?.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl text-ink font-semibold">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-muted-text">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Hero Cat Photograph Focal Point */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md bg-paper-light p-3 sm:p-4 border border-paper-border shadow-md rounded-xs group hover:border-ink/30 transition-all">
            
            {/* Top Tape / Sticker Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-chartreuse text-ink font-mono text-[10px] font-bold tracking-widest uppercase border border-ink/20 shadow-xs z-10">
              {hero.featuredCat?.badge || "CHIEF FELINE OFFICER"}
            </div>

            {/* Cat Photograph Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-dark border border-paper-border/80">
              <img
                src={hero.featuredCat?.image || "/photos/2.jpeg"}
                alt={hero.featuredCat?.alt || "Chief Feline Officer"}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Corner Paw Stamp */}
              <div className="absolute bottom-3 right-3 bg-paper/90 backdrop-blur-xs px-2.5 py-1 text-xs font-mono text-ink rounded border border-ink/10 flex items-center gap-1.5 shadow-xs">
                <span>🌷</span>
                <span className="text-[10px] font-medium tracking-wide">verified cute</span>
              </div>
            </div>

            {/* Editorial Caption Under Photo */}
            <div className="mt-3 pt-2 border-t border-paper-border/60 flex flex-col">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-text">
                <span>FIG 1.0 — THE TULIP INQUISITOR</span>
                <span className="text-ginger font-semibold">100% FLUFF</span>
              </div>
              <p className="text-xs text-ink/80 font-sans mt-1 leading-snug">
                {hero.featuredCat?.caption}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* 3. BOTTOM MARGIN ACCENT */}
      <div className="w-full max-w-6xl mx-auto pt-8 flex items-center justify-between text-xs font-mono text-muted-text border-t border-ink/10">
        <div className="flex items-center gap-2">
          <span>CAT ARCHIVE INDEX</span>
          <span>•</span>
          <span className="text-ink">SECTION 01 OF 07</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>KANNADA SUBTITLE:</span>
          <span className="italic text-ink">"nanna hesaru sandeep, bekkina magazine madiddini"</span>
        </div>
      </div>
    </section>
  );
}
