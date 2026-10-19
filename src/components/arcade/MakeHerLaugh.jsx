import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess, playBoing } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function MakeHerLaugh({ onComplete }) {
  const laughConfig = shrilakshmiContent.games?.makeHerLaugh || {};
  const jokesData = laughConfig.jokes || {
    joke: ["Why do we tell actors to break a leg? Because every play has a cast."],
    roast: ["Your brain has 47 browser tabs open."],
    random: ["If tomatoes are a fruit, then ketchup is technically a smoothie."],
    stupid: ["What do you call a fake noodle? An impasta."],
  };
  const challengePrompt = laughConfig.challengePrompt || "Go ahead... try to break my poker face. 😐";

  const [laughterLevel, setLaughterLevel] = useState(0); // 0 to 100
  const [currentText, setCurrentText] = useState(challengePrompt);
  const [lastCategory, setLastCategory] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const getExpression = () => {
    if (laughterLevel >= 100) return 'crying_laugh';
    if (laughterLevel >= 70) return 'giggle';
    if (laughterLevel >= 40) return 'smirk';
    if (laughterLevel >= 15) return 'chuckle';
    return 'neutral';
  };

  const handleJokeClick = (category) => {
    if (isSuccess) return;

    if (category === 'roast') {
      playBoing();
    } else {
      playPop();
    }

    setLastCategory(category);
    const pool = jokesData[category] || jokesData.joke || [];
    const picked = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : "😂";
    setCurrentText(picked);

    const nextLevel = Math.min(100, laughterLevel + 25);
    setLaughterLevel(nextLevel);

    if (nextLevel >= 100) {
      setTimeout(() => {
        setIsSuccess(true);
        playSuccess();
        confetti({
          particleCount: 55,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#F472B6', '#34D399'],
        });
        if (onComplete) onComplete();
      }, 500);
    } else {
      playChime(440 + nextLevel * 4);
    }
  };

  const handleReset = () => {
    playPop();
    setLaughterLevel(0);
    setCurrentText(challengePrompt);
    setLastCategory(null);
    setIsSuccess(false);
  };

  const expression = getExpression();

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/90 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-pink-100 text-pink-700 shadow-2xs">
            <Laugh className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xl font-serif tracking-tight">
              {laughConfig.title || "Make Her Laugh"}
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Test your comedy arsenal against the stoic avatar
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-800 border border-pink-200/80 font-mono">
          Meter: {laughterLevel}%
        </span>
      </div>

      {/* Laughter Meter Bar */}
      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mb-6">
        <motion.div
          animate={{ width: `${laughterLevel}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-full bg-gradient-to-r from-amber-300 via-pink-400 to-rose-500 rounded-full"
        />
      </div>

      {/* Cute Expressive Cartoon Avatar */}
      <div className="flex flex-col items-center justify-center mb-6">
        <motion.div
          animate={
            expression === 'crying_laugh'
              ? { y: [0, -12, 0], rotate: [-4, 4, -4] }
              : expression === 'giggle'
              ? { y: [0, -6, 0] }
              : { y: [0, -2, 0] }
          }
          transition={{
            duration: expression === 'crying_laugh' ? 0.35 : 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-36 h-36 flex items-center justify-center select-none"
        >
          {/* Avatar Face Container SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
            {/* Soft background glow */}
            <circle cx="50" cy="50" r="46" fill="#FCE7F3" opacity="0.5" />

            {/* Hair back */}
            <circle cx="50" cy="46" r="38" fill="#4B5563" />

            {/* Face base */}
            <circle cx="50" cy="52" r="32" fill="#FED7AA" />

            {/* Bangs / Hair front */}
            <path
              d="M 22 44 Q 35 28 50 32 Q 65 28 78 44 Q 68 36 50 38 Q 32 36 22 44 Z"
              fill="#374151"
            />

            {/* Blush cheeks */}
            <circle
              cx="32"
              cy="58"
              r={expression === 'crying_laugh' ? 6 : 4}
              fill="#F472B6"
              opacity="0.6"
            />
            <circle
              cx="68"
              cy="58"
              r={expression === 'crying_laugh' ? 6 : 4}
              fill="#F472B6"
              opacity="0.6"
            />

            {/* Dynamic Eyes based on expression */}
            {expression === 'neutral' && (
              <>
                <circle cx="38" cy="50" r="3" fill="#1F2937" />
                <circle cx="62" cy="50" r="3" fill="#1F2937" />
              </>
            )}

            {expression === 'smirk' && (
              <>
                <circle cx="38" cy="49" r="3" fill="#1F2937" />
                <path d="M 60 51 Q 63 48 66 51" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {(expression === 'chuckle' || expression === 'giggle') && (
              <>
                <path d="M 34 51 Q 38 46 42 51" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 58 51 Q 62 46 66 51" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {expression === 'crying_laugh' && (
              <>
                {/* Cheerful squinting eyes */}
                <path d="M 33 52 Q 38 45 43 52" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 57 52 Q 62 45 67 52" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Comedy tears */}
                <path d="M 28 54 Q 24 58 26 62 Q 29 60 28 54" fill="#38BDF8" />
                <path d="M 72 54 Q 76 58 74 62 Q 71 60 72 54" fill="#38BDF8" />
              </>
            )}

            {/* Dynamic Mouth */}
            {expression === 'neutral' && (
              <line x1="45" y1="62" x2="55" y2="62" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            )}

            {expression === 'smirk' && (
              <path d="M 44 62 Q 52 66 58 60" stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            )}

            {expression === 'chuckle' && (
              <path d="M 43 60 Q 50 67 57 60" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {expression === 'giggle' && (
              <path d="M 41 59 Q 50 71 59 59 Z" fill="#E11D48" />
            )}

            {expression === 'crying_laugh' && (
              <path d="M 38 58 Q 50 78 62 58 Z" fill="#BE123C" stroke="#881337" strokeWidth="1" />
            )}
          </svg>
        </motion.div>

        {/* Current joke / prompt speech bubble */}
        <div className="relative mt-3 px-5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-center max-w-md shadow-2xs">
          <p className="text-xs sm:text-sm font-medium text-stone-700 italic">
            &ldquo;{currentText}&rdquo;
          </p>
        </div>
      </div>

      {/* Interactive Category Buttons */}
      {!isSuccess ? (
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleJokeClick('joke')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-2xs"
          >
            <span>😂</span>
            <span>Joke</span>
          </button>

          <button
            onClick={() => handleJokeClick('roast')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-2xs"
          >
            <span>😈</span>
            <span>Roast</span>
          </button>

          <button
            onClick={() => handleJokeClick('random')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-2xs"
          >
            <span>🐸</span>
            <span>Random</span>
          </button>

          <button
            onClick={() => handleJokeClick('stupid')}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-2xs"
          >
            <span>💀</span>
            <span>Extremely Stupid</span>
          </button>
        </div>
      ) : (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 rounded-2xl bg-pink-50 border border-pink-200"
        >
          <h4 className="text-xl font-extrabold text-stone-800 font-display">
            SUCCESS 😂
          </h4>
          <p className="mt-1 text-sm font-handwriting text-xl text-pink-700">
            That was objectively terrible.
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            You successfully coaxed genuine laughter out of the universe.
          </p>

          <button
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-800 text-white text-xs font-semibold hover:bg-stone-900 transition-all active:scale-95 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try More Jokes</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
