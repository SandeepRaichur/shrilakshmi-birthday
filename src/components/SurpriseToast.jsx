import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SurpriseToast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none max-w-sm px-4"
      >
        <div className="px-4 py-2.5 rounded-2xl bg-stone-900/90 backdrop-blur-md text-white border border-white/10 shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium">
          <span>{toast.icon || '👀'}</span>
          <span>{toast.message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
