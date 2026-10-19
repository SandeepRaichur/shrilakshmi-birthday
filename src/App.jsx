import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingHero from './components/LandingHero';
import Navbar from './components/Navbar';
import GardenSection from './components/GardenSection';
import ArcadeSection from './components/ArcadeSection';
import LittleThingsSection from './components/LittleThingsSection';
import AboutShrilakshmiSection from './components/AboutShrilakshmiSection';
import PhotosSection from './components/PhotosSection';
import HeartSection from './components/HeartSection';
import FinalScreen from './components/FinalScreen';
import SecretModal from './components/SecretModal';
import BadgesModal from './components/BadgesModal';
import SecretEasterEgg from './components/SecretEasterEgg';
import FloatingDecor from './components/FloatingDecor';
import CursorSparkles from './components/CursorSparkles';
import SurpriseToast from './components/SurpriseToast';
import CozyDeskScene from './components/cozy/CozyDeskScene';
import FloatingDock from './components/dock/FloatingDock';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { registerVisit, getDiscoveries, addDiscovery } from './utils/storage';
import { playSparkle, playPop, playChime } from './utils/audioEffects';
import { shrilakshmiContent } from './data/shrilakshmi';

export default function App() {
  const sections = shrilakshmiContent.sections || {};
  const [hasEntered, setHasEntered] = useState(false);
  const [visitInfo, setVisitInfo] = useState(null);
  const [discoveries, setDiscoveries] = useState([]);
  const [activeStation, setActiveStation] = useState('desk'); // 'desk' | 'garden' | 'arcade' | 'about-shrilakshmi' | 'little-things' | 'heart'
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'story'
  const [currentTheme, setCurrentTheme] = useState('day'); // 'day' | 'sunset' | 'night'
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Initialize visit and discoveries
  useEffect(() => {
    const info = registerVisit();
    setVisitInfo(info);
    setDiscoveries(getDiscoveries());
  }, []);

  // Show a temporary playful toast
  const triggerToast = (message, icon = '👀') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Discovery handler
  const handleDiscoveryUnlocked = (id) => {
    const { isNew, list } = addDiscovery(id);
    if (isNew) {
      setDiscoveries(list);
      playSparkle();
      if (id === 'memes') {
        triggerToast("Hey Shrilakshmi... festival calendar nodidya? Devi na neenu? 😂", '🪔');
      } else {
        triggerToast('Aha Shrilakshmi... idhannu kandhidya? Super! 👀', '✨');
      }
    }
  };

  // Navigation handler
  const handleSelectStation = (stationId) => {
    setActiveStation(stationId);
    if (viewMode === 'story') {
      const elem = document.getElementById(stationId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (stationId === 'desk') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReturnToDesk = () => {
    playPop();
    setActiveStation('desk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleViewMode = () => {
    const nextMode = viewMode === 'studio' ? 'story' : 'studio';
    setViewMode(nextMode);
    triggerToast(
      nextMode === 'studio'
        ? 'Focused Studio Mode · Mane mode 🎨'
        : 'Story Scroll Mode · Full katha scroll 📜',
      '✨'
    );
  };

  // Station metadata for breadcrumb headers
  const STATION_INFO = {
    garden: { title: 'The Living Terrarium', tag: 'STATION #01 · CHIGURU & FLORA', icon: '🪴' },
    arcade: { title: 'The Pastel Arcade', tag: 'STATION #02 · 5 AATAGALU', icon: '🕹️' },
    'about-shrilakshmi': { title: 'The Shrilakshmi Dossier', tag: 'STATION #03 · DEVI & MBA LORE', icon: '🗂️' },
    photos: { title: 'The Polaroid Gallery', tag: 'STATION #04 · PHOTOS & MOMENTS', icon: '📷' },
    'little-things': { title: 'Scrapbook of Little Things', tag: 'STATION #05 · SANNA NENAPUGALU', icon: '💌' },
    heart: { title: 'The Starlight Letter', tag: 'STATION #06 · ONDU CHIKKA KAGADHA', icon: '✉️' },
  };

  return (
    <div className={`relative min-h-screen selection:bg-pastelPink-200 selection:text-stone-900 font-sans transition-colors duration-700 ${currentTheme === 'night'
        ? 'bg-gradient-to-b from-slate-950 via-[#13112b] to-slate-900 text-stone-100'
        : currentTheme === 'sunset'
          ? 'bg-gradient-to-b from-orange-50 via-rose-50/50 to-purple-50/50 text-stone-800'
          : 'bg-cream-100 text-stone-700'
      }`}>
      {/* Subtle cursor sparkles on desktop */}
      <CursorSparkles />

      {/* Ambient background gradients and floating shapes */}
      <FloatingDecor theme={currentTheme} />

      {/* Screen 1: Calm Landing Experience */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <LandingHero
            key="landing"
            visitInfo={visitInfo}
            onEnter={() => {
              setHasEntered(true);
            }}
          />
        ) : (
          /* Main Interactive Experience */
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen pb-28"
          >
            {/* Top Minimal Navigation Bar */}
            <Navbar
              activeSection={activeStation}
              onNavigate={handleSelectStation}
              discoveries={discoveries}
              onOpenSecret={() => setIsSecretOpen(true)}
              onOpenBadges={() => setIsBadgesOpen(true)}
            />

            {/* Main Stage Canvas */}
            <main className="flex-1 w-full flex flex-col items-center">

              {/* STUDIO VIEW: Focused Station Mode (Zero Boring Scroll!) */}
              {viewMode === 'studio' ? (
                <div className="w-full flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    {activeStation === 'desk' ? (
                      /* The Interactive 2.5D Cozy Studio Desk */
                      <motion.div
                        key="station-desk"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex justify-center"
                      >
                        <CozyDeskScene
                          onSelectStation={handleSelectStation}
                          onOpenSecret={() => setIsSecretOpen(true)}
                          onOpenBadges={() => setIsBadgesOpen(true)}
                          currentTheme={currentTheme}
                          onChangeTheme={(theme) => setCurrentTheme(theme)}
                          discoveries={discoveries}
                        />
                      </motion.div>
                    ) : (
                      /* Dedicated Stage Frame for selected Station */
                      <motion.div
                        key={`stage-${activeStation}`}
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -20 }}
                        transition={{ duration: 0.45 }}
                        className="w-full max-w-5xl mx-auto px-4 pt-4 flex flex-col items-center"
                      >
                        {/* Stage Top Navigation Bar with Return to Desk */}
                        <div className="w-full max-w-4xl flex items-center justify-between py-3 px-5 mb-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/60 dark:border-stone-800 shadow-2xs">
                          <button
                            onClick={handleReturnToDesk}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white transition-colors group"
                          >
                            <ArrowLeft className="w-4 h-4 text-purple-600 group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Cozy Desk · manege banni 🏠</span>
                          </button>

                          {STATION_INFO[activeStation] && (
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
                              <span>{STATION_INFO[activeStation].icon}</span>
                              <span className="hidden sm:inline">{STATION_INFO[activeStation].tag}</span>
                            </div>
                          )}
                        </div>

                        {/* Station Component Content */}
                        {activeStation === 'garden' && sections.garden !== false && (
                          <GardenSection onDiscoveryUnlocked={handleDiscoveryUnlocked} />
                        )}

                        {activeStation === 'arcade' && sections.games !== false && (
                          <ArcadeSection
                            onDiscoveryUnlocked={handleDiscoveryUnlocked}
                            discoveries={discoveries}
                          />
                        )}

                        {activeStation === 'about-shrilakshmi' && sections.memes !== false && (
                          <AboutShrilakshmiSection onDiscoveryUnlocked={handleDiscoveryUnlocked} />
                        )}

                        {activeStation === 'photos' && sections.photos !== false && (
                          <PhotosSection />
                        )}

                        {activeStation === 'little-things' && sections.littleThings !== false && (
                          <LittleThingsSection />
                        )}

                        {activeStation === 'heart' && sections.personalMessage !== false && (
                          <div className="w-full flex flex-col items-center">
                            <HeartSection />
                            <FinalScreen onScrollToTop={handleReturnToDesk} />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* STORY SCROLL MODE: Continuous seamless layout */
                <div className="w-full flex flex-col items-center">
                  <CozyDeskScene
                    onSelectStation={handleSelectStation}
                    onOpenSecret={() => setIsSecretOpen(true)}
                    onOpenBadges={() => setIsBadgesOpen(true)}
                    currentTheme={currentTheme}
                    onChangeTheme={(theme) => setCurrentTheme(theme)}
                    discoveries={discoveries}
                  />
                  {sections.garden !== false && <GardenSection onDiscoveryUnlocked={handleDiscoveryUnlocked} />}
                  {sections.games !== false && (
                    <ArcadeSection
                      onDiscoveryUnlocked={handleDiscoveryUnlocked}
                      discoveries={discoveries}
                    />
                  )}
                  {sections.memes !== false && <AboutShrilakshmiSection onDiscoveryUnlocked={handleDiscoveryUnlocked} />}
                  {sections.photos !== false && <PhotosSection />}
                  {sections.littleThings !== false && <LittleThingsSection />}
                  {sections.personalMessage !== false && <HeartSection />}
                  <FinalScreen onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                </div>
              )}
            </main>

            {/* Bottom Floating Glass Dock */}
            <FloatingDock
              activeStation={activeStation}
              onSelectStation={handleSelectStation}
              viewMode={viewMode}
              onToggleViewMode={handleToggleViewMode}
              discoveries={discoveries}
              onOpenBadges={() => setIsBadgesOpen(true)}
              onOpenSecret={() => setIsSecretOpen(true)}
            />

            {/* Tiny Easter Egg Star in the Corner */}
            {sections.secretMessage !== false && (
              <>
                <SecretEasterEgg onTriggerSecret={() => setIsSecretOpen(true)} />
                <SecretModal
                  isOpen={isSecretOpen}
                  onClose={() => setIsSecretOpen(false)}
                  onUnlocked={handleDiscoveryUnlocked}
                />
              </>
            )}

            {/* Badges Progress Modal */}
            <BadgesModal
              isOpen={isBadgesOpen}
              onClose={() => setIsBadgesOpen(false)}
              discoveries={discoveries}
            />

            {/* Playful Surprise Toast */}
            <SurpriseToast toast={toast} onDismiss={() => setToast(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
