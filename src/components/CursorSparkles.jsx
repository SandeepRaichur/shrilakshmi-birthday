import React, { useEffect, useState } from 'react';

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Only enable on pointer fine (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 65) return; // limit sparkle generation rate
      lastTime = now;

      const newSparkle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY + window.scrollY,
        size: Math.random() * 8 + 6,
        color: ['#F472B6', '#C084FC', '#38BDF8', '#FBBF24', '#34D399'][Math.floor(Math.random() * 5)],
        char: ['✨', '⋆', '･', '✦'][Math.floor(Math.random() * 4)],
      };

      setSparkles((prev) => [...prev.slice(-12), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto clean sparkles after lifespan
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out animate-pulse"
          style={{
            left: s.x,
            top: s.y - window.scrollY,
            fontSize: `${s.size}px`,
            color: s.color,
            opacity: 0.75,
            textShadow: `0 0 6px ${s.color}`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
