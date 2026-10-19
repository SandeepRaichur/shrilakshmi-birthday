import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sparkles, RefreshCw, SunMedium } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSparkle, playSuccess } from '../utils/audioEffects';
import { getSavedGardenStage, saveGardenStage } from '../utils/storage';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function GardenSection({ onDiscoveryUnlocked }) {
  const gardenConfig = shrilakshmiContent.garden;
  const [stage, setStage] = useState(getSavedGardenStage());
  const [xp, setXp] = useState(getSavedGardenStage() * 25);
  const [waterDrops, setWaterDrops] = useState([]);
  const [plantedFlowers, setPlantedFlowers] = useState([
    { id: 1, type: 'daisy', x: 20, y: 78, scale: 0.9 },
    { id: 2, type: 'lavender', x: 80, y: 75, scale: 0.85 },
  ]);
  const [butterflyPos, setButterflyPos] = useState({ x: 45, y: 30 });
  const [butterfliesClicked, setButterfliesClicked] = useState(0);

  const stageMessages = gardenConfig?.stageMessages || [
    { text: "Some things start small · Sanna beejadinda shuru.", sub: "Give it a little water · Swalpa neeru haaki nodu." },
    { text: "Small effort · Chikka prayathna.", sub: "Look at that, a little green leaf appeared · chiguru bandide!" },
    { text: "Little things matter · Sanna vishayagale mukya.", sub: "Buds are forming, almost ready · moggu aagthide." },
    { text: "Look what happened · Hoovu aagide!", sub: "It is blooming · sundaravagi aralthide." },
    { text: "You made this · Neene idhanna belesidhe!", sub: "Funny how small care turns into something beautiful · chikka care, tumba beauty." },
  ];

  const currentMilestone = Math.min(4, Math.floor(xp / 25));

  useEffect(() => {
    if (currentMilestone !== stage) {
      setStage(currentMilestone);
      saveGardenStage(currentMilestone);

      if (currentMilestone === 4) {
        playSuccess();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F472B6', '#34D399', '#FBBF24', '#A78BFA'],
        });
        if (onDiscoveryUnlocked) {
          onDiscoveryUnlocked('garden');
        }
      } else {
        playSparkle();
      }
    }
  }, [xp, currentMilestone, stage, onDiscoveryUnlocked]);

  const addGrowth = (amount = 10) => {
    setXp((prev) => Math.min(100, prev + amount));
  };

  // Watering action
  const handleWater = (e) => {
    playPop();
    const rect = e?.currentTarget?.getBoundingClientRect();
    const newDrops = Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random(),
      x: (rect ? 50 + (i - 2) * 8 : Math.random() * 80 + 10),
      delay: i * 0.08,
    }));
    setWaterDrops((prev) => [...prev, ...newDrops]);
    addGrowth(12);

    setTimeout(() => {
      setWaterDrops((prev) => prev.filter((d) => !newDrops.includes(d)));
    }, 1000);
  };

  // Butterfly tap interaction
  const handleButterflyClick = () => {
    playChime(659.25);
    setButterfliesClicked((prev) => prev + 1);
    addGrowth(8);
    setButterflyPos({
      x: Math.floor(Math.random() * 70 + 15),
      y: Math.floor(Math.random() * 40 + 15),
    });
  };

  // Plant extra companion flower by clicking on garden bed
  const handleGardenBedClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (clickY > 55 && plantedFlowers.length < 12) {
      playPop();
      const flowerTypes = ['daisy', 'tulip', 'lavender', 'sunflower'];
      const randomType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      setPlantedFlowers((prev) => [
        ...prev,
        {
          id: Math.random(),
          type: randomType,
          x: Math.round(clickX),
          y: Math.round(clickY),
          scale: 0.8 + Math.random() * 0.35,
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
      { id: 1, type: 'daisy', x: 20, y: 78, scale: 0.9 },
      { id: 2, type: 'lavender', x: 80, y: 75, scale: 0.85 },
    ]);
  };

  return (
    <section id="garden" className="relative w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="editorial-pill bg-sage-100 text-emerald-800 border border-emerald-200/80 mb-2.5">
          {gardenConfig?.badge || "🌱 BOTANICAL SANCTUARY"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 font-serif tracking-tight">
          {gardenConfig?.title || "Shrilakshmi's Little Garden"}
        </h2>
        <p className="text-stone-500 font-handwriting text-2xl mt-1.5 text-purple-800/80">
          &ldquo;{stageMessages[currentMilestone].text}&rdquo;
        </p>
        <p className="text-xs text-stone-400 font-sans mt-0.5">
          {stageMessages[currentMilestone].sub}
        </p>
      </div>

      {/* Main Terrarium Canvas Container */}
      <div
        onClick={handleGardenBedClick}
        className="relative w-full max-w-2xl h-[400px] sm:h-[460px] rounded-[2.5rem] bg-gradient-to-b from-sky-100/40 via-cream-50/80 to-sage-100/50 border border-white/90 shadow-glass overflow-hidden select-none cursor-pointer group"
      >
        {/* Soft Sunbeams in Sky */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200/60 via-transparent to-transparent" />
        {/* Soft Sun in Sky */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 right-8 text-warmYellow-300 pointer-events-none"
        >
          <SunMedium className="w-12 h-12 text-amber-300/80 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.4)]" />
        </motion.div>

        {/* Ambient floating fireflies / pollen */}
        {currentMilestone >= 3 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -35, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="absolute w-2 h-2 rounded-full bg-amber-300/60 blur-[1px]"
                style={{
                  left: `${15 + i * 11}%`,
                  top: `${40 + (i % 4) * 10}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Interactive Butterfly */}
        <motion.div
          animate={{
            x: `${butterflyPos.x}%`,
            y: `${butterflyPos.y}%`,
          }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          onClick={(e) => {
            e.stopPropagation();
            handleButterflyClick();
          }}
          className="absolute z-20 cursor-pointer p-2 -translate-x-1/2 -translate-y-1/2"
          title="Click the butterfly!"
        >
          <motion.div
            animate={{ rotate: [-6, 6, -6], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="text-2xl filter drop-shadow-sm select-none"
          >
            🦋
          </motion.div>
        </motion.div>

        {/* Falling Water Droplets Animation */}
        <AnimatePresence>
          {waterDrops.map((drop) => (
            <motion.div
              key={drop.id}
              initial={{ y: 20, opacity: 0.9, scale: 0.8 }}
              animate={{ y: 280, opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, delay: drop.delay, ease: 'easeIn' }}
              className="absolute text-sky-400 pointer-events-none text-base"
              style={{ left: `${drop.x}%`, top: 40 }}
            >
              💧
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Center Primary Plant Growing Stages */}
        <div className="absolute bottom-16 inset-x-0 flex flex-col items-center pointer-events-none">
          {/* STAGE 0: Tiny Seed in Soil */}
          {currentMilestone === 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl animate-bounce-subtle">🌱</div>
              <p className="mt-2 text-xs font-medium text-stone-500 bg-white/70 px-2 py-0.5 rounded-full border border-stone-200">
                A tiny seed planted
              </p>
            </motion.div>
          )}

          {/* STAGE 1: Small Green Sprout */}
          {currentMilestone === 1 && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="flex flex-col items-center"
            >
              <svg width="80" height="90" viewBox="0 0 100 100">
                <path d="M 50 95 Q 49 70 50 50" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 50 65 Q 35 60 30 45 Q 45 48 50 65" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
                <path d="M 50 55 Q 65 50 70 35 Q 55 38 50 55" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
              </svg>
            </motion.div>
          )}

          {/* STAGE 2: Budding Stem */}
          {currentMilestone === 2 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="flex flex-col items-center"
            >
              <svg width="100" height="120" viewBox="0 0 100 120">
                <path d="M 50 115 Q 51 80 50 45" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 50 85 Q 30 78 25 60 Q 42 63 50 85" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
                <path d="M 50 70 Q 70 65 75 48 Q 58 50 50 70" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
                {/* Flower Bud */}
                <ellipse cx="50" cy="38" rx="10" ry="14" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
                <ellipse cx="46" cy="39" rx="6" ry="12" fill="#FBCFE8" />
              </svg>
            </motion.div>
          )}

          {/* STAGE 3: Blooming Flower */}
          {currentMilestone === 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 14 }}
              className="flex flex-col items-center"
            >
              <svg width="130" height="150" viewBox="0 0 120 140">
                <path d="M 60 135 Q 62 90 60 48" stroke="#15803D" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 60 98 Q 36 90 30 70 Q 50 72 60 98" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
                <path d="M 60 80 Q 84 74 90 55 Q 70 58 60 80" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
                {/* Blooming Petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="60"
                    cy="40"
                    rx="10"
                    ry="18"
                    fill="#F472B6"
                    opacity="0.9"
                    transform={`rotate(${angle} 60 40)`}
                  />
                ))}
                <circle cx="60" cy="40" r="10" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
              </svg>
            </motion.div>
          )}

          {/* STAGE 4: Full Magnificent Flowering Garden Tree & Blooms */}
          {currentMilestone === 4 && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center">
                {/* Radiant glow */}
                <div className="absolute w-40 h-40 bg-pink-200/40 rounded-full blur-2xl -top-6" />

                <svg width="160" height="175" viewBox="0 0 140 160">
                  <path d="M 70 155 Q 72 100 70 50" stroke="#15803D" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <path d="M 70 110 Q 40 100 32 75 Q 56 78 70 110" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
                  <path d="M 70 90 Q 100 82 108 60 Q 84 64 70 90" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
                  {/* Outer pink glow petals */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                    <ellipse
                      key={angle}
                      cx="70"
                      cy="42"
                      rx="9"
                      ry="22"
                      fill="#F472B6"
                      opacity="0.85"
                      transform={`rotate(${angle} 70 42)`}
                    />
                  ))}
                  {/* Inner lavender layer */}
                  {[15, 75, 135, 195, 255, 315].map((angle) => (
                    <ellipse
                      key={`inner-${angle}`}
                      cx="70"
                      cy="42"
                      rx="7"
                      ry="16"
                      fill="#C084FC"
                      opacity="0.9"
                      transform={`rotate(${angle} 70 42)`}
                    />
                  ))}
                  <circle cx="70" cy="42" r="11" fill="#FDE047" stroke="#F59E0B" strokeWidth="2.5" />
                  {/* Little smiling face on flower */}
                  <circle cx="66" cy="40" r="1.5" fill="#78350F" />
                  <circle cx="74" cy="40" r="1.5" fill="#78350F" />
                  <path d="M 67 44 Q 70 47 73 44" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </motion.div>
          )}
        </div>

        {/* Planted companion flowers on the garden ground */}
        {plantedFlowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ scale: 0 }}
            animate={{ scale: flower.scale }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-xl sm:text-2xl filter drop-shadow-xs"
            style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
          >
            {flower.type === 'daisy' && '🌼'}
            {flower.type === 'tulip' && '🌷'}
            {flower.type === 'lavender' && '🪻'}
            {flower.type === 'sunflower' && '🌻'}
          </motion.div>
        ))}

        {/* Soil mound & grass bottom layer */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#8D6E63] via-[#A1887F] to-emerald-600/30 border-t-2 border-emerald-500/20">
          <div className="w-full h-2 flex justify-between px-2 text-emerald-600/50 text-[10px] select-none">
            {['🌿', '🌱', '☘️', '🌾', '🌱', '🌿', '☘️', '🌾', '🌱', '🌿'].map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>
        </div>

        {/* Garden bed tap prompt */}
        <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
          <span className="text-[11px] font-medium text-stone-100/90 bg-stone-800/40 backdrop-blur-xs px-3 py-1 rounded-full">
            💡 Tap soil to plant mini companion flowers
          </span>
        </div>
      </div>

      {/* Progress & Control Bar */}
      <div className="w-full max-w-2xl mt-6 p-5 rounded-[2rem] bg-white/80 backdrop-blur-md border border-white/90 shadow-glass flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress bar */}
        <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-stone-600 font-sans tracking-wide">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Sanctuary Growth</span>
            </span>
            <span className="font-mono text-purple-700">{xp}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden border border-stone-200/60 p-0.5">
            <motion.div
              animate={{ width: `${xp}%` }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-pink-400 rounded-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWater}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/20 transition-all"
          >
            <Droplets className="w-4 h-4 fill-white" />
            <span>Water Garden · Neeru haaku 💧</span>
          </motion.button>

          <button
            onClick={handleReset}
            title="Reset garden"
            className="p-2.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Final Garden Message Reveal */}
      {currentMilestone === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-8 text-center max-w-md p-6 rounded-[2rem] bg-gradient-to-b from-pink-50/80 via-white to-purple-50/80 border border-pink-200/70 shadow-soft"
        >
          {/* Washi tape on reveal */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-pink rotate-[-1deg] rounded-xs flex items-center justify-center pointer-events-none">
            <span className="text-[9px] font-mono tracking-widest text-pink-900/70 uppercase">
              BLOOMED ✨
            </span>
          </div>

          <p className="text-2xl font-bold text-stone-800 font-serif">
            You made this. 🌷
          </p>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Funny how small things can become something beautiful.
          </p>
        </motion.div>
      )}
    </section>
  );
}
