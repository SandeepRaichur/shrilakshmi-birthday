import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../data/shrilakshmi';
import { playPop, playPaperFlip } from '../utils/audioEffects';

export default function OurStorySection() {
  const storyConfig = shrilakshmiContent.story || {};
  const chapters = storyConfig.chapters || [];
  const [activeChapterIndex, setActiveChapterIndex] = useState(null);

  const scrollToChapter = (id, idx) => {
    playPaperFlip();
    setActiveChapterIndex(idx);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="story" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          SECTION HEADER
          ----------------------------------------------------------------------- */}
      <div className="pb-10 border-b border-paper-border space-y-4">
        <div className="flex items-center justify-between">
          <span className="editorial-label text-muted-text">
            {storyConfig.badge || "OUR STORY"}
          </span>
          <span className="text-[11px] font-mono text-olive font-semibold tracking-wider uppercase">
            10 MEMORIES
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-ink tracking-tight leading-[0.95]">
          {storyConfig.title || "our unexpected little story."}
        </h2>

        <p className="text-base sm:text-lg text-muted-text font-sans max-w-2xl leading-relaxed">
          {storyConfig.subtitle || "From background characters in 2nd PUC to WhatsApp study groups and the Goa lemon assignment."}
        </p>
      </div>

      {/* -----------------------------------------------------------------------
          CHAPTER QUICK-NAV SCRUBBER
          ----------------------------------------------------------------------- */}
      <div className="py-4 border-b border-paper-border flex items-center justify-between overflow-x-auto no-scrollbar gap-2 text-xs font-mono">
        <span className="text-muted-text text-[10px] tracking-wider uppercase shrink-0">
          INDEX:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id, idx)}
              className={`px-2.5 py-1 rounded-xs border text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                activeChapterIndex === idx
                  ? 'bg-ink text-paper border-ink font-bold shadow-2xs'
                  : 'bg-paper border-paper-border text-muted-text hover:text-ink hover:border-ink/60'
              }`}
            >
              {ch.chapterNumber}
            </button>
          ))}
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          CHRONICLE TIMELINE CARDS
          ----------------------------------------------------------------------- */}
      <div className="relative pt-12 space-y-12">
        
        {/* Subtle Vertical Spine Line */}
        <div className="hidden md:block absolute top-16 bottom-16 left-8 w-px bg-paper-border/80" />

        {chapters.map((ch, idx) => {
          return (
            <article
              key={ch.id}
              id={ch.id}
              className="relative md:pl-20 group scroll-mt-28"
            >
              {/* Timeline Marker Node (Desktop) */}
              <div className="hidden md:flex absolute left-5 top-7 w-6 h-6 rounded-full bg-paper border-2 border-paper-border group-hover:border-olive items-center justify-center transition-colors">
                <span className="w-2 h-2 rounded-full bg-ink/60 group-hover:bg-olive transition-colors" />
              </div>

              {/* Story Card */}
              <div className="bg-paper-light border border-paper-border group-hover:border-ink/40 p-6 sm:p-10 rounded-xs shadow-2xs hover:shadow-xs transition-all duration-300 space-y-6">
                
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-paper-border/80 pb-4 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-ink text-paper font-bold text-[10px] rounded-xs">
                      CHAPTER {ch.chapterNumber}
                    </span>
                    <span className="text-olive font-semibold tracking-wider uppercase text-[11px]">
                      {ch.tag}
                    </span>
                  </div>

                  {ch.caption && (
                    <span className="text-muted-text italic text-[11px]">
                      "{ch.caption}"
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-ink leading-tight">
                  {ch.headline}
                </h3>

                {/* Narrative Body */}
                <div className="space-y-3 text-base sm:text-lg text-ink/85 font-sans leading-relaxed">
                  {ch.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Custom Highlight Banners for Specific Inside Jokes */}
                
                {/* Chapter 02: Garba */}
                {ch.ticketData && (
                  <div className="p-4 bg-paper border border-paper-border rounded-xs flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
                    <span className="text-muted-text">EVENT: {ch.ticketData.event}</span>
                    <span className="text-olive font-bold">TRIGGER: {ch.ticketData.trigger}</span>
                  </div>
                )}

                {/* Chapter 04: Keychain */}
                {ch.itemCode && (
                  <div className="p-4 bg-paper border-l-4 border-olive rounded-r-xs text-xs font-mono space-y-1">
                    <span className="font-semibold text-ink">{ch.itemCode}</span>
                    <p className="text-muted-text">{ch.artifactNote}</p>
                  </div>
                )}

                {/* Chapter 07: Pinkyyy */}
                {ch.caseStats && (
                  <div className="p-4 bg-paper border border-paper-border rounded-xs text-xs font-mono space-y-2">
                    <div className="flex justify-between items-center text-ink font-bold">
                      <span>ALIAS: {ch.caseStats.alias}</span>
                      <span className="text-olive text-[10px] uppercase">{ch.caseStats.currentStatus}</span>
                    </div>
                    <p className="text-muted-text italic">
                      "{ch.caseStats.pressReleaseNote}"
                    </p>
                  </div>
                )}

                {/* Chapter 09: Cognizant */}
                {ch.prediction && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 bg-paper border border-paper-border rounded-xs space-y-1">
                      <span className="text-muted-text text-[10px] uppercase block">PREDICTION</span>
                      <span className="text-ink font-semibold">{ch.prediction.title}</span>
                      <p className="text-muted-text text-[11px]">{ch.prediction.desc}</p>
                    </div>
                    <div className="p-3 bg-paper border border-olive/40 rounded-xs space-y-1">
                      <span className="text-olive text-[10px] uppercase font-bold block">REALITY</span>
                      <span className="text-ink font-semibold">{ch.actual.title}</span>
                      <p className="text-muted-text text-[11px]">{ch.actual.desc}</p>
                    </div>
                  </div>
                )}

                {/* Chapter 10: Goa Lemon */}
                {ch.kannadaQuote && (
                  <div className="p-5 bg-paper border-l-4 border-ginger rounded-r-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-ginger font-bold uppercase">
                      <span>🍋</span>
                      <span>TACTICAL CITRUS SECURITY OPERATIONS</span>
                    </div>
                    <p className="text-base sm:text-lg font-display text-ink font-semibold">
                      "{ch.kannadaQuote}"
                    </p>
                    <p className="text-xs font-mono text-muted-text">
                      {ch.analysis}
                    </p>
                  </div>
                )}

              </div>
            </article>
          );
        })}

      </div>
    </section>
  );
}
