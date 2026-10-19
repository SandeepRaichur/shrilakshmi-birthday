import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, Star } from 'lucide-react';
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

export default function StarCatcher({ onDiscoveryUnlocked }) {
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
            x: Math.floor(Math.random() * 75 + 12),
            y: 0,
            speed: 1.2 + Math.random() * 0.7,
            size: Math.floor(Math.random() * 8 + 14),
          },
        ]);
      }

      // Move stars
      setStars((prev) => {
        const next = [];
        const currentBasket = basketXRef.current;

        for (const s of prev) {
          const nextY = s.y + s.speed;

          // Check if caught by player's cloud/net (y >= 80)
          if (nextY >= 80 && nextY <= 94) {
            const hitDistance = Math.abs(s.x - currentBasket);
            if (hitDistance < 14) {
              // Caught!
              playChime(600 + caughtCount * 45);
              setCaughtCount((c) => {
                const nextCount = c + 1;
                if (nextCount >= targetStars) {
                  // Finish!
                  setTimeout(() => {
                    setGameState('constellation');
                    playSecretSound();
                    if (onDiscoveryUnlocked) onDiscoveryUnlocked('arcade_stars');
                  }, 400);
                }
                return nextCount;
              });
              continue;
            }
          }

          if (nextY > 100) continue; // Fell off screen

          next.push({ ...s, y: nextY });
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
  }, [gameState, caughtCount, onDiscoveryUnlocked]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-paper border border-paper-border text-ink">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            ACTIVITY #05 · CELESTIAL STARGROWTH
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-ink mt-0.5">
            Star Catcher
          </h4>
        </div>

        <span className="text-xs font-mono text-muted-text border border-paper-border px-2.5 py-1 rounded-sm">
          {caughtCount} / {targetStars} STARS COLLECTED
        </span>
      </div>

      {/* Playfield Area */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        className="relative w-full h-80 rounded-sm bg-paper/60 border border-paper-border overflow-hidden select-none touch-none flex flex-col justify-between"
      >
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-paper/90 z-20 space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-olive font-semibold">
              INSTRUCTIONS
            </span>
            <h4 className="text-2xl font-serif text-ink">
              Stargazing Coordinate.
            </h4>
            <p className="text-xs font-sans text-muted-text max-w-xs leading-relaxed">
              Catch 8 falling starlight points to form a celestial constellation for Shrilakshmi.
            </p>
            <button
              onClick={startCatching}
              className="px-6 py-2.5 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>START CATCHING</span>
            </button>
          </div>
        )}

        {gameState === 'catching' && (
          <>
            {/* Falling Stars */}
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute -translate-x-1/2 pointer-events-none select-none text-olive font-mono font-bold"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  fontSize: `${star.size}px`,
                }}
              >
                ✦
              </div>
            ))}

            {/* Catcher Basket / Marker */}
            <div
              className="absolute bottom-4 -translate-x-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${basketX}%` }}
            >
              <div className="w-12 h-2 bg-ink rounded-full" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted-text mt-1">
                SHRI
              </span>
            </div>

            <div className="absolute top-2 inset-x-0 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-muted-text/80 uppercase tracking-widest">
                DRAG CATCHER LEFT & RIGHT
              </span>
            </div>
          </>
        )}

        {/* Constellation Reveal State */}
        {gameState === 'constellation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 bg-paper/95 space-y-3"
          >
            {/* Constellation Vector lines connecting into 'S' */}
            <div className="relative w-44 h-44 mb-1">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.path
                  d="M 65 22 Q 50 16 35 25 Q 42 44 60 56 Q 62 75 50 84 Q 34 76 34 76"
                  fill="none"
                  stroke="#777D5A"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />

                {S_CONSTELLATION.map((pt, i) => (
                  <motion.g
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                  >
                    <circle cx={pt.x} cy={pt.y} r="2.5" fill="#22231F" />
                    <circle cx={pt.x} cy={pt.y} r="4.5" stroke="#777D5A" strokeWidth="0.8" fill="none" />
                  </motion.g>
                ))}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-4xl font-serif text-ink/15">
                  S
                </span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-mono tracking-widest uppercase text-olive font-semibold">
                CONSTELLATION “S” FORMED
              </p>
              <p className="text-xs font-sans text-muted-text">
                Eight celestial coordinates locked. Okay, that's enough showing off. 😂
              </p>
            </div>

            <button
              onClick={startCatching}
              className="mt-2 px-4 py-2 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>CATCH AGAIN</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
