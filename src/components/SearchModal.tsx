import React, { useState } from 'react';
import { Subject, Language } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  language: Language;
  onSelectSubject: (subject: Subject) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  subjects,
  language,
  onSelectSubject,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = subjects.filter((s) => {
    const title = language === 'uz' ? s.nameUz : s.name;
    const desc = language === 'uz' ? s.descriptionUz : s.description;
    return (
      title.toLowerCase().includes(query.toLowerCase()) ||
      desc.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-cyan-400/40 shadow-2xl overflow-hidden">
        {/* Search input bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'uz'
                ? 'Fan nomi yoki mavzuni qidiring (masalan: Matematika, Fizika, Koinot)...'
                : 'Search disciplines or topics (e.g. Physics, Math, Space)...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {results.length > 0 ? (
            results.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onSelectSubject(sub);
                }}
                className="w-full p-3.5 rounded-2xl glass-panel-hover flex items-center justify-between text-left border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                    {sub.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-display font-bold text-white group-hover:text-cyan-300">
                      {language === 'uz' ? sub.nameUz : sub.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {language === 'uz' ? sub.descriptionUz : sub.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{sub.questionCount} {language === 'uz' ? 'savol' : 'Q'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
              {language === 'uz'
                ? 'Hech qanday natija topilmadi.'
                : 'No matching subjects found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
