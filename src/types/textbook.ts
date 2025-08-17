export interface Textbook {
  id: string;
  grade: number;
  subject: string;
  title: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  type: 'textbook' | 'workbook';
  language: 'english' | 'tamil' | 'sinhala';
  chapters: Chapter[];
  metadata: {
    totalPages: number;
    publishedYear?: number;
    publisher?: string;
    isbn?: string;
  };
}

export interface Chapter {
  id: string;
  textbookId: string;
  title: string;
  chapterNumber: number;
  content: string;
  objectives: string[];
  keyConcepts: string[];
  summary: string;
  questions: Question[];
  resources: Resource[];
  exercises: Exercise[];
  estimatedDuration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Question {
  id: string;
  chapterId: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  source: 'textbook' | 'workbook' | 'generated';
}

export interface Resource {
  id: string;
  chapterId: string;
  title: string;
  type: 'image' | 'diagram' | 'table' | 'formula' | 'example' | 'activity' | 'video' | 'link';
  content: string;
  filePath?: string;
  description: string;
  tags: string[];
}

export interface Exercise {
  id: string;
  chapterId: string;
  title: string;
  type: 'practice' | 'problem_solving' | 'activity' | 'project';
  description: string;
  instructions: string[];
  expectedOutcome: string;
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GradeSubject {
  grade: number;
  subjects: SubjectInfo[];
}

export interface SubjectInfo {
  name: string;
  code: string;
  textbooks: Textbook[];
  totalChapters: number;
  totalQuestions: number;
  estimatedDuration: number; // total hours
}

export interface TextbookAnalysis {
  grade: number;
  subjects: SubjectAnalysis[];
  totalTextbooks: number;
  totalChapters: number;
  totalQuestions: number;
}

export interface SubjectAnalysis {
  subject: string;
  textbooks: TextbookSummary[];
  chapters: ChapterSummary[];
  questionStats: QuestionStats;
}

export interface TextbookSummary {
  id: string;
  title: string;
  type: 'textbook' | 'workbook';
  chapters: number;
  questions: number;
  fileSize: number;
}

export interface ChapterSummary {
  id: string;
  title: string;
  questions: number;
  duration: number;
  difficulty: string;
}

export interface QuestionStats {
  total: number;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
  averagePoints: number;
} 