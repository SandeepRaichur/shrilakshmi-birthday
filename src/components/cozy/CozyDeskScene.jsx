import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Moon, Sunset, Compass, Award, Heart, HelpCircle, Lightbulb } from 'lucide-react';
import { playPop, playPurr, playLampSwitch, playChime, playCartridgeClick, playPaperFlip } from '../../utils/audioEffects';
import CassettePlayerWidget from './CassettePlayerWidget';
import ChaiMugModal from './ChaiMugModal';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function CozyDeskScene({
  onSelectStation,
  onOpenSecret,
  onOpenBadges,
  currentTheme,
  onChangeTheme,
  discoveries = [],
}) {
  const [isChaiOpen, setIsChaiOpen] = useState(false);
  const [catPetCount, setCatPetCount] = useState(0);
  const [catHeartPos, setCatHeartPos] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const sections = shrilakshmiContent.sections || {};
  const desk = shrilakshmiContent.desk || {};
  const cat = desk.cat || {};
  const chai = desk.chai || {};
  const stations = desk.stations || {};

  const handlePetCat = (e) => {
    playPurr();
    setCatPetCount((prev) => prev + 1);
    setCatHeartPos({ x: e.clientX, y: e.clientY });
    setTimeout(() => setCatHeartPos(null), 1200);
  };

  const handleToggleLamp = () => {
    playLampSwitch();
    const nextTheme = currentTheme === 'day' ? 'sunset' : currentTheme === 'sunset' ? 'night' : 'day';
    onChangeTheme(nextTheme);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 pt-4 pb-12 select-none">
      {/* Interactive Chai Mug Modal */}
      <ChaiMugModal isOpen={isChaiOpen} onClose={() => setIsChaiOpen(false)} />

      {/* Floating Cat Petting Hearts */}
      {catHeartPos && (
        <motion.div
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 1.4, y: -40 }}
          transition={{ duration: 1 }}
          className="fixed pointer-events-none z-50 text-2xl font-bold flex items-center gap-1 text-pink-500"
          style={{ left: catHeartPos.x - 20, top: catHeartPos.y - 30 }}
        >
          <span>💖</span>
          <span className="text-xs font-handwriting bg-white/90 px-2 py-0.5 rounded-full border border-pink-200 shadow-xs text-pink-700">
            purrrr...
          </span>
        </motion.div>
      )}

      {/* Desk Master Frame */}
      <div className={`relative rounded-[3rem] p-6 sm:p-10 border transition-all duration-700 shadow-2xl overflow-hidden ${
        currentTheme === 'night'
          ? 'bg-gradient-to-b from-slate-900/90 via-[#1a183d]/90 to-slate-950/95 border-indigo-500/30 text-white'
          : currentTheme === 'sunset'
          ? 'bg-gradient-to-b from-amber-100/90 via-rose-100/80 to-purple-100/85 border-amber-300/60 text-stone-900'
          : 'bg-gradient-to-b from-[#fbf8f3] via-amber-50/70 to-purple-50/60 border-amber-200/60 text-stone-900'
      }`}>
        {/* Soft atmospheric window light / glow */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
          currentTheme === 'night' ? 'bg-indigo-600/20' : currentTheme === 'sunset' ? 'bg-orange-400/25' : 'bg-amber-300/25'
        }`} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header of the Cozy Studio */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-200/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-stone-500">
                {desk.headerTag || "SHRILAKSHMI’S COZY DESK SANCTUARY · 2026"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight">
              {desk.title || "A Little Corner Made For You"} · <span className="italic font-handwriting text-purple-700 text-xl sm:text-3xl font-bold">{desk.kannadaTitle || "ninna koli"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md font-sans">
              {desk.subtitle || "Click objects on the desk to explore different worlds. Yella click maadi nodu! :)"}
            </p>
          </div>

          {/* Quick Desk Controls (Lamp Mood, Badges, Secret) */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
            {/* Lamp / Lighting Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleLamp}
              className={`px-3.5 py-2 rounded-full border shadow-2xs text-xs font-semibold flex items-center gap-2 transition-all ${
                currentTheme === 'night'
                  ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-200 hover:bg-indigo-900'
                  : currentTheme === 'sunset'
                  ? 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200'
                  : 'bg-white/90 border-stone-200 text-stone-700 hover:bg-white'
              }`}
              title="Click to toggle Day / Sunset / Night mode"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="capitalize">{currentTheme} Mood</span>
            </motion.button>

            {/* Badges / Discovery Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playPop();
                onOpenBadges();
              }}
              className="px-3.5 py-2 rounded-full bg-purple-100/90 hover:bg-purple-200/90 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>Badges ({discoveries.length}/8)</span>
            </motion.button>

            {/* Secret Vault Button */}
            {sections.secretMessage !== false && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPop();
                  onOpenSecret();
                }}
                className="px-3.5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs"
              >
                <span>🗝️ Vault</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* =========================================================================
            THE INTERACTIVE 2.5D DESK CANVASES
           ========================================================================= */}
        <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Windowsill Terrarium + Steaming Chai + Cat (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. THE GLASS TERRARIUM JAR (Windowsill Sanctuary) */}
            {sections.garden !== false && (
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredItem('terrarium')}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => {
                  playChime(659.25);
                  onSelectStation('garden');
                }}
                className="cursor-pointer relative p-6 rounded-3xl bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-emerald-100/80 border border-emerald-300/80 shadow-soft hover:shadow-hover transition-all group overflow-hidden"
              >
                {/* Window Frame illusion */}
                <div className="absolute top-2 right-4 text-3xl opacity-30 group-hover:opacity-70 transition-opacity">
                  🪟
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 border border-emerald-300">
                    {stations.garden?.tag || "LIVING WINDOWSILL"}
                  </span>
                  <span className="text-xs text-emerald-700 font-mono group-hover:translate-x-1 transition-transform">
                    Enter &rarr;
                  </span>
                </div>

                <div className="flex items-center gap-4 my-2">
                  <div className="relative w-20 h-20 rounded-2xl bg-white/80 border border-emerald-200 flex items-center justify-center text-4xl shadow-sm group-hover:scale-105 transition-transform">
                    <motion.span
                      animate={{ rotate: [-4, 4, -4] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🪴
                    </motion.span>
                    <motion.span
                      animate={{ y: [-3, 3, -3], x: [2, -2, 2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 -right-2 text-xl"
                    >
                      🦋
                    </motion.span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-xl tracking-tight group-hover:text-emerald-800 transition-colors">
                      {stations.garden?.title || "The Little Garden"}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {stations.garden?.desc || "Nurture living seeds, companion daisies & lavender in a peaceful glass terrarium."}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-medium text-emerald-800">
                  <span>🌱 Growth interactive · Water with droplets</span>
                  <span className="font-mono text-emerald-600">{stations.garden?.stationLabel || "STATION #01"}</span>
                </div>
              </motion.div>
            )}

            {/* 2. CHAI MUG + SLEEPING MOCHI CAT (Two companion desk trinkets) */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Steaming Chai Mug */}
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playPop();
                  setIsChaiOpen(true);
                }}
                className="cursor-pointer p-4 rounded-3xl bg-amber-50/90 border border-amber-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group text-center items-center"
              >
                <motion.div
                  animate={{ y: [-2, -8, -12], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-base pointer-events-none"
                >
                  ♨️
                </motion.div>
                <div className="w-12 h-12 rounded-2xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-2xl shadow-2xs group-hover:rotate-6 transition-transform">
                  ☕
                </div>
                <div className="mt-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    {chai.name || "Bisibisi Chai"}
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                    {chai.status || "Swalpa tea kudi & chill maadu ☕"}
                  </p>
                </div>
                <span className="mt-2 text-[9px] font-mono font-bold text-amber-800 uppercase px-2 py-0.5 rounded-full bg-amber-200/60">
                  {chai.buttonText || "SWALPA KUDI"}
                </span>
              </motion.div>

              {/* Mochi the Sleeping Cat */}
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePetCat}
                className="cursor-pointer p-4 rounded-3xl bg-rose-50/90 border border-rose-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group text-center items-center"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-2xl bg-rose-200/70 border border-rose-300 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform mt-2"
                >
                  🐱
                </motion.div>
                <div className="mt-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    {cat.name || "Mochi the Cat"}
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                    {cat.status || "Nidde madthidana · napping"}
                  </p>
                </div>
                <span className="mt-2 text-[9px] font-mono font-bold text-rose-800 uppercase px-2 py-0.5 rounded-full bg-rose-200/60">
                  {catPetCount > 0 ? `PURRS: ${catPetCount} · ${cat.purrText || "maja!"}` : (cat.buttonText || "MUTTU 🐾 PET ME")}
                </span>
              </motion.div>
            </div>

            {/* 3. VINTAGE LO-FI CASSETTE PLAYER */}
            <div className="w-full flex justify-center">
              <CassettePlayerWidget />
            </div>
          </div>

          {/* RIGHT COLUMN: The Core Experiences (Arcade, Memes, Photos, Little Things, Starlight Letter) (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* 4. THE PASTEL RETRO CONSOLE (Interactive Gameboy on the desk) */}
            {sections.games !== false && (
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playCartridgeClick();
                  onSelectStation('arcade');
                }}
                className="cursor-pointer relative p-6 rounded-3xl bg-gradient-to-br from-purple-100/90 via-pink-100/80 to-indigo-100/90 border-2 border-purple-300 shadow-glass hover:shadow-hover transition-all group overflow-hidden"
              >
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-purple-300/30 blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
                      {stations.games?.tag || "RETRO CONSOLE · 5 AATAGALU 🕹️"}
                    </span>
                  </div>
                  <span className="text-xs text-purple-700 font-mono group-hover:translate-x-1 transition-transform">
                    Power On &rarr;
                  </span>
                </div>

                <div className="flex items-center gap-5 my-1">
                  <div className="relative w-20 h-20 rounded-2xl bg-purple-950 border-2 border-purple-800 p-2 flex flex-col items-center justify-between shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-8 rounded-md bg-emerald-950 border border-emerald-700 flex items-center justify-center text-xs font-mono text-emerald-400">
                      <span>🕹️ 2026</span>
                    </div>
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[10px] text-purple-300 font-mono">+</span>
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-xl sm:text-2xl tracking-tight group-hover:text-purple-900 transition-colors">
                      {stations.games?.title || "The Pastel Arcade · Aata Aadu"}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      {stations.games?.desc || "“The Shrilakshmi Algorithm”, Memory Hunt, Joke generator, and Star Catcher. Aata aadi gelodu mukya!"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-purple-200/60 flex items-center justify-between text-[11px] font-medium text-purple-900">
                  <span>Cartridge swapping &middot; Retro sound effects</span>
                  <span className="font-mono text-purple-700">{stations.games?.stationLabel || "STATION #02"}</span>
                </div>
              </motion.div>
            )}

            {/* 5. THE CLASSIFIED DOSSIER (Diwali/Dasara & MBA Era Memes) */}
            {sections.memes !== false && (
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playPaperFlip();
                  onSelectStation('about-shrilakshmi');
                }}
                className="cursor-pointer relative p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-warmYellow-50 to-orange-50/90 border-2 border-amber-300 shadow-glass hover:shadow-hover transition-all group overflow-hidden"
              >
                <div className="absolute -top-3 left-8 w-36 h-6 washi-tape-amber rotate-[-1.5deg] rounded-xs flex items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-mono tracking-widest text-amber-950 uppercase font-bold">
                    {stations.memes?.tag || "GUPCHUP FILE 🗂️"}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3 mt-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 border border-amber-300">
                    INVESTIGATIVE DOSSIER
                  </span>
                  <span className="text-xs text-amber-800 font-mono group-hover:translate-x-1 transition-transform">
                    Inspect File &rarr;
                  </span>
                </div>

                <div className="flex items-center gap-4 my-1">
                  <div className="w-16 h-16 rounded-2xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-3xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    🗂️
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-xl tracking-tight group-hover:text-amber-900 transition-colors">
                      {stations.memes?.title || "The Shrilakshmi Lore · Devi na neenu?"}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed whitespace-pre-line">
                      {stations.memes?.desc || "1. Diwali vs Dasara birthday coincidence.\n2. November 2026 MBA era corporate buzzword dial & PNG export."}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-medium text-amber-900">
                  <span>Interactive transformation sliders &middot; High-res card download</span>
                  <span className="font-mono text-amber-700">{stations.memes?.stationLabel || "STATION #03"}</span>
                </div>
              </motion.div>
            )}

            {/* 6. BOTTOM CARDS: Photo Gallery, Scrapbook Polaroids & Starlight Letter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              
              {/* Photo Gallery Card */}
              {sections.photos !== false && (
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playPaperFlip();
                    onSelectStation('photos');
                  }}
                  className="cursor-pointer p-5 rounded-3xl bg-amber-50/90 border border-amber-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl group-hover:rotate-6 transition-transform">📷</span>
                      <span className="text-[9px] font-mono font-bold text-amber-800 uppercase px-2 py-0.5 rounded-full bg-amber-200/60">
                        {stations.photos?.tag || "PHOTOS 📷"}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900">
                      {stations.photos?.title || "Photo Gallery · Moments"}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-sans">
                      {stations.photos?.desc || "A cozy collection of polaroid captures and memories."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] font-mono text-amber-800">
                    <span>Nodu · Open</span>
                    <span>{stations.photos?.stationLabel || "STATION #04"}</span>
                  </div>
                </motion.div>
              )}

              {/* Polaroids Scrapbook */}
              {sections.littleThings !== false && (
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playPaperFlip();
                    onSelectStation('little-things');
                  }}
                  className="cursor-pointer p-5 rounded-3xl bg-pink-50/90 border border-pink-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl group-hover:rotate-6 transition-transform">💌</span>
                      <span className="text-[9px] font-mono font-bold text-pink-800 uppercase px-2 py-0.5 rounded-full bg-pink-200/60">
                        {stations.littleThings?.tag || "NENAPUGALU 💌"}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-stone-900 text-base group-hover:text-pink-900">
                      {stations.littleThings?.title || "Little Things · Sanna Nenapugalu"}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-sans">
                      {stations.littleThings?.desc || "Flippable 3D memory snapshots with handwritten notes."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-pink-200/60 flex items-center justify-between text-[10px] font-mono text-pink-800">
                    <span>Flip maadi nodu</span>
                    <span>{stations.littleThings?.stationLabel || "STATION #05"}</span>
                  </div>
                </motion.div>
              )}

              {/* The Starlight Letter */}
              {sections.personalMessage !== false && (
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playChime(523.25);
                    onSelectStation('heart');
                  }}
                  className="cursor-pointer p-5 rounded-3xl bg-indigo-50/90 border border-indigo-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
                      <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase px-2 py-0.5 rounded-full bg-indigo-200/60">
                        {stations.personalMessage?.tag || "KAGADHA ✉️"}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-stone-900 text-base group-hover:text-indigo-900">
                      {stations.personalMessage?.title || "Starlight Letter · Ondu Chikka Kagadha"}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-sans">
                      {stations.personalMessage?.desc || "Quiet thoughts, genuine appreciation & Sandeep's signature."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-indigo-200/60 flex items-center justify-between text-[10px] font-mono text-indigo-800">
                    <span>Open maadu</span>
                    <span>{stations.personalMessage?.stationLabel || "STATION #06"}</span>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
