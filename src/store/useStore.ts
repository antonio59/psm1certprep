import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db, saveExamResult, updateUserProgress } from '@/lib/db';

interface ExamResult {
  examId: string;
  score: number;
  questionsAttempted: number;
  questionsCorrect: number;
  timeTaken: number;
  completedAt: string;
}

interface StudyProgress {
  completedFlashcards: string[];
  completedExams: string[];
  examScores: Record<string, number>;
}

interface Store {
  progress: StudyProgress;
  examHistory: ExamResult[];
  updateProgress: (userId: string, progress: Partial<StudyProgress>) => Promise<void>;
  currentExamId: string | null;
  setCurrentExamId: (id: string | null) => void;
  addExamResult: (userId: string, result: ExamResult) => Promise<void>;
  initializeProgress: (userId: string) => Promise<void>;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      progress: {
        completedFlashcards: [],
        completedExams: [],
        examScores: {},
      },
      examHistory: [],
      updateProgress: async (userId, newProgress) => {
        updateUserProgress(userId, {
          completed_flashcards: newProgress.completedFlashcards,
          completed_exams: newProgress.completedExams,
          exam_scores: newProgress.examScores,
        });

        set((state) => ({
          progress: { ...state.progress, ...newProgress },
        }));
      },
      currentExamId: null,
      setCurrentExamId: (id) => set({ currentExamId: id }),
      addExamResult: async (userId, result) => {
        // Save to exam history
        saveExamResult(userId, {
          exam_id: result.examId,
          score: result.score,
          questions_attempted: result.questionsAttempted,
          questions_correct: result.questionsCorrect,
          time_taken: result.timeTaken,
        });

        // Update progress in store
        set((state) => ({
          examHistory: [result, ...state.examHistory],
          progress: {
            ...state.progress,
            completedExams: [...state.progress.completedExams, result.examId],
            examScores: {
              ...state.progress.examScores,
              [result.examId]: result.score,
            },
          },
        }));
      },
      initializeProgress: async (userId) => {
        const progress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(userId);
        const examHistory = db.prepare('SELECT * FROM exam_history WHERE user_id = ? ORDER BY completed_at DESC').all(userId);

        if (progress) {
          set({
            progress: {
              completedFlashcards: JSON.parse(progress.completed_flashcards),
              completedExams: JSON.parse(progress.completed_exams),
              examScores: JSON.parse(progress.exam_scores),
            },
            examHistory: examHistory.map(exam => ({
              examId: exam.exam_id,
              score: exam.score,
              questionsAttempted: exam.questions_attempted,
              questionsCorrect: exam.questions_correct,
              timeTaken: exam.time_taken,
              completedAt: exam.completed_at,
            })),
          });
        }
      },
    }),
    {
      name: 'psm-study-storage',
    }
  )
);

export const getExamStats = (examHistory: ExamResult[]) => {
  return {
    totalExams: examHistory.length,
    averageScore:
      examHistory.length > 0
        ? examHistory.reduce((acc, curr) => acc + curr.score, 0) /
          examHistory.length
        : 0,
    recentExams: examHistory.slice(0, 5),
    readyForCertification: examHistory.some((exam) => exam.score >= 85),
  };
};