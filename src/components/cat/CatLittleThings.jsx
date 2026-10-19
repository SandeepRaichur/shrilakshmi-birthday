import React from 'react';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatLittleThings() {
  const { littleThings, profile } = shrilakshmiContent;

  return (
    <section
      id="little-things"
      className="w-full py-24 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Sub-Masthead */}
        <div className="flex items-center gap-3 border-b border-paper-border pb-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-olive font-semibold">
            CHAPTER 04 · REFLECTIONS
          </span>
          <span className="text-paper-border">•</span>
          <span className="font-mono text-xs text-muted-text uppercase">
            A GENTLE VISUAL PAUSE
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          
          {/* Calm Cat Photograph (Window light, sleepy cat) */}
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="bg-paper-light p-3 border border-paper-border rounded-xs shadow-xs">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-dark border border-paper-border/80">
                <img
                  src={littleThings.calmCatImage}
                  alt={littleThings.calmCatAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              <div className="mt-3 pt-2 border-t border-paper-border/60 text-[11px] font-mono text-muted-text flex items-center justify-between">
                <span>SUNLIT SILL · 4:15 PM</span>
                <span className="text-olive font-medium">TRANQUIL</span>
              </div>
              <p className="text-xs text-ink/70 font-sans mt-1">
                {littleThings.photoCaption}
              </p>
            </div>
          </div>

          {/* Sincere Friendship Note */}
          <div className="md:col-span-7 order-1 md:order-2 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-ginger font-semibold">
                BEYOND THE MEMES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal leading-tight">
                "{littleThings.title}"
              </h2>
            </div>

            {/* Paragraphs with editorial breathing space */}
            <div className="space-y-4 text-base sm:text-lg text-ink/85 font-serif leading-relaxed">
              {littleThings.letterBody?.map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Understated Keychain Note */}
            {littleThings.doraemonNote && (
              <div className="pt-2 border-t border-paper-border/80 flex items-center gap-2 text-xs font-mono text-muted-text">
                <span>🔑</span>
                <span>{littleThings.doraemonNote}</span>
              </div>
            )}

            <div className="pt-2">
              <span className="font-serif text-xl sm:text-2xl text-ink italic block">
                {profile.signature}
              </span>
              <span className="text-[11px] font-mono text-muted-text tracking-wide block mt-1">
                Bangalore · 2026
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
