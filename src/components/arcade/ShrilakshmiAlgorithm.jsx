import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function ShrilakshmiAlgorithm({ onDiscoveryUnlocked }) {
  const questions = shrilakshmiContent.games?.algorithm?.questions || [];
  const algoTitle = shrilakshmiContent.games?.algorithm?.title || 'The Shrilakshmi Algorithm';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (opt) => {
    if (selectedOpt !== null) return;
    playPop();
    setSelectedOpt(opt.text);
    setFeedback(opt.feedback);

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOpt(null);
        setFeedback(null);
        playChime();
      } else {
        setIsFinished(true);
        playSuccess();
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#777D5A', '#D8F36A', '#22231F'],
        });
        if (onDiscoveryUnlocked) onDiscoveryUnlocked('arcade_algo');
      }
    }, 1200);
  };

  const handleRestart = () => {
    playPop();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setFeedback(null);
    setIsFinished(false);
  };

  const currentQ = questions[currentIdx] || questions[0];

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-sm bg-paper border border-paper-border text-ink">
      
      {/* Questionnaire Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
            AUDIT #01 · PSYCHOLOGICAL PROFILING
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-ink mt-0.5">
            {algoTitle}
          </h4>
        </div>

        {!isFinished && questions.length > 0 && (
          <span className="text-xs font-mono text-muted-text border border-paper-border px-2.5 py-1 rounded-sm">
            0{currentIdx + 1} / 0{questions.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question Text */}
            <p className="text-lg sm:text-xl font-serif text-ink italic leading-snug">
              “{currentQ?.question}”
            </p>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ?.options?.map((opt, i) => {
                const isChosen = selectedOpt === opt.text;

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    disabled={selectedOpt !== null}
                    className={`w-full p-4 rounded-sm border text-left text-xs sm:text-sm font-sans transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                      isChosen
                        ? 'border-ink bg-ink text-paper font-semibold'
                        : 'border-paper-border bg-paper/60 hover:border-ink/60 text-ink'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 mt-0.5">
                      0{i + 1}.
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Editorial Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-sm border border-paper-border bg-paper/90 text-xs font-mono text-olive font-medium"
              >
                LOG ANALYSIS: {feedback}
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Finished State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-10 h-10 rounded-full border border-olive text-olive mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-serif text-ink">
              Profiling Complete.
            </h4>

            <p className="text-sm font-sans text-muted-text max-w-sm mx-auto leading-relaxed">
              The algorithm has recorded your nocturnal habits and voice-note tendencies. 100% genuine friendship compatibility confirmed.
            </p>

            <div className="pt-4">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-sm border border-paper-border hover:border-ink text-xs font-mono tracking-widest uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RE-AUDIT</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
