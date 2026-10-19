import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Sparkles, Calendar, Briefcase, ChevronRight, Sliders, CheckCircle2 } from 'lucide-react';
import { playPop, playChime, playStamp } from '../utils/audioEffects';
import { exportMemeCardAsPng } from '../utils/exportMeme';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function AboutShrilakshmiSection({ onDiscoveryUnlocked }) {
  const { memes } = shrilakshmiContent;
  const enabledMemes = (memes || []).filter((m) => m.enabled !== false);

  const [revealedMap, setRevealedMap] = useState({});
  const [activeYears, setActiveYears] = useState({});
  const [mbaSliders, setMbaSliders] = useState({});
  const [downloadingMap, setDownloadingMap] = useState({});

  const isRevealed = (id) => Boolean(revealedMap[id]);

  const handleReveal = (id) => {
    playStamp();
    const nextMap = { ...revealedMap, [id]: true };
    setRevealedMap(nextMap);

    // If at least 2 memes or all enabled memes are revealed, trigger discovery
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
      panel1Title: meme.panel1?.title || 'BEFORE',
      panel1Text: meme.panel1?.text || '',
      panel2Title: meme.panel2?.title || 'AFTER',
      panel2Text: meme.panel2?.text || '',
      punchline: meme.punchline,
      caption: meme.caption || '',
    });

    setDownloadingMap((prev) => ({ ...prev, [meme.id]: false }));
  };

  // Get dynamic buzzword for MBA slider
  const getMbaStatus = (val = 70) => {
    if (val < 30) return { label: 'Pre-MBA Chill Mode', quote: '“Nodeeva bidi, heg aagatto haage... chill mode.”', tag: '☕ 100% peace · chill' };
    if (val < 70) return { label: 'Transition Phase', quote: '“Let’s circle back and align on this, swalpa time kodi.”', tag: '📈 50% buzzwords' };
    return { label: 'Full Case Study Mode', quote: '“Let’s look at the bigger picture and optimize synergies.”', tag: '💼 Executive presence' };
  };

  return (
    <section id="about-shrilakshmi" className="relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="editorial-pill bg-warmYellow-100 text-amber-900 border border-amber-300/80 mb-3 shadow-2xs">
          ✨ GUPCHUP DOSSIER · DEVI NA NEENU?
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 font-serif tracking-tight">
          A Little About Shrilakshmi · <span className="italic font-handwriting text-amber-700 font-bold text-3xl sm:text-4xl">swalpa ninna bagge</span>
        </h2>
        <p className="text-stone-500 font-sans text-sm sm:text-base max-w-md mx-auto mt-2 leading-relaxed">
          Thoroughly investigated real-life phenomena. Namboke aagalla, aadre idhe nijavada vishaya! 😂
        </p>
      </div>

      {/* Dynamic Meme Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {enabledMemes.map((meme, idx) => {
          const revealed = isRevealed(meme.id);
          const activeYear = activeYears[meme.id] || 2026;
          const mbaSlider = mbaSliders[meme.id] ?? 70;
          const currentMba = getMbaStatus(mbaSlider);
          const isDownloading = Boolean(downloadingMap[meme.id]);

          return (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/90 shadow-glass p-7 sm:p-8 flex flex-col justify-between transition-all hover:shadow-hover group"
            >
              {/* Aesthetic washi tape accent on top left */}
              <div className="absolute -top-3.5 left-8 w-36 h-6 washi-tape-amber rotate-[-2deg] rounded-xs flex items-center justify-center pointer-events-none z-10">
                <span className="text-[9px] font-mono tracking-widest text-amber-900/80 uppercase font-bold">
                  {meme.washiTag || 'DOSSIER CARD'}
                </span>
              </div>

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-mono">
                    {meme.badge || `OBSERVATION #0${idx + 1}`}
                  </span>
                  {meme.id.includes('mba') ? (
                    <Briefcase className="w-4 h-4 text-indigo-600/70" />
                  ) : (
                    <Calendar className="w-4 h-4 text-amber-600/70" />
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                  {meme.title}
                </h3>
                {meme.subtitle && (
                  <p className="text-xs text-stone-500 mt-1 mb-5 font-sans">
                    {meme.subtitle}
                  </p>
                )}

                {/* Optional Year Flip Toggle (if festival coincidence) */}
                {meme.id.includes('festival') && (
                  <div className="flex items-center justify-center gap-2 mb-5 p-1.5 rounded-2xl bg-stone-100/80 border border-stone-200/50">
                    <button
                      type="button"
                      onClick={() => {
                        playPop();
                        setActiveYears((prev) => ({ ...prev, [meme.id]: 2025 }));
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        activeYear === 2025
                          ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <span>🪔</span>
                      <span>2025 Diwali</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playPop();
                        setActiveYears((prev) => ({ ...prev, [meme.id]: 2026 }));
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        activeYear === 2026
                          ? 'bg-purple-100 text-purple-950 border border-purple-300 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <span>🏹</span>
                      <span>2026 Dasara</span>
                    </button>
                  </div>
                )}

                {/* Optional Interactive Transformation Slider (if MBA) */}
                {meme.id.includes('mba') && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Transformation Dial</span>
                      </span>
                      <span className="font-mono text-indigo-700 font-bold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200">
                        {currentMba.tag}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={mbaSlider}
                      onChange={(e) => {
                        setMbaSliders((prev) => ({ ...prev, [meme.id]: Number(e.target.value) }));
                      }}
                      className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                    />

                    <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                      <span>BEFORE MBA</span>
                      <span>50%</span>
                      <span>FULL CASE STUDY</span>
                    </div>
                  </div>
                )}

                {/* Two Panels: Before & After */}
                <div className="space-y-3">
                  {/* Panel 1 */}
                  {meme.panel1 && (
                    <div className="p-4 rounded-2xl border bg-amber-50/70 border-amber-200/80 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-amber-950 font-serif">
                          {meme.panel1.title}
                        </span>
                        {meme.panel1.season && (
                          <span className="text-[10px] text-amber-700/80 font-mono font-bold">
                            {meme.panel1.season}
                          </span>
                        )}
                      </div>
                      <p className="text-base font-handwriting text-stone-800 text-xl leading-snug">
                        {meme.panel1.text}
                      </p>
                    </div>
                  )}

                  {/* Panel 2 */}
                  {meme.panel2 && (
                    <div className="p-4 rounded-2xl border bg-purple-50/80 border-purple-200/80 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-purple-950 font-serif">
                          {meme.panel2.title}
                        </span>
                        {meme.panel2.season && (
                          <span className="text-[10px] text-purple-700/80 font-mono font-bold">
                            {meme.panel2.season}
                          </span>
                        )}
                      </div>
                      <p className="text-base font-handwriting text-stone-800 text-xl leading-snug">
                        {meme.panel2.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Revealed Punchline Area with Stamp Animation */}
                <div className="mt-6 min-h-[125px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {!revealed ? (
                      <motion.button
                        key="unrevealed"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleReveal(meme.id)}
                        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-100 via-purple-100 to-pink-100 border border-purple-200 text-xs sm:text-sm font-bold text-stone-800 hover:text-stone-950 flex items-center justify-center gap-2 transition-all shadow-soft"
                      >
                        <span>{meme.stampButtonText || "Tap to stamp & reveal 🔍"}</span>
                        <Sparkles className="w-4 h-4 text-purple-600 animate-spin-slow" />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative w-full p-5 rounded-2xl bg-gradient-to-b from-purple-50 via-pink-50/40 to-white border-2 border-purple-300 text-center shadow-soft overflow-hidden"
                      >
                        {/* Stamp Watermark */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md border border-purple-300 text-[9px] font-mono font-bold text-purple-800/60 uppercase rotate-6">
                          {meme.stampWatermark || "VERIFIED"}
                        </div>

                        <p className="text-lg sm:text-xl font-bold text-purple-950 font-serif leading-snug">
                          {meme.punchline}
                        </p>
                        {meme.kannadaPunchline && (
                          <p className="text-base font-handwriting text-purple-700 font-bold mt-1.5">
                            {meme.kannadaPunchline}
                          </p>
                        )}
                        {meme.caption && (
                          <p className="text-xs text-stone-500 italic mt-1 font-sans">
                            {meme.caption}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Footer (Download & Replay) */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => handleDownload(meme, e)}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors disabled:opacity-50"
                  title="Download this meme card as PNG"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isDownloading ? 'Exporting...' : 'Save PNG'}</span>
                </button>

                {revealed && (
                  <button
                    onClick={(e) => handleReplay(meme.id, e)}
                    className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-700 transition-colors font-medium"
                    title="Replay reveal"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
