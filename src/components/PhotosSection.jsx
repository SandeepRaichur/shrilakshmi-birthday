import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Sparkles, X, Heart } from 'lucide-react';
import { shrilakshmiContent } from '../data/shrilakshmi';
import { playPop, playPaperFlip } from '../utils/audioEffects';

export default function PhotosSection() {
  const { photos, photoSettings } = shrilakshmiContent;
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  const enabledPhotos = (photos || []).filter((p) => p.enabled !== false);

  if (enabledPhotos.length === 0) return null;

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="photos" className="relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center select-none">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="editorial-pill bg-purple-100/90 text-purple-900 border border-purple-200/80 mb-3 shadow-2xs">
          📷 MEMORY VAULT · PHOTOS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 font-serif tracking-tight">
          {photoSettings?.title || "The Polaroid Gallery · Photos"}
        </h2>
        <p className="text-stone-500 font-sans text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
          {photoSettings?.subtitle || "Real captures, genuine moments, zero curated pretension."}
        </p>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {enabledPhotos.map((photo, index) => {
          const isBroken = brokenImages[photo.id];
          const tilts = [-2, 1.5, -1, 2.5, -1.8, 2];
          const tilt = tilts[index % tilts.length];

          return (
            <motion.div
              key={photo.id}
              whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
              style={{ rotate: tilt }}
              onClick={() => {
                playPaperFlip();
                setSelectedPhoto(photo);
              }}
              className="cursor-pointer relative p-4 rounded-3xl bg-white border border-stone-200/80 shadow-polaroid hover:shadow-hover transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Cute Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape-pink rounded-xs pointer-events-none z-10" />

              {/* Photo Image Area */}
              <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-tr from-pink-50 via-purple-50 to-amber-50 border border-stone-200/60 overflow-hidden flex items-center justify-center">
                {!isBroken && photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.title || "Shrilakshmi memory photo"}
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Graceful Pastel Placeholder when photo file hasn't been placed in public/photos/ yet */
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-50 to-pink-50 text-stone-600">
                    <span className="text-3xl mb-1 filter drop-shadow-xs">🌷</span>
                    <span className="text-xs font-serif font-bold text-purple-900 mt-1">
                      {photo.title || `Memory #${index + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-purple-600/70 mt-1 px-2 py-0.5 rounded-full bg-purple-100/60">
                      {photo.src || 'public/photos/image.jpg'}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption Area */}
              <div className="mt-3 text-center px-1">
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  {photo.title || `Moment #${index + 1}`}
                </h4>
                {photoSettings?.showCaptions !== false && photo.caption && (
                  <p className="text-xs text-stone-600 font-sans mt-0.5">
                    {photo.caption}
                  </p>
                )}
                {photo.kannadaCaption && (
                  <p className="text-xs font-handwriting text-purple-700 font-bold mt-1">
                    {photo.kannadaCaption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enlarged Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg p-6 rounded-3xl bg-white border border-stone-200 shadow-2xl text-stone-900 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playPop();
                  setSelectedPhoto(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Frame */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center my-3">
                {!brokenImages[selectedPhoto.id] && selectedPhoto.src ? (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt || selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <span className="text-5xl">🌷</span>
                    <p className="text-sm font-serif font-bold text-purple-900 mt-2">
                      {selectedPhoto.title}
                    </p>
                    <p className="text-xs font-mono text-stone-500 mt-1">
                      Place image in {selectedPhoto.src}
                    </p>
                  </div>
                )}
              </div>

              {/* Details */}
              <h3 className="font-serif font-bold text-xl text-stone-900 mt-1">
                {selectedPhoto.title}
              </h3>
              {selectedPhoto.caption && (
                <p className="text-sm text-stone-600 font-sans mt-1 text-center">
                  {selectedPhoto.caption}
                </p>
              )}
              {selectedPhoto.kannadaCaption && (
                <p className="text-base font-handwriting text-purple-700 font-bold mt-1 text-center">
                  {selectedPhoto.kannadaCaption}
                </p>
              )}

              <button
                onClick={() => {
                  playPop();
                  setSelectedPhoto(null);
                }}
                className="mt-5 px-6 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs"
              >
                Close · Saaku ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
