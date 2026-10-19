import React, { useState, useEffect } from 'react';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatNavbar({ activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [purrCount, setPurrCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'archive', label: 'MEME ARCHIVE' },
    { id: 'lore', label: 'SHRILAKSHMI LORE' },
    { id: 'academics', label: 'ACADEMIC DEPT.' },
    { id: 'little-things', label: 'LITTLE THINGS' },
    { id: 'cat-of-the-day', label: 'CAT OF THE DAY' },
    { id: 'generator', label: 'MEME GENERATOR' },
  ];

  const handlePurr = () => {
    setPurrCount((c) => c + 1);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-paper-border shadow-sm py-2.5'
          : 'bg-paper border-b border-paper-border/60 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Publication Title */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <span className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center text-xs font-serif font-bold group-hover:bg-ginger transition-colors">
            🐈
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-ink group-hover:text-ginger transition-colors">
              THE CAT INTERNET
            </span>
            <span className="text-[9px] tracking-widest text-muted-text uppercase hidden sm:block">
              AN UNOFFICIAL PUBLICATION · EST. 2026
            </span>
          </div>
        </button>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[11px] font-medium tracking-wider px-2.5 py-1.5 rounded transition-all ${
                  isActive
                    ? 'bg-ink text-paper font-semibold shadow-xs'
                    : 'text-ink/80 hover:text-ink hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Purr / Meow counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePurr}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-paper-border bg-paper-light hover:bg-chartreuse hover:border-chartreuse text-ink transition-all active:scale-95 shadow-2xs"
            title="Click to pet the digital cat"
          >
            <span>🐾</span>
            <span className="text-[11px] tracking-tight font-mono">
              {purrCount === 0 ? 'pet cat' : `purrs: ${purrCount}`}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Scrollbar */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar border-t border-paper-border/40 mt-2 px-3 py-1 flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap text-[10px] tracking-wider px-2.5 py-1 rounded transition-all ${
                isActive
                  ? 'bg-ink text-paper font-semibold'
                  : 'text-ink/70 hover:text-ink hover:bg-black/5'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
