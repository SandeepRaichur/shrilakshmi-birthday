import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Unlock } from 'lucide-react';
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#777D5A', '#D8F36A', '#C9A6A0', '#22231F'],
      });
      if (onUnlocked) onUnlocked('secret');

      const t1 = setTimeout(() => setStep(2), 1100);
      const t2 = setTimeout(() => setStep(3), 2400);
      const t3 = setTimeout(() => setStep(4), 3800);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-sm bg-paper border border-paper-border shadow-2xl overflow-hidden text-left"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 text-muted-text hover:text-ink hover:bg-paper-border/30 rounded-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Label */}
          <div className="space-y-1 mb-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              {secretMessage?.badge || "CONFIDENTIAL ARCHIVE · UNLOCKED"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-ink">
              {secretMessage?.title || "You actually found it."}
            </h3>
          </div>

          {/* Sequential Revelation */}
          <div className="space-y-3 font-sans text-sm sm:text-base text-ink leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {secretMessage?.step1 || "I wasn't going to put this here..."}
            </motion.p>

            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-muted-text italic font-serif text-lg"
              >
                {secretMessage?.step2 || "curiosity levels check madthidini..."}
              </motion.p>
            )}

            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {secretMessage?.step3 || "Aadre neenu prathi ondu check madbekalva! 😂"}
              </motion.p>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-sm border border-paper-border bg-paper/60 text-xs sm:text-sm font-mono text-olive font-medium mt-4"
              >
                {secretMessage?.step4 || "Thanks for taking the time to explore this little corner. Tumba thanks kano! 🌷"}
              </motion.div>
            )}
          </div>

          {/* Close Action */}
          <div className="mt-8 pt-4 border-t border-paper-border flex justify-end">
            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="px-4 py-2 rounded-sm bg-ink text-paper text-xs font-mono tracking-widest uppercase hover:bg-olive transition-colors cursor-pointer"
            >
              {secretMessage?.closeButtonText || "Close & Continue"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
