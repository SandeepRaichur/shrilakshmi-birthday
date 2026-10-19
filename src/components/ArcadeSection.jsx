import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import ShrilakshmiAlgorithm from './arcade/ShrilakshmiAlgorithm';
import MemoryHunt from './arcade/MemoryHunt';
import MakeHerLaugh from './arcade/MakeHerLaugh';
import CatchCompliments from './arcade/CatchCompliments';
import StarCatcher from './arcade/StarCatcher';
import { playCartridgeClick, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

const GAMES_LIST = [
  {
    id: 'algo',
    number: '01',
    title: 'The Algorithm',
    kannadaTitle: '11:47 PM Quiz',
    desc: 'An investigative personality audit of nocturnal habits and voice note diplomacy.',
    component: ShrilakshmiAlgorithm,
    discoveryKey: 'arcade_algo',
  },
  {
    id: 'memory',
    number: '02',
    title: 'Memory Hunt',
    kannadaTitle: 'Hudukodu',
    desc: 'Locate 6 hidden objects quietly tucked away in the cozy studio corners.',
    component: MemoryHunt,
    discoveryKey: 'arcade_memory',
  },
  {
    id: 'laugh',
    number: '03',
    title: 'Make Her Laugh',
    kannadaTitle: 'Nagisodu',
    desc: 'Test your comedic endurance against an unyielding digital poker face.',
    component: MakeHerLaugh,
    discoveryKey: 'arcade_laugh',
  },
  {
    id: 'compliments',
    number: '04',
    title: 'Compliment Catch',
    kannadaTitle: 'Catch Maadu',
    desc: 'Collect genuine friendship affirmations while dodging chaotic roasts.',
    component: CatchCompliments,
    discoveryKey: 'arcade_compliments',
  },
  {
    id: 'stars',
    number: '05',
    title: 'Star Catcher',
    kannadaTitle: 'Nakshatra',
    desc: 'Connect eight celestial coordinates to form the S constellation.',
    component: StarCatcher,
    discoveryKey: 'arcade_stars',
  },
];

export default function ArcadeSection({ onDiscoveryUnlocked, discoveries = [] }) {
  const [activeGameId, setActiveGameId] = useState('algo');
  const [isSwitching, setIsSwitching] = useState(false);

  const activeGame = GAMES_LIST.find((g) => g.id === activeGameId) || GAMES_LIST[0];
  const ActiveGameComponent = activeGame.component;

  const handleSelectGame = (id) => {
    if (id === activeGameId) return;
    playCartridgeClick();
    setIsSwitching(true);
    setActiveGameId(id);
    setTimeout(() => {
      setIsSwitching(false);
    }, 280);
  };

  const gamesHeader = shrilakshmiContent.games?.header || {};

  return (
    <section id="games" className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-28 select-none border-b border-paper-border">
      
      {/* -----------------------------------------------------------------------
          EDITORIAL HEADER
          ----------------------------------------------------------------------- */}
      <div className="pb-8 border-b border-paper-border">
        <span className="editorial-label text-muted-text">
          {gamesHeader.badge || "02 — QUESTIONABLE ACTIVITIES"}
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-ink mt-2 leading-[0.95]">
          things to do<br />
          <span className="italic font-normal">instead of being productive.</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-text uppercase mt-3">
          {gamesHeader.caption || "A SMALL COLLECTION OF QUESTIONABLE ACTIVITIES."}
        </p>
      </div>

      {/* -----------------------------------------------------------------------
          HORIZONTAL GAME SELECTOR / CATALOGUE
          ----------------------------------------------------------------------- */}
      <div className="my-8 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {GAMES_LIST.map((game) => {
          const isActive = game.id === activeGameId;
          const isUnlocked = discoveries.includes(game.discoveryKey);

          return (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game.id)}
              className={`p-3.5 rounded-sm border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] ${
                isActive
                  ? 'border-ink bg-ink text-paper shadow-2xs'
                  : 'border-paper-border bg-paper/50 text-ink hover:border-ink/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={isActive ? 'text-chartreuse font-bold' : 'text-muted-text'}>
                  {game.number}
                </span>
                {isUnlocked && (
                  <CheckCircle2 className={`w-3 h-3 ${isActive ? 'text-chartreuse' : 'text-olive'}`} />
                )}
              </div>

              <div>
                <p className={`text-sm sm:text-base font-serif leading-tight mt-1 ${isActive ? 'font-bold italic' : ''}`}>
                  {game.title}
                </p>
                <p className={`text-[10px] font-mono mt-0.5 truncate ${isActive ? 'text-paper/70' : 'text-muted-text'}`}>
                  {game.kannadaTitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* -----------------------------------------------------------------------
          FOCUSED PLAY AREA FRAME
          ----------------------------------------------------------------------- */}
      <div className="w-full rounded-sm border border-paper-border bg-paper/70 p-4 sm:p-8 shadow-2xs">
        
        {/* Game Stage Top Info Bar */}
        <div className="pb-4 mb-6 border-b border-paper-border flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-olive font-semibold">
              ACTIVITY {activeGame.number}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-ink mt-0.5">
              {activeGame.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-text font-sans max-w-sm">
            {activeGame.desc}
          </p>
        </div>

        {/* Active Mini-Game Container */}
        <div className="w-full flex justify-center">
          <AnimatePresence mode="wait">
            {!isSwitching && (
              <motion.div
                key={activeGame.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="w-full"
              >
                <ActiveGameComponent
                  onDiscoveryUnlocked={onDiscoveryUnlocked}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footnote */}
      <div className="pt-6 mt-4 flex items-center justify-between text-[11px] font-mono text-muted-text">
        <span>INTERACTIVE ARCADE ARCHIVE</span>
        <span>5 ACTIVITIES AVAILABLE</span>
      </div>
    </section>
  );
}
