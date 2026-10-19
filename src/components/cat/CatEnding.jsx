import React from 'react';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatEnding({ onScrollToTop }) {
  const { ending, profile } = shrilakshmiContent;

  return (
    <footer
      id="ending"
      className="w-full py-24 px-4 sm:px-6 md:px-10 bg-paper text-ink border-t-2 border-ink"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Main Ending Editorial Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-paper-light border border-paper-border p-6 sm:p-10 rounded-xs shadow-sm">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-6">
            
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-ginger font-semibold">
                COLOPHON & SIGN-OFF
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
                "{ending.title}"
              </h2>
            </div>

            {/* Body Lines */}
            <div className="space-y-3 font-serif text-lg sm:text-xl text-ink/90 leading-relaxed">
              {ending.bodyLines?.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Closing Line */}
            <div className="pt-2">
              <p className="font-serif italic text-base sm:text-lg text-olive font-medium">
                "{ending.closing}"
              </p>
            </div>

            {/* Signature & Author Details */}
            <div className="pt-4 border-t border-paper-border/80">
              <span className="font-serif text-2xl text-ink font-semibold block">
                {ending.signature}
              </span>
              <span className="text-xs font-mono text-muted-text mt-1 block">
                {ending.authorTransliteration}
              </span>
            </div>

          </div>

          {/* Right Waving Cat Photo Column (/photos/3.jpeg: Cat waving bye from door!) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="bg-paper p-3 border border-paper-border rounded-xs shadow-xs max-w-xs w-full text-center group">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-dark border border-paper-border rounded-xs">
                <img
                  src={ending.wavingCatPhoto || "/photos/3.jpeg"}
                  alt="Cat waving bye from door"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <p className="font-mono text-[11px] text-muted-text mt-2.5 leading-snug">
                {ending.wavingCatCaption}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted-text border-t border-paper-border/60 pt-8 gap-4">
          <div className="flex items-center gap-2">
            <span>🐈</span>
            <span>{ending.footerText}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onScrollToTop}
              className="text-ink font-semibold hover:text-ginger transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{ending.backToTop || "BACK TO TOP ↑"}</span>
              <span>🐾</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
