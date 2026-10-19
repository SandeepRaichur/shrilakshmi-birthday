import React from 'react';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LetterSection() {
  const { letter, profile } = shrilakshmiContent;

  return (
    <section id="letter" className="w-full max-w-4xl mx-auto px-6 sm:px-12 py-24 sm:py-32 select-none border-b border-paper-border">
      <div className="bg-paper-light border border-paper-border p-8 sm:p-14 lg:p-16 rounded-xs shadow-xs space-y-8">
        
        {/* Header Metadata */}
        <div className="flex items-center justify-between border-b border-paper-border pb-4">
          <span className="editorial-label text-muted-text">
            {letter.badge || "A LETTER"}
          </span>
          <span className="text-[10px] font-mono text-olive font-semibold tracking-widest uppercase">
            {letter.wordCount || 66} WORDS · SINCERE NOTE
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-ink tracking-tight leading-[0.95]">
            {letter.heading || "just a quiet letter."}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-muted-text uppercase tracking-widest">
            [{letter.subheading || "some things are better written down."}]
          </p>
        </div>

        {/* Letter Body (Exact 66 Words) */}
        <div className="pt-4 border-t border-paper-border/80">
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-ink/90 leading-relaxed font-normal">
            "{letter.body}"
          </p>
        </div>

        {/* Postscript (Keychain) */}
        {letter.postscript && (
          <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-text">
            <span>🔑</span>
            <span className="italic">{letter.postscript}</span>
          </div>
        )}

        {/* Signature & Author Details */}
        <div className="pt-6 border-t border-paper-border flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-ink font-semibold italic block">
              {letter.signature || profile.signature}
            </span>
            <span className="text-xs font-mono text-muted-text mt-1 block">
              {letter.kannadaTransliteration || profile.authorTransliteration}
            </span>
          </div>

          <span className="text-[11px] font-mono text-muted-text tracking-widest uppercase">
            BANGALORE · {profile.year || "2026"}
          </span>
        </div>

      </div>
    </section>
  );
}
