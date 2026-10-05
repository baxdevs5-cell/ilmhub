import React, { useState } from 'react';
import { LeaderboardUser, Language } from '../types';
import { Trophy, Medal, Flame, CheckCircle, Search, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface LeaderboardSectionProps {
  users: LeaderboardUser[];
  language: Language;
  currentUserName: string;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  users,
  language,
  currentUserName,
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'month' | 'today'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const top3 = users.slice(0, 3);
  const remaining = users.slice(3).filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="leaderboard" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'uz' ? 'PESHQADAMLAR ROʻYXATI' : 'GALACTIC LEADERBOARD'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
            {language === 'uz' ? 'Eng Kuchli Oʻquvchilar' : 'Top Performing Students'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'uz'
              ? 'Muntazam test topshirib, oʻz bilimingizni yuksaltiring va koinot peshqadami unvoniga ega boʻling.'
              : 'Earn XP, master questions with high precision, and climb the interplanetary leaderboard.'}
          </p>

          {/* Period Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', labelUz: 'Barcha Vaqt', labelEn: 'All Time' },
              { id: 'month', labelUz: 'Shu Oy', labelEn: 'This Month' },
              { id: 'today', labelUz: 'Bugun', labelEn: 'Today' },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => {
                  sound.playClick();
                  setFilterPeriod(period.id as 'all' | 'month' | 'today');
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterPeriod === period.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {language === 'uz' ? period.labelUz : period.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 items-end">
          {/* Rank 2 - Silver */}
          {top3[1] && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-400/30 text-center relative order-2 md:order-1 transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-slate-400/20 border border-slate-300 text-slate-200 font-display font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <div className="text-4xl mb-2">{top3[1].avatar}</div>
              <h3 className="font-display font-bold text-lg text-white truncate px-2">{top3[1].name}</h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                {language === 'uz' ? top3[1].badgeUz : top3[1].badge}
              </p>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Ball' : 'Score'}
                  </span>
                  <span className="text-cyan-300 font-bold font-mono-numbers text-base">
                    {top3[1].score}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Testlar' : 'Tests'}
                  </span>
                  <span className="text-white font-bold font-mono-numbers text-base">
                    {top3[1].completedTests}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 1 - Gold (Elevated Center Card) */}
          {top3[0] && (
            <div className="glass-panel p-8 rounded-3xl border-2 border-amber-400/60 text-center relative order-1 md:order-2 md:-translate-y-4 shadow-[0_0_40px_rgba(251,191,36,0.25)] transition-all duration-300 hover:border-amber-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-display font-extrabold text-[11px] tracking-wider uppercase shadow-[0_0_15px_rgba(251,191,36,0.6)] flex items-center gap-1">
                <span>👑 1-OʻRIN</span>
              </div>

              <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 font-display font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                1
              </div>
              <div className="text-5xl mb-2">{top3[0].avatar}</div>
              <h3 className="font-display font-bold text-xl text-white truncate px-2">{top3[0].name}</h3>
              <p className="text-xs text-amber-300 font-mono mb-6">
                {language === 'uz' ? top3[0].badgeUz : top3[0].badge}
              </p>

              <div className="pt-4 border-t border-amber-500/30 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Ball' : 'Score'}
                  </span>
                  <span className="text-amber-300 font-bold font-mono-numbers text-xl">
                    {top3[0].score}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Aniqlik' : 'Accuracy'}
                  </span>
                  <span className="text-emerald-400 font-bold font-mono-numbers text-xl">
                    {top3[0].accuracy}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 - Bronze */}
          {top3[2] && (
            <div className="glass-panel p-6 rounded-3xl border border-amber-700/40 text-center relative order-3 transition-all duration-300 hover:-translate-y-2 hover:border-amber-600 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-amber-700/20 border border-amber-600 text-amber-400 font-display font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <div className="text-4xl mb-2">{top3[2].avatar}</div>
              <h3 className="font-display font-bold text-lg text-white truncate px-2">{top3[2].name}</h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                {language === 'uz' ? top3[2].badgeUz : top3[2].badge}
              </p>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Ball' : 'Score'}
                  </span>
                  <span className="text-cyan-300 font-bold font-mono-numbers text-base">
                    {top3[2].score}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'uz' ? 'Testlar' : 'Tests'}
                  </span>
                  <span className="text-white font-bold font-mono-numbers text-base">
                    {top3[2].completedTests}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search for ranking */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-end">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={language === 'uz' ? 'Talabani izlash...' : 'Search student...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Detailed Leaderboard Table */}
        <div className="glass-panel rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <div className="divide-y divide-slate-800/80">
            {remaining.map((user) => {
              const isCurrentUser =
                user.isCurrentUser || user.name.toLowerCase() === currentUserName.toLowerCase();

              return (
                <div
                  key={user.id}
                  className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                    isCurrentUser
                      ? 'bg-cyan-950/40 border-l-4 border-l-cyan-400'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-mono font-bold text-sm text-slate-400">
                      #{user.rank}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-white text-sm sm:text-base">
                          {user.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                            {language === 'uz' ? 'Siz' : 'You'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {language === 'uz' ? user.badgeUz : user.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div className="hidden sm:block">
                      <span className="text-xs text-slate-400 block font-mono">
                        {language === 'uz' ? 'Yakunlangan' : 'Completed'}
                      </span>
                      <span className="text-sm font-semibold text-slate-200 font-mono-numbers">
                        {user.completedTests} {language === 'uz' ? 'test' : 'tests'}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block font-mono">
                        {language === 'uz' ? 'Umumiy Ball' : 'Points'}
                      </span>
                      <span className="text-base sm:text-lg font-display font-bold text-cyan-400 font-mono-numbers">
                        {user.score}
                      </span>
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
};
