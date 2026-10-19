import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sparkles, RefreshCw, SunMedium, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSparkle, playSuccess } from '../utils/audioEffects';
import { getSavedGardenStage, saveGardenStage } from '../utils/storage';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function GardenSection({ onDiscoveryUnlocked }) {
  const gardenConfig = shrilakshmiContent.garden || {};
  const [stage, setStage] = useState(getSavedGardenStage());
  const [xp, setXp] = useState(getSavedGardenStage() * 25);
  const [waterDrops, setWaterDrops] = useState([]);
  const [plantedFlowers, setPlantedFlowers] = useState([
    { id: 1, type: 'wildflower', x: 22, y: 80, scale: 0.9 },
    { id: 2, type: 'lavender', x: 78, y: 76, scale: 0.85 },
  ]);
  const [butterflyPos, setButterflyPos] = useState({ x: 48, y: 28 });
  const [butterfliesClicked, setButterfliesClicked] = useState(0);

  const stageMessages = gardenConfig?.stageMessages || [
    { text: "Some things start small.", sub: "Give it a little water and watch what happens." },
    { text: "Small effort.", sub: "A subtle green shoot appeared through the warm soil." },
    { text: "Little things matter.", sub: "Tender buds are forming along the stems." },
    { text: "Look what happened.", sub: "Full bloom. Quiet and satisfying." },
    { text: "You made this grow.", sub: "Funny how small care turns into something beautiful." },
  ];

  const currentMilestone = Math.min(4, Math.floor(xp / 25));

  useEffect(() => {
    if (currentMilestone !== stage) {
      setStage(currentMilestone);
      saveGardenStage(currentMilestone);

      if (currentMilestone === 4) {
        playSuccess();
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#777D5A', '#D8F36A', '#C9A6A0', '#22231F'],
        });
        if (onDiscoveryUnlocked) {
          onDiscoveryUnlocked('garden');
        }
      } else {
        playSparkle();
      }
    }
  }, [xp, currentMilestone, stage, onDiscoveryUnlocked]);

  const addGrowth = (amount = 12) => {
    setXp((prev) => Math.min(100, prev + amount));
  };

  // Water the garden
  const handleWater = (e) => {
    playPop();
    const newDrops = Array.from({ length: 4 }).map((_, i) => ({
      id: Math.random(),
      x: 35 + i * 10,
      delay: i * 0.08,
    }));
    setWaterDrops((prev) => [...prev, ...newDrops]);
    addGrowth(12);

    setTimeout(() => {
      setWaterDrops((prev) => prev.filter((d) => !newDrops.includes(d)));
    }, 900);
  };

  // Tap butterfly interaction
  const handleButterflyClick = (e) => {
    e.stopPropagation();
    playChime(659.25);
    setButterfliesClicked((prev) => prev + 1);
    addGrowth(8);
    setButterflyPos({
      x: Math.floor(Math.random() * 60 + 20),
      y: Math.floor(Math.random() * 35 + 15),
    });
  };

  // Plant companion flora by clicking the terrarium soil bed
  const handleTerrariumClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (clickY > 58 && plantedFlowers.length < 10) {
      playPop();
      const types = ['wildflower', 'lavender', 'sprout', 'poppy'];
      const chosen = types[Math.floor(Math.random() * types.length)];
      setPlantedFlowers((prev) => [
        ...prev,
        {
          id: Math.random(),
          type: chosen,
          x: Math.round(clickX),
          y: Math.round(clickY),
          scale: Number((0.75 + Math.random() * 0.3).toFixed(2)),
        },
      ]);
      addGrowth(6);
    }
  };

  const handleReset = () => {
    playPop();
    setXp(0);
    setStage(0);
    saveGardenStage(0);
    setPlantedFlowers([
      { id: 1, type: 'wildflower', x: 22, y: 80, scale: 0.9 },
      { id: 2, type: 'lavender', x: 78, y: 76, scale: 0.85 },
    ]);
  };

  const activeMessage = stageMessages[stage] || stageMessages[0];

  return (
    <section id="garden" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          EDITORIAL HEADER
          ----------------------------------------------------------------------- */}
      <div className="pb-8 border-b border-paper-border">
        <span className="editorial-label text-muted-text">
          {gardenConfig.badge || "01 — BOTANICAL FEATURE"}
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-ink mt-2 leading-[0.95]">
          {gardenConfig.title || "small things grow."}
        </h2>
        <p className="text-sm sm:text-base text-muted-text font-sans mt-3 max-w-xl">
          {gardenConfig.subtitle || "A tiny garden that gets a little better every time you interact with it."}
        </p>
      </div>

      {/* -----------------------------------------------------------------------
          ASYMMETRIC TWO-COLUMN SPREAD
          ----------------------------------------------------------------------- */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Botanical Journal & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          {/* Stage Progress Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-text">
              <span className="tracking-widest uppercase">GROWTH ARCHIVE</span>
              <span>STAGE 0{stage + 1} / 05</span>
            </div>

            {/* Hairline progress rule */}
            <div className="w-full h-1 bg-paper-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-olive"
                animate={{ width: `${Math.max(8, xp)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Current Botanical Note */}
          <div className="p-6 rounded-sm border border-paper-border bg-paper/60 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              BOTANICAL LOG #{stage + 1}
            </span>
            <p className="text-xl sm:text-2xl font-serif text-ink italic leading-snug">
              “{activeMessage.text}”
            </p>
            <p className="text-xs sm:text-sm text-muted-text font-sans">
              {activeMessage.sub}
            </p>
          </div>

          {/* Interaction Details & Hints */}
          <div className="space-y-3 text-xs font-mono text-muted-text">
            <div className="flex items-center justify-between py-2 border-b border-paper-border/60">
              <span>SOIL MOISTURE</span>
              <span className="text-ink font-semibold">{xp > 70 ? "HYDRATED" : "NEEDS WATER"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-paper-border/60">
              <span>COMPANION FLORA</span>
              <span className="text-ink font-semibold">{plantedFlowers.length} SEEDED</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-paper-border/60">
              <span>BUTTERFLY VISITS</span>
              <span className="text-ink font-semibold">{butterfliesClicked} RECORDED</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleWater}
              className="px-5 py-2.5 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Droplets className="w-3.5 h-3.5 text-chartreuse" />
              <span>{gardenConfig.waterButtonText || "Water garden"}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2.5 rounded-sm border border-paper-border text-muted-text hover:text-ink text-xs font-mono transition-colors cursor-pointer"
              title="Reset growth log"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-muted-text/80">
            {gardenConfig.soilTip || "Tap anywhere along the soil bed to seed companion flora."}
          </p>
        </div>

        {/* Right Column: Delicate Terrarium Canvas (7 cols) */}
        <div className="lg:col-span-7">
          <div
            onClick={handleTerrariumClick}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-sm border border-paper-border bg-paper overflow-hidden cursor-crosshair group shadow-2xs"
          >
            {/* Top metadata strip */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-text/70 pointer-events-none z-20">
              <span>SPECIMEN #01 — TERRARIUM</span>
              <span>LIVE SYSTEM</span>
            </div>

            {/* Falling Water Drops */}
            <AnimatePresence>
              {waterDrops.map((drop) => (
                <motion.div
                  key={drop.id}
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 0, y: 220 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: drop.delay, ease: 'easeIn' }}
                  style={{ left: `${drop.x}%` }}
                  className="absolute top-4 pointer-events-none z-30"
                >
                  <div className="w-1.5 h-3.5 bg-olive/70 rounded-full" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Interactive Butterfly Flutter */}
            <motion.div
              onClick={handleButterflyClick}
              animate={{
                x: `${butterflyPos.x}%`,
                y: `${butterflyPos.y}%`,
                rotate: [-6, 6, -6],
              }}
              transition={{
                x: { duration: 1.6, ease: 'easeInOut' },
                y: { duration: 1.6, ease: 'easeInOut' },
                rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute z-30 cursor-pointer p-2 -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              title="Tap the butterfly"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-olive">
                <path
                  d="M12 12C9 7 4 7 4 11C4 14 8 15 12 13M12 12C15 7 20 7 20 11C20 14 16 15 12 13M12 12V17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Delicate Botanical SVG Illustration based on Stage */}
            <div className="absolute inset-0 flex items-end justify-center pb-12 pointer-events-none">
              
              {/* Primary Plant SVG */}
              <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                {stage === 0 && (
                  /* Stage 0: Tiny delicate shoot */
                  <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
                    <path d="M40 85V55" stroke="#777D5A" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 55C32 45 30 35 34 30C39 30 42 42 40 55Z" fill="#D8F36A" stroke="#777D5A" strokeWidth="1.5" />
                  </svg>
                )}

                {stage === 1 && (
                  /* Stage 1: Sprout with side leaves */
                  <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
                    <path d="M60 145V60" stroke="#777D5A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M60 100C45 90 35 95 38 82C48 80 58 92 60 100Z" fill="#F5F1E8" stroke="#777D5A" strokeWidth="1.5" />
                    <path d="M60 85C75 75 85 80 82 67C72 65 62 77 60 85Z" fill="#D8F36A" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="60" cy="55" r="4" fill="#777D5A" />
                  </svg>
                )}

                {stage === 2 && (
                  /* Stage 2: Tall branching stem with swollen buds */
                  <svg width="160" height="210" viewBox="0 0 160 210" fill="none">
                    <path d="M80 205C80 150 78 100 80 45" stroke="#777D5A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M80 140C55 125 45 130 50 115C65 110 78 128 80 140Z" stroke="#777D5A" strokeWidth="1.5" fill="#F5F1E8" />
                    <path d="M80 110C105 95 115 100 110 85C95 80 82 98 80 110Z" stroke="#777D5A" strokeWidth="1.5" fill="#D8F36A" />
                    <path d="M80 80C68 65 62 68 66 58C76 56 79 70 80 80Z" stroke="#777D5A" strokeWidth="1.5" />
                    {/* Bud */}
                    <ellipse cx="80" cy="40" rx="7" ry="12" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                  </svg>
                )}

                {stage === 3 && (
                  /* Stage 3: Opening flower */
                  <svg width="190" height="240" viewBox="0 0 190 240" fill="none">
                    <path d="M95 235C95 170 93 110 95 50" stroke="#777D5A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M95 160C65 140 55 148 62 130C80 125 93 148 95 160Z" stroke="#777D5A" strokeWidth="1.5" fill="#F5F1E8" />
                    <path d="M95 125C125 105 135 112 128 95C110 90 97 112 95 125Z" stroke="#777D5A" strokeWidth="1.5" fill="#D8F36A" />
                    {/* Opening Petals */}
                    <path d="M95 50C80 30 70 45 80 25C90 35 95 45 95 50Z" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <path d="M95 50C110 30 120 45 110 25C100 35 95 45 95 50Z" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <ellipse cx="95" cy="45" rx="6" ry="10" fill="#22231F" />
                  </svg>
                )}

                {stage === 4 && (
                  /* Stage 4: Full bloom botanical */
                  <svg width="220" height="260" viewBox="0 0 220 260" fill="none">
                    <path d="M110 255C110 180 108 120 110 65" stroke="#777D5A" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M110 180C75 160 60 170 70 148C90 142 108 168 110 180Z" stroke="#777D5A" strokeWidth="1.5" fill="#F5F1E8" />
                    <path d="M110 140C145 120 160 130 150 108C130 102 112 128 110 140Z" stroke="#777D5A" strokeWidth="1.5" fill="#D8F36A" />
                    
                    {/* Flower Petals */}
                    <circle cx="110" cy="60" r="14" fill="#D8F36A" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="110" cy="38" r="12" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="110" cy="82" r="12" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="88" cy="60" r="12" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="132" cy="60" r="12" fill="#C9A6A0" stroke="#777D5A" strokeWidth="1.5" />
                    <circle cx="94" cy="44" r="10" fill="#F5F1E8" stroke="#777D5A" strokeWidth="1.2" />
                    <circle cx="126" cy="44" r="10" fill="#F5F1E8" stroke="#777D5A" strokeWidth="1.2" />
                    <circle cx="94" cy="76" r="10" fill="#F5F1E8" stroke="#777D5A" strokeWidth="1.2" />
                    <circle cx="126" cy="76" r="10" fill="#F5F1E8" stroke="#777D5A" strokeWidth="1.2" />
                    
                    {/* Delicate Stamen Center */}
                    <circle cx="110" cy="60" r="6" fill="#22231F" />
                  </svg>
                )}
              </motion.div>

              {/* Seeded Companion Flora */}
              {plantedFlowers.map((fl) => (
                <div
                  key={fl.id}
                  style={{
                    left: `${fl.x}%`,
                    bottom: `${100 - fl.y}%`,
                    transform: `scale(${fl.scale})`,
                  }}
                  className="absolute pointer-events-none"
                >
                  <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                    <path d="M12 40V12" stroke="#777D5A" strokeWidth="1.5" />
                    <ellipse cx="12" cy="9" rx="5" ry="7" fill={fl.type === 'lavender' ? '#777D5A' : '#D8F36A'} stroke="#777D5A" strokeWidth="1" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Earth / Soil Bed at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-paper-border/80 via-paper-border/40 to-transparent border-t border-paper-border/70 flex items-center justify-between px-4 text-[10px] font-mono text-muted-text">
              <span>WARM LOAM SOIL</span>
              <span>TAP TO SEED FLORA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
