export type Language = 'uz' | 'en';

export interface Subject {
  id: string;
  name: string;
  nameUz: string;
  icon: string;
  description: string;
  descriptionUz: string;
  category: 'exact' | 'natural' | 'humanities' | 'languages';
  questionCount: number;
  color: string;
  gradient: string;
  borderColor: string;
}

export interface Question {
  id: string;
  subjectId: string;
  questionText: string;
  questionTextUz: string;
  options: string[];
  optionsUz: string[];
  correctIndex: number;
  explanation: string;
  explanationUz: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestResult {
  id: string;
  subjectId: string;
  subjectTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  completedAt: string;
  performanceLevel: string;
  performanceLevelUz: string;
  userAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  completedTests: number;
  accuracy: number;
  rank: number;
  badge: string;
  badgeUz: string;
  isCurrentUser?: boolean;
}

export interface PlanetData {
  id: string;
  name: string;
  nameUz: string;
  color: string;
  orbitRadius: number;
  size: number;
  speed: number;
  hasRings?: boolean;
  distanceFromSun: string;
  diameter: string;
  factsUz: string;
  factsEn: string;
  subjectAffinity: string;
}
