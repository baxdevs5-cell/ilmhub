import React from 'react';
import { Language } from '../types';
import { ArrowUp, Send, Youtube, Github, Instagram, Twitter, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', labelUz: 'Bosh sahifa', labelEn: 'Home' },
    { id: 'subjects', labelUz: 'Fanlar', labelEn: 'Subjects' },
    { id: 'tests', labelUz: 'Testlar', labelEn: 'Tests' },
    { id: 'leaderboard', labelUz: 'Reyting', labelEn: 'Leaderboard' },
    { id: 'about', labelUz: 'Platforma haqida', labelEn: 'About' },
  ];

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#040612]/90 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🚀 ILMHUB
              </span>
            </div>

            <p className="text-lg font-display font-semibold text-cyan-400 mb-3">
              «Bilim — kelajak kaliti.»
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              {language === 'uz'
                ? 'Har bir inson oʻz salohiyatini kashf qilishga loyiq. Ilm olamining eng ilgʻor test platformasiga xush kelibsiz.'
                : 'Every mind deserves the universe of knowledge. Welcome to the premier cosmic educational testing ground.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Send className="w-4 h-4" />, href: '#', label: 'Telegram' },
                { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
                { icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
                { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
                { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition-all shadow-inner"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-widest mb-4">
              {language === 'uz' ? 'BOʻLIMLAR' : 'SECTIONS'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigate(link.id);
                    }}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {language === 'uz' ? link.labelUz : link.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Support */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-widest mb-4">
              {language === 'uz' ? 'BOGʻLANISH' : 'CONTACT'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="block text-slate-500">Email:</span>
                <span className="text-slate-300 font-mono">support@ilmhub.uz</span>
              </li>
              <li>
                <span className="block text-slate-500">Telegram:</span>
                <span className="text-cyan-400 font-mono">@ilmhub_support</span>
              </li>
              <li>
                <span className="block text-slate-500">{language === 'uz' ? 'Manzil:' : 'Location:'}</span>
                <span className="text-slate-300">Toshkent, Oʻzbekiston</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ILMHUB. Barcha huquqlar himoyalangan.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono transition-colors cursor-pointer"
          >
            <span>{language === 'uz' ? 'Yuqoriga qaytish' : 'Back to Top'}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
