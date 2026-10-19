import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatOfTheDay() {
  const { catOfTheDay } = shrilakshmiContent;
  const reports = catOfTheDay?.reports || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportHistory, setReportHistory] = useState([0]);

  const handleNextCat = () => {
    if (reports.length <= 1) return;
    
    // Pick next index different from current
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * reports.length);
    } while (nextIndex === currentIndex);

    setCurrentIndex(nextIndex);
    setReportHistory((prev) => [nextIndex, ...prev.slice(0, 5)]);
  };

  const currentReport = reports[currentIndex] || reports[0];

  return (
    <section
      id="cat-of-the-day"
      className="w-full py-20 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper-light/60"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-chartreuse/60 border border-ink/10 rounded-full">
            <span className="text-xs">🐾</span>
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-ink">
              DAILY FELINE INTELLIGENCE BULLETIN
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-ink tracking-tight font-normal">
            "{catOfTheDay.title}"
          </h2>

          <p className="text-sm sm:text-base text-muted-text font-sans max-w-lg mx-auto">
            {catOfTheDay.subtitle}
          </p>
        </div>

        {/* The Selected Cat Card */}
        <div className="bg-paper border border-paper-border rounded-xs shadow-md p-6 sm:p-8 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Card Meta Header */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-paper-border pb-3">
                <span className="font-bold text-ink">
                  {currentReport.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-ginger/15 text-ginger font-semibold">
                  {currentReport.tag}
                </span>
              </div>

              {/* Cat Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-ink/5 border border-paper-border rounded-xs">
                <img
                  src={currentReport.image}
                  alt={currentReport.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              {/* Verdict / Caption */}
              <div className="space-y-2 text-center py-2">
                <blockquote className="font-serif text-2xl sm:text-3xl text-ink font-medium leading-snug">
                  "{currentReport.caption}"
                </blockquote>
                <p className="font-mono text-xs text-olive">
                  {currentReport.status}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Action Button: Another Cat Please */}
          <div className="pt-6 border-t border-paper-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[11px] text-muted-text">
              Showing report {currentIndex + 1} of {reports.length}
            </span>

            <button
              onClick={handleNextCat}
              className="w-full sm:w-auto px-6 py-2.5 bg-ink hover:bg-ginger text-paper font-mono text-xs font-semibold tracking-wider uppercase rounded-xs transition-all duration-200 active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{catOfTheDay.buttonLabel || "ANOTHER CAT, PLEASE 🐾"}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
