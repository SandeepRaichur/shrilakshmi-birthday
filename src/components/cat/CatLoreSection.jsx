import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatLoreSection() {
  const { shrilakshmiLore } = shrilakshmiContent;
  const chapters = shrilakshmiLore?.chapters || [];

  const [activeMemeIndex, setActiveMemeIndex] = useState(0);
  const [unlockedDrishti, setUnlockedDrishti] = useState(false);

  return (
    <section
      id="lore"
      className="w-full py-20 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="border-b border-ink/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-ginger font-semibold">
                CHAPTER 02 · BIOGRAPHICAL ARCHIVES
              </span>
              <span className="text-muted-text">•</span>
              <span className="font-mono text-xs text-olive font-medium">7 CANON EVENTS</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight font-normal">
              "{shrilakshmiLore.title}"
            </h2>
            
            <p className="text-sm sm:text-base text-muted-text font-sans">
              {shrilakshmiLore.subtitle}
            </p>

            <p className="text-xs font-mono text-olive italic">
              {shrilakshmiLore.kannadaSubtitle}
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="inline-block p-3 bg-paper-light border border-paper-border rounded text-xs font-mono text-ink">
              <span className="text-ginger font-bold block">EDITORIAL ACCURACY</span>
              <span className="text-muted-text text-[11px]">Certified 100% Non-Romantic & 100% Genuine</span>
            </div>
          </div>
        </div>

        {/* The 7 Lore Entries - Full Editorial Treatment */}
        <div className="space-y-20">
          {chapters.map((chapter, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={chapter.number}
                className="pt-6 border-t border-paper-border/80 first:border-t-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left or Right swapped based on isEven for editorial cadence */}
                  <div
                    className={`lg:col-span-6 space-y-5 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Chapter Metadata Strip */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-ink text-paper rounded-xs">
                        {chapter.number}
                      </span>
                      <span className="font-mono text-xs tracking-wider uppercase text-ginger font-semibold">
                        {chapter.code}
                      </span>
                      <span className="text-paper-border">•</span>
                      <span className="font-mono text-[11px] text-muted-text uppercase">
                        {chapter.tag}
                      </span>
                    </div>

                    {/* Main Meme Headline / Quote */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink font-normal leading-tight">
                        {chapter.caption.split('\n\n').map((line, lIdx) => (
                          <span key={lIdx} className="block mt-1 first:mt-0">
                            {line}
                          </span>
                        ))}
                      </h3>

                      {/* Special Goa Reveal / Highlight */}
                      {chapter.reveal && (
                        <div className="p-4 bg-chartreuse/30 border-l-4 border-olive rounded-r-xs my-2">
                          <p className="font-serif text-lg sm:text-xl text-ink font-medium">
                            {chapter.reveal}
                          </p>
                          {chapter.kannadaQuote && (
                            <p className="font-mono text-xs text-olive-dark mt-2 font-bold tracking-wide">
                              "{chapter.kannadaQuote}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Subcaption */}
                    {chapter.subcaption && (
                      <p className="text-sm font-sans text-muted-text leading-relaxed">
                        {chapter.subcaption}
                      </p>
                    )}

                    {/* Factual Context Box (Editorial Sidebar) */}
                    <div className="p-3.5 bg-paper-light border border-paper-border/70 rounded-xs text-xs font-mono text-ink/80 space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-text font-semibold flex items-center justify-between">
                        <span>HISTORICAL CONTEXT</span>
                        <span className="text-olive">{chapter.tone}</span>
                      </div>
                      <p className="font-sans text-xs leading-relaxed text-ink/90">
                        {chapter.context}
                      </p>
                    </div>

                  </div>

                  {/* Feline Reaction Visual */}
                  <div
                    className={`lg:col-span-6 flex flex-col items-center ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative w-full max-w-lg bg-paper-light p-3 sm:p-4 border border-paper-border shadow-xs hover:shadow-md transition-all rounded-xs group">
                      
                      {/* Top Tape Sticker */}
                      <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-paper border border-ink/20 text-[10px] font-mono tracking-widest uppercase text-ink font-semibold">
                        {chapter.badge}
                      </div>

                      {/* Cat Image Container */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-ink/10 border border-paper-border">
                        <img
                          src={chapter.image}
                          alt={chapter.alt || chapter.catDescription}
                          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";
                          }}
                        />

                        {/* Interactive Lemon clicker for Meme 05 */}
                        {chapter.code.includes('GOA') && (
                          <button
                            onClick={() => setUnlockedDrishti(true)}
                            className="absolute bottom-3 right-3 px-2.5 py-1 bg-chartreuse text-ink font-mono text-[11px] font-bold rounded shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>🍋</span>
                            <span>{unlockedDrishti ? "DRISHTI REMOVED! ✨" : "TOUCH LEMON"}</span>
                          </button>
                        )}
                      </div>

                      {/* Scientific Feline Observation Caption */}
                      <div className="mt-3 pt-2 border-t border-paper-border/60 flex items-center justify-between text-xs font-mono text-muted-text">
                        <span className="italic truncate pr-2">
                          "{chapter.catDescription}"
                        </span>
                        <span className="text-ginger font-semibold shrink-0">
                          LOGGED
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
