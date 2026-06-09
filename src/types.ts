/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  streakCount: number;
  lastActive: string; // ISO date
  completedTopicsCount: number;
  bookmarkedChapterKeys: string[];
  totalScore: number;
  totalQuizzesTaken: number;
  accuracyRate: number; // percentage
  weeklyActivity: number[]; // 7 elements for Mon-Sun study hours
  achievements: Achievement[];
  bookmarkedCurrentAffairs: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  unlockedAt?: string;
  progressMax: number;
  progressCurrent: number;
}

export interface Chapter {
  id: string;
  title: string;
  tamilTitle: string;
  notes: string; // Markdown or rich formatted notes
  importantPoints: string[];
  practiceQuestions: PracticeQuestion[];
  revisionSheet: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectModule {
  id: string; // e.g. general-tamil, polity, history
  title: string;
  tamilTitle: string;
  icon: string; // Lucide icon name
  description: string;
  chapters: Chapter[];
}

export interface Quiz {
  id: string;
  title: string;
  tamilTitle: string;
  durationMinutes: number;
  questions: PracticeQuestion[];
  category: string;
}

export interface MockTest {
  id: string;
  title: string;
  year?: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: MockQuestion[];
}

export interface MockQuestion extends PracticeQuestion {
  section: "tamil" | "general_studies" | "aptitude";
}

export interface PYQPaper {
  id: string;
  year: string;
  title: string;
  totalQuestions: number;
  tamilQuestionCount: number;
  gsQuestionCount: number;
  aptitudeQuestionCount: number;
  questions: MockQuestion[];
}

export interface CurrentAffairItem {
  id: string;
  title: string;
  tamilTitle: string;
  date: string;
  content: string;
  category: "Tamil Nadu" | "National" | "International" | "Schemes" | "Sports";
  isWeekly?: boolean;
  isMonthly?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
}

export interface StudentScoreHistory {
  id: string;
  testName: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeTakenMinutes: number;
  accuracy: number;
  type: "quiz" | "mock" | "pyq";
}

export interface StudyPlan {
  id: string;
  dailyHours: number;
  weeks: number;
  focusSubjects: string[];
  weakAreas: string;
  generatedPlan: string;
  createdAt: string;
}
