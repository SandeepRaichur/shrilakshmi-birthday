import React, { useState, useRef, useEffect } from 'react';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CatMemeGenerator() {
  const { memeGenerator } = shrilakshmiContent;
  const presetCats = memeGenerator?.presetCats || [];
  const presetCaptions = memeGenerator?.presetCaptions || [];

  const [selectedCat, setSelectedCat] = useState(presetCats[0]?.src || '/photos/2.jpeg');
  const [topText, setTopText] = useState(presetCaptions[0]?.top || 'STUDY CALL: 2 HOURS');
  const [bottomText, setBottomText] = useState(presetCaptions[0]?.bottom || 'ACTUAL SYLLABUS DISCUSSED: ZERO');
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef(null);

  // Draw the meme on canvas whenever inputs change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 640;
    const height = 640;

    canvas.width = width;
    canvas.height = height;

    // Draw background
    ctx.fillStyle = '#22231F';
    ctx.fillRect(0, 0, width, height);

    // Draw image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedCat;
    img.onload = () => {
      // Calculate cover dimensions
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (width - img.width * ratio) / 2;
      const centerShiftY = (height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );

      // Render bold meme typography (Impact / Arial Black styling)
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.textAlign = 'center';
      ctx.font = '900 36px Impact, "Arial Black", sans-serif';
      ctx.textBaseline = 'top';

      // Top text
      if (topText) {
        ctx.strokeText(topText.toUpperCase(), width / 2, 28);
        ctx.fillText(topText.toUpperCase(), width / 2, 28);
      }

      // Bottom text
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText.toUpperCase(), width / 2, height - 28);
        ctx.fillText(bottomText.toUpperCase(), width / 2, height - 28);
      }

      // Subtle publication watermark at bottom right
      ctx.font = '600 11px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'right';
      ctx.fillText('THE CAT INTERNET · FOR SHRILAKSHMI', width - 16, height - 8);
    };

    img.onerror = () => {
      // Fallback if image fails crossOrigin or offline
      ctx.fillStyle = '#F5F1E8';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#22231F';
      ctx.font = '28px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('🐈 [Cat Reaction Here] 🐈', width / 2, height / 2 - 20);

      ctx.font = 'bold 24px sans-serif';
      if (topText) ctx.fillText(topText.toUpperCase(), width / 2, 60);
      if (bottomText) ctx.fillText(bottomText.toUpperCase(), width / 2, height - 60);
    };
  }, [selectedCat, topText, bottomText]);

  const handleShuffleCaptions = () => {
    if (presetCaptions.length === 0) return;
    const randomIdx = Math.floor(Math.random() * presetCaptions.length);
    setTopText(presetCaptions[randomIdx].top);
    setBottomText(presetCaptions[randomIdx].bottom);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `shrilakshmi-cat-meme-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Canvas export error:', e);
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  return (
    <section
      id="generator"
      className="w-full py-20 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-paper-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-ginger font-semibold">
                CHAPTER 05 · FELINE PRINT LAB
              </span>
              <span className="text-muted-text">•</span>
              <span className="font-mono text-xs text-olive font-medium">CANVAS ENGINE</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl text-ink tracking-tight font-normal">
              "{memeGenerator.title}"
            </h2>
            
            <p className="text-sm sm:text-base text-muted-text font-sans">
              {memeGenerator.subtitle}
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-[11px] text-muted-text block">OUTPUT RESOLUTION</span>
            <span className="font-mono text-xs text-ink font-semibold">640 × 640 HIGH-RES PNG</span>
          </div>
        </div>

        {/* Generator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Canvas Live Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md bg-paper-light p-3 sm:p-4 border border-paper-border rounded-xs shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-text border-b border-paper-border pb-2">
                <span>MEME CANVAS PREVIEW</span>
                <span className="text-ginger font-semibold">LIVE</span>
              </div>

              {/* The Live HTML5 Canvas */}
              <div className="relative aspect-square w-full overflow-hidden bg-ink/10 rounded-xs border border-paper-border">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Download Action */}
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full py-3 bg-ink hover:bg-ginger text-paper font-mono text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>💾</span>
                <span>{isExporting ? 'GENERATING PNG...' : 'DOWNLOAD AS PNG'}</span>
              </button>
            </div>
          </div>

          {/* Right: Controls & Options */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Select Cat Asset */}
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block">
                1. Select Cat Subject:
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {presetCats.map((cat) => {
                  const isSelected = selectedCat === cat.src;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.src)}
                      className={`p-1.5 border rounded-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-ink bg-chartreuse/40 shadow-xs'
                          : 'border-paper-border bg-paper-light hover:border-ink/40'
                      }`}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-ink/5 rounded-xs mb-1">
                        <img
                          src={cat.src}
                          alt={cat.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono block truncate text-ink font-medium">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Captions Input */}
            <div className="space-y-3 pt-2 border-t border-paper-border">
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                  2. Customize Captions:
                </label>
                <button
                  onClick={handleShuffleCaptions}
                  className="text-xs font-mono text-ginger hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>🎲</span>
                  <span>Shuffle Presets</span>
                </button>
              </div>

              {/* Top Text Input */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted-text uppercase">Top Line:</span>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="TOP CAPTION..."
                  className="w-full px-3 py-2 bg-paper-light border border-paper-border rounded-xs font-mono text-xs uppercase text-ink focus:outline-none focus:border-ink"
                />
              </div>

              {/* Bottom Text Input */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted-text uppercase">Bottom Line:</span>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="BOTTOM CAPTION..."
                  className="w-full px-3 py-2 bg-paper-light border border-paper-border rounded-xs font-mono text-xs uppercase text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            {/* Helpful Hint */}
            <div className="p-3 bg-paper-light border border-paper-border/60 rounded-xs text-[11px] font-mono text-muted-text space-y-1">
              <span className="text-olive font-bold">PRO-TIP:</span>
              <p>
                Includes all 4 local photos from the `photos/` archive! Click any subject to switch reactions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
