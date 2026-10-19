import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Calendar, Check, ArrowRight } from 'lucide-react';
import { playStamp, playPop, playChime } from '../utils/audioEffects';
import { exportMemeCardAsPng } from '../utils/exportMeme';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function AboutShrilakshmiSection({ onDiscoveryUnlocked }) {
  const { memes, memesHeader } = shrilakshmiContent;
  const enabledMemes = (memes || []).filter((m) => m.enabled !== false);

  const [revealedMap, setRevealedMap] = useState({});
  const [downloadingMap, setDownloadingMap] = useState({});

  const isRevealed = (id) => Boolean(revealedMap[id]);

  const handleReveal = (id) => {
    playStamp();
    const nextMap = { ...revealedMap, [id]: true };
    setRevealedMap(nextMap);

    const revealedCount = Object.keys(nextMap).filter((k) => nextMap[k]).length;
    if (revealedCount >= Math.min(2, enabledMemes.length) && onDiscoveryUnlocked) {
      onDiscoveryUnlocked('memes');
    }
  };

  const handleReplay = (id, e) => {
    e.stopPropagation();
    playPop();
    setRevealedMap((prev) => ({ ...prev, [id]: false }));
  };

  const handleDownload = async (meme, e) => {
    e.stopPropagation();
    playPop();
    setDownloadingMap((prev) => ({ ...prev, [meme.id]: true }));

    await exportMemeCardAsPng({
      id: meme.id,
      title: meme.title,
      subtitle: meme.subtitle || '',
      panel1Title: `${meme.panel1?.title || '2025'} · ${meme.panel1?.event || ''}`,
      panel1Text: meme.panel1?.text || '',
      panel2Title: `${meme.panel2?.title || '2026'} · ${meme.panel2?.event || ''}`,
      panel2Text: meme.panel2?.text || '',
      punchline: meme.punchline,
      caption: meme.caption || '',
      annotation: meme.annotation,
    });

    setDownloadingMap((prev) => ({ ...prev, [meme.id]: false }));
  };

  const headerInfo = memesHeader || {
    heading: "TWO VERY SPECIFIC OBSERVATIONS",
    caption: "Purely coincidental. Probably.",
    badge: "03 — INVESTIGATION",
  };

  return (
    <section id="memes" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          EDITORIAL HEADER
          ----------------------------------------------------------------------- */}
      <div className="pb-8 border-b border-paper-border">
        <span className="editorial-label text-muted-text">
          {headerInfo.badge || "03 — INVESTIGATION"}
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-ink mt-2 leading-[0.95]">
          {headerInfo.heading || "TWO VERY SPECIFIC OBSERVATIONS"}
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-text uppercase mt-3">
          {headerInfo.caption || "Purely coincidental. Probably."}
        </p>
      </div>

      {/* -----------------------------------------------------------------------
          EDITORIAL SPREAD: 2 OBSERVATIONS
          ----------------------------------------------------------------------- */}
      <div className="mt-12 space-y-16">
        
        {/* =====================================================================
            OBSERVATION 01 — THE FESTIVAL COINCIDENCE
            ===================================================================== */}
        {enabledMemes[0] && (() => {
          const m1 = enabledMemes[0];
          const revealed = isRevealed(m1.id);
          const isDownloading = Boolean(downloadingMap[m1.id]);

          return (
            <div className="p-6 sm:p-10 rounded-sm border border-paper-border bg-paper/60 space-y-8">
              
              {/* Header line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-paper-border gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
                    {m1.badge || "MEME 01 — THE FESTIVAL COINCIDENCE"}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif text-ink mt-1">
                    {m1.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-text">
                  AUDIT: 2025 vs 2026
                </span>
              </div>

              {/* Side-by-Side Years */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 2025 Box */}
                <div className="p-6 rounded-sm border border-paper-border bg-paper space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-2xl font-serif font-bold text-ink">2025</span>
                    <span className="text-olive font-semibold tracking-wider uppercase">DIWALI + BIRTHDAY</span>
                  </div>
                  <div className="pt-2 border-t border-paper-border/60">
                    <p className="text-sm sm:text-base text-ink font-sans">
                      {m1.panel1?.text || "Birthday plans, featuring an entire national festival of lights."}
                    </p>
                    <span className="text-[10px] font-mono text-muted-text uppercase mt-2 block">
                      {m1.panel1?.season || "OCTOBER / NOVEMBER 2025"}
                    </span>
                  </div>
                </div>

                {/* 2026 Box */}
                <div className="p-6 rounded-sm border border-paper-border bg-paper space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-2xl font-serif font-bold text-ink">2026</span>
                    <span className="text-olive font-semibold tracking-wider uppercase">DASARA + BIRTHDAY</span>
                  </div>
                  <div className="pt-2 border-t border-paper-border/60">
                    <p className="text-sm sm:text-base text-ink font-sans">
                      {m1.panel2?.text || "Same birthday. Completely different grand festival."}
                    </p>
                    <span className="text-[10px] font-mono text-muted-text uppercase mt-2 block">
                      {m1.panel2?.season || "OCTOBER 2026"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Punchline Stage */}
              <div className="pt-4">
                {!revealed ? (
                  <button
                    onClick={() => handleReveal(m1.id)}
                    className="px-6 py-3 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>{m1.stampButtonText || "Reveal punchline"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-sm border border-paper-border bg-paper space-y-4"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-olive font-semibold tracking-widest uppercase">
                      <span>VERIFIED HYPOTHESIS</span>
                      <span className="text-muted-text">[DEVI PROTOCOL]</span>
                    </div>

                    <p className="text-2xl sm:text-4xl font-serif text-ink italic leading-tight">
                      {m1.punchline || "“At this point, I'm starting to suspect you're Devi.”"}
                    </p>

                    {m1.kannadaPunchline && (
                      <p className="text-xs sm:text-sm font-mono text-muted-text">
                        [{m1.kannadaPunchline}]
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-muted-text font-sans pt-2 border-t border-paper-border/60">
                      {m1.caption || "The festival calendar seems unusually invested in your birthday."}
                    </p>

                    {/* Action Controls */}
                    <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                      <button
                        onClick={(e) => handleReplay(m1.id, e)}
                        className="text-muted-text hover:text-ink flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>REPLAY</span>
                      </button>

                      <span className="text-paper-border">/</span>

                      <button
                        onClick={(e) => handleDownload(m1, e)}
                        disabled={isDownloading}
                        className="text-muted-text hover:text-ink flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>{isDownloading ? "EXPORTING..." : "DOWNLOAD IMAGE (PNG)"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          );
        })()}

        {/* =====================================================================
            OBSERVATION 02 — THE MBA ERA
            ===================================================================== */}
        {enabledMemes[1] && (() => {
          const m2 = enabledMemes[1];
          const revealed = isRevealed(m2.id);
          const isDownloading = Boolean(downloadingMap[m2.id]);

          return (
            <div className="p-6 sm:p-10 rounded-sm border border-paper-border bg-paper/60 space-y-8">
              
              {/* Header line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-paper-border gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
                    {m2.badge || "MEME 02 — THE MBA ERA"}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif text-ink mt-1">
                    {m2.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-text">
                  EXPECTATION VS. REALITY
                </span>
              </div>

              {/* Minimal Expectation vs Reality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Before MBA */}
                <div className="p-6 rounded-sm border border-paper-border bg-paper space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-xs font-mono tracking-widest uppercase text-muted-text font-bold">
                      BEFORE MBA
                    </span>
                    <span className="text-[10px] font-mono text-muted-text">CHILL MODE</span>
                  </div>
                  <div className="pt-2 border-t border-paper-border/60">
                    <p className="text-xl sm:text-2xl font-serif text-ink italic leading-snug">
                      {m2.panel1?.text || "“Let’s see how things go.”"}
                    </p>
                    {m2.panel1?.kannadaText && (
                      <p className="text-xs font-mono text-muted-text mt-2">
                        [{m2.panel1.kannadaText}]
                      </p>
                    )}
                  </div>
                </div>

                {/* MBA Era */}
                <div className="p-6 rounded-sm border border-paper-border bg-paper space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-xs font-mono tracking-widest uppercase text-olive font-bold">
                      MBA ERA
                    </span>
                    <span className="text-[10px] font-mono text-muted-text">CASE STUDY MODE</span>
                  </div>
                  <div className="pt-2 border-t border-paper-border/60">
                    <p className="text-xl sm:text-2xl font-serif text-ink italic leading-snug">
                      {m2.panel2?.text || "“Let’s look at the bigger picture.”"}
                    </p>
                    {m2.panel2?.kannadaText && (
                      <p className="text-xs font-mono text-muted-text mt-2">
                        [{m2.panel2.kannadaText}]
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Punchline Stage */}
              <div className="pt-4">
                {!revealed ? (
                  <button
                    onClick={() => handleReveal(m2.id)}
                    className="px-6 py-3 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>{m2.stampButtonText || "Reveal punchline"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-sm border border-paper-border bg-paper space-y-4"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-olive font-semibold tracking-widest uppercase">
                      <span>FORECAST CONCLUSION</span>
                      <span className="text-muted-text">
                        {m2.annotation || "MBA ERA: LOADING, NOVEMBER 2026"}
                      </span>
                    </div>

                    <p className="text-2xl sm:text-4xl font-serif text-ink italic leading-tight">
                      {m2.punchline || "“One MBA admission away from turning every casual conversation into a case study.”"}
                    </p>

                    {m2.kannadaPunchline && (
                      <p className="text-xs sm:text-sm font-mono text-muted-text">
                        [{m2.kannadaPunchline}]
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-muted-text font-sans pt-2 border-t border-paper-border/60">
                      {m2.caption || "MBA begins in the first week of November 2026."}
                    </p>

                    {/* Action Controls */}
                    <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                      <button
                        onClick={(e) => handleReplay(m2.id, e)}
                        className="text-muted-text hover:text-ink flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>REPLAY</span>
                      </button>

                      <span className="text-paper-border">/</span>

                      <button
                        onClick={(e) => handleDownload(m2, e)}
                        disabled={isDownloading}
                        className="text-muted-text hover:text-ink flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>{isDownloading ? "EXPORTING..." : "DOWNLOAD IMAGE (PNG)"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          );
        })()}

      </div>

      {/* Footnote */}
      <div className="pt-6 mt-12 flex items-center justify-between text-[11px] font-mono text-muted-text">
        <span>EDITORIAL DOSSIER · CONFIDENTIAL FRIENDSHIP ARCHIVE</span>
        <span>AUDITED 2026</span>
      </div>
    </section>
  );
}
