/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SubjectsSection } from './components/SubjectsSection';
import { TestView } from './components/TestView';
import { ResultsView } from './components/ResultsView';
import { LeaderboardSection } from './components/LeaderboardSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { OrreryModal } from './components/OrreryModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';

import { SUBJECTS, QUESTIONS_DATABASE } from './data/subjects';
import { INITIAL_LEADERBOARD } from './data/leaderboard';
import { Subject, Language, TestResult, Question, LeaderboardUser } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [language, setLanguage] = useState<Language>('uz');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [studentName, setStudentName] = useState<string>('Jasur Olimov');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Active testing state
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[] | null>(null);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);

  // Modals state
  const [orreryOpen, setOrreryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');

  // Start a test for a given subject
  const handleSelectSubject = (subject: Subject) => {
    sound.playClick();
    const qList = QUESTIONS_DATABASE[subject.id] || QUESTIONS_DATABASE['math'];
    setActiveSubject(subject);
    setCurrentQuestions(qList);
    setLatestResult(null);
    setCurrentTab('in-test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch test from subject id string (e.g. from planet click)
  const handleLaunchById = (subjectId: string) => {
    const sub = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];
    handleSelectSubject(sub);
  };

  // When test finishes
  const handleFinishTest = (result: TestResult) => {
    setLatestResult(result);
    setTestHistory((prev) => [...prev, result]);
    setCurrentTab('results');

    // Update leaderboard with user's score
    setLeaderboard((prev) => {
      const userExists = prev.some((u) => u.name === studentName);
      if (userExists) {
        return prev.map((u) =>
          u.name === studentName
            ? {
                ...u,
                score: u.score + result.score,
                completedTests: u.completedTests + 1,
              }
            : u
        );
      } else {
        const newUser: LeaderboardUser = {
          id: 'user_me',
          name: studentName,
          avatar: '👨‍🚀',
          score: 1200 + result.score,
          completedTests: 1,
          accuracy: result.percentage,
          rank: prev.length + 1,
          badge: 'Stellar Explorer',
          badgeUz: 'Fazoviy Izlanuvchi',
          isCurrentUser: true,
        };
        return [...prev, newUser].sort((a, b) => b.score - a.score).map((u, i) => ({ ...u, rank: i + 1 }));
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAgain = () => {
    if (activeSubject) {
      handleSelectSubject(activeSubject);
    } else {
      handleSelectSubject(SUBJECTS[0]);
    }
  };

  const handleBackToTests = () => {
    setActiveSubject(null);
    setCurrentQuestions(null);
    setCurrentTab('subjects');
    const el = document.getElementById('subjects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(tab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlanetClickedOnBackground = (planetId: string) => {
    setSelectedPlanetId(planetId);
    setOrreryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050713] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive Cosmic Background with layered solar system and dynamic stars */}
      <CosmicBackground onSelectPlanet={handlePlanetClickedOnBackground} />

      {/* Futuristic Transparent Glass Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenOrrery={() => setOrreryOpen(true)}
        userStats={{
          name: studentName,
          score: testHistory.reduce((a, b) => a + b.score, 1200),
          completedCount: testHistory.length,
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {currentTab === 'in-test' && activeSubject && currentQuestions ? (
          <TestView
            subject={activeSubject}
            questions={currentQuestions}
            language={language}
            onFinishTest={handleFinishTest}
            onExitTest={handleBackToTests}
          />
        ) : currentTab === 'results' && latestResult && currentQuestions ? (
          <ResultsView
            result={latestResult}
            questions={currentQuestions}
            language={language}
            studentName={studentName}
            onTryAgain={handleTryAgain}
            onBackToTests={handleBackToTests}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              language={language}
              onStartTest={() => {
                const el = document.getElementById('subjects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleSelectSubject(SUBJECTS[0]);
              }}
              onExploreSubjects={() => {
                const el = document.getElementById('subjects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenOrrery={() => setOrreryOpen(true)}
            />

            {/* Subjects Grid Section */}
            <SubjectsSection
              subjects={SUBJECTS}
              language={language}
              onSelectSubject={handleSelectSubject}
            />

            {/* Leaderboard Section */}
            <LeaderboardSection
              users={leaderboard}
              language={language}
              currentUserName={studentName}
            />

            {/* About Platform Section */}
            <AboutSection language={language} />
          </>
        )}
      </main>

      {/* Futuristic Footer */}
      <Footer language={language} onNavigate={handleNavigate} />

      {/* Solar System Orrery Explorer Modal */}
      <OrreryModal
        isOpen={orreryOpen}
        onClose={() => setOrreryOpen(false)}
        language={language}
        onLaunchSubjectTest={handleLaunchById}
        initialPlanetId={selectedPlanetId}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        subjects={SUBJECTS}
        language={language}
        onSelectSubject={handleSelectSubject}
      />

      {/* Student Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        language={language}
        userName={studentName}
        onUpdateUserName={setStudentName}
        testHistory={testHistory}
      />
    </div>
  );
}
