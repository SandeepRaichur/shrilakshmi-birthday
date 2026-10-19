import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { shrilakshmiContent } from '../data/shrilakshmi';
import { playPaperFlip, playPop } from '../utils/audioEffects';

export default function PhotosSection() {
  const { gallery } = shrilakshmiContent;
  const collections = gallery?.collections || [];

  // Flatten all images across collections for global lightbox navigation
  const allImages = collections.flatMap((c) =>
    (c.images || []).map((img) => ({
      ...img,
      collectionTitle: c.title,
      collectionLabel: c.label,
    }))
  );

  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleOpenLightbox = (globalIndex) => {
    playPaperFlip();
    setActiveImageIndex(globalIndex);
  };

  const handleCloseLightbox = () => {
    playPop();
    setActiveImageIndex(null);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    playPaperFlip();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    playPaperFlip();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') handleCloseLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, allImages.length]);

  const currentPhoto = activeImageIndex !== null ? allImages[activeImageIndex] : null;

  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          EDITORIAL HEADER
          ----------------------------------------------------------------------- */}
      <div className="pb-12 border-b border-paper-border space-y-4">
        <div className="flex items-center justify-between">
          <span className="editorial-label text-muted-text">
            {gallery.curatedTag || "PHOTO GALLERY"}
          </span>
          <span className="text-[11px] font-mono text-olive font-semibold tracking-wider uppercase">
            {allImages.length} PHOTOS
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-ink tracking-tight leading-[0.95]">
          {gallery.title || "SHRILAKSHMI'S PHOTOS"}
        </h2>

        <p className="text-base sm:text-lg text-muted-text font-sans max-w-2xl leading-relaxed">
          {gallery.subtitle || "Some good memories and photos from college days."}
        </p>
      </div>

      {/* -----------------------------------------------------------------------
          THE 3 CURATED COLLECTIONS (100% IDENTICAL SIZING & BULLETPROOF ALIGNMENT)
          ----------------------------------------------------------------------- */}
      <div className="space-y-24 pt-16">
        {collections.map((col) => {
          return (
            <div key={col.id} className="space-y-8">
              
              {/* Collection Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-paper-border pb-4 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-olive uppercase tracking-wider">
                      {col.collectionNumber}
                    </span>
                    <span className="text-paper-border">•</span>
                    <span className="text-[10px] font-mono text-muted-text uppercase tracking-widest px-2.5 py-0.5 bg-paper-light border border-paper-border rounded-xs">
                      {col.label}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-display font-semibold text-ink leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-sm font-sans text-muted-text">
                    {col.subtitle}
                  </p>
                </div>

                <span className="text-xs font-mono text-muted-text">
                  {col.images?.length} FRAMES
                </span>
              </div>

              {/* COLLECTION 01: THE EARLY YEARS (4 Photos Uniform 4-Col Grid) */}
              {col.id === 'childhood' && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {col.images.map((img) => {
                    const globalIdx = allImages.findIndex((item) => item.id === img.id);
                    return (
                      <div
                        key={img.id}
                        onClick={() => handleOpenLightbox(globalIdx)}
                        className="group bg-paper-light p-3 border border-paper-border hover:border-ink/60 rounded-xs shadow-2xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col"
                      >
                        {/* 100% Uniform 4:5 Aspect Ratio Container with Absolute Pinned Image */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-paper-dark border border-paper-border/80 rounded-xs">
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ objectPosition: img.objectPosition || 'center top' }}
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="p-2 bg-paper text-ink rounded-full shadow-xs">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>

                        {/* Perfectly Aligned Bottom Strip */}
                        <div className="mt-3 pt-2 border-t border-paper-border/60 flex items-center justify-between text-xs font-mono text-muted-text">
                          <span className="font-medium text-ink">FRAME #{img.number}</span>
                          <span className="text-[10px] text-olive font-bold uppercase tracking-wider">ARCHIVAL</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* COLLECTION 02: THE SHRILAKSHMI FILES (16 Photos Uniform 4-Col Grid) */}
              {col.id === 'individual' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {col.images.map((img) => {
                    const globalIdx = allImages.findIndex((item) => item.id === img.id);

                    return (
                      <div
                        key={img.id}
                        onClick={() => handleOpenLightbox(globalIdx)}
                        className="group bg-paper-light p-3 border border-paper-border hover:border-ink/60 rounded-xs shadow-2xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col"
                      >
                        {/* 100% Uniform 4:5 Aspect Ratio Container with Absolute Pinned Image */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-paper-dark border border-paper-border/80 rounded-xs">
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ objectPosition: img.objectPosition || 'center top' }}
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="p-2 bg-paper text-ink rounded-full shadow-xs">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>

                        {/* Perfectly Aligned Bottom Strip */}
                        <div className="mt-3 pt-2 border-t border-paper-border/60 flex items-center justify-between text-xs font-mono">
                          <span className="text-muted-text text-[11px] truncate pr-2">
                            Frame #{img.number}
                          </span>
                          <span className="font-semibold text-ink text-[11px] shrink-0">
                            VIEW
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* COLLECTION 03: THE SHARED FRAMES (2 Photos Centered Side-by-Side Grid) */}
              {col.id === 'together' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto pt-2">
                  {col.images.map((img) => {
                    const globalIdx = allImages.findIndex((item) => item.id === img.id);
                    return (
                      <div
                        key={img.id}
                        onClick={() => handleOpenLightbox(globalIdx)}
                        className="group bg-paper-light p-4 border border-paper-border hover:border-ink/70 rounded-xs shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col"
                      >
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-paper-dark border border-paper-border/80 rounded-xs">
                          <img
                            src={img.src}
                            alt={img.alt}
                            style={{ objectPosition: img.objectPosition || 'center top' }}
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="p-2.5 bg-paper text-ink rounded-full shadow-xs">
                              <Maximize2 className="w-4 h-4" />
                            </span>
                          </div>
                        </div>

                        <div className="mt-3.5 pt-2.5 border-t border-paper-border/70 flex items-center justify-between text-xs font-mono">
                          <span className="text-ink font-medium">{img.caption}</span>
                          <span className="text-olive font-bold tracking-wider">FRAME #{img.number}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* -----------------------------------------------------------------------
          MODAL LIGHTBOX
          ----------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeImageIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-between text-paper text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-paper/20 rounded text-[10px] uppercase tracking-wider">
                  {currentPhoto.collectionLabel || "ARCHIVE"}
                </span>
                <span className="text-paper/80 hidden sm:inline">
                  Frame #{currentPhoto.number} · {currentPhoto.caption}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
                <button
                  onClick={handleCloseLightbox}
                  className="p-1.5 rounded-full bg-paper/10 hover:bg-paper/30 text-paper transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto flex items-center justify-center w-full max-h-[82vh]"
            >
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-paper/20 hover:bg-paper/40 text-paper transition-all cursor-pointer backdrop-blur-xs"
                title="Previous (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-h-[78vh] max-w-[88vw] object-contain rounded-xs shadow-2xl border border-paper/20"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-paper/20 hover:bg-paper/40 text-paper transition-all cursor-pointer backdrop-blur-xs"
                title="Next (Right arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Info Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full text-center text-paper/80 text-xs font-mono space-y-1"
            >
              <p className="font-sans text-sm sm:text-base text-paper font-medium">
                Frame #{currentPhoto.number} — {currentPhoto.caption}
              </p>
              <span className="text-[10px] text-paper/50 block">
                PRESS ESC TO EXIT · USE ARROW KEYS TO NAVIGATE
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
