'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Question } from '../types';
import { examQuestions } from '../data/examQuestions';

interface ExamSimulatorProps {
  userId: string | null;
  examId: string;
}

const mockExams = {
  exam1: {
    questions: examQuestions.exam1,
    timeLimit: 60
  },
  exam2: {
    questions: examQuestions.exam2,
    timeLimit: 60
  },
  exam3: {
    questions: examQuestions.exam3,
    timeLimit: 60
  },
  exam4: {
    questions: examQuestions.exam4,
    timeLimit: 60
  }
};

const ExamSimulator = ({ userId, examId }: ExamSimulatorProps) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [examComplete, setExamComplete] = useState(false);
  const { addExamResult, initializeProgress } = useStore();

  const exam = mockExams[examId as keyof typeof mockExams];
  const questions = exam?.questions || [];

  useEffect(() => {
    if (userId) {
      initializeProgress(userId);
    }
  }, [userId, initializeProgress]);

  useEffect(() => {
    if (!exam) {
      router.push('/mock-exams');
      return;
    }

    if (!examComplete) {
      const timer = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examComplete, exam, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const submitExam = async () => {
    if (!userId) {
      router.push('/sign-in');
      return;
    }

    const score = calculateScore();
    const questionsCorrect = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    
    const examResult = {
      examId,
      score,
      questionsAttempted: Object.keys(answers).length,
      questionsCorrect,
      timeTaken: 3600 - timeLeft,
      completedAt: new Date().toISOString()
    };

    await addExamResult(userId, examResult);
    setExamComplete(true);
  };

  if (!exam) {
    return null;
  }

  if (examComplete) {
    const score = calculateScore();
    const hasPassed = score >= 85;

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Results</h2>
        <div className="mb-8">
          <p className={`text-xl mb-2 ${hasPassed ? 'text-green-600' : 'text-red-600'}`}>
            Your Score: {score}%
          </p>
          <p className={hasPassed ? 'text-green-600' : 'text-red-600'}>
            {hasPassed
              ? 'Congratulations! You passed the mock exam!'
              : 'Keep practicing! You need 85% to pass the actual PSM I exam.'}
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-6 rounded-lg ${
                answers[question.id] === question.correctAnswer
                  ? 'bg-green-50'
                  : 'bg-red-50'
              }`}
            >
              <p className="font-medium mb-4">
                Question {index + 1}: {question.question}
              </p>
              <div className="space-y-2 mb-4">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded ${
                      optionIndex === question.correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : optionIndex === answers[question.id]
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.push('/mock-exams')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Back to Mock Exams
          </button>
          <button
            onClick={() => {
              setExamComplete(false);
              setAnswers({});
              setTimeLeft(60 * 60);
              setCurrentQuestion(0);
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center text-gray-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <button
          onClick={submitExam}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Submit Exam
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {questions[currentQuestion].question}
        </h2>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(questions[currentQuestion].id, index)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                answers[questions[currentQuestion].id] === index
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestion((prev) => prev + 1)}
          disabled={currentQuestion === questions.length - 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExamSimulator;