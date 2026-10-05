import React from 'react';
import { Language } from '../types';
import { Orbit, Compass, Brain, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const pillars = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      titleUz: 'Intellektual Rivojlanish',
      titleEn: 'Cognitive Progression',
      descUz: 'Har bir test savoli oʻquvchining mantiqiy fikrlashini charxlash va fundamental bilimlarni mustahkamlash uchun ishlab chiqilgan.',
      descEn: 'Every assessment is calibrated to deepen comprehension and enhance analytical and deductive reasoning.',
    },
    {
      icon: <Orbit className="w-6 h-6 text-purple-400" />,
      titleUz: 'Fazoviy Gamifikatsiya',
      titleEn: 'Cosmic Gamification',
      descUz: 'Koinot sayyoralari, yulduzli yutuqlar va unvonlar oʻrganish jarayonini hayratlanarli sarguzashtga aylantiradi.',
      descEn: 'Planetary ranks, celestial achievement insignias, and real-time telemetry make knowledge mastery exciting.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      titleUz: 'Tezkor Tahlil va Yechimlar',
      titleEn: 'Instant Feedback & Analytics',
      descUz: 'Test tugashi bilanoq toʻliq hisobot, vaqt sarfi, foiz va batafsil ilmiy izohlar taqdim etiladi.',
      descEn: 'Immediate scoring with comprehensive question-by-question scientific rationales and temporal analysis.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      titleUz: 'Ishonchli Manbalar',
      titleEn: 'Curated Question Banks',
      descUz: 'Barcha test savollari davlat taʼlim standartlari va xalqaro olimpiada mezonlariga muvofiq tekshirilgan.',
      descEn: 'Content mapped directly against accredited educational standards and international STEM rubrics.',
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden mb-16">
          {/* Subtle cosmic illumination background */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'uz' ? 'MISSIYAMIZ VA MAQSADIMIZ' : 'OUR PURPOSE'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              ILMHUB
            </h2>

            <p className="text-xl sm:text-2xl font-display font-bold text-cyan-400 mb-6 tracking-wide">
              {language === 'uz' ? '«Bilim — kelajak kaliti.»' : '“Knowledge is the key to the future.”'}
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-8">
              {language === 'uz'
                ? 'ILMHUB is a modern educational platform designed to help students test their knowledge, improve their skills and track their progress.'
                : 'ILMHUB is a modern educational platform designed to help students test their knowledge, improve their skills and track their progress.'}
            </p>

            <div className="inline-flex items-center gap-6 text-xs sm:text-sm font-mono text-slate-400 border-t border-slate-800 pt-6">
              <span>✦ Zamonaviy Interfeys</span>
              <span aria-hidden="true">·</span>
              <span>✦ Ochiq Taʼlim</span>
              <span aria-hidden="true">·</span>
              <span>✦ 100% Bepul Sinovlar</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center mb-4 shadow-inner">
                {pillar.icon}
              </div>
              <h3 className="text-base font-display font-bold text-white mb-2">
                {language === 'uz' ? pillar.titleUz : pillar.titleEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'uz' ? pillar.descUz : pillar.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
