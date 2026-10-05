import React from 'react';
import { Rocket, BookOpen, Sparkles, Orbit, Compass, Trophy, BrainCircuit } from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/audio';

interface HeroProps {
  language: Language;
  onStartTest: () => void;
  onExploreSubjects: () => void;
  onOpenOrrery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onStartTest,
  onExploreSubjects,
  onOpenOrrery,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtle cosmic aura badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {language === 'uz'
                ? 'FAZOVIY TAʼLIM VA INTELLEKTUAL PLATFORMA'
                : 'NEXT-GEN COSMIC EDUCATION PLATFORM'}
            </span>
          </div>

          {/* Large Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-3">
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              ILMHUB
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-widest text-cyan-400 uppercase text-glow-cyan mb-6">
            TESTLAR MAKONI
          </h2>

          {/* Main Text */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance">
            {language === 'uz'
              ? 'Bilimingizni sinang, natijangizni kuzating va yanada rivojlaning! Har bir savol — yangi yulduzga sayohat.'
              : 'Test your knowledge, track your performance, and expand your intellect across the infinite cosmic expanse!'}
          </p>

          {/* Futuristic Glowing Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <button
              onClick={() => {
                sound.playClick();
                onStartTest();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.85)] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Rocket className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'uz' ? '🚀 TESTNI BOSHLASH' : '🚀 START TEST'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onExploreSubjects();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-semibold text-base text-cyan-300 bg-slate-900/60 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] flex items-center justify-center gap-3 cursor-pointer backdrop-blur-md"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{language === 'uz' ? '📚 FANLARNI KOʻRISH' : '📚 EXPLORE SUBJECTS'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenOrrery();
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-display font-semibold text-base text-purple-300 bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-900/50 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_25px_rgba(168,85,247,0.25)] flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Orbit className="w-5 h-5 text-purple-400" />
              <span>{language === 'uz' ? '🌌 KOINOT SAYOHATI' : '🌌 SOLAR ORRERY'}</span>
            </button>
          </div>

          {/* Floating Information Panels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 text-center relative overflow-hidden group hover:border-cyan-400/50 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1 font-mono-numbers">
                10+
              </div>
              <div className="text-xs sm:text-sm text-cyan-300 font-medium">
                {language === 'uz' ? 'Asosiy Fanlar' : 'Subjects'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {language === 'uz' ? 'Aniq va tabiiy fanlar' : 'Exact & Natural Sciences'}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-blue-500/20 text-center relative overflow-hidden group hover:border-blue-400/50 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1 font-mono-numbers">
                500+
              </div>
              <div className="text-xs sm:text-sm text-blue-300 font-medium">
                {language === 'uz' ? 'Savollar Banki' : 'Curated Questions'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {language === 'uz' ? 'Toʻliq yechimlari bilan' : 'With Explanations'}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden group hover:border-purple-400/50 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1 font-mono-numbers">
                1,000+
              </div>
              <div className="text-xs sm:text-sm text-purple-300 font-medium">
                {language === 'uz' ? 'Faol Oʻquvchilar' : 'Active Students'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {language === 'uz' ? 'Jonli reyting jadvali' : 'Live Global Ranks'}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 text-center relative overflow-hidden group hover:border-emerald-400/50 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1 font-mono-numbers">
                98.4%
              </div>
              <div className="text-xs sm:text-sm text-emerald-300 font-medium">
                {language === 'uz' ? 'Muvaffaqiyat' : 'Accuracy Rate'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {language === 'uz' ? 'Yuqori koʻrsatkich' : 'Proven Efficacy'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
