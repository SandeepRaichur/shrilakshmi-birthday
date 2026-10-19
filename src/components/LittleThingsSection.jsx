import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, RotateCcw } from 'lucide-react';
import { playPaperFlip, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LittleThingsSection() {
  const { personalMessage, polaroids, profile, littleThingsHeader } = shrilakshmiContent;
  const cards = polaroids || [];

  const [flippedIds, setFlippedIds] = useState([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  const toggleFlip = (id) => {
    playPaperFlip();
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShuffle = () => {
    playPop();
    setShuffleKey((k) => k + 1);
  };

  const paragraphs = personalMessage?.paragraphs || [
    "I didn't make this because I had something dramatic to say.",
    "I just thought it would be nice to make something a little different for you.",
    "So here it is.",
    "Hope it made you smile.",
  ];

  const kannadaParagraphs = personalMessage?.kannadaParagraphs || [];

  return (
    <section id="note" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          PART 1: ASYMMETRICAL EDITORIAL SPREAD — "just a little note."
          ----------------------------------------------------------------------- */}
      <div className="pb-16 border-b border-paper-border grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Large Serif Headline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="editorial-label text-muted-text">
            {personalMessage?.badge || "05 — A LITTLE NOTE"}
          </span>
          <h2 className="text-5xl sm:text-7xl font-serif text-ink leading-[0.9]">
            {personalMessage?.heading || "just a little note."}
          </h2>
          {personalMessage?.kannadaSubtitle && (
            <p className="text-xs font-mono text-muted-text uppercase tracking-widest mt-2">
              [{personalMessage.kannadaSubtitle}]
            </p>
          )}
        </div>

        {/* Right Column: Narrow Text Column & Restrained Paragraphs (7 cols) */}
        <div className="lg:col-span-7 lg:pl-8 space-y-6">
          <div className="space-y-4 text-base sm:text-lg text-ink font-sans leading-relaxed">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={i === 2 ? "font-serif italic text-xl sm:text-2xl text-ink" : ""}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Optional Kannada Parallel Paragraphs */}
          {kannadaParagraphs.length > 0 && (
            <div className="pt-4 border-t border-paper-border/60 space-y-2 text-xs sm:text-sm font-mono text-muted-text">
              {kannadaParagraphs.map((kp, ki) => (
                <p key={ki}>[{kp}]</p>
              ))}
            </div>
          )}

          {/* Understated Signature */}
          <div className="pt-6 border-t border-paper-border flex flex-col items-start gap-1">
            <span className="text-2xl sm:text-3xl font-serif italic text-ink font-normal">
              {personalMessage?.signature || profile?.signature || "— Sandeep"}
            </span>
            <span className="text-[11px] font-mono text-muted-text">
              {personalMessage?.authorTransliteration || profile?.authorTransliteration || "nanna hesaru sandeep · made with care for Shrilakshmi"}
            </span>
          </div>
        </div>

      </div>

      {/* -----------------------------------------------------------------------
          PART 2: ARCHIVED MEMORY MEMOS (FLIPPABLE NOTES)
          ----------------------------------------------------------------------- */}
      <div className="pt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-paper-border gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              APPENDIX · LITTLE THINGS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-ink mt-1">
              {littleThingsHeader?.title || "Little things"} ·{" "}
              <span className="italic font-normal">{littleThingsHeader?.kannadaTitle || "sanna vishayagalu"}</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-text font-sans mt-1 max-w-md">
              {littleThingsHeader?.subtitle || "Things you probably don't even realize matter."}
            </p>
          </div>

          <button
            onClick={handleShuffle}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-sm border border-paper-border text-muted-text hover:text-ink text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>SHUFFLE MEMOS</span>
          </button>
        </div>

        {/* Memos Grid */}
        <div
          key={shuffleKey}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => {
            const isFlipped = flippedIds.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="group relative min-h-[220px] rounded-sm border border-paper-border bg-paper p-6 flex flex-col justify-between cursor-pointer hover:border-ink/70 transition-all duration-200"
              >
                {!isFlipped ? (
                  /* Front: Restrained Editorial Memo */
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-olive font-semibold tracking-wider uppercase">
                        {card.frontTag || "MEMORY NOTE"}
                      </span>
                      <span className="text-muted-text">#0{card.id}</span>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-serif text-ink group-hover:text-olive transition-colors leading-snug">
                        {card.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-paper-border/60 flex items-center justify-between text-[10px] font-mono text-muted-text">
                      <span>TAP TO READ NOTE</span>
                      <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                  </div>
                ) : (
                  /* Back: Note Content */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col h-full justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-text">
                      <span>DEBRIEF #{card.id}</span>
                      <span>TURN OVER ↺</span>
                    </div>

                    <p className="text-xs sm:text-sm text-ink font-sans leading-relaxed">
                      {card.backNote}
                    </p>

                    <div className="pt-2 border-t border-paper-border/60 text-[10px] font-mono text-olive font-semibold">
                      VERIFIED MEMORY
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footnote */}
      <div className="pt-6 mt-12 flex items-center justify-between text-[11px] font-mono text-muted-text">
        <span>EDITORIAL CORRESPONDENCE</span>
        <span>NO RESPONSES REQUIRED</span>
      </div>
    </section>
  );
}
