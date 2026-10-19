import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { playPaperFlip, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function IndexSection({ onNavigateToSection }) {
  const { tableOfContents } = shrilakshmiContent;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const entries = tableOfContents || [
    {
      number: "01",
      title: "Our unexpected little story",
      kannada: "namma kathe",
      desc: "From background characters in 2nd PUC to WhatsApp study groups and the Goa lemon assignment.",
      targetId: "story",
    },
    {
      number: "02",
      title: "A little garden",
      kannada: "chiguru",
      desc: "A tiny garden that gets a little better every time you interact with it.",
      targetId: "garden",
    },
    {
      number: "03",
      title: "Games for absolutely no reason",
      kannada: "aata aadona",
      desc: "A small collection of questionable activities to avoid being productive.",
      targetId: "games",
    },
    {
      number: "04",
      title: "Two very specific observations",
      kannada: "devi & mba lore",
      desc: "Purely coincidental festival scheduling and the impending MBA case study era.",
      targetId: "memes",
    },
    {
      number: "05",
      title: "Photo archive",
      kannada: "nenapugalu",
      desc: "Snapshots from where it all began to the latest chapter.",
      targetId: "photos",
    },
    {
      number: "06",
      title: "Just a little note",
      kannada: "ondu chikka kagadha",
      desc: "A short, unpretentious note. No drama, just genuine appreciation.",
      targetId: "note",
    },
  ];

  const handleSelect = (targetId) => {
    playPaperFlip();
    if (onNavigateToSection) {
      onNavigateToSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="index" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none">
      {/* Section Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-paper-border gap-4">
        <div>
          <span className="editorial-label text-muted-text">
            TABLE OF CONTENTS · 2026
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ink mt-2">
            The Index.
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-muted-text max-w-xs">
          Select an entry to jump directly, or continue scrolling through the publication.
        </p>
      </div>

      {/* Numbered Editorial Table of Contents */}
      <div className="w-full divide-y divide-paper-border">
        {entries.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.targetId || index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelect(item.targetId)}
              className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-6 cursor-pointer transition-colors duration-200"
            >
              {/* Left Column: Number + Title */}
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="text-xs sm:text-sm font-mono text-muted-text group-hover:text-olive transition-colors">
                  {item.number}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ink group-hover:translate-x-1.5 transition-transform duration-200">
                    <span className={isHovered ? "italic" : ""}>{item.title}</span>
                  </h3>
                  {item.kannada && (
                    <span className="text-xs font-mono text-muted-text/80 tracking-wider">
                      [{item.kannada}]
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Short Description + Directional Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 md:max-w-md w-full md:w-auto pl-8 md:pl-0">
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed text-left md:text-right">
                  {item.desc}
                </p>

                <div className="w-8 h-8 rounded-full border border-paper-border flex items-center justify-center shrink-0 group-hover:border-ink group-hover:bg-ink group-hover:text-paper transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 text-ink group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Thin footnote footer */}
      <div className="pt-6 border-t border-paper-border flex items-center justify-between text-[11px] font-mono text-muted-text uppercase tracking-widest">
        <span>{entries.length < 10 ? `0${entries.length}` : entries.length} ENTRIES TOTAL</span>
        <span>NO COMMERCIAL VALUE · JUST FRIENDSHIP</span>
      </div>
    </section>
  );
}
