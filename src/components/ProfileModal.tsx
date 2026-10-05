import React, { useState } from 'react';
import { Language, TestResult } from '../types';
import { User, X, Award, CheckCircle, Flame, Star, Edit3, Shield, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  userName: string;
  onUpdateUserName: (name: string) => void;
  testHistory: TestResult[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  language,
  userName,
  onUpdateUserName,
  testHistory,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  if (!isOpen) return null;

  const totalPoints = testHistory.reduce((acc, curr) => acc + curr.score, 1200);
  const totalCompleted = testHistory.length;
  const avgAccuracy =
    testHistory.length > 0
      ? Math.round(
          testHistory.reduce((acc, curr) => acc + curr.percentage, 0) / testHistory.length
        )
      : 92;

  const badges = [
    {
      id: 'b1',
      titleUz: 'Ilk Parvoz',
      titleEn: 'First Flight',
      icon: '🚀',
      unlocked: true,
      descUz: 'ILMHUB platformasidagi ilk testni muvaffaqiyatli yakunladi.',
      descEn: 'Completed initial diagnostic assessment.',
    },
    {
      id: 'b2',
      titleUz: 'Aniq Fanlar Ustasi',
      titleEn: 'STEM Master',
      icon: '📐',
      unlocked: totalCompleted >= 1,
      descUz: 'Matematika yoki fizika boʻyicha yuqori ball oldi.',
      descEn: 'Achieved high marks in exact sciences.',
    },
    {
      id: 'b3',
      titleUz: 'Galaktika Grossmeysteri',
      titleEn: 'Cosmic Grandmaster',
      icon: '👑',
      unlocked: totalPoints >= 2000,
      descUz: '2000 dan ortiq umumiy intellektual ball toʻpladi.',
      descEn: 'Surpassed 2,000 total academic points.',
    },
  ];

  const handleSaveName = () => {
    sound.playClick();
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-cyan-400/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-display font-bold text-white">
              {language === 'uz' ? 'Talaba Profili va Yutuqlari' : 'Student Academic Dossier'}
            </h3>
          </div>
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* User Profile Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-cyan-500/30 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              👨‍🚀
            </div>

            <div className="flex-1">
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-400 text-sm text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1.5 bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                  >
                    Saqlash
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-display font-bold text-white">{userName}</h4>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setEditing(true);
                    }}
                    className="p-1 text-slate-400 hover:text-cyan-300"
                    title="Ismni tahrirlash"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <span className="text-xs font-mono text-cyan-300 block">
                {language === 'uz' ? 'Daraja: Fazoviy Izlanuvchi (Lv. 4)' : 'Rank: Stellar Explorer (Lv. 4)'}
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-mono block">
                {language === 'uz' ? 'Umumiy Ball' : 'XP Points'}
              </span>
              <span className="text-xl font-display font-bold text-cyan-400 font-mono-numbers">
                {totalPoints}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-mono block">
                {language === 'uz' ? 'Testlar' : 'Tests'}
              </span>
              <span className="text-xl font-display font-bold text-white font-mono-numbers">
                {totalCompleted}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-mono block">
                {language === 'uz' ? 'Aniqlik' : 'Accuracy'}
              </span>
              <span className="text-xl font-display font-bold text-emerald-400 font-mono-numbers">
                {avgAccuracy}%
              </span>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              {language === 'uz' ? 'KOINOT NISHONLARI VA YUTUQLAR' : 'INSIGNIAS & BADGES'}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    b.unlocked
                      ? 'bg-slate-900/80 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-1">{b.icon}</div>
                  <h6 className="text-xs font-display font-bold text-white">
                    {language === 'uz' ? b.titleUz : b.titleEn}
                  </h6>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                    {language === 'uz' ? b.descUz : b.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assessment Records */}
          <div>
            <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              {language === 'uz' ? 'SOʻNGGI TOPSHIRILGAN TESTLAR' : 'RECENT COMPLETED TESTS'}
            </h5>
            {testHistory.length > 0 ? (
              <div className="space-y-2">
                {testHistory.slice(-4).reverse().map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{rec.subjectTitle}</span>
                      <span className="text-slate-400 text-[10px]">
                        {new Date(rec.completedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-bold text-cyan-400 font-mono-numbers">
                        {rec.percentage}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {rec.correctAnswers}/{rec.totalQuestions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4 bg-slate-900/40 rounded-xl border border-slate-800">
                {language === 'uz'
                  ? 'Hozircha testlar topshirilmagan. Biror fanni tanlab testni boshlang!'
                  : 'No test records yet. Start an assessment to record your progress!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
