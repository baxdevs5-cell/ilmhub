import React, { useState } from 'react';
import { Search, User, Volume2, VolumeX, Menu, X, Sparkles, Orbit } from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenOrrery: () => void;
  userStats: { name: string; score: number; completedCount: number };
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  language,
  onLanguageChange,
  onOpenSearch,
  onOpenProfile,
  onOpenOrrery,
  userStats,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundEnabled(sound.enabled);
    if (sound.enabled) sound.playClick();
  };

  const navItems = [
    { id: 'home', labelUz: 'Bosh sahifa', labelEn: 'Home' },
    { id: 'subjects', labelUz: 'Fanlar', labelEn: 'Subjects' },
    { id: 'tests', labelUz: 'Testlar', labelEn: 'Tests' },
    { id: 'results', labelUz: 'Natijalar', labelEn: 'Results' },
    { id: 'leaderboard', labelUz: 'Reyting', labelEn: 'Leaderboard' },
    { id: 'about', labelUz: 'Platforma haqida', labelEn: 'About' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#050713]/80 border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            🚀 ILMHUB
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-all relative py-1 focus:outline-none whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {language === 'uz' ? item.labelUz : item.labelEn}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Orrery Universe Explorer Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenOrrery();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap"
            title="Koinot sayohati (Orrery)"
          >
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{language === 'uz' ? 'Koinot Xaritasi' : 'Universe Map'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            className="p-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20"
            title="Qidiruv (Search)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20"
            title={soundEnabled ? 'Ovozni oʻchirish' : 'Ovozni yoqish'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Language Selector */}
          <button
            onClick={() => {
              sound.playClick();
              onLanguageChange(language === 'uz' ? 'en' : 'uz');
            }}
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
            title="Tilni oʻzgartirish / Change language"
          >
            {language === 'uz' ? 'UZ' : 'EN'}
          </button>

          {/* Profile Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-cyan-500/30 hover:border-cyan-400/60 text-slate-100 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.12)] whitespace-nowrap"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xs text-cyan-300 font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline text-xs font-medium max-w-[90px] truncate">
              {userStats.name || 'Talaba'}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-cyan-500/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{language === 'uz' ? item.labelUz : item.labelEn}</span>
                {currentTab === item.id && <Sparkles className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenOrrery();
                setMobileMenuOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-sm font-medium"
            >
              <Orbit className="w-4 h-4 text-cyan-400" />
              <span>{language === 'uz' ? 'Koinot Sayohati (Orrery)' : 'Cosmic Map'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
