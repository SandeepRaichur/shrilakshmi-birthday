import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatMemeArchive() {
  const { memeArchive } = shrilakshmiContent;
  const memes = memeArchive?.memes || [];
  
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [likedMemes, setLikedMemes] = useState({});
  const [copiedMemeId, setCopiedMemeId] = useState(null);

  const categories = ['ALL', 'JUDGMENTAL CATS', 'CORPORATE EMPLOYEES', 'ORANGE CHAOS', 'LIFE CRISIS', 'SLEEPY CATS', 'LAPTOP CATS'];

  const filteredMemes = activeCategory === 'ALL'
    ? memes
    : memes.filter((m) => m.category === activeCategory);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedMemes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDownload = (meme, e) => {
    e.stopPropagation();
    // Render a temporary canvas to save meme card as image
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#F5F1E8';
    ctx.fillRect(0, 0, 600, 700);

    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#22231F';
    ctx.strokeRect(16, 16, 568, 668);

    // Title / Masthead
    ctx.fillStyle = '#22231F';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText('THE CAT INTERNET · MEME ARCHIVE', 36, 54);

    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#777D5A';
    ctx.fillText(meme.category || 'SPECIAL REPORT', 36, 78);

    // Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = meme.image;
    img.onload = () => {
      ctx.drawImage(img, 36, 96, 528, 400);

      // Caption
      ctx.fillStyle = '#22231F';
      ctx.font = 'bold 20px Georgia, serif';
      ctx.fillText(meme.title, 36, 530);

      ctx.fillStyle = '#3A3B35';
      ctx.font = '16px Inter, sans-serif';
      
      // Simple word wrap
      const words = meme.caption.split(' ');
      let line = '';
      let y = 560;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        if (testLine.length > 50) {
          ctx.fillText(line, 36, y);
          line = words[n] + ' ';
          y += 24;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 36, y);

      // Footer
      ctx.fillStyle = '#77766D';
      ctx.font = '12px monospace';
      ctx.fillText('Handcrafted for Shrilakshmi · 2026', 36, 650);

      const link = document.createElement('a');
      link.download = `cat-meme-${meme.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.onerror = () => {
      // Direct download or fallback
      const link = document.createElement('a');
      link.href = meme.image;
      link.download = `cat-meme-${meme.id}.jpg`;
      link.target = '_blank';
      link.click();
    };
  };

  const handleCopyCaption = (meme, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(`"${meme.title}" — ${meme.caption}`);
    setCopiedMemeId(meme.id);
    setTimeout(() => setCopiedMemeId(null), 2000);
  };

  return (
    <section
      id="archive"
      className="w-full py-20 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper-light/60"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-paper-border pb-6 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-olive font-semibold">
                CHAPTER 01 · CURATED TAXONOMY
              </span>
              <span className="text-muted-text">•</span>
              <span className="font-mono text-xs text-ginger font-medium">8 EXHIBITS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight font-normal">
              "{memeArchive.title}"
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans">
              {memeArchive.subtitle}
            </p>
            <p className="text-xs font-mono text-olive italic">
              {memeArchive.kannadaSubtitle}
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="font-mono text-[11px] text-muted-text block">INTERACTION PROTOCOL</span>
            <span className="font-mono text-xs text-ink font-semibold">TAP TO ENDORSE / DOWNLOAD</span>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-ink text-paper font-semibold shadow-xs'
                    : 'bg-paper text-ink/80 border border-paper-border hover:bg-paper-dark hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredMemes.map((meme, index) => {
            const likes = likedMemes[meme.id] || 0;
            const isWide = index === 0 || index === 4;

            return (
              <article
                key={meme.id}
                className={`group bg-paper border border-paper-border hover:border-ink/40 transition-all duration-300 rounded-xs overflow-hidden shadow-xs hover:shadow-md flex flex-col ${
                  isWide ? 'lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Meme Header Strip */}
                <div className="px-4 py-2.5 bg-paper-light border-b border-paper-border flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-ink tracking-wide">
                    {meme.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-chartreuse/60 text-ink font-bold tracking-wider">
                    {meme.tag}
                  </span>
                </div>

                {/* Meme Cat Reaction Image with Editorial Proportions */}
                <div
                  className={`relative w-full overflow-hidden bg-ink/5 ${
                    isWide ? 'aspect-16/10' : 'aspect-4/3'
                  }`}
                >
                  <img
                    src={meme.image}
                    alt={meme.title}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Vibe Badge */}
                  <div className="absolute top-3 left-3 bg-ink/85 backdrop-blur-xs text-paper px-2.5 py-1 text-[11px] font-mono rounded shadow-xs">
                    {meme.vibe}
                  </div>
                </div>

                {/* Meme Caption & Editorial Notes */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold leading-snug group-hover:text-ginger transition-colors">
                      {meme.title}
                    </h3>
                    <p className="text-sm text-ink/80 font-sans leading-relaxed">
                      "{meme.caption}"
                    </p>
                  </div>

                  {/* Interaction Bar */}
                  <div className="pt-3 border-t border-paper-border/70 flex items-center justify-between text-xs font-mono">
                    
                    {/* Endorse / Like Button */}
                    <button
                      onClick={(e) => handleLike(meme.id, e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-paper-border bg-paper-light hover:bg-chartreuse hover:border-chartreuse transition-all active:scale-95 cursor-pointer text-ink font-medium"
                      title="Endorse this cat reaction"
                    >
                      <span>🐾</span>
                      <span>{likes > 0 ? `Cat Approved (${likes})` : 'Approve'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Copy Caption */}
                      <button
                        onClick={(e) => handleCopyCaption(meme, e)}
                        className="p-1.5 text-muted-text hover:text-ink transition-colors"
                        title="Copy caption"
                      >
                        {copiedMemeId === meme.id ? '✓ copied' : '📋 copy'}
                      </button>

                      {/* Download Meme Card */}
                      <button
                        onClick={(e) => handleDownload(meme, e)}
                        className="px-2.5 py-1 bg-ink text-paper hover:bg-ginger text-[11px] font-mono font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Download meme image"
                      >
                        <span>↓</span>
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
