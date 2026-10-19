import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Unlock, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSecretSound, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function SecretModal({ isOpen, onClose, onUnlocked }) {
  const [step, setStep] = useState(1);
  const { secretMessage } = shrilakshmiContent;

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      playSecretSound();
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FDE047', '#C084FC', '#F472B6', '#38BDF8'],
      });
      if (onUnlocked) onUnlocked('secret');

      const t1 = setTimeout(() => setStep(2), 1200);
      const t2 = setTimeout(() => setStep(3), 2800);
      const t3 = setTimeout(() => setStep(4), 4500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen, onUnlocked]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-purple-950 to-stone-900 text-white border border-purple-500/30 shadow-2xl overflow-hidden text-center"
        >
          {/* Ambient sparkle glow */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lock icon */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 1 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-stone-900 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20"
          >
            🔓
          </motion.div>

          {/* Level Unlocked Banner */}
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
            {secretMessage?.badge || "SECRET LEVEL UNLOCKED · GUPCHUP ROOM"}
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white mb-2">
            {secretMessage?.title || "You actually found it · Nijvaglu kandhidya!"}
          </h3>

          {/* Progressive message reveals */}
          <div className="min-h-[140px] flex flex-col items-center justify-center my-4 space-y-3">
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-stone-300 text-sm font-sans"
              >
                {secretMessage?.step1 || "I wasn't going to put this here... Illi idhanna bidalla antha ankondidde."}
              </motion.p>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-amber-400 text-xs font-mono"
              >
                {secretMessage?.step2 || "curiosity levels check madthidini..."}
              </motion.div>
            )}

            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-300 font-handwriting text-2xl font-semibold leading-relaxed"
              >
                {secretMessage?.step3 || "Aadre neenu prathi ondu check madbekalva! 😂"}
              </motion.p>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm text-stone-200 mt-2"
              >
                {secretMessage?.step4 || "Thanks for taking the time to explore this little corner. Tumba thanks kano! 🌷"}
              </motion.div>
            )}
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="mt-4 px-6 py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            {secretMessage?.closeButtonText || "Close & Keep Exploring · innu nodu ✨"}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
