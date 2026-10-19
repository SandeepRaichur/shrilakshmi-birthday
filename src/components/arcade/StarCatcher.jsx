import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Play, RefreshCw, Star } from 'lucide-react';
import { playSparkle, playChime, playSecretSound, playPop } from '../../utils/audioEffects';

// Constellation coordinates for letter 'S' (percentages inside a 100x100 space)
const S_CONSTELLATION = [
  { x: 65, y: 22 }, // top right curve
  { x: 50, y: 16 }, // top center
  { x: 35, y: 25 }, // top left curve
  { x: 42, y: 44 }, // mid center curve
  { x: 60, y: 56 }, // mid right curve
  { x: 62, y: 75 }, // bottom right curve
  { x: 50, y: 84 }, // bottom center
  { x: 34, y: 76 }, // bottom left curve
];

export default function StarCatcher({ onComplete }) {
  const [gameState, setGameState] = useState('idle'); // idle, catching, constellation
  const [basketX, setBasketX] = useState(50);
  const [stars, setStars] = useState([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const targetStars = 8;

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const basketXRef = useRef(50);
  basketXRef.current = basketX;

  const startCatching = () => {
    playPop();
    setCaughtCount(0);
    setStars([]);
    setGameState('catching');
    lastSpawnRef.current = Date.now();
  };

  // Drag & pointer movement
  const handlePointerMove = (e) => {
    if (gameState !== 'catching' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(12, Math.min(88, relX)));
  };

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== 'catching') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setBasketX((x) => Math.max(12, x - 8));
      if (e.key === 'ArrowRight') setBasketX((x) => Math.min(88, x + 8));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Falling stars animation loop
  useEffect(() => {
    if (gameState !== 'catching') return;

    let isRunning = true;

    const gameLoop = () => {
      if (!isRunning) return;
      const now = Date.now();

      // Spawn falling stars
      if (now - lastSpawnRef.current > 750) {
        lastSpawnRef.current = now;
        setStars((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: Math.floor(Math.random() * 76 + 12),
            y: 0,
            speed: 0.9 + Math.random() * 0.6,
            size: Math.floor(Math.random() * 6 + 16),
          },
        ]);
      }

      // Move stars & test catch
      setStars((prev) => {
        const next = [];
        const currentBasket = basketXRef.current;

        for (const star of prev) {
          const nextY = star.y + star.speed;

          // Catch collision near basket
          if (nextY >= 82 && nextY <= 94 && Math.abs(star.x - currentBasket) < 16) {
            playChime(650 + Math.random() * 300);
            setCaughtCount((c) => {
              const updated = c + 1;
              if (updated >= targetStars) {
                // Trigger constellation reveal!
                setTimeout(() => {
                  setGameState('constellation');
                  playSecretSound();
                  if (onComplete) onComplete();
                }, 400);
              }
              return updated;
            });
            continue;
          }

          if (nextY > 100) continue; // Out of bounds

          next.push({ ...star, y: nextY });
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-stone-100 shadow-glass border border-indigo-500/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-indigo-800/60 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-indigo-900/80 text-amber-300 border border-indigo-700/50 shadow-2xs">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xl font-serif tracking-tight">
              Star Catcher
            </h3>
            <p className="text-xs text-indigo-300 font-sans">
              Catch 8 stars in the night sky
            </p>
          </div>
        </div>

        {gameState === 'catching' && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-950 text-amber-300 border border-indigo-700">
            ⭐ {caughtCount}/{targetStars}
          </span>
        )}
      </div>

      {/* Main Night Sky Container */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#2E1065] border border-indigo-800/50 overflow-hidden select-none touch-none flex flex-col justify-between"
      >
        {/* Soft background ambient stars */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
              style={{
                left: `${(i * 17) % 95}%`,
                top: `${(i * 23) % 85}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* IDLE STATE */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-slate-950/70 backdrop-blur-xs">
            <span className="text-4xl mb-3 animate-float-slow">🌙✨</span>
            <h4 className="text-lg font-bold text-white font-display">
              A Quiet Night Under The Stars
            </h4>
            <p className="text-xs text-indigo-200 max-w-xs mt-1 mb-5">
              Glide the glowing cloud collector to gather starlight. Something special happens when you collect enough.
            </p>
            <button
              onClick={startCatching}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-stone-900" />
              <span>Begin Stargazing</span>
            </button>
          </div>
        )}

        {/* CATCHING STATE */}
        {gameState === 'catching' && (
          <>
            {/* Falling Stars */}
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute -translate-x-1/2 pointer-events-none select-none text-amber-300 filter drop-shadow-[0_0_8px_rgba(252,211,77,0.7)]"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  fontSize: `${star.size}px`,
                }}
              >
                ⭐
              </div>
            ))}

            {/* Glowing Cloud Basket */}
            <div
              className="absolute bottom-4 -translate-x-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${basketX}%` }}
            >
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center gap-1">
                <span className="text-lg">☁️</span>
                <span className="text-[10px] font-bold text-amber-200">Shri</span>
              </div>
            </div>

            <div className="absolute top-2 inset-x-0 text-center pointer-events-none">
              <span className="text-[10px] text-indigo-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full">
                Drag cloud to catch stars
              </span>
            </div>
          </>
        )}

        {/* CONSTELLATION REVEAL STATE (Forms the letter 'S') */}
        {gameState === 'constellation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 bg-gradient-to-b from-[#0F172A]/90 via-[#1E1B4B]/95 to-[#2E1065]/95"
          >
            {/* Constellation SVG lines and stars */}
            <div className="relative w-48 h-48 mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                {/* Golden Constellation Lines connecting into 'S' */}
                <motion.path
                  d="M 65 22 Q 50 16 35 25 Q 42 44 60 56 Q 62 75 50 84 Q 34 76 34 76"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />

                {/* Star Nodes along the 'S' */}
                {S_CONSTELLATION.map((pt, i) => (
                  <motion.g
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                    transition={{ delay: 0.15 * i, duration: 0.5 }}
                  >
                    <circle cx={pt.x} cy={pt.y} r="3" fill="#FEF08A" />
                    <circle cx={pt.x} cy={pt.y} r="6" fill="#FBBF24" opacity="0.3" className="animate-ping" />
                  </motion.g>
                ))}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-amber-200/20 font-serif">
                  S
                </span>
              </div>
            </div>

            {/* Required message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs font-semibold text-amber-300 font-handwriting text-lg">
                Constellation &ldquo;S&rdquo; Formed ✨
              </p>
              <p className="text-xs text-indigo-200 mt-0.5">
                okay, that&apos;s enough showing off. 😂
              </p>
            </motion.div>

            <button
              onClick={startCatching}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-900/80 hover:bg-indigo-800 text-amber-300 text-xs font-medium border border-indigo-700 transition-all active:scale-95"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Catch Again</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
