import React, { useState } from 'react';
import { SOLAR_SYSTEM_PLANETS } from '../data/subjects';
import { Language } from '../types';
import { X, Sparkles, Compass, Rocket, Globe, Info } from 'lucide-react';
import { sound } from '../utils/audio';

interface OrreryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLaunchSubjectTest: (subjectId: string) => void;
  initialPlanetId?: string;
}

export const OrreryModal: React.FC<OrreryModalProps> = ({
  isOpen,
  onClose,
  language,
  onLaunchSubjectTest,
  initialPlanetId = 'earth',
}) => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>(initialPlanetId);

  if (!isOpen) return null;

  const currentPlanet =
    SOLAR_SYSTEM_PLANETS.find((p) => p.id === selectedPlanetId) || SOLAR_SYSTEM_PLANETS[3];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                {language === 'uz' ? 'Quyosh Tizimi Sayohati' : 'Solar System Observatory'}
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                {language === 'uz' ? 'Interaktiv Koinot Modeli' : 'Interactive Celestial Orrery'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Planet Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto p-3 sm:p-4 bg-slate-950/60 border-b border-slate-800/80 scrollbar-none">
          {SOLAR_SYSTEM_PLANETS.map((planet) => {
            const isSelected = planet.id === selectedPlanetId;
            return (
              <button
                key={planet.id}
                onClick={() => {
                  sound.playSelect();
                  setSelectedPlanetId(planet.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/25 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: planet.color }}
                />
                <span>{language === 'uz' ? planet.nameUz : planet.name}</span>
              </button>
            );
          })}
        </div>

        {/* Planet Showcase Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Planet Representation */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                {/* Orbital aura ring */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin"
                  style={{ animationDuration: '40s' }}
                />

                {/* Planet Body */}
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-2xl relative flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${currentPlanet.color} 40%, #030712 100%)`,
                    boxShadow: `0 0 50px ${currentPlanet.color}55, inset 0 0 30px rgba(0,0,0,0.8)`,
                  }}
                >
                  {/* Saturn's Ring graphic */}
                  {currentPlanet.hasRings && (
                    <div
                      className="absolute w-64 h-16 rounded-full border-4 border-yellow-300/60 transform -rotate-12 pointer-events-none shadow-[0_0_20px_rgba(253,224,71,0.5)]"
                      style={{ borderStyle: 'double', borderWidth: '6px' }}
                    />
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-mono text-cyan-400">
                  {language === 'uz' ? 'Quyoshdan masofa:' : 'Solar Distance:'}{' '}
                  <strong className="text-white font-mono-numbers">
                    {currentPlanet.distanceFromSun}
                  </strong>
                </span>
              </div>
            </div>

            {/* Scientific Telemetry & Facts */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {language === 'uz' ? 'SAMOVIY JISM' : 'CELESTIAL BODY'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                  {language === 'uz' ? currentPlanet.nameUz : currentPlanet.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {language === 'uz' ? currentPlanet.factsUz : currentPlanet.factsEn}
              </p>

              {/* Data Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    {language === 'uz' ? 'Diametr' : 'Diameter'}
                  </span>
                  <span className="text-sm font-bold text-white font-mono-numbers">
                    {currentPlanet.diameter}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    {language === 'uz' ? 'Tegishli Fan' : 'Subject Field'}
                  </span>
                  <span className="text-sm font-bold text-cyan-300 capitalize">
                    {currentPlanet.subjectAffinity}
                  </span>
                </div>
              </div>

              {/* Quiz Link Action */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                    onLaunchSubjectTest(currentPlanet.subjectAffinity);
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-display font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-slate-950" />
                  <span>
                    {language === 'uz'
                      ? `"${currentPlanet.nameUz}" boʻyicha testni boshlash`
                      : `Launch Test on this Celestial Realm`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
