import React, { useState, useMemo } from 'react';
import { Subject, Language } from '../types';
import { Play, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface SubjectsSectionProps {
  subjects: Subject[];
  language: Language;
  onSelectSubject: (subject: Subject) => void;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({
  subjects,
  language,
  onSelectSubject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelUz: 'Barcha Fanlar', labelEn: 'All Subjects' },
    { id: 'exact', labelUz: 'Aniq Fanlar', labelEn: 'Exact Sciences' },
    { id: 'natural', labelUz: 'Tabiiy Fanlar', labelEn: 'Natural Sciences' },
    { id: 'humanities', labelUz: 'Ijtimoiy & Tarix', labelEn: 'Humanities' },
    { id: 'languages', labelUz: 'Tillar', labelEn: 'Languages' },
  ];

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesCategory =
        activeCategory === 'all' || subject.category === activeCategory;
      const title = language === 'uz' ? subject.nameUz : subject.name;
      const desc = language === 'uz' ? subject.descriptionUz : subject.description;
      const matchesSearch =
        searchQuery === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [subjects, activeCategory, searchQuery, language]);

  return (
    <section id="subjects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'uz' ? 'ILMIY YOʻNALISHLAR' : 'CURATED DISCIPLINES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              {language === 'uz' ? 'Fanlar va Test Toʻplamlari' : 'Knowledge Disciplines'}
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl">
              {language === 'uz'
                ? 'Oʻzingiz qiziqqan yoʻnalishni tanlang, savollarga javob bering va oʻz intellektual salohiyatingizni kashf eting.'
                : 'Select your field of interest, test comprehension with immediate feedback, and level up your cosmic rank.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'uz' ? 'Fanni qidirish...' : 'Search subjects...'}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {language === 'uz' ? cat.labelUz : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            return (
              <div
                key={subject.id}
                className="group relative rounded-2xl glass-panel p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(6,182,212,0.2)] hover:border-cyan-400/50 flex flex-col justify-between"
                style={{
                  borderColor: 'rgba(56, 189, 248, 0.18)',
                }}
              >
                {/* Glow backdrop on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Top row: Icon and Question count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-inner">
                      {subject.icon}
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-xs font-mono text-cyan-400">
                      <span className="font-semibold font-mono-numbers">
                        {subject.questionCount}
                      </span>
                      <span className="text-slate-400">
                        {language === 'uz' ? 'savol' : 'Q'}
                      </span>
                    </div>
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {language === 'uz' ? subject.nameUz : subject.name}
                  </h3>

                  {/* Subject Description */}
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-6">
                    {language === 'uz' ? subject.descriptionUz : subject.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'uz' ? 'Standart test' : 'Verified'}</span>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectSubject(subject);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-display text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-transparent transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer"
                  >
                    <span>{language === 'uz' ? 'Boshlash' : 'Start Quiz'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              {language === 'uz'
                ? 'Hech qanday fan topilmadi. Qidiruv soʻzini oʻzgartirib koʻring.'
                : 'No subjects matched your search filter.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
