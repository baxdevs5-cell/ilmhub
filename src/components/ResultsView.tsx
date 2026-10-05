import React, { useEffect, useState } from 'react';
import { TestResult, Question, Language } from '../types';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface ResultsViewProps {
  result: TestResult;
  questions: Question[];
  language: Language;
  studentName: string;
  onTryAgain: () => void;
  onBackToTests: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  questions,
  language,
  studentName,
  onTryAgain,
  onBackToTests,
}) => {
  const [showReview, setShowReview] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti if score >= 70%
    if (result.percentage >= 70) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#fbbf24'],
        });
      } catch {
        // Confetti unsupported or sandbox
      }
    }
  }, [result.percentage]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  // SVG Circular Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.percentage / 100) * circumference;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'uz' ? 'TEST NATIJALARI' : 'TEST RESULTS REPORT'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-2">
            {language === 'uz' ? 'Sinov Muvaffaqiyatli Yakunlandi!' : 'Assessment Complete!'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {language === 'uz'
              ? `Fan: ${result.subjectTitle} · ${new Date(result.completedAt).toLocaleDateString()}`
              : `Discipline: ${result.subjectTitle} · ${new Date(result.completedAt).toLocaleDateString()}`}
          </p>
        </div>

        {/* Dashboard Main Grid */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Circular Progress Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  {/* Glowing progress fill */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="url(#cyanBlueGrad)"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white font-mono-numbers tracking-tight">
                    {result.percentage}%
                  </span>
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest mt-1">
                    {language === 'uz' ? 'Aniqlik' : 'Accuracy'}
                  </span>
                </div>
              </div>

              {/* Performance Level Badge */}
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-display font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  {language === 'uz' ? result.performanceLevelUz : result.performanceLevel}
                </span>
              </div>
            </div>

            {/* Right: Metrics Statistics Breakdown */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'uz' ? 'Umumiy Ball' : 'Total Score'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white font-mono-numbers">
                  {result.score} <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'uz' ? 'Standart shkala' : 'Normalized scale'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{language === 'uz' ? 'Sarflangan Vaqt' : 'Time Elapsed'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white font-mono-numbers">
                  {formatTime(result.timeSpentSeconds)}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'uz' ? 'Oʻrtacha tezlik' : 'Pacing velocity'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'uz' ? 'Toʻgʻri Javoblar' : 'Correct'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-300 font-mono-numbers">
                  {result.correctAnswers} <span className="text-xs text-emerald-400/70">/ {result.totalQuestions}</span>
                </div>
                <p className="text-[11px] text-emerald-400/60 mt-1">
                  {language === 'uz' ? 'Muhandislik aniqligi' : 'Successful answers'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
                <div className="flex items-center gap-2 text-rose-400 text-xs mb-1">
                  <XCircle className="w-4 h-4" />
                  <span>{language === 'uz' ? 'Xato Javoblar' : 'Incorrect'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-rose-300 font-mono-numbers">
                  {result.wrongAnswers} <span className="text-xs text-rose-400/70">/ {result.totalQuestions}</span>
                </div>
                <p className="text-[11px] text-rose-400/60 mt-1">
                  {language === 'uz' ? 'Tahlil qilinadi' : 'Requires review'}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onTryAgain();
                }}
                className="px-6 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'uz' ? 'QAYTA TOPSHIRISH' : 'TRY AGAIN'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onBackToTests();
                }}
                className="px-6 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm text-cyan-300 bg-slate-900/80 border border-cyan-500/40 hover:bg-cyan-950/60 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{language === 'uz' ? 'FANLAR ROʻYXATI' : 'BACK TO TESTS'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowCertificate(true);
              }}
              className="px-5 py-3 rounded-xl font-display font-medium text-xs sm:text-sm text-purple-300 bg-purple-950/40 border border-purple-500/40 hover:bg-purple-900/50 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>{language === 'uz' ? 'Sertifikatni Koʻrish' : 'View Certificate'}</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review Accordion Toggle */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl mb-8">
          <button
            onClick={() => {
              sound.playClick();
              setShowReview(!showReview);
            }}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <div>
                <h4 className="text-base font-display font-bold text-white">
                  {language === 'uz' ? 'Savollar Tahlili va Yechimlari' : 'Detailed Question Analysis'}
                </h4>
                <p className="text-xs text-slate-400">
                  {language === 'uz'
                    ? 'Qaysi savolga qanday javob berganingizni va toʻgʻri tushuntirishlarni koʻring'
                    : 'Review each question, your answer, and the formal scientific explanation'}
                </p>
              </div>
            </div>
            {showReview ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showReview && (
            <div className="p-6 pt-0 border-t border-slate-800/80 space-y-6">
              {questions.map((q, idx) => {
                const userChoice = result.userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                const options = language === 'uz' ? q.optionsUz : q.options;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-cyan-400">
                        {language === 'uz' ? `Savol #${idx + 1}` : `Question #${idx + 1}`}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{language === 'uz' ? 'Toʻgʻri' : 'Correct'}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>{language === 'uz' ? 'Xato' : 'Incorrect'}</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-slate-100 mb-4">
                      {language === 'uz' ? q.questionTextUz : q.questionText}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {options.map((opt, oIdx) => {
                        const isChosen = userChoice === oIdx;
                        const isTheCorrectOne = q.correctIndex === oIdx;

                        let borderStyle = 'border-slate-800 bg-slate-900/40 text-slate-400';
                        if (isTheCorrectOne) {
                          borderStyle = 'border-emerald-500/50 bg-emerald-950/50 text-emerald-200 font-semibold';
                        } else if (isChosen && !isTheCorrectOne) {
                          borderStyle = 'border-rose-500/50 bg-rose-950/50 text-rose-200 line-through';
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${borderStyle}`}
                          >
                            <span>{opt}</span>
                            {isTheCorrectOne && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs leading-relaxed text-slate-300">
                      <span className="font-semibold text-cyan-300 font-mono block mb-1">
                        {language === 'uz' ? 'Ilmiy Yechim / Izoh:' : 'Explanation:'}
                      </span>
                      {language === 'uz' ? q.explanationUz : q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* High-Tech Digital Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-400/50 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="text-center pb-6 border-b border-cyan-500/20">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/60 mx-auto flex items-center justify-center text-3xl mb-3 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                🚀
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white tracking-widest uppercase">
                ILMHUB CERTIFICATE
              </h3>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mt-1">
                Koinot Ilmiy Muvaffaqiyat Sertifikati
              </p>
            </div>

            {/* Certificate Body */}
            <div className="py-6 text-center space-y-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                {language === 'uz' ? 'Mazkur sertifikat tasdiqlaydi:' : 'This certifies that:'}
              </p>
              <h4 className="text-2xl sm:text-3xl font-display font-bold text-white underline decoration-cyan-400 decoration-2 underline-offset-8">
                {studentName || 'Jasur Olimov'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed pt-2">
                {language === 'uz'
                  ? `ILMHUB platformasida "${result.subjectTitle}" fani boʻyicha sinovni ${result.percentage}% aʼlo natija bilan yakunladi va "${result.performanceLevelUz}" darajasiga sazovor boʻldi.`
                  : `Successfully completed the comprehensive assessment in "${result.subjectTitle}" with an accuracy score of ${result.percentage}%.`}
              </p>
            </div>

            {/* Certificate Footer */}
            <div className="pt-6 border-t border-cyan-500/20 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div>
                <span>ID: {result.id}</span>
                <p className="text-[10px] text-slate-500">{new Date(result.completedAt).toLocaleDateString()}</p>
              </div>

              <div className="text-right">
                <span className="text-cyan-400 font-bold block">ILMHUB ACADEMIC BOARD</span>
                <span className="text-[10px] text-slate-500">Verified On-Chain</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  sound.playClick();
                  window.print();
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-display font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:brightness-110 transition-all cursor-pointer"
              >
                {language === 'uz' ? 'Chop etish / Saqlash' : 'Print / Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
