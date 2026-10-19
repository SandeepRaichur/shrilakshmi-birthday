import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess, playBoing } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function MakeHerLaugh({ onDiscoveryUnlocked }) {
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
          particleCount: 45,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#777D5A', '#D8F36A', '#C9A6A0', '#22231F'],
        });
        if (onDiscoveryUnlocked) onDiscoveryUnlocked('arcade_laugh');
      }, 400);
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
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-paper border border-paper-border text-ink">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            ACTIVITY #03 · COMEDIC ENDURANCE TEST
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-ink mt-0.5">
            {laughConfig.title || "Make Her Laugh"}
          </h4>
        </div>

        <span className="text-xs font-mono text-muted-text border border-paper-border px-2.5 py-1 rounded-sm">
          METER: {laughterLevel}%
        </span>
      </div>

      {/* Hairline Progress Rule */}
      <div className="w-full h-1 bg-paper-border rounded-full overflow-hidden mb-6">
        <motion.div
          animate={{ width: `${laughterLevel}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-full bg-olive rounded-full"
        />
      </div>

      {/* Expressive Editorial Avatar */}
      <div className="flex flex-col items-center justify-center mb-6">
        <motion.div
          animate={
            expression === 'crying_laugh'
              ? { y: [0, -10, 0], rotate: [-3, 3, -3] }
              : expression === 'giggle'
              ? { y: [0, -5, 0] }
              : { y: [0, -2, 0] }
          }
          transition={{
            duration: expression === 'crying_laugh' ? 0.35 : 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-32 h-32 flex items-center justify-center select-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#FAF8F3" stroke="#DAD5C9" strokeWidth="1" />
            <circle cx="50" cy="46" r="38" fill="#77766D" />
            <circle cx="50" cy="52" r="32" fill="#F5F1E8" stroke="#DAD5C9" strokeWidth="1" />
            
            {/* Bangs */}
            <path
              d="M 22 44 Q 35 28 50 32 Q 65 28 78 44 Q 68 36 50 38 Q 32 36 22 44 Z"
              fill="#22231F"
            />

            {/* Blush cheeks */}
            <circle cx="32" cy="58" r={expression === 'crying_laugh' ? 5 : 3.5} fill="#C9A6A0" opacity="0.6" />
            <circle cx="68" cy="58" r={expression === 'crying_laugh' ? 5 : 3.5} fill="#C9A6A0" opacity="0.6" />

            {/* Dynamic Eyes */}
            {expression === 'neutral' && (
              <>
                <circle cx="38" cy="50" r="3" fill="#22231F" />
                <circle cx="62" cy="50" r="3" fill="#22231F" />
              </>
            )}

            {expression === 'smirk' && (
              <>
                <circle cx="38" cy="49" r="3" fill="#22231F" />
                <path d="M 60 51 Q 63 48 66 51" stroke="#22231F" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}

            {(expression === 'chuckle' || expression === 'giggle') && (
              <>
                <path d="M 34 51 Q 38 46 42 51" stroke="#22231F" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 58 51 Q 62 46 66 51" stroke="#22231F" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}

            {expression === 'crying_laugh' && (
              <>
                <path d="M 33 52 Q 38 45 43 52" stroke="#22231F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 57 52 Q 62 45 67 52" stroke="#22231F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="28" cy="58" r="2.5" fill="#777D5A" />
                <circle cx="72" cy="58" r="2.5" fill="#777D5A" />
              </>
            )}

            {/* Dynamic Mouth */}
            {expression === 'neutral' && (
              <line x1="45" y1="62" x2="55" y2="62" stroke="#22231F" strokeWidth="1.5" strokeLinecap="round" />
            )}

            {expression === 'smirk' && (
              <path d="M 44 62 Q 52 66 58 60" stroke="#22231F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            )}

            {expression === 'chuckle' && (
              <path d="M 43 60 Q 50 67 57 60" stroke="#22231F" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}

            {expression === 'giggle' && (
              <path d="M 41 59 Q 50 71 59 59 Z" fill="#C9A6A0" stroke="#22231F" strokeWidth="1" />
            )}

            {expression === 'crying_laugh' && (
              <path d="M 38 58 Q 50 78 62 58 Z" fill="#22231F" stroke="#22231F" strokeWidth="1" />
            )}
          </svg>
        </motion.div>

        {/* Current joke / prompt speech bubble */}
        <div className="relative mt-2 px-5 py-3 rounded-sm border border-paper-border bg-paper/70 text-center max-w-md">
          <p className="text-xs sm:text-sm font-serif italic text-ink">
            “{currentText}”
          </p>
        </div>
      </div>

      {/* Interactive Category Buttons */}
      {!isSuccess ? (
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'joke', label: 'Classic Joke', num: '01' },
            { id: 'roast', label: 'Affectionate Roast', num: '02' },
            { id: 'random', label: 'Absurd Fact', num: '03' },
            { id: 'stupid', label: 'Extremely Stupid', num: '04' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleJokeClick(cat.id)}
              className="p-3 rounded-sm border border-paper-border bg-paper/60 hover:border-ink/70 text-ink text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center justify-between"
            >
              <span>{cat.label}</span>
              <span className="text-muted-text text-[10px]">{cat.num}</span>
            </button>
          ))}
        </div>
      ) : (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 rounded-sm border border-paper-border bg-paper/80 space-y-2"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            TEST CONCLUDED
          </span>
          <h4 className="text-2xl font-serif text-ink">
            Poker Face Broken. 😂
          </h4>
          <p className="text-xs font-sans text-muted-text">
            Objectively terrible comedy coaxed genuine laughter out of the universe.
          </p>

          <div className="pt-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>TEST MORE JOKES</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
