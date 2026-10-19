import React from 'react';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function LetterSection() {
  const { letter, profile } = shrilakshmiContent;

  return (
    <section id="letter" className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-20 sm:py-28 select-none border-b border-paper-border">

      {/* Gentle Section Header */}
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-paper-light border border-paper-border rounded-full text-xs font-mono text-muted-text">
          <span>💌</span>
          <span className="uppercase tracking-widest text-[11px] font-semibold text-olive">
            A LETTER FOR YOU
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink">
          something I wanted to write to you.
        </h2>
      </div>

      {/* -----------------------------------------------------------------------
          THE WARM HUG LETTER (AUTHENTIC WARM STATIONERY SHEET)
          ----------------------------------------------------------------------- */}
      <div className="relative mx-auto max-w-2xl bg-[#FFFDF9] border border-[#E8E2D5] rounded-sm p-8 sm:p-14 lg:p-16 shadow-[0_20px_50px_-15px_rgba(201,133,85,0.14),0_8px_24px_-4px_rgba(34,35,31,0.06)] space-y-8">

        {/* Top Postal Detail (Stamp & Postmark) */}
        <div className="flex items-start justify-between border-b border-[#EFEAE0] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-text block">
              SPECIAL DELIVERY · {profile?.year || "2026"}
            </span>
            <span className="text-xs font-mono text-olive font-semibold block">
              BANGALORE, INDIA
            </span>
          </div>

          {/* Vintage Postmark Stamp */}
          <div className="border border-dashed border-[#D5CDBD] p-2.5 rounded-xs bg-[#FAF7F0] flex items-center gap-2">
            <span className="text-xl select-none">🌷</span>
            <div className="text-[9px] font-mono text-muted-text leading-tight uppercase">
              <span className="block font-bold text-ink">POSTAGE</span>
              <span>CERTIFIED FRIENDSHIP</span>
            </div>
          </div>
        </div>

        {/* Salutation */}
        <div>
          <h3 className="font-book text-2xl sm:text-3xl text-ink/90 italic font-medium">
            Dear Shrilakshmi,
          </h3>
        </div>

        {/* Letter Body in Warm, Flowing Paragraphs (No cold quotes!) */}
        <div className="space-y-5 text-base sm:text-lg md:text-xl font-book text-ink/85 leading-relaxed sm:leading-loose">
          <p>
            Some of my favourite BCA memories are our long phone calls when we were supposedly studying. We talked for hours, teased each other, asked ChatGPT everything, and made our college days really fun. You also helped me a lot during some tough days in second semester, and I’ll always be grateful for that.          </p>
          <p>
            I’m really glad we went from not talking at all to becoming such good friends. I hope you always stay happy, Shri. And remember, I’ll always be there whenever you need someone to talk to. Call me whenever you want, whether it’s for gossip, random conversations, or just to share what’s happening in your life.

          </p>
          <p>Now that you’re starting your MBA, don’t forget Sandeep! 😂 No matter how busy life gets or where we end up, I hope we keep our friendship and all our random conversations alive.
          </p>
          <p className="font-medium text-ink">
            Thanks for everything, Shri. Lots of love! ❤️
          </p>
        </div>

        {/* Sincere Sign-off & Handwritten Signature */}
        <div className="pt-6 border-t border-[#EFEAE0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-book italic text-base text-muted-text block">
              Warmly,
            </span>
            <span className="font-handwriting text-3xl sm:text-4xl text-ink font-semibold block tracking-wide">
              Sandeep
            </span>
            <span className="text-[11px] font-mono text-muted-text block pt-1">
              {letter.kannadaTransliteration || "nanna hesaru sandeep · made with care for Shrilakshmi"}
            </span>
          </div>

          {/* Warm Postscript (Doraemon Keychain) */}
          {letter.postscript && (
            <div className="bg-[#FAF7F0] px-3.5 py-2 rounded-xs border border-[#E8E2D5] text-xs font-mono text-olive space-x-1.5 self-start sm:self-auto">
              <span>🔑</span>
              <span className="font-sans italic">{letter.postscript}</span>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
