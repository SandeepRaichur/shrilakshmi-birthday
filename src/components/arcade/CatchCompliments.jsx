import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Play, RefreshCw, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess, playBoing } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

const DEFAULT_COMPLIMENTS = [
  { text: "✨ genuinely kind", type: 'good' },
  { text: "🌷 deeply appreciated", type: 'good' },
  { text: "⭐ fun to be around", type: 'good' },
  { text: "💫 makes moments better", type: 'good' },
  { text: "🌱 doing alright", type: 'good' },
  { text: "🌸 actually thoughtful", type: 'good' },
  { text: "💎 irreplaceable friend", type: 'good' },
];

const DEFAULT_ROASTS = [
  { text: "💀 professional overthinker", type: 'bad' },
  { text: "🤡 certified menace", type: 'bad' },
  { text: "😂 slightly chaotic", type: 'bad' },
  { text: "🫠 questionable decisions", type: 'bad' },
  { text: "👀 3 AM spiral", type: 'bad' },
];

export default function CatchCompliments({ onComplete }) {
  const compliments = shrilakshmiContent.games?.complimentCatch?.compliments || DEFAULT_COMPLIMENTS;
  const roasts = shrilakshmiContent.games?.complimentCatch?.roasts || DEFAULT_ROASTS;
  const gameTitle = shrilakshmiContent.games?.complimentCatch?.title || "Catch The Compliments";
  const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
  const [basketX, setBasketX] = useState(50); // percentage 0 to 100
  const [fallingItems, setFallingItems] = useState([]);
  const [score, setScore] = useState(0);
  const [roastsHit, setRoastsHit] = useState(0);
  const [roastsDodged, setRoastsDodged] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const basketXRef = useRef(50);
  basketXRef.current = basketX;

  const startGame = () => {
    playPop();
    setScore(0);
    setRoastsHit(0);
    setRoastsDodged(0);
    setTimeLeft(25);
    setFallingItems([]);
    setGameState('playing');
    lastSpawnRef.current = Date.now();
  };

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setBasketX((prev) => Math.max(10, prev - 8));
      } else if (e.key === 'ArrowRight') {
        setBasketX((prev) => Math.min(90, prev + 8));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Touch and Mouse dragging for mobile and desktop
  const handlePointerMove = (e) => {
    if (gameState !== 'playing' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, relX)));
  };

  // Main game tick loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let isRunning = true;

    const gameLoop = () => {
      if (!isRunning) return;
      const now = Date.now();

      // Spawn item every 900ms
      if (now - lastSpawnRef.current > 850) {
        lastSpawnRef.current = now;
        const isGood = Math.random() > 0.38;
        const pool = isGood ? compliments : roasts;
        const picked = pool[Math.floor(Math.random() * pool.length)];

        setFallingItems((prev) => [
          ...prev,
          {
            id: Math.random(),
            text: picked.text,
            type: picked.type,
            x: Math.floor(Math.random() * 76 + 12),
            y: 0,
            speed: 1.2 + Math.random() * 0.8,
          },
        ]);
      }

      // Move items and check collisions
      setFallingItems((prev) => {
        const next = [];
        const currentBasket = basketXRef.current;

        for (const item of prev) {
          const nextY = item.y + item.speed;

          // Check if item hit bottom / basket area
          if (nextY >= 82 && nextY <= 94) {
            // Check collision with basket
            if (Math.abs(item.x - currentBasket) < 18) {
              // Collided!
              if (item.type === 'good') {
                setScore((s) => s + 1);
                playChime(600 + Math.random() * 200);
              } else {
                setRoastsHit((r) => r + 1);
                playBoing();
              }
              continue; // Caught, don't keep in flight
            }
          }

          if (nextY > 100) {
            // Missed bottom
            if (item.type === 'bad') {
              setRoastsDodged((d) => d + 1);
            }
            continue;
          }

          next.push({ ...item, y: nextY });
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
  }, [gameState]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setGameState('gameover');
          playSuccess();
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#F472B6', '#34D399', '#38BDF8'],
          });
          if (onComplete) onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, onComplete]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/90 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xl font-serif tracking-tight">
              {gameTitle}
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Catch positive truths. Dodge the chaotic roasts!
            </p>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Score: {score}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              ⏱️ {timeLeft}s
            </span>
          </div>
        )}
      </div>

      {/* Main Playfield Area */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-purple-50/40 via-sky-50/40 to-emerald-50/40 border border-purple-100/70 overflow-hidden select-none touch-none flex flex-col justify-between"
      >
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-xs z-20">
            <span className="text-4xl mb-3">🌸🧺</span>
            <h4 className="text-lg font-bold text-stone-800 font-display">
              Ready to catch some good vibes?
            </h4>
            <p className="text-xs text-stone-500 max-w-xs mt-1 mb-5">
              Drag your basket (or use left/right arrows) to catch genuine compliments and dodge the comical roasts.
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Play className="w-4 h-4" />
              <span>Start Catching</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            {/* Falling Items */}
            {fallingItems.map((item) => (
              <div
                key={item.id}
                className={`absolute -translate-x-1/2 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold shadow-xs border pointer-events-none transition-transform ${
                  item.type === 'good'
                    ? 'bg-white/95 text-emerald-800 border-emerald-200 shadow-emerald-200/50'
                    : 'bg-rose-50 text-rose-800 border-rose-300 shadow-rose-200/50'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                {item.text}
              </div>
            ))}

            {/* Player's Basket / Cloud */}
            <div
              className="absolute bottom-3 -translate-x-1/2 pointer-events-none transition-all duration-75"
              style={{ left: `${basketX}%` }}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl filter drop-shadow-md">🧺</span>
                <span className="text-[9px] font-bold text-stone-500 bg-white/80 px-1.5 rounded-full border border-stone-200">
                  Shrilakshmi
                </span>
              </div>
            </div>

            {/* Instruction tooltip */}
            <div className="absolute top-2 inset-x-0 text-center pointer-events-none">
              <span className="text-[10px] text-stone-400 bg-white/70 px-2 py-0.5 rounded-full">
                Drag basket left & right
              </span>
            </div>
          </>
        )}

        {gameState === 'gameover' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/95 backdrop-blur-md z-20"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-2">
              🏆
            </div>

            <h4 className="text-lg font-extrabold text-stone-800 font-display">
              Game Complete!
            </h4>

            {/* Scorecard */}
            <div className="flex gap-4 my-3 text-xs sm:text-sm">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                Compliments: <span className="font-bold text-base">{score}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                Roasts survived: <span className="font-bold text-base">{roastsDodged}</span>
              </div>
            </div>

            {/* Playful final result message required by prompt */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 max-w-sm mt-1 mb-4">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">
                Final Result
              </span>
              <p className="text-sm font-bold text-stone-800 mt-0.5">
                You&apos;re pretty great.
              </p>
              <p className="text-xs text-stone-600 font-handwriting text-base mt-0.5">
                Unfortunately, you&apos;re also slightly chaotic. 😂
              </p>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Catch Again</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
