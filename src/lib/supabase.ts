import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ExamHistory {
  id: string;
  user_id: string;
  exam_id: string;
  score: number;
  completed_at: string;
  questions_attempted: number;
  questions_correct: number;
  time_taken: number;
  created_at: string;
}

export async function saveExamResult(
  examId: string,
  score: number,
  questionsAttempted: number,
  questionsCorrect: number,
  timeTaken: number
) {
  const { data, error } = await supabase
    .from('exam_history')
    .insert([
      {
        exam_id: examId,
        score,
        questions_attempted: questionsAttempted,
        questions_correct: questionsCorrect,
        time_taken: timeTaken
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getExamHistory() {
  const { data, error } = await supabase
    .from('exam_history')
    .select('*')
    .order('completed_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getExamStats() {
  const { data, error } = await supabase
    .from('exam_history')
    .select('*')
    .order('completed_at', { ascending: false })
    .limit(5);

  if (error) throw error;

  const stats = {
    totalExams: data.length,
    averageScore: data.reduce((acc, curr) => acc + curr.score, 0) / data.length,
    recentExams: data,
    readyForCertification: data.some(exam => exam.score >= 85)
  };

  return stats;
}