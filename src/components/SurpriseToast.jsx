import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SurpriseToast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none max-w-md w-full px-4"
      >
        <div className="px-4 py-2.5 rounded-sm bg-ink text-paper border border-paper-border shadow-lg flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-olive">{toast.icon || '✦'}</span>
            <span>{toast.message}</span>
          </div>
          <span className="text-[10px] text-paper/50 uppercase">[NOTE]</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
