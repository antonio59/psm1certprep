'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Award, AlertCircle } from 'lucide-react';
import { MockExam } from '../types';
import { useStore } from '../store/useStore';
import { examQuestions } from '../data/examQuestions';

interface MockExamsProps {
  userId: string | null;
}

const mockExams: MockExam[] = [
  {
    id: 'exam1',
    title: 'Full Practice Exam 1',
    timeLimit: 60,
    questions: examQuestions.exam1
  },
  {
    id: 'exam2',
    title: 'Full Practice Exam 2',
    timeLimit: 60,
    questions: examQuestions.exam2
  },
  {
    id: 'exam3',
    title: 'Full Practice Exam 3',
    timeLimit: 60,
    questions: examQuestions.exam3
  },
  {
    id: 'exam4',
    title: 'Full Practice Exam 4',
    timeLimit: 60,
    questions: examQuestions.exam4
  }
];

const MockExams = ({ userId }: MockExamsProps) => {
  const router = useRouter();
  const { progress, setCurrentExamId, initializeProgress } = useStore();

  useEffect(() => {
    if (userId) {
      initializeProgress(userId);
    }
  }, [userId, initializeProgress]);

  const startExam = (examId: string) => {
    setCurrentExamId(examId);
    router.push(`/exam/${examId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mock Exams</h1>
        <p className="text-gray-600">
          Practice with real exam-like questions to prepare for your PSM I certification. Each exam contains 80 questions and requires a score of 85% to pass.
        </p>
      </div>

      <div className="grid gap-6">
        {mockExams.map((exam) => {
          const score = progress.examScores[exam.id];
          const isCompleted = progress.completedExams.includes(exam.id);
          const hasPassed = score >= 85;

          return (
            <div
              key={exam.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exam.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {exam.timeLimit} minutes
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {exam.questions.length} questions
                    </div>
                    {isCompleted && (
                      <div className={`flex items-center ${hasPassed ? 'text-green-600' : 'text-red-600'}`}>
                        <Award className="h-4 w-4 mr-1" />
                        Score: {score}%
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => startExam(exam.id)}
                  className={`px-6 py-2 rounded-md ${
                    isCompleted
                      ? hasPassed 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isCompleted ? 'Retake Exam' : 'Start Exam'}
                </button>
              </div>

              {isCompleted && (
                <div className={`mt-4 p-4 rounded-md ${hasPassed ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className={hasPassed ? 'text-green-700' : 'text-red-700'}>
                    You've completed this exam! Your score: {score}%
                    {hasPassed ? (
                      <span className="block mt-1">
                        Congratulations! You've passed this mock exam!
                      </span>
                    ) : (
                      <span className="block mt-1">
                        Keep practicing! You need 85% to pass the actual PSM I exam.
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Exam Information</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Each exam contains 80 questions, matching the real PSM I format</li>
          <li>• You have 60 minutes to complete each exam</li>
          <li>• Passing score is 85% (same as the actual PSM I)</li>
          <li>• Questions cover all aspects of the Scrum Guide</li>
          <li>• Review explanations after completing each exam to understand your mistakes</li>
        </ul>
      </div>
    </div>
  );
};

export default MockExams;