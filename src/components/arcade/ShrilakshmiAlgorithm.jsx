import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playSuccess } from '../../utils/audioEffects';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function ShrilakshmiAlgorithm({ onComplete }) {
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
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A78BFA', '#F472B6', '#FBBF24'],
        });
        if (onComplete) onComplete();
      }
    }, 1300);
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
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/90 shadow-glass">
      {/* Game Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-800 shadow-2xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xl font-serif tracking-tight">
              {algoTitle}
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              How Well Do You Know... Yourself?
            </p>
          </div>
        </div>

        {!isFinished && questions.length > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Q{currentIdx + 1}/{questions.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            {/* Question prompt */}
            <h4 className="text-base sm:text-lg font-bold text-stone-800 mb-5 leading-snug">
              {currentQ.question}
            </h4>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isChosen = selectedOpt === opt.text;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    disabled={selectedOpt !== null}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center justify-between ${
                      isChosen
                        ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-xs'
                        : selectedOpt !== null
                        ? 'bg-stone-50/50 border-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-white hover:bg-purple-50/50 border-stone-200 hover:border-purple-300 text-stone-700 active:scale-[0.99]'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isChosen ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-stone-300 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Playful Feedback Bar */}
            <div className="min-h-[44px] mt-4 flex items-center justify-center">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs sm:text-sm font-handwriting text-amber-900 font-semibold text-center"
                >
                  {feedback}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Finished State: Algorithm Analysis Complete */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl shadow-md mb-3">
              📊
            </div>

            <h4 className="text-xl font-extrabold text-stone-800 tracking-tight font-display">
              SHRILAKSHMI ANALYSIS COMPLETE
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Neural profile synthesized with 99.8% subjective accuracy
            </p>

            {/* Animated Statistic Bars */}
            <div className="w-full mt-6 space-y-3.5 text-left text-xs sm:text-sm">
              {[
                { label: 'Chaos Factor', value: 87, color: 'bg-pink-400' },
                { label: 'Genuine Sweetness', value: 92, color: 'bg-purple-400' },
                { label: 'Unfiltered Randomness', value: 96, color: 'bg-amber-400' },
                { label: 'Normal Human Behavior', value: 14, color: 'bg-stone-400' },
                { label: 'Loyalty & Support', value: 98, color: 'bg-emerald-400' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.7, ease: 'easeOut' }}
                      className={`h-full ${stat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-6 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Conclusion
              </span>
              <p className="mt-1 text-sm sm:text-base font-bold text-stone-800 font-display">
                You&apos;re doing surprisingly well at being you.
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Scientific consensus: 10/10 would keep as a friend.
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Analysis</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
