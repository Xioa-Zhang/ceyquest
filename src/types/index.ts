export interface Student {
  id: string;
  name: string;
  username?: string;
  grade: number;
  email?: string;
  avatar?: string;
  photo?: string;
  xpPoints: number;
  rank: number;
  subjects: string[];
  completedQuizzes: number;
  totalQuizzes: number;
  badges?: number;
  dayStreak?: number;
  schoolName?: string;
  school?: string;
}

export interface Subject {
  id: string;
  name: string;
  grade: number;
  chapters: Chapter[];
  resources: Resource[];
  icon?: string;
  color?: string;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  questions: Question[];
  isCompleted: boolean;
}

export interface Question {
  id: string;
  chapterId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'article' | 'link';
  url: string;
  description?: string;
  subjectId: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  chapterId?: string;
  questions: Question[];
  timeLimit?: number;
  totalPoints: number;
  isCompleted: boolean;
  score?: number;
}

export interface QuestionTemplate {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface LeaderboardEntry {
  student: Student;
  position: number;
  xpPoints: number;
  recentActivity: string;
  winrate?: number;
  lokalStats?: {
    wins: number;
    losses: number;
  };
}