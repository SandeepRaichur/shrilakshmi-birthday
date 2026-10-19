import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { shrilakshmiContent } from '../../data/shrilakshmi';

export default function AcademicCatDept() {
  const { academicDept } = shrilakshmiContent;
  const steps = academicDept?.steps || [];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="academics"
      className="w-full py-20 px-4 sm:px-6 md:px-10 border-b border-paper-border bg-paper-light/50"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="border-b border-paper-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-olive font-semibold">
                CHAPTER 03 · PEER-REVIEWED INVESTIGATION
              </span>
              <span className="text-muted-text">•</span>
              <span className="font-mono text-xs text-ginger font-medium">BCA PROTOCOL</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl text-ink tracking-tight font-normal">
              "{academicDept.title}"
            </h2>
            
            <p className="text-sm sm:text-base text-muted-text font-sans">
              {academicDept.subtitle}
            </p>

            <p className="text-xs font-mono text-olive italic">
              {academicDept.kannadaAnnotation}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-chartreuse/60 text-ink font-mono text-xs font-bold rounded-full">
              {academicDept.survivalQuote}
            </span>
          </div>
        </div>

        {/* Two-Column Layout: Visual Evidence (Left) + Step Progression (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Featured Research Asset (User Photo 4.jpeg) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="bg-paper p-3.5 border border-paper-border rounded-xs shadow-xs">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-dark border border-paper-border">
                <img
                  src={academicDept.featuredStudyPhoto || "/photos/4.jpeg"}
                  alt="Student cat chewing pencil in deep thought"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                
                <div className="absolute top-3 left-3 bg-ink/90 text-paper text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                  EXHIBIT 4.2 · SUBJECT AT WORK
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-paper-border/60 text-xs font-mono space-y-1">
                <div className="flex justify-between text-muted-text">
                  <span>STUDY SESSION TIME: 02:47:12</span>
                  <span className="text-ginger font-semibold">STATUS: CRITICAL</span>
                </div>
                <p className="font-sans text-xs text-ink/80 leading-snug">
                  "Pencil currently holding the entire weight of Module 3 data structures."
                </p>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="p-4 bg-paper border-l-4 border-ginger rounded-r-xs">
              <p className="font-serif italic text-base text-ink leading-relaxed">
                "{academicDept.survivalQuote}"
              </p>
              <p className="font-mono text-[10px] text-muted-text uppercase tracking-widest mt-1">
                Final Result: Passing with flying colors & zero panic.
              </p>
            </div>
          </div>

          {/* Right Column: The 6 Steps with Editorial Sequence */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xs border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-paper border-ink shadow-sm translate-x-1'
                      : 'bg-paper/70 border-paper-border hover:border-ink/40 hover:bg-paper'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Step Number Badge */}
                    <div className="flex flex-col items-center">
                      <span className={`font-mono text-sm font-bold px-2.5 py-1 rounded-xs transition-colors ${
                        isSelected ? 'bg-ink text-paper' : 'bg-paper-dark text-ink/70'
                      }`}>
                        {item.step}
                      </span>
                      <span className="text-xl mt-2 select-none">{item.emoji}</span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl sm:text-2xl text-ink font-semibold">
                          {item.action}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ginger font-bold">
                          {item.felineState}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-muted-text leading-relaxed">
                        {item.annotation}
                      </p>

                      {isSelected && (
                        <div className="pt-2 text-xs font-mono text-olive flex items-center gap-1">
                          <span>✓</span>
                          <span>Peer-reviewed and verified by Sandeep & Shrilakshmi</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
