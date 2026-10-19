import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess, playBoing } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

const DEFAULT_COMPLIMENTS = [
  { text: "genuinely kind", type: 'good' },
  { text: "deeply appreciated", type: 'good' },
  { text: "fun to be around", type: 'good' },
  { text: "makes moments better", type: 'good' },
  { text: "doing alright", type: 'good' },
  { text: "actually thoughtful", type: 'good' },
  { text: "irreplaceable friend", type: 'good' },
];

const DEFAULT_ROASTS = [
  { text: "professional overthinker", type: 'bad' },
  { text: "certified menace", type: 'bad' },
  { text: "slightly chaotic", type: 'bad' },
  { text: "questionable decisions", type: 'bad' },
  { text: "3 AM spiral", type: 'bad' },
];

export default function CatchCompliments({ onDiscoveryUnlocked }) {
  const compliments = shrilakshmiContent.games?.complimentCatch?.compliments || DEFAULT_COMPLIMENTS;
  const roasts = shrilakshmiContent.games?.complimentCatch?.roasts || DEFAULT_ROASTS;
  const gameTitle = shrilakshmiContent.games?.complimentCatch?.title || "Compliment Catch";
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
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, relativeX)));
  };

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('gameover');
          playSuccess();
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#777D5A', '#D8F36A', '#22231F'],
          });
          if (onDiscoveryUnlocked) onDiscoveryUnlocked('arcade_compliments');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const updatePhysics = () => {
      const now = Date.now();

      // Spawn falling items every 750ms
      if (now - lastSpawnRef.current > 750) {
        lastSpawnRef.current = now;
        const isGood = Math.random() > 0.4;
        const pool = isGood ? compliments : roasts;
        const chosen = pool[Math.floor(Math.random() * pool.length)];

        setFallingItems((prev) => [
          ...prev,
          {
            id: Math.random(),
            text: chosen.text,
            type: isGood ? 'good' : 'bad',
            x: Math.floor(Math.random() * 75 + 12),
            y: 0,
            speed: 1.2 + Math.random() * 0.8,
          },
        ]);
      }

      // Move items downwards and check collision with player
      setFallingItems((prev) => {
        const next = [];
        const currentBasket = basketXRef.current;

        for (const item of prev) {
          const nextY = item.y + item.speed;

          // Check if item hit the basket at bottom (y >= 82)
          if (nextY >= 82 && nextY <= 94) {
            const hitDistance = Math.abs(item.x - currentBasket);
            if (hitDistance < 14) {
              // Collided!
              if (item.type === 'good') {
                playChime(587.33);
                setScore((s) => s + 1);
              } else {
                playBoing();
                setRoastsHit((r) => r + 1);
              }
              continue; // Caught, don't keep falling
            }
          }

          if (nextY > 100) {
            if (item.type === 'bad') {
              setRoastsDodged((d) => d + 1);
            }
            continue; // Dropped off screen
          }

          next.push({ ...item, y: nextY });
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      clearInterval(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, compliments, roasts, onDiscoveryUnlocked]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-paper border border-paper-border text-ink">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            ACTIVITY #04 · REFLEX & KINDNESS CAPTURE
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-ink mt-0.5">
            {gameTitle}
          </h4>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="border border-paper-border px-2 py-0.5 rounded-sm">
              SCORE: {score}
            </span>
            <span className="border border-paper-border px-2 py-0.5 rounded-sm text-olive">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>
        )}
      </div>

      {/* Main Playfield Area */}
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
              Affirmation Gathering.
            </h4>
            <p className="text-xs font-sans text-muted-text max-w-xs leading-relaxed">
              Drag your marker (or use left/right arrow keys) to collect genuine compliments and dodge chaotic roasts.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>START ACTIVITY</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            {/* Falling Items */}
            {fallingItems.map((item) => (
              <div
                key={item.id}
                className={`absolute -translate-x-1/2 px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider border pointer-events-none ${
                  item.type === 'good'
                    ? 'bg-paper text-ink border-olive shadow-2xs font-semibold'
                    : 'bg-paper-border/80 text-muted-text border-paper-border line-through'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                {item.text}
              </div>
            ))}

            {/* Player's Marker */}
            <div
              className="absolute bottom-3 -translate-x-1/2 pointer-events-none transition-all duration-75"
              style={{ left: `${basketX}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-2 bg-ink rounded-full" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-text mt-1">
                  SHRILAKSHMI
                </span>
              </div>
            </div>

            {/* Instruction Cue */}
            <div className="absolute top-2 inset-x-0 text-center pointer-events-none">
              <span className="text-[10px] font-mono text-muted-text/80 uppercase tracking-widest">
                DRAG OR USE ARROW KEYS
              </span>
            </div>
          </>
        )}

        {gameState === 'gameover' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-paper/95 z-20 space-y-3"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              COLLECTION CONCLUDED
            </span>

            <h4 className="text-2xl font-serif text-ink">
              Activity Result.
            </h4>

            {/* Scorecard */}
            <div className="flex gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-sm border border-paper-border">
                COMPLIMENTS: <span className="font-bold text-ink">{score}</span>
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-paper-border">
                ROASTS SURVIVED: <span className="font-bold text-ink">{roastsDodged}</span>
              </div>
            </div>

            <div className="p-4 rounded-sm border border-paper-border bg-paper max-w-sm">
              <p className="text-sm font-serif italic text-ink">
                “You're pretty great. Unfortunately, you're also slightly chaotic.”
              </p>
            </div>

            <button
              onClick={startGame}
              className="mt-2 px-4 py-2 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>COLLECT AGAIN</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
