import React, { useState, useEffect } from 'react';
import { Subject, Question, Language, TestResult } from '../types';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Flag,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface TestViewProps {
  subject: Subject;
  questions: Question[];
  language: Language;
  onFinishTest: (result: TestResult) => void;
  onExitTest: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  subject,
  questions,
  language,
  onFinishTest,
  onExitTest,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  const handleSelectOption = (optIdx: number) => {
    sound.playSelect();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const handleToggleFlag = () => {
    sound.playClick();
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playClick();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      sound.playClick();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const finalizeTest = () => {
    sound.playFinish();

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);
    const score = Math.round((correctCount / total) * 100);

    let performanceLevel = 'Proficient';
    let performanceLevelUz = 'Yaxshi';
    if (percentage >= 90) {
      performanceLevel = 'Master Academic';
      performanceLevelUz = 'Koinot Donishmandi (Aʼlo)';
    } else if (percentage >= 70) {
      performanceLevel = 'Advanced Explorer';
      performanceLevelUz = 'Ilgʻor Izlanuvchi (Yaxshi)';
    } else if (percentage >= 50) {
      performanceLevel = 'Developing Cadre';
      performanceLevelUz = 'Oʻrtacha (Qoniqarli)';
    } else {
      performanceLevel = 'Novice Apprentice';
      performanceLevelUz = 'Qayta tayyorgarlik talab etiladi';
    }

    const result: TestResult = {
      id: 'res_' + Date.now(),
      subjectId: subject.id,
      subjectTitle: language === 'uz' ? subject.nameUz : subject.name,
      totalQuestions: total,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      score,
      percentage,
      timeSpentSeconds: secondsElapsed,
      completedAt: new Date().toISOString(),
      performanceLevel,
      performanceLevelUz,
      userAnswers: selectedAnswers,
    };

    onFinishTest(result);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Control Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/25 mb-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onExitTest();
              }}
              className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={language === 'uz' ? 'Testdan chiqish' : 'Exit Test'}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{subject.icon}</span>
                <h2 className="text-base sm:text-lg font-display font-bold text-white">
                  {language === 'uz' ? subject.nameUz : subject.name}
                </h2>
              </div>
              <p className="text-[11px] font-mono text-cyan-400">
                {language === 'uz'
                  ? `Savol ${currentIndex + 1} / ${total}`
                  : `Question ${currentIndex + 1} of ${total}`}
              </p>
            </div>
          </div>

          {/* Timer and Flag */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                flaggedQuestions[currentIndex]
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === 'uz' ? 'Belgilash' : 'Bookmark'}
              </span>
            </button>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono font-semibold shadow-inner">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Glowing Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
            <span>
              {language === 'uz' ? 'Javob berildi:' : 'Answered:'}{' '}
              <strong className="text-cyan-400 font-mono-numbers">
                {answeredCount}/{total}
              </strong>
            </span>
            <span className="font-mono-numbers">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900/80 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Drawer Bubbles */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {questions.map((_, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined;
            const isCurrent = currentIndex === idx;
            const isFlagged = flaggedQuestions[idx];

            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-9 h-9 rounded-xl flex-shrink-0 text-xs font-mono font-bold transition-all relative cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-105'
                    : isAnswered
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-600'
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-slate-950" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Question Card */}
        {currentQ && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/25 shadow-2xl mb-8">
            {/* Question Text */}
            <div className="mb-8">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                {language === 'uz' ? `Savol #${currentIndex + 1}` : `Question #${currentIndex + 1}`}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white leading-relaxed">
                {language === 'uz' ? currentQ.questionTextUz : currentQ.questionText}
              </h3>
            </div>

            {/* Answer Choices */}
            <div className="space-y-3.5">
              {(language === 'uz' ? currentQ.optionsUz : currentQ.options).map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                const optionLetters = ['A', 'B', 'C', 'D'];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all flex items-center justify-between border cursor-pointer group ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                        : 'bg-slate-900/40 border-slate-800/90 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_#06b6d4]'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                        }`}
                      >
                        {optionLetters[optIdx]}
                      </div>
                      <span className="text-sm sm:text-base font-medium">{option}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-900/40 border-slate-800 text-slate-500'
                : 'bg-slate-900/70 border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-white cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'uz' ? 'Oldingisi' : 'Previous'}</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex < total - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                <span>{language === 'uz' ? 'Keyingisi' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}

            <button
              onClick={() => {
                sound.playClick();
                setShowConfirmFinish(true);
              }}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{language === 'uz' ? 'Testni Yakunlash' : 'Finish Test'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Finish Modal */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-400/40 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-display font-bold text-center text-white mb-2">
              {language === 'uz' ? 'Testni yakunlaysizmi?' : 'Finish this assessment?'}
            </h4>

            <p className="text-slate-300 text-center text-xs sm:text-sm mb-6 leading-relaxed">
              {language === 'uz'
                ? `Siz ${total} ta savoldan ${answeredCount} tasiga javob berdingiz. ${
                    total - answeredCount > 0
                      ? `${total - answeredCount} ta savol javobsiz qoldi.`
                      : 'Barcha savollar belgilandi!'
                  }`
                : `You have answered ${answeredCount} of ${total} questions. Ready to view your cosmic score?`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {language === 'uz' ? 'Davom etish' : 'Continue Test'}
              </button>

              <button
                onClick={() => {
                  setShowConfirmFinish(false);
                  finalizeTest();
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:brightness-110 transition-all cursor-pointer"
              >
                {language === 'uz' ? 'Ha, yakunlash' : 'Yes, Finish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
