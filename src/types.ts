export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MockExam {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
}

export interface StudyProgress {
  completedFlashcards: string[];
  completedExams: string[];
  examScores: Record<string, number>;
}